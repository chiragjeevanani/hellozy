import React from 'react';
import { Download } from 'lucide-react';

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3z"/></svg>
);

export default function Community() {
  const socials = [
    {
      name: "Facebook",
      icon: <FacebookIcon />,
      url: "https://www.facebook.com/people/Rydon24/61590718764212",
      color: "hover:bg-[#1877f2] hover:text-white"
    },
    {
      name: "Instagram",
      icon: <InstagramIcon />,
      url: "https://www.instagram.com/rydon24official?igsh=MWQ3cWoxazJ1ZGV1OQ%3D%3D",
      color: "hover:bg-[#e4405f] hover:text-white"
    },
    {
      name: "LinkedIn",
      icon: <LinkedinIcon />,
      url: "https://www.linkedin.com/company/124914072/admin/dashboard/",
      color: "hover:bg-[#0a66c2] hover:text-white"
    },
    {
      name: "YouTube",
      icon: <YoutubeIcon />,
      url: "https://youtube.com/@rydon24official?si=RfVhOYUay--g9BhB",
      color: "hover:bg-[#ff0000] hover:text-white"
    }
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-gray-50/50">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        {/* Info Left */}
        <div className="lg:col-span-6 text-left">
          <p className="text-accent font-bold uppercase tracking-wider text-sm mb-3">
            Check Us Out
          </p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-primary mb-6">
            Join the Hellozy Community
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Follow us on social media to get the latest updates, exclusive promo codes, and behind-the-scenes content. Be part of the fastest-growing transportation network in the region.
          </p>

          {/* Social Icons Grid */}
          <div className="flex gap-4 mb-8">
            {socials.map((social, index) => (
              <a 
                key={index} 
                href={social.url} 
                target="_blank" 
                rel="noreferrer"
                className={`p-3.5 rounded-full bg-white border border-gray-100 text-gray-600 shadow-sm transition-all duration-300 ${social.color}`}
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Apps Right */}
        <div className="lg:col-span-6 bg-white border border-gray-100 p-8 rounded-3xl shadow-xl flex flex-col gap-6 text-left">
          <h3 className="font-display font-black text-2xl text-primary mb-2">
            Download Our Apps
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Get the full Hellozy experience right on your smartphone. Track driver locations in real-time, schedule rides, and pay securely.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* User App */}
            <a 
              href="https://play.google.com/store/apps/details?id=com.rydon24.user"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 bg-primary hover:bg-primary-light text-white p-4 rounded-2xl shadow-md transition-colors"
            >
              <div className="bg-white/10 p-2.5 rounded-xl">
                <Download size={22} />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/75 font-semibold">GET IT ON</p>
                <p className="text-sm font-bold">Hellozy User App</p>
              </div>
            </a>

            {/* Driver App */}
            <a 
              href="https://play.google.com/store/apps/details?id=com.rydon24.driver"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 bg-accent hover:bg-accent-hover text-white p-4 rounded-2xl shadow-md transition-colors"
            >
              <div className="bg-white/10 p-2.5 rounded-xl">
                <Download size={22} />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/75 font-semibold">GET IT ON</p>
                <p className="text-sm font-bold">Hellozy Driver App</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
