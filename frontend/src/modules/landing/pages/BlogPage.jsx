import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BLOG_POSTS = [
  {
    id: 1,
    title: "Revolutionizing Local Cab Onboarding in Tier-2 Cities",
    excerpt: "How Hellozy's strict manual verification is establishing clean, safe, and dependable taxi operations in emerging markets.",
    date: "June 24, 2026",
    author: "Ramesh Goel",
    category: "Operations",
    image: "https://images.unsplash.com/photo-1549880181-56a44cf8a4a1?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    title: "Why Fleet Owners are Switching to Zero-Fee Listings",
    excerpt: "With launch promotions offering free registration, vehicle owners are maximizing margins and listing whole fleets under virtual routing.",
    date: "June 20, 2026",
    author: "Aditi Sharma",
    category: "Partners",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    title: "Securing Passenger Data: The Power of Virtual Masked Dialing",
    excerpt: "Privacy is a top priority. Learn how Hellozy hides actual mobile contacts behind secure routing systems to protect customer identities.",
    date: "June 15, 2026",
    author: "Karan Verma",
    category: "Security",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600"
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-stone-50">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full text-left">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold tracking-wider uppercase text-sm font-display">
            Hellozy Blog
          </span>
          <h1 className="mt-3 text-3xl md:text-4xl font-black tracking-tight text-primary font-display">
            News, Insights & Transit Tips
          </h1>
          <p className="mt-4 text-stone-600 text-sm md:text-base max-w-2xl mx-auto">
            Stay up to date with the latest stories from fleet partners, security engineering updates, and mobility developments across the network.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {BLOG_POSTS.map((post) => (
            <motion.article 
              key={post.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div>
                {/* Image */}
                <div className="h-48 overflow-hidden bg-stone-100 relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 text-left">
                  <div className="flex items-center gap-4 text-[10px] text-stone-400 font-bold uppercase mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                    <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {post.author}</span>
                  </div>
                  
                  <h2 className="text-lg font-bold text-primary font-display mb-3 leading-tight group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-stone-600 text-xs md:text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0 text-left">
                <button className="inline-flex items-center gap-1.5 text-xs font-bold text-accent group-hover:text-accent-hover transition-colors">
                  Read Full Post <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
