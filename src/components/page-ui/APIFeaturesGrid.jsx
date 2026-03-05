"use client";

import { motion } from "framer-motion";
import { 
  Globe, 
  BarChart3, 
  Webhook, 
  Gauge, 
  FormInput, 
  Users,
  ArrowUpRight
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "RESTful API",
    description: "Build with standard HTTP methods. JSON request/response format with comprehensive endpoints for events, registrations, and scoring.",
    gradient: "from-blue-500 to-cyan-500",
    size: "normal"
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Track registrations, attendance, and engagement metrics live. Export detailed reports for insights.",
    gradient: "from-purple-500 to-pink-500",
    size: "normal"
  },
  {
    icon: Webhook,
    title: "Webhook Support",
    description: "Get instant notifications for registrations, payments, and judge submissions. Configure custom endpoints.",
    gradient: "from-green-500 to-emerald-500",
    size: "normal"
  },
  {
    icon: Gauge,
    title: "Rate Limiting",
    description: "30-500 requests per minute based on your tier. Fair usage with clear headers for remaining quota.",
    gradient: "from-orange-500 to-red-500",
    size: "normal"
  },
  {
    icon: FormInput,
    title: "Dynamic Form Builder",
    description: "Create custom registration forms with multiple field types. Team registration support with configurable limits.",
    gradient: "from-indigo-500 to-violet-500",
    size: "large"
  },
  {
    icon: Users,
    title: "Judge Scoring System",
    description: "Built-in evaluation with customizable criteria. Weighted scoring, feedback collection, and automated leaderboard generation.",
    gradient: "from-teal-500 to-cyan-500",
    size: "large"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function APIFeaturesGrid() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Everything you need to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              power your events
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A complete toolkit for event management. From creation to scoring, 
            our API handles the complexity so you can focus on the experience.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group relative ${feature.size === 'large' ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="relative h-full p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} p-[1px] mb-6`}>
                  <div className="w-full h-full rounded-2xl bg-[#0a0a0a] flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  {feature.title}
                  <ArrowUpRight className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 group-hover:text-blue-400 transition-all" />
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 border border-white/10">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-black flex items-center justify-center text-xs font-bold text-white"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="text-gray-400 text-sm">
              Trusted by <span className="text-white font-semibold">500+</span> developers
            </span>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
