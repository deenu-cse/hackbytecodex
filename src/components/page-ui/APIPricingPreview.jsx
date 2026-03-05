"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

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
      "30 requests/min",
      "Email support",
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
      "120 requests/min",
      "Priority support",
      "Webhook support",
      "Custom branding",
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
      "500 requests/min",
      "Dedicated support",
      "IP whitelisting",
      "Custom integrations",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    popular: false,
    gradient: "from-purple-500 to-pink-500",
  },
];

export default function APIPricingPreview() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">Simple, transparent pricing</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Choose your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              API plan
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Start free, scale as you grow. All plans include core API access with generous limits.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
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
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 ${
                plan.popular
                  ? "bg-gradient-to-b from-blue-600/20 to-transparent border-2 border-blue-500/50"
                  : "bg-[#0a0a0a] border border-white/10"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-400">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">
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

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href="/pricing" className="block">
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
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm">
            All prices in INR. GST applicable. Need a custom plan?{" "}
            <Link href="/contact" className="text-blue-400 hover:underline">
              Contact us
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
