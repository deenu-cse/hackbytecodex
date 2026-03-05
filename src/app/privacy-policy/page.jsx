"use client";

import Navbar from "@/layouts/navbar";
import Footer from "@/layouts/footer";
import { Shield, Lock, Eye, Database, UserCheck, Mail, Globe, Clock, FileText, MessageSquare, Share2, User } from "lucide-react";
import { motion } from "framer-motion";

const sections = [
  {
    icon: Database,
    title: "1. Information We Collect",
    content: (
      <>
        <p className="mb-4">We collect information that you provide directly to us:</p>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li><strong className="text-white">Account Information:</strong> Name, email address, password, college name, and profile details when you register</li>
          <li><strong className="text-white">Event Data:</strong> Event registrations, submissions, and participation history</li>
          <li><strong className="text-white">Payment Information:</strong> Transaction details processed securely through Razorpay (we do not store card details)</li>
          <li><strong className="text-white">Usage Data:</strong> How you interact with our platform, pages visited, and time spent</li>
          <li><strong className="text-white">Device Information:</strong> IP address, browser type, operating system, and device identifiers</li>
          <li><strong className="text-white">API Platform Data:</strong> API keys, event configurations, registration forms, and judge assignments for platform users</li>
        </ul>
      </>
    )
  },
  {
    icon: Eye,
    title: "2. How We Use Your Information",
    content: (
      <>
        <p className="mb-4">We use the collected information for the following purposes:</p>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>To provide, maintain, and improve our services</li>
          <li>To manage your account and provide customer support</li>
          <li>To process event registrations and payments</li>
          <li>To send you updates, security alerts, and support messages</li>
          <li>To personalize your experience and deliver relevant content</li>
          <li>To monitor and analyze trends, usage, and activities</li>
          <li>To detect, investigate, and prevent fraudulent transactions and security breaches</li>
          <li>To comply with legal obligations and enforce our terms</li>
          <li>For API Platform users: To facilitate event management, judge scoring, and analytics</li>
        </ul>
      </>
    )
  },
  {
    icon: UserCheck,
    title: "3. Legal Basis for Processing (GDPR)",
    content: (
      <>
        <p className="mb-4">If you are in the European Economic Area (EEA), our legal basis for processing your data includes:</p>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li><strong className="text-white">Contract Performance:</strong> Processing necessary to fulfill our agreement with you</li>
          <li><strong className="text-white">Legal Obligation:</strong> Processing required by law (e.g., tax records)</li>
          <li><strong className="text-white">Legitimate Interests:</strong> Processing for our legitimate business interests</li>
          <li><strong className="text-white">Consent:</strong> Processing based on your explicit consent (which you may withdraw at any time)</li>
        </ul>
      </>
    )
  },
  {
    icon: Share2,
    title: "4. Information Sharing and Disclosure",
    content: (
      <>
        <p className="mb-4">We do not sell your personal information. We may share your data with:</p>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li><strong className="text-white">Service Providers:</strong> Third-party vendors who perform services on our behalf (hosting, payment processing via Razorpay, analytics)</li>
          <li><strong className="text-white">Event Organizers:</strong> When you register for an event, relevant information is shared with organizers</li>
          <li><strong className="text-white">Judges:</strong> For evaluation purposes in hackathons and competitions</li>
          <li><strong className="text-white">Legal Requirements:</strong> When required by law or to protect rights and safety</li>
          <li><strong className="text-white">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
        </ul>
      </>
    )
  },
  {
    icon: Lock,
    title: "5. Data Security",
    content: (
      <>
        <p className="mb-4">We implement appropriate technical and organizational measures to protect your data:</p>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>Encryption in transit using HTTPS/TLS protocols</li>
          <li>Secure storage with industry-standard encryption</li>
          <li>Regular security audits and vulnerability assessments</li>
          <li>Access controls and authentication mechanisms</li>
          <li>Razorpay PCI-DSS compliant payment processing</li>
          <li>API key rotation and secure token management for platform users</li>
          <li>Employee training on data protection best practices</li>
        </ul>
        <p className="mt-4 text-gray-400 italic">Note: No method of transmission over the Internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.</p>
      </>
    )
  },
  {
    icon: User,
    title: "6. Your Rights and Choices",
    content: (
      <>
        <p className="mb-4">You have the following rights regarding your personal information:</p>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li><strong className="text-white">Access:</strong> Request a copy of your personal data</li>
          <li><strong className="text-white">Correction:</strong> Update or correct inaccurate information</li>
          <li><strong className="text-white">Deletion:</strong> Request deletion of your data (subject to legal obligations)</li>
          <li><strong className="text-white">Portability:</strong> Receive your data in a structured, machine-readable format</li>
          <li><strong className="text-white">Opt-Out:</strong> Unsubscribe from marketing communications</li>
          <li><strong className="text-white">Restriction:</strong> Limit how we process your data</li>
          <li><strong className="text-white">Object:</strong> Object to certain processing activities</li>
        </ul>
        <p className="mt-4">To exercise these rights, contact us at <a href="mailto:privacy@hackbytecodex.com" className="text-blue-400 hover:underline">privacy@hackbytecodex.com</a></p>
      </>
    )
  },
  {
    icon: Globe,
    title: "7. International Data Transfers",
    content: (
      <>
        <p className="mb-4">Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place:</p>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>Standard Contractual Clauses approved by regulatory authorities</li>
          <li>Adequacy decisions for countries with equivalent data protection laws</li>
          <li>Binding corporate rules for intra-group transfers</li>
        </ul>
      </>
    )
  },
  {
    icon: Clock,
    title: "8. Data Retention",
    content: (
      <>
        <p className="mb-4">We retain your personal information for as long as necessary to:</p>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>Provide our services and maintain your account</li>
          <li>Comply with legal obligations (typically 7 years for financial records)</li>
          <li>Resolve disputes and enforce our agreements</li>
        </ul>
        <p className="mt-4">When data is no longer needed, we securely delete or anonymize it.</p>
      </>
    )
  },
  {
    icon: MessageSquare,
    title: "9. Children's Privacy",
    content: (
      <>
        <p className="mb-4">Our services are not directed to individuals under 18. We do not knowingly collect personal information from children. If we discover we have collected data from a child without parental consent, we will delete it promptly.</p>
      </>
    )
  },
  {
    icon: FileText,
    title: "10. Changes to This Policy",
    content: (
      <>
        <p className="mb-4">We may update this Privacy Policy periodically. We will notify you of material changes by:</p>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>Posting the updated policy on our website</li>
          <li>Sending an email notification</li>
          <li>Displaying a notice on our platform</li>
        </ul>
        <p className="mt-4">The "Last Updated" date at the top of this page indicates when changes were made.</p>
      </>
    )
  },
  {
    icon: Mail,
    title: "11. Contact Us",
    content: (
      <>
        <p className="mb-4">For questions, concerns, or complaints about this Privacy Policy or our data practices, contact us:</p>
        <ul className="space-y-2 ml-4 mb-4">
          <li><strong className="text-white">Email:</strong> <a href="mailto:privacy@hackbytecodex.com" className="text-blue-400 hover:underline">privacy@hackbytecodex.com</a></li>
          <li><strong className="text-white">Address:</strong> HackByteCodex Privacy Team, [Your Business Address]</li>
          <li><strong className="text-white">Grievance Officer:</strong> [Name], Email: <a href="mailto:grievance@hackbytecodex.com" className="text-blue-400 hover:underline">grievance@hackbytecodex.com</a></li>
        </ul>
        <p className="mt-4 text-sm text-gray-500">Last Updated: March 1, 2026</p>
      </>
    )
  }
];

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">Privacy & Transparency</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Privacy Policy
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information when you use HackByteCodex services.
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
