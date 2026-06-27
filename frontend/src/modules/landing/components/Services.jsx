import React from 'react';
import { Car, Bike, Package, Ticket, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const servicesList = [
  {
    icon: <Car size={36} />,
    title: "TAXI SERVICE",
    description: "Comfortable and safe city rides to any destination you want to go with our professional drivers.",
    bg: "bg-primary/5 border-primary/10",
    iconColor: "text-primary",
    hoverBorder: "rgba(61, 35, 20, 0.3)",
    link: "#register"
  },
  {
    icon: <Bike size={36} />,
    title: "BIKE RIDE",
    description: "Beat the traffic and reach your destination faster with our quick and affordable bike taxi service.",
    bg: "bg-accent/5 border-accent/10",
    iconColor: "text-accent",
    hoverBorder: "rgba(232, 93, 4, 0.3)",
    link: "#register"
  },
  {
    icon: <Package size={36} />,
    title: "PARCEL DELIVERY",
    description: "Fast and reliable parcel delivery services to send packages across the city securely.",
    bg: "bg-primary/5 border-primary/10",
    iconColor: "text-primary",
    hoverBorder: "rgba(61, 35, 20, 0.3)",
    link: "#register"
  },
  {
    icon: <Ticket size={36} />,
    title: "EVENT BOOKING",
    description: "Book tickets, register for exclusive seats, or sponsor the community's premier regional events.",
    bg: "bg-accent/5 border-accent/10",
    iconColor: "text-accent",
    hoverBorder: "rgba(232, 93, 4, 0.3)",
    link: "/event-registration"
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 15
    }
  }
};

export default function Services() {
  return (
    <section id="services" className="py-24 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Section */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-accent font-bold uppercase tracking-wider text-sm mb-3">
            Our Offerings
          </p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-primary mb-4">
            Custom-Built Mobility & Event Solutions
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Whether you need a reliable cab, swift bike transit, prompt parcel logistics, or reservations for local events, Hellozy delivers a premium experience.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {servicesList.map((service, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)",
                borderColor: service.hoverBorder
              }}
              onClick={() => {
                window.location.href = service.link;
              }}
              className={`border p-8 rounded-3xl flex flex-col items-start text-left cursor-pointer transition-colors duration-300 ${service.bg}`}
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`p-4 rounded-2xl bg-white shadow-md mb-6 ${service.iconColor}`}
              >
                {service.icon}
              </motion.div>
              <h3 className="font-display font-black text-xl text-primary mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6 flex-grow text-sm">
                {service.description}
              </p>
              <a 
                href={service.link} 
                className={`inline-flex items-center gap-2 font-bold transition-colors group ${service.iconColor}`}
              >
                <span>Book Now</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
