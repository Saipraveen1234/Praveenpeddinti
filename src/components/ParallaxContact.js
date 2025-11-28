import React, { useState, useRef, useEffect } from 'react';
import { Mail, Github, Linkedin, Phone, MapPin, Copy, Check, ArrowUpRight } from 'lucide-react';

const ParallaxContact = () => {
  const [copiedItem, setCopiedItem] = useState(null);
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const contactInfo = {
    email: "yourssaipraveen@gmail.com",
    phone: "+91 83091 08034",
    location: "Hyderabad",
    github: "https://github.com/Saipraveen1234",
    linkedin: "https://www.linkedin.com/in/sai-praveen-mallesh/"
  };

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollPercent = Math.min(
          Math.max((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0),
          1
        );
        setScrollProgress(scrollPercent);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopy = (text, item) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(item);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const ContactItem = ({ icon: Icon, label, value, copyValue }) => (
    <div 
      onClick={() => copyValue && handleCopy(copyValue, label)}
      className="group flex items-center space-x-4 p-6 bg-white/5 backdrop-blur-sm rounded-xl cursor-pointer 
                hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
      style={{
        transform: `translateY(${scrollProgress * 20}px)`,
        opacity: 1 - (scrollProgress * 0.3)
      }}
    >
      <Icon className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
      <div className="flex-1">
        <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors">{label}</p>
        <p className="text-white/90 group-hover:text-white transition-colors">{value}</p>
      </div>
      {copyValue && (
        copiedItem === label ? (
          <Check className="w-6 h-6 text-green-400" />
        ) : (
          <Copy className="w-6 h-6 text-white/30 group-hover:text-white/50" />
        )
      )}
    </div>
  );

  const SocialLink = ({ icon: Icon, label, href }) => (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center space-x-4 p-6 bg-white/5 backdrop-blur-sm rounded-xl
                hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
      style={{
        transform: `translateY(${scrollProgress * 20}px)`,
        opacity: 1 - (scrollProgress * 0.3)
      }}
    >
      <Icon className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
      <div className="flex-1">
        <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors">{label}</p>
        <p className="text-white/90 group-hover:text-white transition-colors">View Profile</p>
      </div>
      <ArrowUpRight className="w-6 h-6 text-white/30 group-hover:text-white/50" />
    </a>
  );

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen bg-black overflow-hidden"
      id="contact"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-80">
        {/* Rotating Circle */}
        <div 
          className="absolute -right-40 -top-40 w-96 h-96 border-2 border-white/20 rounded-full transition-transform duration-700"
          style={{
            transform: `rotate(${scrollProgress * 720}deg) scale(${1 + scrollProgress * 0.5})`,
          }}
        />
        
        {/* Animated Dots */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-white rounded-full animate-pulse delay-150" />
        <div className="absolute top-2/3 left-1/3 w-2 h-2 bg-white rounded-full animate-pulse delay-300" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
          style={{
            transform: `translateY(${scrollProgress * -20}px)`
          }}
        />
        
        {/* Gradient Accent */}
        <div 
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl rounded-full"
          style={{
            transform: `translate(${scrollProgress * 20}px, ${scrollProgress * -20}px)`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-8 py-24">
        {/* Header */}
        <div 
          className="max-w-4xl mx-auto text-center mb-24"
          style={{
            transform: `translateY(${scrollProgress * 60}px)`,
            opacity: 1 - (scrollProgress * 0.5)
          }}
        >
          <h2 className="text-7xl md:text-8xl font-light mb-8 text-white">
            Let's Connect
          </h2>
          <p className="text-xl text-white/70">
            Available for Full Stack Developer roles and collaborations
          </p>
        </div>

        {/* Contact Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Details */}
            <div className="space-y-6">
              <ContactItem 
                icon={Mail} 
                label="Email" 
                value={contactInfo.email}
                copyValue={contactInfo.email}
              />
              <ContactItem 
                icon={Phone} 
                label="Phone" 
                value={contactInfo.phone}
                copyValue={contactInfo.phone}
              />
              <ContactItem 
                icon={MapPin} 
                label="Location" 
                value={contactInfo.location}
              />
            </div>

            {/* Professional Profiles */}
            <div className="space-y-6">
              <SocialLink 
                icon={Github}
                label="GitHub"
                href={contactInfo.github}
              />
              <SocialLink 
                icon={Linkedin}
                label="LinkedIn"
                href={contactInfo.linkedin}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxContact;