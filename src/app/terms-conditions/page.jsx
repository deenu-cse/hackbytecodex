"use client";

import Navbar from "@/layouts/navbar";
import Footer from "@/layouts/footer";
import { FileText, CheckCircle, AlertTriangle, Shield, CreditCard, MessageSquare, Clock, Globe } from "lucide-react";
import { motion } from "framer-motion";

const sections = [
  {
    icon: FileText,
    title: "1. Acceptance of Terms",
    content: (
      <>
        <p className="mb-4">By accessing or using HackByteCodex ("Platform"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use our services.</p>
        <p className="mb-4">These Terms apply to all users including students, event organizers, judges, colleges, clubs, and API Platform subscribers.</p>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mt-4">
          <p className="text-sm text-blue-300"><strong>Note:</strong> These Terms constitute a legally binding agreement between you and HackByteCodex.</p>
        </div>
      </>
    )
  },
  {
    icon: Shield,
    title: "2. Account Registration and Eligibility",
    content: (
      <>
        <h3 className="text-lg font-semibold text-white mb-3">2.1 Eligibility Requirements</h3>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>You must be at least 18 years old to use this Platform</li>
          <li>You must have legal capacity to enter into this agreement</li>
          <li>Students must be enrolled in an educational institution</li>
          <li>College representatives must be authorized to act on behalf of their institution</li>
        </ul>

        <h3 className="text-lg font-semibold text-white mb-3 mt-6">2.2 Account Responsibilities</h3>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>Provide accurate, current, and complete information during registration</li>
          <li>Maintain the security of your account credentials</li>
          <li>Notify us immediately of any unauthorized access</li>
          <li>You are responsible for all activities under your account</li>
        </ul>

        <h3 className="text-lg font-semibold text-white mb-3 mt-6">2.3 API Platform Accounts</h3>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>API Platform access requires a separate subscription</li>
          <li>API keys are non-transferable and must be kept confidential</li>
          <li>You are responsible for all API requests made with your key</li>
          <li>We reserve the right to suspend or revoke API access for violations</li>
        </ul>
      </>
    )
  },
  {
    icon: CheckCircle,
    title: "3. Acceptable Use and Conduct",
    content: (
      <>
        <h3 className="text-lg font-semibold text-white mb-3">3.1 Permitted Uses</h3>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>Create and participate in events, hackathons, and competitions</li>
          <li>Build and showcase student projects</li>
          <li>Collaborate with other developers and teams</li>
          <li>Use API Platform for event management (with valid subscription)</li>
        </ul>

        <h3 className="text-lg font-semibold text-white mb-3 mt-6">3.2 Prohibited Activities</h3>
        <p className="mb-3">You agree NOT to:</p>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>Use the Platform for illegal, fraudulent, or harmful purposes</li>
          <li>Violate intellectual property rights of others</li>
          <li>Transmit malware, viruses, or malicious code</li>
          <li>Attempt unauthorized access to systems or data</li>
          <li>Interfere with or disrupt Platform functionality</li>
          <li>Circumvent security measures or authentication</li>
          <li>Share API keys publicly or with unauthorized parties</li>
          <li>Use API access to build competing services</li>
          <li>Exceed rate limits or abuse API endpoints</li>
          <li>Harass, intimidate, or discriminate against other users</li>
          <li>Post false, misleading, or defamatory content</li>
        </ul>
      </>
    )
  },
  {
    icon: Shield,
    title: "4. Intellectual Property Rights",
    content: (
      <>
        <h3 className="text-lg font-semibold text-white mb-3">4.1 Platform Ownership</h3>
        <p className="mb-4">HackByteCodex retains all rights to the Platform, including but not limited to: software, design, logos, trademarks, content, and documentation. Nothing grants you ownership rights.</p>

        <h3 className="text-lg font-semibold text-white mb-3 mt-6">4.2 User Content License</h3>
        <p className="mb-4">By submitting content (projects, submissions, profiles), you grant HackByteCodex a non-exclusive, worldwide, royalty-free license to use, display, and distribute that content solely for Platform operations.</p>

        <h3 className="text-lg font-semibold text-white mb-3 mt-6">4.3 Your Projects</h3>
        <p className="mb-4">You retain ownership of projects you create. However, by participating in events, you may grant additional rights to event organizers as specified in event rules.</p>
      </>
    )
  },
  {
    icon: CreditCard,
    title: "5. Payment Terms and Subscription",
    content: (
      <>
        <h3 className="text-lg font-semibold text-white mb-3">5.1 Payment Processing</h3>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>All payments are processed securely through Razorpay</li>
          <li>We do not store credit card information on our servers</li>
          <li>Prices are in INR and include applicable taxes</li>
          <li>Payment is required upfront for subscriptions</li>
        </ul>

        <h3 className="text-lg font-semibold text-white mb-3 mt-6">5.2 Subscription Plans</h3>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li><strong className="text-white">Basic Plan:</strong> ₹499/month - Limited features and usage</li>
          <li><strong className="text-white">Pro Plan:</strong> ₹1,999/month - Enhanced features and higher limits</li>
          <li><strong className="text-white">Enterprise Plan:</strong> ₹5,999/month - Unlimited features</li>
          <li>Yearly subscriptions offer 20% discount</li>
          <li>Plan features and pricing subject to change with notice</li>
        </ul>

        <h3 className="text-lg font-semibold text-white mb-3 mt-6">5.3 Billing Cycle</h3>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>Subscriptions auto-renew unless cancelled</li>
          <li>Billing occurs on the same date each cycle</li>
          <li>Failed payments may result in service suspension</li>
          <li>Refunds are governed by our Refund Policy</li>
        </ul>

        <h3 className="text-lg font-semibold text-white mb-3 mt-6">5.4 Usage Limits</h3>
        <p className="mb-3">Each plan has specific limits:</p>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>Number of events per month</li>
          <li>Registrations per event</li>
          <li>Judges per event</li>
          <li>API rate limits (requests per minute)</li>
          <li>Analytics features</li>
        </ul>
        <p className="mt-4 text-gray-400 italic">Exceeding limits may require plan upgrade or incur additional charges.</p>

        <h3 className="text-lg font-semibold text-white mb-3 mt-6">5.5 Cancellation</h3>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>Cancel anytime from your dashboard</li>
          <li>Cancellation takes effect at end of billing period</li>
          <li>No refunds for partial months</li>
          <li>Data retention policy applies after cancellation</li>
        </ul>
      </>
    )
  },
  {
    icon: AlertTriangle,
    title: "6. Disclaimers and Limitation of Liability",
    content: (
      <>
        <h3 className="text-lg font-semibold text-white mb-3">6.1 Service Disclaimer</h3>
        <p className="mb-4">THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.</p>

        <h3 className="text-lg font-semibold text-white mb-3 mt-6">6.2 No Guarantee</h3>
        <p className="mb-4">We do not guarantee that the Platform will be uninterrupted, secure, or error-free. We are not responsible for:</p>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>Technical failures, bugs, or interruptions</li>
          <li>Loss of data or submissions</li>
          <li>Third-party actions (including event outcomes)</li>
          <li>Accuracy or quality of user-generated content</li>
          <li>Results from using our Platform</li>
        </ul>

        <h3 className="text-lg font-semibold text-white mb-3 mt-6">6.3 Limitation of Liability</h3>
        <p className="mb-4">TO THE MAXIMUM EXTENT PERMITTED BY LAW, HACKBYTECODEX SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES.</p>
        
        <p className="mb-4">OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID TO HACKBYTECODEX IN THE LAST 6 MONTHS, OR ₹1,000 IF YOU HAVE NOT PAID ANYTHING.</p>
      </>
    )
  },
  {
    icon: Shield,
    title: "7. Indemnification",
    content: (
      <>
        <p className="mb-4">You agree to indemnify, defend, and hold harmless HackByteCodex, its owners, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:</p>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>Your use of the Platform</li>
          <li>Your violation of these Terms</li>
          <li>Your infringement of third-party rights</li>
          <li>Your content or submissions</li>
        </ul>
      </>
    )
  },
  {
    icon: Clock,
    title: "8. Term and Termination",
    content: (
      <>
        <h3 className="text-lg font-semibold text-white mb-3">8.1 Term</h3>
        <p className="mb-4">These Terms remain effective as long as you use the Platform.</p>

        <h3 className="text-lg font-semibold text-white mb-3 mt-6">8.2 Termination by You</h3>
        <p className="mb-4">You may terminate your account at any time by contacting support or using account deletion features.</p>

        <h3 className="text-lg font-semibold text-white mb-3 mt-6">8.3 Termination by Us</h3>
        <p className="mb-4">We may suspend or terminate your access immediately if you violate these Terms, engage in prohibited conduct, or for operational/legal reasons.</p>

        <h3 className="text-lg font-semibold text-white mb-3 mt-6">8.4 Effect of Termination</h3>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>Your right to use the Platform ceases immediately</li>
          <li>Outstanding fees remain payable</li>
          <li>We may delete your data per retention policy</li>
          <li>Provisions that should survive termination remain in effect</li>
        </ul>
      </>
    )
  },
  {
    icon: Globe,
    title: "9. Governing Law and Dispute Resolution",
    content: (
      <>
        <h3 className="text-lg font-semibold text-white mb-3">9.1 Governing Law</h3>
        <p className="mb-4">These Terms shall be governed by the laws of India, without regard to conflict of law principles.</p>

        <h3 className="text-lg font-semibold text-white mb-3 mt-6">9.2 Dispute Resolution</h3>
        <p className="mb-4">Any disputes shall first be attempted to be resolved through good faith negotiations. If unresolved within 30 days, disputes shall be submitted to binding arbitration in accordance with Indian Arbitration laws.</p>

        <h3 className="text-lg font-semibold text-white mb-3 mt-6">9.3 Jurisdiction</h3>
        <p className="mb-4">Courts in [Your City, State] shall have exclusive jurisdiction over any litigation.</p>
      </>
    )
  },
  {
    icon: FileText,
    title: "10. Changes to Terms",
    content: (
      <>
        <p className="mb-4">We may modify these Terms at any time. Material changes will be communicated via email or prominent notice on the Platform. Continued use after changes constitutes acceptance of new Terms.</p>
        <p className="mt-4 text-sm text-gray-500">Last Updated: March 1, 2026</p>
      </>
    )
  },
  {
    icon: MessageSquare,
    title: "11. Contact Information",
    content: (
      <>
        <p className="mb-4">For questions about these Terms, contact us at:</p>
        <ul className="space-y-2 ml-4 mb-4">
          <li><strong className="text-white">Email:</strong> <a href="mailto:legal@hackbytecodex.com" className="text-blue-400 hover:underline">legal@hackbytecodex.com</a></li>
          <li><strong className="text-white">Address:</strong> HackByteCodex Legal Team, [Your Business Address]</li>
        </ul>
      </>
    )
  }
];

export default function TermsConditionsPage() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <FileText className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">Legal Agreement</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Terms and Conditions
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl">
            Please read these terms carefully before using HackByteCodex. By accessing our platform, you agree to be bound by these terms.
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
