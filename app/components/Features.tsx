"use client";
import { motion } from "framer-motion";
import { Zap, Gamepad2, Brain, Smartphone } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Play",
    description: "No downloads required. Start playing in seconds.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Gamepad2,
    title: "100+ Games",
    description: "Huge collection of free games across all genres.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Brain,
    title: "Skill-Based",
    description: "Improve your skills and compete with others.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Play anywhere on any device seamlessly.",
    color: "from-green-500 to-emerald-500",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose Luckyora?
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            The ultimate gaming platform for casual and competitive players
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative p-6 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 hover:border-slate-700 transition-all"
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />

                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


