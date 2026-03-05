"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, ArrowRight, HelpCircle, Loader2 } from "lucide-react";
import Navbar from "@/layouts/navbar";
import Footer from "@/layouts/footer";
import Link from "next/link";
import { useApiPlatform } from "@/app/context/ApiPlatformContext";
import { useRouter } from "next/navigation";

const plans = [
  {
    name: "Basic",
    description: "Perfect for small events and testing",
    monthlyPrice: 499,
    yearlyPrice: 4999,
    features: [
      "5 events per month",
      "100 registrations per event",
      "3 judges per event",
      "Basic analytics",
      "30 requests/min rate limit",
      "Email support",
      "Standard API access",
    ],
    notIncluded: [
      "Webhook support",
      "Custom branding",
      "IP whitelisting",
      "Dedicated support",
    ],
    cta: "Get Started",
    popular: false,
    gradient: "from-gray-500 to-gray-600",
  },
  {
    name: "Pro",
    description: "For growing event organizers",
    monthlyPrice: 1999,
    yearlyPrice: 19999,
    features: [
      "25 events per month",
      "1,000 registrations per event",
      "15 judges per event",
      "Full analytics dashboard",
      "120 requests/min rate limit",
      "Priority email support",
      "Webhook support",
      "Custom branding",
      "Advanced form builder",
    ],
    notIncluded: [
      "IP whitelisting",
      "Dedicated support",
      "Custom integrations",
    ],
    cta: "Start Pro Trial",
    popular: true,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Enterprise",
    description: "For large-scale event platforms",
    monthlyPrice: 5999,
    yearlyPrice: 59999,
    features: [
      "Unlimited events",
      "Unlimited registrations",
      "Unlimited judges",
      "Advanced analytics + API",
      "500 requests/min rate limit",
      "24/7 Dedicated support",
      "IP whitelisting",
      "Custom integrations",
      "SLA guarantee",
      "White-label options",
      "Dedicated account manager",
    ],
    notIncluded: [],
    cta: "Contact Sales",
    popular: false,
    gradient: "from-purple-500 to-pink-500",
  },
];

const faqs = [
  {
    question: "What happens when I exceed my plan limits?",
    answer: "You'll receive email notifications at 80% and 100% of your usage. You can upgrade anytime to continue creating events.",
  },
  {
    question: "Can I change my plan later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, downgrades at the end of your billing cycle.",
  },
  {
    question: "Is there a free trial?",
    answer: "We offer a 14-day free trial on the Pro plan. No credit card required to start.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, UPI, and net banking through Razorpay for Indian customers.",
  },
  {
    question: "Can I get a refund?",
    answer: "We offer a 7-day money-back guarantee for all plans. Contact support within 7 days of purchase for a full refund.",
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(null);
  const { createOrder } = useApiPlatform();
  const router = useRouter();

  // Function to load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) {
        resolve(window.Razorpay);
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(window.Razorpay);
      script.onerror = () => reject(new Error('Failed to load Razorpay script'));
      document.head.appendChild(script);
    });
  };

  const handleSubscribe = async (planName) => {
    try {
      setLoadingPlan(planName);
      
      // Load Razorpay script
      await loadRazorpayScript();
      
      // Determine plan and billing cycle
      let plan = null;
      if (planName === "Basic") plan = "BASIC";
      else if (planName === "Pro") plan = "PRO";
      else if (planName === "Enterprise") plan = "ENTERPRISE";
      
      if (!plan) {
        throw new Error("Invalid plan selected");
      }
      
      const billingCycle = isYearly ? "YEARLY" : "MONTHLY";
      
      // Create order on backend
      const orderResponse = await createOrder(plan, billingCycle);
      if (!orderResponse.success) {
        throw new Error(orderResponse.error);
      }
      
      const { orderId, amount, currency, razorpayKeyId } = orderResponse.data;
      
      // Configure Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || razorpayKeyId,
        amount: amount.toString(),
        currency: currency,
        name: "Codex API Platform",
        description: `${planName} Plan (${billingCycle})`,
        order_id: orderId,
        handler: async function (response) {
          try {
            // Verify payment on backend using context function
            const verifyResponse = await verifyPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature
            );
            
            if (verifyResponse.success) {
              alert('Payment successful! Your API platform account is ready.');
              router.push('/api-platform/dashboard');
            } else {
              alert('Payment verification failed: ' + verifyResponse.error);
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Error verifying payment. Please contact support.');
          }
        },
        prefill: {
          name: '', // Will be filled from user profile if available
          email: '',
          contact: '',
        },
        theme: {
          color: '#2563eb',
        },
      };
      
      // Open Razorpay payment modal
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert(error.message || 'An error occurred during payment. Please try again.');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
          >
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">Simple, transparent pricing</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Choose your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              perfect plan
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto mb-8"
          >
            Start free, scale as you grow. All plans include core API access with generous limits.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4"
          >
            <span className={`text-sm ${!isYearly ? "text-white" : "text-gray-500"}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 rounded-full bg-white/10 transition-colors"
            >
              <motion.div
                animate={{ x: isYearly ? 28 : 2 }}
                className="absolute top-1 w-5 h-5 rounded-full bg-blue-500"
              />
            </button>
            <span className={`text-sm ${isYearly ? "text-white" : "text-gray-500"}`}>
              Yearly
              <span className="ml-2 text-xs text-green-400">Save 20%</span>
            </span>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`relative rounded-3xl p-8 ${
                  plan.popular
                    ? "bg-gradient-to-b from-blue-600/20 to-transparent border-2 border-blue-500/50 scale-105"
                    : "bg-[#0a0a0a] border border-white/10"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium">
                      <Sparkles className="w-3 h-3" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-white">
                      ₹{isYearly ? plan.yearlyPrice.toLocaleString() : plan.monthlyPrice}
                    </span>
                    <span className="text-gray-500">/{isYearly ? "year" : "month"}</span>
                  </div>
                  {isYearly && (
                    <p className="text-sm text-green-400 mt-1">
                      Save ₹{((plan.monthlyPrice * 12) - plan.yearlyPrice).toLocaleString()}/year
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature, i) => (
                    <li key={`not-${i}`} className="flex items-start gap-3 opacity-50">
                      <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-gray-500 text-xs">—</span>
                      </div>
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.name === "Enterprise" ? (
                  <Link href="/contact">
                    <Button
                      className={`w-full h-12 rounded-xl font-medium ${
                        plan.popular
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-white/5 hover:bg-white/10 text-white border border-white/20"
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={() => handleSubscribe(plan.name)}
                    disabled={loadingPlan === plan.name}
                    className={`w-full h-12 rounded-xl font-medium ${
                      plan.popular
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-white/5 hover:bg-white/10 text-white border border-white/20"
                    }`}
                  >
                    {loadingPlan === plan.name ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        {plan.cta}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Compare Plans</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">Feature</th>
                  <th className="text-center py-4 px-4 text-white font-medium">Basic</th>
                  <th className="text-center py-4 px-4 text-white font-medium">Pro</th>
                  <th className="text-center py-4 px-4 text-white font-medium">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Events per month", basic: "5", pro: "25", enterprise: "Unlimited" },
                  { feature: "Registrations per event", basic: "100", pro: "1,000", enterprise: "Unlimited" },
                  { feature: "Judges per event", basic: "3", pro: "15", enterprise: "Unlimited" },
                  { feature: "Rate limit (req/min)", basic: "30", pro: "120", enterprise: "500" },
                  { feature: "Analytics", basic: "Basic", pro: "Full", enterprise: "Advanced" },
                  { feature: "Webhook support", basic: "—", pro: "✓", enterprise: "✓" },
                  { feature: "Custom branding", basic: "—", pro: "✓", enterprise: "✓" },
                  { feature: "IP whitelisting", basic: "—", pro: "—", enterprise: "✓" },
                  { feature: "Support", basic: "Email", pro: "Priority", enterprise: "24/7 Dedicated" },
                  { feature: "SLA guarantee", basic: "—", pro: "—", enterprise: "✓" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-4 px-4 text-gray-300">{row.feature}</td>
                    <td className="text-center py-4 px-4 text-gray-400">{row.basic}</td>
                    <td className="text-center py-4 px-4 text-gray-400">{row.pro}</td>
                    <td className="text-center py-4 px-4 text-blue-400">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="rounded-2xl bg-[#0a0a0a] border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-white font-medium">{faq.question}</span>
                  <HelpCircle className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Still have questions?</h2>
          <p className="text-gray-400 mb-8">Our team is here to help you choose the right plan.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button variant="outline" className="h-12 px-8 border-white/20 text-white hover:bg-white/10">
                Contact Sales
              </Button>
            </Link>
            <Link href="/api-docs">
              <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-700">
                Read Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
