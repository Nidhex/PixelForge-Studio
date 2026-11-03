import React, { useState } from 'react';
import { ArrowUpRight, Check, Menu, X, MessageCircle, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// Constant contact data and WhatsApp endpoints
const CURRENT_YEAR = 2026;

const CONTACT_DATA = {
  phone1: { display: '+91 82395 54141', raw: '918239554141' },
  phone2: { display: '+91 80105 70715', raw: '918010570715' },
  email1: 'nidsvaishnav10@gmail.com',
  email2: 'prathmeshbole5@gmail.com',
};

// Smooth scroll helper
const scrollToSection = (e, href) => {
  if (e) e.preventDefault();
  const target = document.querySelector(href);
  if (target) {
    const offset = 70;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

/* =========================================================================
   1. NAVBAR COMPONENT
   ========================================================================= */
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    setMobileMenuOpen(false);
    scrollToSection(e, href);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#DCEB78]/95 backdrop-blur-md border-b border-[#171717]/15 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="group flex items-center space-x-2.5 text-left focus:outline-none"
          >
            <span className="w-3 h-3 bg-[#171717] transition-transform duration-300 group-hover:rotate-45" />
            <span className="text-lg sm:text-xl font-bold tracking-tight text-[#171717] uppercase">
              PixelForge Studio
            </span>
          </a>

          {/* Desktop Links with Subtle Animated Underlines */}
          <nav className="hidden md:flex items-center space-x-9">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative text-xs font-bold uppercase tracking-wider text-[#171717] py-1 group transition-colors"
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#171717] transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Let's Talk CTA button */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-[#171717] text-[#DCEB78] text-xs font-bold uppercase tracking-wider border border-[#171717] hover:bg-transparent hover:text-[#171717] transition-all duration-300 active:scale-95"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#171717] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Smooth Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[#DCEB78] border-b border-[#171717]/15 px-6 pt-3 pb-8 overflow-hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-2xl font-bold uppercase tracking-tight text-[#171717] py-2 border-b border-[#171717]/10"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="mt-4 flex items-center justify-center space-x-2 px-5 py-3.5 bg-[#171717] text-[#DCEB78] text-xs font-bold uppercase tracking-wider"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* =========================================================================
   2. HERO COMPONENT
   ========================================================================= */
function Hero({ onStartProject, onViewPlans }) {
  const shouldReduceMotion = useReducedMotion();

  const headlineLines = [
    "We build",
    "websites that",
    "build",
    "businesses."
  ];

  return (
    <section id="home" className="bg-[#DCEB78] text-[#171717] pt-14 pb-24 sm:pt-20 sm:pb-32 border-b border-[#171717]/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Small Top Label */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center space-x-3 mb-8 sm:mb-14"
        >
          <span className="w-2 h-2 bg-[#171717]"></span>
          <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#171717]/80">
            Digital Design & Development Studio
          </p>
        </motion.div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
          
          {/* Headline & Actions */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Animated Headline */}
            <div className="space-y-1">
              {headlineLines.map((line, index) => (
                <div key={index} className="overflow-hidden">
                  <motion.div
                    initial={{ y: shouldReduceMotion ? 0 : '105%', opacity: shouldReduceMotion ? 1 : 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.92] uppercase text-[#171717]"
                  >
                    {line}
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Short Introduction */}
            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl font-medium text-[#171717]/85 max-w-xl leading-relaxed"
            >
              We design and develop beautiful, functional websites that help businesses establish their online presence and grow.
            </motion.p>

            {/* Two Refined Buttons */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button
                onClick={() => {
                  if (onStartProject) onStartProject();
                  scrollToSection(null, '#contact');
                }}
                className="group px-8 py-4 bg-[#171717] text-[#DCEB78] text-xs font-bold uppercase tracking-wider border border-[#171717] hover:bg-[#F2F0E8] hover:text-[#171717] transition-all duration-300 flex items-center justify-center space-x-2 active:scale-98"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={() => {
                  if (onViewPlans) onViewPlans();
                  scrollToSection(null, '#pricing');
                }}
                className="px-8 py-4 bg-transparent text-[#171717] text-xs font-bold uppercase tracking-wider border border-[#171717] hover:bg-[#171717] hover:text-[#DCEB78] transition-all duration-300 text-center active:scale-98"
              >
                View Our Plans
              </button>
            </motion.div>
          </div>

          {/* Minimalist, Unboxed Website Preview Illustration */}
          <div className="lg:col-span-5 pt-4 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
              animate={{
                opacity: 1,
                y: shouldReduceMotion ? 0 : [0, -6, 0]
              }}
              transition={{
                opacity: { duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] },
                y: shouldReduceMotion ? {} : {
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
              className="border border-[#171717]/20 bg-[#F2F0E8] p-6 sm:p-8 shadow-2xl shadow-[#171717]/10"
            >
              {/* Minimal Top Bar */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#171717]/15">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#171717]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#171717]/25" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#171717]/25" />
                </div>
                <div className="text-[10px] font-mono tracking-tight text-[#171717] uppercase px-2 py-0.5 border border-[#171717]/20 bg-[#DCEB78]">
                  pixelforgestudio.com
                </div>
              </div>

              {/* Minimal Editorial Mockup Content */}
              <div className="space-y-6 text-left">
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#171717] pb-3 border-b border-[#171717]/10">
                  <span>INDEX</span>
                  <div className="space-x-4 text-[10px] text-[#171717]/70">
                    <span>WORK</span>
                    <span>STUDIO</span>
                    <span className="text-[#171717] font-bold underline">CONTACT</span>
                  </div>
                </div>

                <div className="bg-[#171717] text-[#F2F0E8] p-6 space-y-3">
                  <span className="text-[9px] font-mono tracking-widest uppercase text-[#DCEB78]">
                    EXEMPLAR 01
                  </span>
                  <div className="text-xl sm:text-2xl font-bold uppercase tracking-tight leading-tight">
                    CONTEMPORARY LIVING & SPACES
                  </div>
                  <p className="text-[11px] text-[#F2F0E8]/70 leading-relaxed font-normal">
                    Editorial layout • High-conversion speed • Bespoke frontend architecture.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div className="border-t border-[#171717]/15 pt-3">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#171717]/60">Mobile First</div>
                    <div className="text-xs font-bold uppercase text-[#171717] mt-1">Adaptive Fluidity</div>
                  </div>
                  <div className="border-t border-[#171717]/15 pt-3">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#171717]/60">Speed Score</div>
                    <div className="text-xs font-bold uppercase text-[#171717] mt-1">99 Performance</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#171717]/10 text-[10px] font-mono text-[#171717]/70">
                  <span>© STUDIO EDITION</span>
                  <span>EST. 2026</span>
                </div>
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}

/* =========================================================================
   3. SERVICES COMPONENT
   ========================================================================= */
function Services() {
  const shouldReduceMotion = useReducedMotion();

  const services = [
    {
      number: '01',
      title: 'Website Development',
      description: 'Custom, responsive websites for businesses.',
      detail: 'Tailored frontend code crafted with modern standards. Mobile-first fluidity, clean semantic structure, and zero unnecessary bloat.'
    },
    {
      number: '02',
      title: 'UI/UX Design',
      description: 'Clean and intuitive digital experiences.',
      detail: 'Editorial typography, balanced spatial grids, and thoughtful user flows designed to guide visitors effortlessly toward action.'
    },
    {
      number: '03',
      title: 'SEO Optimization',
      description: 'Help your website become easier to discover on Google.',
      detail: 'Proper metadata architecture, Core Web Vitals performance tuning, and clean semantic markup so search engines index your business accurately.'
    },
    {
      number: '04',
      title: 'Website Maintenance',
      description: 'Keep your website updated, secure and running smoothly.',
      detail: 'Ongoing technical care, software patches, content updates, and reliable support so you can focus entirely on running your business.'
    },
  ];

  return (
    <section id="services" className="bg-[#F2F0E8] text-[#171717] py-28 sm:py-36 border-b border-[#171717]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between pb-12 mb-16 border-b border-[#171717]/15"
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#171717]/60 block mb-3">
              Capabilities
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter uppercase text-[#171717]">
              What we do.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-base sm:text-lg font-medium text-[#171717]/70 max-w-md">
            Four focused disciplines. No buzzwords, no unnecessary layers.
          </p>
        </motion.div>

        {/* Open Editorial Layout — No heavy boxes */}
        <div className="divide-y divide-[#171717]/15">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="py-12 sm:py-16 group transition-colors duration-300"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
                
                {/* Oversized Numeral */}
                <div className="md:col-span-2">
                  <span className="font-mono text-3xl sm:text-5xl font-light text-[#171717]/35 group-hover:text-[#171717] transition-colors duration-300">
                    {service.number}
                  </span>
                </div>

                {/* Service Title */}
                <div className="md:col-span-5 flex items-baseline justify-between pr-4">
                  <h3 className="text-2xl sm:text-4xl font-bold tracking-tight uppercase text-[#171717] transition-transform duration-300 group-hover:translate-x-1">
                    {service.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-[#171717]/30 group-hover:text-[#171717] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0 ml-3 hidden sm:inline-block" />
                </div>

                {/* Description & Detail */}
                <div className="md:col-span-5 space-y-2">
                  <p className="text-base sm:text-lg font-bold text-[#171717]/90 leading-snug">
                    {service.description}
                  </p>
                  <p className="text-sm text-[#171717]/70 leading-relaxed font-normal pt-1">
                    {service.detail}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* =========================================================================
   4. PRICING COMPONENT
   ========================================================================= */
function Pricing({ selectedPackage, onSelectPackage }) {
  const shouldReduceMotion = useReducedMotion();

  const plans = [
    {
      id: 'STARTER',
      name: 'STARTER',
      price: '₹5,000',
      subtitle: 'For businesses needing an essential, high-quality digital foundation.',
      recommended: false,
      features: [
        'Up to 3 pages',
        'Responsive design',
        'Home, About and Contact',
        'WhatsApp integration',
        'Contact form functionality within the delivered client website',
        'Basic SEO',
        '15 days support',
      ],
    },
    {
      id: 'PROFESSIONAL',
      name: 'PROFESSIONAL',
      price: '₹9,000',
      subtitle: 'The complete standard for growing businesses and established brands.',
      recommended: true,
      features: [
        'Up to 6 pages',
        'Everything in Starter',
        'Premium UI/UX',
        'Services and portfolio sections',
        'Google Analytics integration',
        'Enhanced SEO',
        '30 days support',
        '1 month maintenance',
      ],
    },
    {
      id: 'PREMIUM',
      name: 'PREMIUM',
      price: '₹13,000',
      subtitle: 'Advanced design and expanded scope for market-leading experiences.',
      recommended: false,
      features: [
        'Up to 10 pages',
        'Everything in Professional',
        'Custom UI/UX',
        'Advanced interactions',
        'Blog section',
        'Advanced enquiry forms',
        'SEO optimization',
        '60 days support',
        '2 months maintenance',
      ],
    },
  ];

  const handleChoosePlan = (planId) => {
    if (onSelectPackage) {
      onSelectPackage(planId);
    }
    scrollToSection(null, '#contact');
  };

  return (
    <section id="pricing" className="bg-[#171717] text-[#F2F0E8] py-28 sm:py-36 border-b border-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between pb-12 mb-16 border-b border-[#333333]"
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#DCEB78] block mb-3">
              Pricing Plans
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter uppercase text-[#F2F0E8]">
              Transparent investment.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-base sm:text-lg text-[#F2F0E8]/70 max-w-md">
            Clear deliverables with zero hidden charges. Choose the tier that matches your scope.
          </p>
        </motion.div>

        {/* 3 Pricing Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {plans.map((plan, index) => {
            const isRec = plan.recommended;
            const isSelected = selectedPackage === plan.id;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={shouldReduceMotion ? {} : { y: -6 }}
                className={`relative p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 ${
                  isRec
                    ? 'bg-[#DCEB78] text-[#171717] border border-[#DCEB78] shadow-2xl lg:-translate-y-2'
                    : 'bg-[#1F1F1F] text-[#F2F0E8] border border-white/10 hover:border-white/25 shadow-lg'
                } ${isSelected ? 'ring-2 ring-[#DCEB78] ring-offset-2 ring-offset-[#171717]' : ''}`}
              >
                <div>
                  {/* Top Label */}
                  <div className="flex items-center justify-between pb-6 mb-8 border-b border-current/15">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">
                      {plan.name}
                    </span>
                    {isRec && (
                      <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#171717] text-[#DCEB78]">
                        Recommended Package
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="text-4xl sm:text-5xl font-bold tracking-tighter">
                      {plan.price}
                    </div>
                    <p className={`text-xs mt-3 leading-relaxed font-medium ${isRec ? 'text-[#171717]/80' : 'text-[#F2F0E8]/70'}`}>
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="py-6 border-t border-current/15 space-y-3.5 mb-8">
                    <div className="text-[11px] font-mono uppercase tracking-wider font-bold mb-3 opacity-70">
                      Included:
                    </div>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-sm font-medium">
                        <Check className="w-4 h-4 shrink-0 mt-0.5 opacity-80" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Choose Plan CTA */}
                <div className="pt-6 border-t border-current/15">
                  <button
                    onClick={() => handleChoosePlan(plan.id)}
                    className={`w-full py-4 text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 border active:scale-98 ${
                      isRec
                        ? 'bg-[#171717] text-[#DCEB78] border-[#171717] hover:bg-transparent hover:text-[#171717]'
                        : 'bg-transparent text-[#F2F0E8] border-white/20 hover:bg-[#DCEB78] hover:text-[#171717] hover:border-[#DCEB78]'
                    }`}
                  >
                    <span>Choose Plan</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Note on Domain & Hosting */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-[#333333] pt-8 text-center max-w-2xl mx-auto text-xs text-[#F2F0E8]/70 leading-relaxed font-mono"
        >
          <span className="text-[#DCEB78] font-bold">NOTE: </span>
          Domain, hosting and third-party subscriptions are charged separately where applicable. We handle setup and deployment at no additional cost.
        </motion.div>

      </div>
    </section>
  );
}

/* =========================================================================
   5. ABOUT COMPONENT
   ========================================================================= */
function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="bg-[#F2F0E8] text-[#171717] py-32 sm:py-44 border-b border-[#171717]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center space-x-3 mb-14"
        >
          <span className="w-2 h-2 bg-[#171717]"></span>
          <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#171717]/70">
            About the Studio
          </p>
        </motion.div>

        {/* Big Editorial Heading */}
        <div className="max-w-5xl space-y-12">
          <motion.h2
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tighter uppercase leading-[0.96] text-[#171717]"
          >
            Small studio. <br />
            Serious attention <br />
            to detail.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pt-10 border-t border-[#171717]/15 grid grid-cols-1 md:grid-cols-12 gap-10 items-start"
          >
            <div className="md:col-span-8">
              <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-[#171717]/85 leading-relaxed">
                We help businesses turn their ideas into effective digital experiences through thoughtful design and reliable development.
              </p>
            </div>

            <div className="md:col-span-4 space-y-4 text-xs font-mono text-[#171717]/70 uppercase tracking-wider">
              <div className="pb-3 border-b border-[#171717]/15 flex justify-between">
                <span>ESTABLISHED</span>
                <span className="text-[#171717] font-bold">2026</span>
              </div>
              <div className="pb-3 border-b border-[#171717]/15 flex justify-between">
                <span>PRACTICE</span>
                <span className="text-[#171717] font-bold">INDEPENDENT</span>
              </div>
              <div className="flex justify-between">
                <span>APPROACH</span>
                <span className="text-[#171717] font-bold">HUMAN-CENTERED</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

/* =========================================================================
   6. CONTACT COMPONENT (REPLACED CONTACT FORM WITH PREMIUM CONTACT SECTION)
   ========================================================================= */
function Contact({ selectedPackage, onSelectPackage }) {
  const shouldReduceMotion = useReducedMotion();

  const packages = [
    { id: 'STARTER', label: 'STARTER (₹5,000)' },
    { id: 'PROFESSIONAL', label: 'PROFESSIONAL (₹9,000)' },
    { id: 'PREMIUM', label: 'PREMIUM (₹13,000)' },
  ];

  // Helper to generate WhatsApp link preserving the selected package and updated price
  const getWhatsAppLink = (numberRaw) => {
    const priceMap = { STARTER: '₹5,000', PROFESSIONAL: '₹9,000', PREMIUM: '₹13,000' };
    const priceText = priceMap[selectedPackage] ? ` - ${priceMap[selectedPackage]}` : '';
    const pkgText = selectedPackage ? ` (Interested in ${selectedPackage} Plan${priceText})` : '';
    const message = `Hello PixelForge Studio! I am interested in your website development services${pkgText}. I would like to discuss a project.`;
    return `https://wa.me/${numberRaw}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="contact" className="bg-[#DCEB78] text-[#171717] py-28 sm:py-36 border-b border-[#171717]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Subtext */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pb-12 mb-16 border-b border-[#171717]/15"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#171717]/70 block mb-3">
            Inquiries & Collaborations
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter uppercase text-[#171717] leading-[0.95]">
            HAVE A PROJECT IN MIND? <br />
            LET'S BUILD SOMETHING GREAT.
          </h2>
          <p className="mt-6 text-lg sm:text-xl font-medium text-[#171717]/85 max-w-2xl leading-relaxed">
            Have an idea, need a website or want to discuss a project? We'd love to hear from you.
          </p>
        </motion.div>

        {/* Selected Plan Bar (Carry package name into WhatsApp enquiry) */}
        <div className="mb-14 p-6 bg-[#F2F0E8] border border-[#171717]/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#171717]/70 block">
              Current Project Intent
            </span>
            <div className="text-base sm:text-lg font-bold text-[#171717] mt-0.5">
              Selected Package: <span className="underline decoration-[#171717]">{selectedPackage || 'PROFESSIONAL'}</span>
              <span className="ml-2 text-sm font-mono text-[#171717]/70">
                ({selectedPackage === 'STARTER' ? '₹5,000' : selectedPackage === 'PREMIUM' ? '₹13,000' : '₹9,000'})
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-[#171717]/60 mr-1">Switch:</span>
            {packages.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => onSelectPackage && onSelectPackage(pkg.id)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedPackage === pkg.id
                    ? 'bg-[#171717] text-[#DCEB78]'
                    : 'bg-transparent text-[#171717] hover:bg-[#171717]/10 border border-[#171717]/30'
                }`}
              >
                {pkg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Direct Channels Grid: 2 WhatsApp Numbers & 2 Email Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Card 1: WhatsApp / Phone Channels */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#F2F0E8] border border-[#171717]/20 p-8 sm:p-10 flex flex-col justify-between space-y-8 shadow-xl shadow-[#171717]/5"
          >
            <div>
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#171717]/15">
                <div className="flex items-center space-x-2.5">
                  <MessageCircle className="w-5 h-5 text-[#171717]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#171717]">
                    WhatsApp & Phone
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full font-bold">
                  Instant Response
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#171717] mb-3">
                Chat on WhatsApp
              </h3>
              <p className="text-sm text-[#171717]/80 leading-relaxed font-normal mb-6">
                Connect directly with our development leads for immediate discussion, scope clarification, and direct quotes.
              </p>

              {/* Both WhatsApp Contact Numbers & Actions */}
              <div className="space-y-4">
                
                {/* Number 1 */}
                <div className="p-4 bg-white/70 border border-[#171717]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#171717]/60 flex items-center gap-1">
                      <Phone className="w-3 h-3" /> Lead Developer
                    </span>
                    <a
                      href={`tel:${CONTACT_DATA.phone1.display.replace(/\s+/g, '')}`}
                      className="text-base font-bold text-[#171717] hover:underline"
                    >
                      {CONTACT_DATA.phone1.display}
                    </a>
                  </div>
                  <a
                    href={getWhatsAppLink(CONTACT_DATA.phone1.raw)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#171717] text-[#DCEB78] text-xs font-bold uppercase tracking-wider hover:bg-transparent hover:text-[#171717] border border-[#171717] transition-all"
                  >
                    <span>WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Number 2 */}
                <div className="p-4 bg-white/70 border border-[#171717]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#171717]/60 block">Design & Engineering</span>
                    <a
                      href={`tel:${CONTACT_DATA.phone2.display.replace(/\s+/g, '')}`}
                      className="text-base font-bold text-[#171717] hover:underline"
                    >
                      {CONTACT_DATA.phone2.display}
                    </a>
                  </div>
                  <a
                    href={getWhatsAppLink(CONTACT_DATA.phone2.raw)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#171717] text-[#DCEB78] text-xs font-bold uppercase tracking-wider hover:bg-transparent hover:text-[#171717] border border-[#171717] transition-all"
                  >
                    <span>WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            </div>

            <div className="text-xs font-mono text-[#171717]/70 pt-4 border-t border-[#171717]/15 flex items-center justify-between">
              <span>Direct Calling Available</span>
              <span className="font-bold">Mon – Sat / 9:30 – 19:30 IST</span>
            </div>
          </motion.div>

          {/* Card 2: Direct Email Channels */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-[#F2F0E8] border border-[#171717]/20 p-8 sm:p-10 flex flex-col justify-between space-y-8 shadow-xl shadow-[#171717]/5"
          >
            <div>
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#171717]/15">
                <div className="flex items-center space-x-2.5">
                  <Mail className="w-5 h-5 text-[#171717]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#171717]">
                    Email Inquiries
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#171717]/70">
                  Project Briefs
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#171717] mb-3">
                Send us an Email
              </h3>
              <p className="text-sm text-[#171717]/80 leading-relaxed font-normal mb-6">
                Prefer sending a formal brief, RFP, or detailed specifications? Drop an email to either of our founders.
              </p>

              {/* Both Email Addresses */}
              <div className="space-y-4">
                
                {/* Email 1 */}
                <div className="p-4 bg-white/70 border border-[#171717]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase text-[#171717]/60 block">Nids Vaishnav</span>
                    <a
                      href={`mailto:${CONTACT_DATA.email1}?subject=${encodeURIComponent(`Project Inquiry: PixelForge Studio (${selectedPackage} Plan)`)}`}
                      className="text-sm sm:text-base font-bold text-[#171717] hover:underline truncate block"
                    >
                      {CONTACT_DATA.email1}
                    </a>
                  </div>
                  <a
                    href={`mailto:${CONTACT_DATA.email1}?subject=${encodeURIComponent(`Project Inquiry: PixelForge Studio (${selectedPackage} Plan)`)}`}
                    className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-transparent text-[#171717] hover:bg-[#171717] hover:text-[#DCEB78] text-xs font-bold uppercase tracking-wider border border-[#171717] transition-all shrink-0"
                  >
                    <span>Email</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Email 2 */}
                <div className="p-4 bg-white/70 border border-[#171717]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase text-[#171717]/60 block">Prathmesh Bole</span>
                    <a
                      href={`mailto:${CONTACT_DATA.email2}?subject=${encodeURIComponent(`Project Inquiry: PixelForge Studio (${selectedPackage} Plan)`)}`}
                      className="text-sm sm:text-base font-bold text-[#171717] hover:underline truncate block"
                    >
                      {CONTACT_DATA.email2}
                    </a>
                  </div>
                  <a
                    href={`mailto:${CONTACT_DATA.email2}?subject=${encodeURIComponent(`Project Inquiry: PixelForge Studio (${selectedPackage} Plan)`)}`}
                    className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-transparent text-[#171717] hover:bg-[#171717] hover:text-[#DCEB78] text-xs font-bold uppercase tracking-wider border border-[#171717] transition-all shrink-0"
                  >
                    <span>Email</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            </div>

            <div className="text-xs font-mono text-[#171717]/70 pt-4 border-t border-[#171717]/15 flex items-center justify-between">
              <span>Average Response Time</span>
              <span className="font-bold">Within 2 Hours</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

/* =========================================================================
   7. FOOTER COMPONENT (3 MAIN COLUMNS)
   ========================================================================= */
function Footer() {
  const handleLinkClick = (e, href) => {
    scrollToSection(e, href);
  };

  return (
    <footer className="bg-[#171717] text-[#F2F0E8] py-20 sm:py-28 border-t border-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top: Large Brand Wordmark */}
        <div className="pb-14 border-b border-[#333333]">
          <h2 className="text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tighter uppercase text-[#F2F0E8] leading-none">
            PixelForge Studio
          </h2>
        </div>

        {/* Middle: 3 Main Columns */}
        <div className="py-14 border-b border-[#333333] grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* COLUMN 1 — BRAND */}
          <div className="md:col-span-5 space-y-4">
            <div className="text-sm font-mono uppercase tracking-widest text-[#DCEB78]">
              About the Brand
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-tight text-[#F2F0E8]">
              PixelForge Studio
            </h3>
            <p className="text-sm sm:text-base text-[#F2F0E8]/70 max-w-sm leading-relaxed font-normal">
              We design and develop modern websites that help businesses build their digital presence.
            </p>
          </div>

          {/* COLUMN 2 — QUICK LINKS */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#DCEB78]">
              Quick Links
            </div>
            <ul className="space-y-2.5 text-xs uppercase font-bold tracking-wider">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleLinkClick(e, '#home')}
                  className="hover:text-[#DCEB78] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleLinkClick(e, '#services')}
                  className="hover:text-[#DCEB78] transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  onClick={(e) => handleLinkClick(e, '#pricing')}
                  className="hover:text-[#DCEB78] transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleLinkClick(e, '#about')}
                  className="hover:text-[#DCEB78] transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                  className="hover:text-[#DCEB78] transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3 — GET IN TOUCH */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#DCEB78]">
              Get In Touch
            </div>
            
            <div className="space-y-4 text-xs font-mono text-[#F2F0E8]/80">
              {/* Phones with tel: */}
              <div>
                <span className="text-[#F2F0E8]/50 block text-[10px] uppercase">Phone:</span>
                <div className="flex flex-col space-y-1 mt-0.5 font-bold">
                  <a href={`tel:${CONTACT_DATA.phone1.display.replace(/\s+/g, '')}`} className="hover:text-[#DCEB78] transition-colors">
                    {CONTACT_DATA.phone1.display}
                  </a>
                  <a href={`tel:${CONTACT_DATA.phone2.display.replace(/\s+/g, '')}`} className="hover:text-[#DCEB78] transition-colors">
                    {CONTACT_DATA.phone2.display}
                  </a>
                </div>
              </div>

              {/* WhatsApp direct links */}
              <div>
                <span className="text-[#F2F0E8]/50 block text-[10px] uppercase">WhatsApp Chat:</span>
                <div className="flex flex-col space-y-1 mt-0.5">
                  <a
                    href={`https://wa.me/${CONTACT_DATA.phone1.raw}?text=${encodeURIComponent('Hello PixelForge Studio! I would like to discuss a project.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#DCEB78] transition-colors inline-flex items-center space-x-1"
                  >
                    <span>Chat: {CONTACT_DATA.phone1.display}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <a
                    href={`https://wa.me/${CONTACT_DATA.phone2.raw}?text=${encodeURIComponent('Hello PixelForge Studio! I would like to discuss a project.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#DCEB78] transition-colors inline-flex items-center space-x-1"
                  >
                    <span>Chat: {CONTACT_DATA.phone2.display}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Emails with mailto: */}
              <div>
                <span className="text-[#F2F0E8]/50 block text-[10px] uppercase">Email:</span>
                <div className="flex flex-col space-y-1 mt-0.5">
                  <a
                    href={`mailto:${CONTACT_DATA.email1}`}
                    className="hover:text-[#DCEB78] transition-colors underline decoration-white/20"
                  >
                    {CONTACT_DATA.email1}
                  </a>
                  <a
                    href={`mailto:${CONTACT_DATA.email2}`}
                    className="hover:text-[#DCEB78] transition-colors underline decoration-white/20"
                  >
                    {CONTACT_DATA.email2}
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM FOOTER */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#F2F0E8]/60 gap-4">
          <div>
            © {CURRENT_YEAR} PixelForge Studio. All rights reserved.
          </div>
          <div>
            Designed with care. Built for business.
          </div>
        </div>

        {/* Very small attribution at the very end */}
        <div className="mt-8 pt-5 border-t border-[#262626] text-center text-[10px] font-mono text-[#F2F0E8]/40">
          Website designed by{' '}
          <a
            href="https://github.com/Nidhex"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F2F0E8]/75 hover:text-[#DCEB78] underline underline-offset-2 transition-colors font-semibold inline-flex items-center gap-0.5"
          >
            <span>Nidex</span>
            <ArrowUpRight className="w-2.5 h-2.5" />
          </a>
        </div>

      </div>
    </footer>
  );
}

/* =========================================================================
   MAIN APP COORDINATOR
   ========================================================================= */
export default function App() {
  const [selectedPackage, setSelectedPackage] = useState('PROFESSIONAL');

  const handleSelectPackage = (pkgName) => {
    setSelectedPackage(pkgName);
  };

  return (
    <div className="min-h-screen bg-[#F2F0E8] text-[#171717] font-sans selection:bg-[#DCEB78] selection:text-[#171717] flex flex-col">
      {/* 1. Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* 2. Hero (Home) */}
        <Hero
          onStartProject={() => setSelectedPackage('PROFESSIONAL')}
          onViewPlans={() => {}}
        />

        {/* 3. Services */}
        <Services />

        {/* 4. Pricing (Most Important Section) */}
        <Pricing
          selectedPackage={selectedPackage}
          onSelectPackage={handleSelectPackage}
        />

        {/* 5. About */}
        <About />

        {/* 6. Contact (No form fields, premium direct channels) */}
        <Contact
          selectedPackage={selectedPackage}
          onSelectPackage={handleSelectPackage}
        />
      </main>

      {/* 7. Footer (3 main columns) */}
      <Footer />
    </div>
  );
}
