"use client";

import Navbar from "@/layouts/navbar";
import Footer from "@/layouts/footer";
import { Download, Clock, CheckCircle, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function ShippingPolicyPage() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Download className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">Digital Service Delivery</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Shipping and Delivery Policy
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl">
            Information about how we deliver our digital services and provide access to our platform features.
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Instant Access */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-8 h-8 text-green-400" />
              <h2 className="text-2xl font-bold text-white">Instant Digital Delivery</h2>
            </div>
            <p className="text-gray-400 leading-relaxed">
              As a digital platform, HackByteCodex provides instant access to all services upon successful payment confirmation. There are no physical goods shipped or delivery timelines for our core services.
            </p>
          </motion.div>

          {/* Service Access Timelines */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Platform Account Access</h3>
                  <p className="text-gray-400">
                    <strong>Timeline:</strong> Immediate access upon registration<br/>
                    <strong>Method:</strong> Email verification and account activation<br/>
                    <strong>Validity:</strong> As per your subscription plan or event duration
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Event Registration Access</h3>
                  <p className="text-gray-400">
                    <strong>Timeline:</strong> Instant confirmation email with event details<br/>
                    <strong>Access Method:</strong> Dashboard &gt; My Events section<br/>
                    <strong>Inclusions:</strong> Event guidelines, submission links, communication channels
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">API Platform Subscription</h3>
                  <p className="text-gray-400">
                    <strong>Timeline:</strong> API keys generated immediately after payment<br/>
                    <strong>Delivery:</strong> API credentials sent via email and dashboard<br/>
                    <strong>Documentation:</strong> Instant access to API docs and integration guides<br/>
                    <strong>Rate Limits:</strong> Applied based on your subscription tier
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Payment Confirmation</h3>
                  <p className="text-gray-400">
                    <strong>Confirmation:</strong> Instant email and SMS notification<br/>
                    <strong>Invoice:</strong> Automatically generated and emailed within 24 hours<br/>
                    <strong>Receipt:</strong> Available in Dashboard &gt; Billing section
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Technical Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Technical Requirements for Access</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-medium mb-2">For Participants</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>• Valid email address</li>
                  <li>• Internet connection</li>
                  <li>• Modern web browser (Chrome, Firefox, Safari, Edge)</li>
                  <li>• JavaScript enabled</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">For API Users</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>• Active subscription plan</li>
                  <li>• API key (provided instantly)</li>
                  <li>• HTTPS-enabled endpoint</li>
                  <li>• Basic API integration knowledge</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Non-Deliverables */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-8"
          >
            <h3 className="text-xl font-semibold text-white mb-4">What We Don't Deliver</h3>
            <p className="text-gray-400 mb-4">HackByteCodex is a purely digital platform. We do not provide:</p>
            <ul className="space-y-2 text-gray-400">
              <li>• Physical merchandise or swag (unless specifically mentioned for events)</li>
              <li>• Hardware or equipment</li>
              <li>• Offline or printed materials</li>
              <li>• In-person training or workshops (unless specified)</li>
            </ul>
            <p className="text-gray-400 mt-4 text-sm">
              <em>Note: Some events may offer physical prizes or merchandise separately, which will be clearly communicated during registration.</em>
            </p>
          </motion.div>

          {/* Service Availability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Service Availability</h3>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start gap-2">
                  <Clock className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Platform Uptime:</strong> 99.9% availability target (excluding scheduled maintenance)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">API Access:</strong> 24/7 availability with rate limiting</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Support Hours:</strong> Monday-Saturday, 9 AM - 6 PM IST</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Maintenance Windows:</strong> Typically Sundays 2-4 AM IST (announced in advance)</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Contact for Issues */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-8"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Issues with Access?</h3>
            <p className="text-gray-400 mb-4">
              If you don't receive instant access to your purchased service, please contact us immediately:
            </p>
            <ul className="space-y-2 text-gray-400">
              <li>• Email: <a href="mailto:support@hackbytecodex.com" className="text-blue-400 hover:underline">support@hackbytecodex.com</a></li>
              <li>• Include your order ID and email address used for registration</li>
              <li>• We typically resolve access issues within 2-4 business hours</li>
            </ul>
          </motion.div>

          <div className="text-center pt-8">
            <p className="text-sm text-gray-500">Last Updated: March 1, 2026</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
