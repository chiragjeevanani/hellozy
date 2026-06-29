import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Ticket, Heart, Sparkles, ArrowRight, Calendar, Building2, Tag, MapPin } from 'lucide-react';
import { getEvents } from '../../registration/utils/registrationStore';

const ROLE_TYPE_STYLES = {
  'Wedding Ceremony': 'bg-pink-50 text-pink-700 border-pink-200',
  'Concert Show': 'bg-purple-50 text-purple-700 border-purple-200',
  'Birthday Party': 'bg-amber-50 text-amber-700 border-amber-200',
  'Corporate Expo': 'bg-sky-50 text-sky-700 border-sky-200',
  'Seminars': 'bg-teal-50 text-teal-700 border-teal-200',
};

const DEFAULT_BADGE = 'bg-stone-100 text-stone-600 border-stone-200';

const STATIC_ROLES = [
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
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const allEvents = getEvents();
    // Show max 4 events on landing page
    setEvents(allEvents.slice(0, 4));
  }, []);

  return (
    <section className="py-24 px-4 md:px-8 bg-gradient-to-br from-stone-900 via-stone-850 to-primary text-white overflow-hidden relative">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-12 gap-12 items-start">
        
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

          {/* Static role info below CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-4 grid grid-cols-2 gap-3 hidden lg:grid"
          >
            {STATIC_ROLES.map((role, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-2 hover:border-accent/30 transition-colors">
                <div className={`p-2.5 rounded-xl w-fit ${role.color} border border-white/5`}>{role.icon}</div>
                <h3 className="font-display font-bold text-sm text-white">{role.title}</h3>
                <p className="text-stone-400 text-[11px] leading-relaxed">{role.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Dynamic Events Column */}
        <div className="lg:col-span-7">
          {events.length > 0 ? (
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-between mb-2"
              >
                <h3 className="text-sm font-bold text-stone-300 uppercase tracking-widest flex items-center gap-2">
                  <Calendar size={14} className="text-accent" /> Live Events
                </h3>
                <Link to="/event-registration" className="text-xs text-accent font-bold hover:text-accent-hover transition-colors flex items-center gap-1">
                  View all <ArrowRight size={12} />
                </Link>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-4">
                {events.map((evt, idx) => {
                  const badgeStyle = ROLE_TYPE_STYLES[evt.eventType] || DEFAULT_BADGE;
                  return (
                    <motion.div
                      key={evt.id}
                      initial={{ opacity: 0, scale: 0.92, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08, type: "spring", stiffness: 80 }}
                      className="bg-white/8 border border-white/10 rounded-3xl p-5 text-left space-y-3 hover:border-accent/40 hover:bg-white/12 transition-all group"
                    >
                      {/* Cover photo preview */}
                      {evt.eventImage?.url && (
                        <div className={`w-full overflow-hidden rounded-2xl bg-stone-900/50 border border-white/5 ${
                          evt.imageOrientation === 'portrait' ? 'aspect-[3/4]' : 'aspect-video'
                        }`}>
                          <img src={evt.eventImage.url} alt={evt.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102" />
                        </div>
                      )}
                      
                      <div className="flex items-start justify-between gap-2">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 border rounded-full text-[10px] font-bold ${badgeStyle}`}>
                          <Tag size={9} /> {evt.eventType}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-base text-white leading-tight group-hover:text-accent transition-colors line-clamp-2">
                        {evt.title}
                      </h3>

                      <p className="text-stone-400 text-[11px] leading-relaxed line-clamp-2">{evt.description}</p>

                      {/* Date & Location row */}
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[9px] text-stone-400 font-bold">
                        {evt.eventDate && <span className="flex items-center gap-0.5"><Calendar size={10} className="text-accent" /> {new Date(evt.eventDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</span>}
                        {evt.eventLocation && <span className="flex items-center gap-0.5"><MapPin size={10} className="text-accent" /> {evt.eventLocation}</span>}
                      </div>

                      <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-[10px] text-stone-400 font-semibold">
                          <Building2 size={11} className="text-stone-500" />
                          <span className="truncate max-w-[120px]">{evt.organizerName}</span>
                        </div>
                        <Link
                          to="/event-registration"
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-accent/15 hover:bg-accent text-accent hover:text-white border border-accent/30 rounded-lg text-[10px] font-bold transition-all"
                        >
                          Book Now <ArrowRight size={10} />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ) : (
            // Fallback to static role cards if no events
            <div className="grid sm:grid-cols-2 gap-6">
              {STATIC_ROLES.map((role, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, type: "spring", stiffness: 80 }}
                  className="bg-white/5 border border-white/10 p-6 rounded-3xl text-left space-y-4 hover:border-accent/40 transition-colors"
                >
                  <div className={`p-3 rounded-2xl w-fit ${role.color} border border-white/5`}>{role.icon}</div>
                  <h3 className="font-display font-bold text-lg text-white">{role.title}</h3>
                  <p className="text-stone-400 text-xs leading-relaxed">{role.desc}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
