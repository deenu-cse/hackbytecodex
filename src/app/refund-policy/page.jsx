"use client";

import Navbar from "@/layouts/navbar";
import Footer from "@/layouts/footer";
import { CreditCard, RefreshCcw, IndianRupee, Clock, FileCheck, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const sections = [
  {
    icon: RefreshCcw,
    title: "1. Overview",
    content: (
      <>
        <p className="mb-4">At HackByteCodex, we want you to be completely satisfied with our services. This Refund Policy outlines when and how refunds are processed for different types of transactions on our platform.</p>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-4">
          <p className="text-sm text-blue-300"><strong>Last Updated:</strong> March 1, 2026</p>
        </div>
      </>
    )
  },
  {
    icon: CreditCard,
    title: "2. Payment Processing",
    content: (
      <>
        <p className="mb-4">All payments on HackByteCodex are processed securely through Razorpay, India's leading payment gateway. We adhere to Razorpay's refund policies and guidelines.</p>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>Payments are PCI-DSS compliant and secure</li>
          <li>We do not store credit/debit card information</li>
          <li>All transactions are encrypted using SSL/TLS</li>
          <li>Refunds are processed back to the original payment method</li>
        </ul>
      </>
    )
  },
  {
    icon: Clock,
    title: "3. Refund Eligibility and Timeframes",
    content: (
      <>
        <h3 className="text-lg font-semibold text-white mb-3">3.1 Event Registrations</h3>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li><strong className="text-white">Full Refund:</strong> Available up to 7 days before the event start date</li>
          <li><strong className="text-white">Partial Refund (50%):</strong> Available 3-7 days before the event</li>
          <li><strong className="text-white">No Refund:</strong> Within 72 hours of event start or after event has begun</li>
          <li>Event-specific refund policies will be clearly stated during registration</li>
        </ul>

        <h3 className="text-lg font-semibold text-white mb-3 mt-6">3.2 API Platform Subscriptions</h3>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li><strong className="text-white">7-Day Money-Back Guarantee:</strong> Full refund if cancelled within 7 days of purchase, provided usage limits have not been exceeded</li>
          <li><strong className="text-white">After 7 Days:</strong> No refunds, but you can cancel auto-renewal</li>
          <li><strong className="text-white">Usage Limit:</strong> If you exceed 20% of your plan's quota, refund eligibility is void</li>
          <li>Pro-rated refunds may be considered for annual subscriptions on a case-by-case basis</li>
        </ul>

        <h3 className="text-lg font-semibold text-white mb-3 mt-6">3.3 Free Trial Conversions</h3>
        <p className="mb-4">If you convert from a free trial to a paid subscription, the 7-day money-back guarantee still applies from the date of first charge.</p>
      </>
    )
  },
  {
    icon: IndianRupee,
    title: "4. How to Request a Refund",
    content: (
      <>
        <h3 className="text-lg font-semibold text-white mb-3">4.1 For Event Registrations</h3>
        <ol className="list-decimal list-inside space-y-2 ml-4 mb-4">
          <li>Go to your Dashboard &gt; My Events</li>
          <li>Select the event you want to cancel</li>
          <li>Click "Request Refund"</li>
          <li>Provide a reason for cancellation</li>
          <li>Submit the request</li>
        </ol>

        <h3 className="text-lg font-semibold text-white mb-3 mt-6">4.2 For API Subscriptions</h3>
        <ol className="list-decimal list-inside space-y-2 ml-4 mb-4">
          <li>Go to API Platform Dashboard &gt; Settings &gt; Subscription</li>
          <li>Click "Cancel Subscription"</li>
          <li>Select "Request Refund" if within eligible period</li>
          <li>Provide reason and submit</li>
        </ol>

        <h3 className="text-lg font-semibold text-white mb-3 mt-6">4.3 Alternative Method</h3>
        <p className="mb-4">You can also email us at <a href="mailto:refunds@hackbytecodex.com" className="text-blue-400 hover:underline">refunds@hackbytecodex.com</a> with:</p>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>Your account email address</li>
          <li>Transaction ID or Order ID</li>
          <li>Reason for refund request</li>
          <li>Date of purchase/registration</li>
        </ul>
      </>
    )
  },
  {
    icon: Clock,
    title: "5. Refund Processing Time",
    content: (
      <>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li><strong className="text-white">Approval Time:</strong> 3-5 business days for review and approval</li>
          <li><strong className="text-white">Credit Card/Debit Card:</strong> 5-7 business days after approval</li>
          <li><strong className="text-white">UPI:</strong> 3-5 business days after approval</li>
          <li><strong className="text-white">Net Banking:</strong> 5-7 business days after approval</li>
          <li><strong className="text-white">Wallets:</strong> 2-3 business days after approval</li>
        </ul>
        <p className="mt-4 text-gray-400 italic">Note: Actual credit time depends on your bank's processing speed. We have no control over banking delays.</p>
      </>
    )
  },
  {
    icon: FileCheck,
    title: "6. Non-Refundable Scenarios",
    content: (
      <>
        <p className="mb-4">Refunds will NOT be provided in the following cases:</p>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>Event has already started or completed</li>
          <li>No-show at the event without prior cancellation</li>
          <li>Violation of platform terms resulting in account suspension</li>
          <li>Fraudulent transactions or chargebacks</li>
          <li>API usage exceeding 20% of plan limits</li>
          <li>Promotional or discounted tickets marked as "non-refundable"</li>
          <li>Third-party event fees (if specified by organizer)</li>
          <li>Processing fees charged by payment gateways</li>
        </ul>
      </>
    )
  },
  {
    icon: RefreshCcw,
    title: "7. Special Circumstances",
    content: (
      <>
        <h3 className="text-lg font-semibold text-white mb-3">7.1 Event Cancellation by Organizer</h3>
        <p className="mb-4">If an event is cancelled by the organizer:</p>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>Full refund will be automatically processed</li>
          <li>You will receive notification via email</li>
          <li>Refund will be credited within 5-7 business days</li>
          <li>Alternative options (credit, rescheduling) may be offered</li>
        </ul>

        <h3 className="text-lg font-semibold text-white mb-3 mt-6">7.2 Force Majeure</h3>
        <p className="mb-4">For events cancelled due to circumstances beyond our control (natural disasters, pandemics, government orders):</p>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>Full or partial refunds will be processed based on recovered costs</li>
          <li>Credit vouchers may be offered as alternative</li>
          <li>Insurance claims (if applicable) will be pursued</li>
        </ul>

        <h3 className="text-lg font-semibold text-white mb-3 mt-6">7.3 Technical Issues</h3>
        <p className="mb-4">If platform technical issues prevent service delivery:</p>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>Service credits will be provided for downtime</li>
          <li>Refunds considered if issue persists beyond 48 hours</li>
          <li>Pro-rated refunds for extended outages</li>
        </ul>
      </>
    )
  },
  {
    icon: CreditCard,
    title: "8. Cancellation Policy",
    content: (
      <>
        <h3 className="text-lg font-semibold text-white mb-3">8.1 User-Initiated Cancellation</h3>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>Cancel anytime from your dashboard</li>
          <li>Effective immediately for event registrations</li>
          <li>End of billing cycle for subscriptions</li>
          <li>Email confirmation sent upon cancellation</li>
        </ul>

        <h3 className="text-lg font-semibold text-white mb-3 mt-6">8.2 Platform-Initiated Cancellation</h3>
        <p className="mb-4">We reserve the right to cancel accounts or access in cases of:</p>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>Terms of Service violations</li>
          <li>Fraudulent activity</li>
          <li>Abuse of platform or API</li>
          <li>Non-payment of dues</li>
          <li>Legal or regulatory requirements</li>
        </ul>
        <p className="mt-4">In such cases, refunds will be evaluated on a case-by-case basis.</p>
      </>
    )
  },
  {
    icon: FileCheck,
    title: "9. Disputes and Chargebacks",
    content: (
      <>
        <p className="mb-4">If you dispute a charge:</p>
        <ol className="list-decimal list-inside space-y-2 ml-4 mb-4">
          <li>Contact our support team first at <a href="mailto:support@hackbytecodex.com" className="text-blue-400 hover:underline">support@hackbytecodex.com</a></li>
          <li>We will investigate and respond within 5 business days</li>
          <li>If unresolved, you may file a chargeback with your bank</li>
          <li>Chargebacks may result in account suspension until resolved</li>
          <li>Frivolous chargebacks may lead to permanent account termination</li>
        </ol>
      </>
    )
  },
  {
    icon: MessageSquare,
    title: "10. Contact Us",
    content: (
      <>
        <p className="mb-4">For refund-related queries, contact us:</p>
        <ul className="space-y-2 ml-4 mb-4">
          <li><strong className="text-white">Email:</strong> <a href="mailto:refunds@hackbytecodex.com" className="text-blue-400 hover:underline">refunds@hackbytecodex.com</a></li>
          <li><strong className="text-white">Support Hours:</strong> Monday-Saturday, 9 AM - 6 PM IST</li>
          <li><strong className="text-white">Response Time:</strong> Within 24-48 hours</li>
        </ul>
        
        <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <p className="text-sm text-blue-300">
            <strong>Note:</strong> This policy is subject to change. Please check this page periodically for updates. The policy in effect at the time of your purchase/registration will apply to your transaction.
          </p>
        </div>
      </>
    )
  }
];

export default function RefundPolicyPage() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <RefreshCcw className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">Consumer Protection</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Refund and Cancellation Policy
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl">
            Transparent refund policies for event registrations and API subscriptions. We ensure fair treatment and quick processing for all refund requests.
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-12">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="scroll-mt-24"
              id={`section-${index}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              </div>
              
              <div className="pl-15 text-gray-400 leading-relaxed">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
