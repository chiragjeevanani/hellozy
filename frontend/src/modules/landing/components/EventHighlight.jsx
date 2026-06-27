import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Ticket, Heart, Sparkles, ArrowRight } from 'lucide-react';

const EVENT_ROLES = [
  {
    icon: <Users className="w-6 h-6 text-primary-light" />,
    title: "Participate",
    desc: "Register as an active participant to join competition brackets, workshops, or activities.",
    color: "bg-primary/5 hover:bg-primary/10"
  },
  {
    icon: <Ticket className="w-6 h-6 text-accent" />,
    title: "Visitor Pass",
    desc: "Reserve seats or passes as a guest or spectator to watch and enjoy the event live.",
    color: "bg-accent/5 hover:bg-accent/10"
  },
  {
    icon: <Sparkles className="w-6 h-6 text-primary-light" />,
    title: "Sponsor Event",
    desc: "Support local events, gain immense brand visibility, and choose custom sponsorship tiers.",
    color: "bg-primary/5 hover:bg-primary/10"
  },
  {
    icon: <Heart className="w-6 h-6 text-accent" />,
    title: "Couples & Duos",
    desc: "Sign up with a partner for special couples discounts, packages, and custom seating.",
    color: "bg-accent/5 hover:bg-accent/10"
  }
];

export default function EventHighlight() {
  return (
    <section className="py-24 px-4 md:px-8 bg-gradient-to-br from-stone-900 via-stone-850 to-primary text-white overflow-hidden relative">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Info Column */}
        <div className="lg:col-span-5 text-left space-y-6">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 bg-accent/20 border border-accent/30 text-accent rounded-full text-xs font-bold uppercase tracking-widest"
          >
            Regional Festivals & Meetups
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-black text-3xl md:text-4xl lg:text-5xl leading-tight text-white"
          >
            Don't Just Ride. <br />
            <span className="text-accent">Be Part of the Scene.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-stone-300 text-sm md:text-base leading-relaxed"
          >
            Hellozy isn't just about getting you from point A to point B. We organize and power premier community events, from dynamic cultural festivals and sports to tech meets. Find active events in your area, register securely, manage your travel logistics, and check out instantly.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-4"
          >
            <Link 
              to="/event-registration"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-accent/20 transition-all transform hover:-translate-y-0.5"
            >
              <span>Explore Live Events</span>
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        {/* Right Role Grid Column */}
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
          {EVENT_ROLES.map((role, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 80 }}
              className="bg-white/5 border border-white/10 p-6 rounded-3xl text-left space-y-4 hover:border-accent/40 transition-colors"
            >
              <div className={`p-3 rounded-2xl w-fit ${role.color} border border-white/5`}>
                {role.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-white">{role.title}</h3>
              <p className="text-stone-400 text-xs leading-relaxed">{role.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
