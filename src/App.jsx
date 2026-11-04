import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDown, Check, Menu, X, MessageCircle, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// Shared Studio Motion Curve (Decelerated natural cubic-bezier)
const STUDIO_EASING = [0.22, 1, 0.36, 1];

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const shouldReduceMotion = useReducedMotion();

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'services', 'pricing', 'about', 'contact'];
      const scrollPosition = window.scrollY + 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    setMobileMenuOpen(false);
    scrollToSection(e, href);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#DCEB78]/95 backdrop-blur-md shadow-sm border-b border-[#171717]/20 py-3.5 sm:py-4'
          : 'bg-[#DCEB78] border-b border-[#171717]/15 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo with micro-rotate interaction */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="group flex items-center space-x-2.5 text-left focus:outline-none"
          >
            <motion.span
              whileHover={shouldReduceMotion ? {} : { rotate: 45 }}
              transition={{ duration: 0.25, ease: STUDIO_EASING }}
              className="w-3 h-3 bg-[#171717] block"
            />
            <span className="text-lg sm:text-xl font-bold tracking-tight text-[#171717] uppercase">
              PixelForge Studio
            </span>
          </a>

          {/* Desktop Links with Active Indicator & Smooth Underlines */}
          <nav className="hidden md:flex items-center space-x-9">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative text-xs font-bold uppercase tracking-wider py-1 group transition-colors duration-200 ${
                    isActive ? 'text-[#171717]' : 'text-[#171717]/70 hover:text-[#171717]'
                  }`}
                >
                  <span>{link.name}</span>
                  {/* Underline Indicator */}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#171717] transition-all duration-300 ease-out ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Let's Talk CTA button with refined hover scale */}
          <div className="hidden md:flex items-center">
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              transition={{ duration: 0.2, ease: STUDIO_EASING }}
              className="group inline-flex items-center space-x-1.5 px-5 py-2.5 bg-[#171717] text-[#DCEB78] text-xs font-bold uppercase tracking-wider border border-[#171717] hover:bg-transparent hover:text-[#171717] transition-colors duration-300"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <motion.button
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#171717] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>

        </div>
      </div>

      {/* Smooth Mobile Menu with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: STUDIO_EASING }}
            className="md:hidden bg-[#DCEB78] border-b border-[#171717]/15 px-6 pt-3 pb-8 overflow-hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-2xl font-bold uppercase tracking-tight text-[#171717] py-2 border-b border-[#171717]/10 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#171717]/40" />
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
   2. HERO COMPONENT (AWARD-WINNING EDITORIAL & INTERACTIVE DECK)
   ========================================================================= */
function Hero({ onStartProject, onViewPlans }) {
  const shouldReduceMotion = useReducedMotion();
  const [activeCard, setActiveCard] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Mouse tracking parallax for desktop viewports
  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // 3 Distinct, realistic website preview concepts
  const previews = [
    {
      id: 'restaurant',
      tabLabel: '01 Restaurant',
      url: 'lauberge-bistro.fr',
      badge: 'ARTISANAL TABLE',
      genre: 'Hospitality & Dining',
      bgClass: 'bg-[#F2F0E8] text-[#171717]',
      tagline: 'PROVENCE FLAME & HEARTH',
      title: 'L’AUBERGE DU TEMPS',
      description: 'Wood-fired seasonal tasting menu, natural wines & intimate Mediterranean dining.',
      accentBadge: 'Michelin Guide 2026 • 4.9 ★',
      metaLeftLabel: 'TASTING MENU',
      metaLeftVal: '5-Course Winter €85',
      metaRightLabel: 'RESERVATIONS',
      metaRightVal: 'Tables Open Today',
      ctaText: 'Reserve Experience',
      rotation: -3,
      parallaxMultiplier: { x: 12, y: 10 },
    },
    {
      id: 'business',
      tabLabel: '02 Business',
      url: 'apex-capital.io',
      badge: 'STRATEGIC VENTURES',
      genre: 'Venture & Corporate Advisory',
      bgClass: 'bg-[#171717] text-[#F2F0E8]',
      tagline: 'INSTITUTIONAL CAPITAL ARCHITECTURE',
      title: 'APEX GLOBAL STRATEGY',
      description: 'Scaling deep-tech founders and sovereign enterprises through algorithmic finance.',
      accentBadge: 'Tier-1 Institutional Partner',
      metaLeftLabel: 'CAPITAL DEPLOYED',
      metaLeftVal: '$420M+ Across 38 Firms',
      metaRightLabel: 'EXECUTION SPEED',
      metaRightVal: '99.8% Core Uptime',
      ctaText: 'Access Data Room',
      accentColor: 'text-[#DCEB78]',
      rotation: 3,
      parallaxMultiplier: { x: -16, y: -12 },
    },
    {
      id: 'portfolio',
      tabLabel: '03 Portfolio',
      url: 'studiomono.arch',
      badge: 'MONOGRAPH & SPATIAL',
      genre: 'Architecture & Editorial Lab',
      bgClass: 'bg-[#E5E2D8] text-[#171717]',
      tagline: 'KYOTO BIENNALE PAVILION VI',
      title: 'STUDIO MONO / SPACES',
      description: 'Monolithic concrete forms, acoustic stillness and raw light manipulation.',
      accentBadge: 'Gold Lion Nominee • 2026',
      metaLeftLabel: 'EXHIBITION',
      metaLeftVal: '34.6937° N, 135.5023° E',
      metaRightLabel: 'MONOGRAPH',
      metaRightVal: 'Hardcover Vol. 04',
      ctaText: 'Explore Monograph',
      rotation: -1,
      parallaxMultiplier: { x: 18, y: -8 },
    },
  ];

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-[#DCEB78] text-[#171717] pt-8 sm:pt-12 pb-0 border-b border-[#171717] overflow-hidden min-h-[92vh] flex flex-col justify-between"
    >
      {/* Background Architectural Grid Lines (Subtle Editorial Texture) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex-grow flex flex-col justify-between">
        
        {/* =========================================================
            TOP ROW: Studio Identity & Live Availability Indicator
            ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: STUDIO_EASING }}
          className="flex flex-wrap items-center justify-between gap-4 pt-2 pb-8 sm:pb-12 border-b border-[#171717]/15"
        >
          {/* Availability Indicator */}
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 bg-[#171717] text-[#DCEB78] rounded-full text-[11px] font-mono uppercase tracking-wider shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DCEB78] opacity-80" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DCEB78]" />
            </span>
            <span className="font-semibold">Available for new projects</span>
          </div>

          {/* Editorial Studio Coordinates */}
          <div className="flex items-center space-x-3 text-[11px] font-mono tracking-widest uppercase text-[#171717]/80">
            <span className="font-bold">Digital Design & Development</span>
            <span className="text-[#171717]/30">/</span>
            <span className="hidden sm:inline">Bespoke Production</span>
            <span className="hidden md:inline text-[#171717]/30">/</span>
            <span className="hidden md:inline font-semibold">2026 Studio Edition</span>
          </div>
        </motion.div>

        {/* =========================================================
            MAIN POSTER HEADLINE: Commands 65-75% of visual attention
            ========================================================= */}
        <div className="pt-6 sm:pt-10 pb-6 sm:pb-8">
          
          {/* Line 1: WE DON'T JUST */}
          <div className="overflow-hidden py-0.5">
            <motion.div
              initial={{ y: shouldReduceMotion ? 0 : '105%', opacity: shouldReduceMotion ? 1 : 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.1, ease: STUDIO_EASING }}
              className="text-[clamp(2.75rem,8.2vw,8.5rem)] font-bold tracking-[-0.04em] leading-[0.88] uppercase text-[#171717] select-none"
            >
              WE DON'T JUST
            </motion.div>
          </div>

          {/* Line 2: BUILD WEBSITES. */}
          <div className="overflow-hidden py-0.5">
            <motion.div
              initial={{ y: shouldReduceMotion ? 0 : '105%', opacity: shouldReduceMotion ? 1 : 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.22, ease: STUDIO_EASING }}
              className="text-[clamp(2.75rem,8.2vw,8.5rem)] font-bold tracking-[-0.04em] leading-[0.88] uppercase text-[#171717] select-none"
            >
              BUILD WEBSITES.
            </motion.div>
          </div>

        </div>

        {/* =========================================================
            ASYMMETRIC COMPOSITION:
            Left: Editorial Italic Serif + Highlighted Block + CTAs
            Right: Interactive Layered Website Preview Deck
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start pb-12 sm:pb-16">
          
          {/* LEFT COLUMN: Line 3, Line 4 Highlight, Narrative & CTAs */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="space-y-2">
              {/* Line 3: WE BUILD YOUR (Editorial Italic Serif) */}
              <div className="overflow-hidden py-0.5">
                <motion.div
                  initial={{ y: shouldReduceMotion ? 0 : '105%', opacity: shouldReduceMotion ? 1 : 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.85, delay: 0.34, ease: STUDIO_EASING }}
                  className="font-serif-editorial text-[clamp(2.6rem,7.5vw,7.6rem)] font-normal italic tracking-tight leading-[0.92] text-[#171717] select-none"
                >
                  We build your
                </motion.div>
              </div>

              {/* Line 4: NEXT MOVE. (Visual Highlight in Bold Inverted Badge) */}
              <div className="overflow-hidden pt-1.5 pb-2">
                <motion.div
                  initial={{ y: shouldReduceMotion ? 0 : '105%', opacity: shouldReduceMotion ? 1 : 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.85, delay: 0.46, ease: STUDIO_EASING }}
                  className="inline-block"
                >
                  <span className="inline-block text-[clamp(2.4rem,7vw,7.2rem)] font-bold tracking-[-0.04em] leading-[0.88] uppercase bg-[#171717] text-[#DCEB78] px-4 sm:px-8 py-1.5 sm:py-2.5 shadow-2xl shadow-[#171717]/25 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                    NEXT MOVE.
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Supporting Studio Narrative */}
            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.58, ease: STUDIO_EASING }}
              className="text-base sm:text-lg lg:text-xl font-medium text-[#171717]/85 max-w-xl leading-relaxed pt-2"
            >
              We design and engineer bespoke, high-conversion websites for businesses ready to dominate their category. Minimal aesthetics, maximum speed, and measurable client acquisition.
            </motion.p>

            {/* Prominent CTAs with Sequential Reveal */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: STUDIO_EASING }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1"
            >
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                transition={{ duration: 0.2, ease: STUDIO_EASING }}
                onClick={() => {
                  if (onStartProject) onStartProject();
                  scrollToSection(null, '#contact');
                }}
                className="group px-8 py-4 bg-[#171717] text-[#DCEB78] text-xs font-bold uppercase tracking-widest border border-[#171717] hover:bg-[#F2F0E8] hover:text-[#171717] transition-colors duration-300 flex items-center justify-center space-x-2.5 shadow-xl shadow-[#171717]/15"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.button>

              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                transition={{ duration: 0.2, ease: STUDIO_EASING }}
                onClick={() => {
                  if (onViewPlans) onViewPlans();
                  scrollToSection(null, '#pricing');
                }}
                className="group px-8 py-4 bg-transparent text-[#171717] text-xs font-bold uppercase tracking-widest border-2 border-[#171717] hover:bg-[#171717] hover:text-[#DCEB78] transition-colors duration-300 text-center flex items-center justify-center space-x-2"
              >
                <span>Explore Our Plans</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </motion.div>

            {/* Studio Micro Credibility Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: STUDIO_EASING }}
              className="flex flex-wrap items-center gap-y-2 gap-x-6 text-[11px] font-mono uppercase tracking-wider text-[#171717]/70 pt-2 border-t border-[#171717]/15"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#171717]" />
                3 Fixed Packages (From ₹5,000)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#171717]" />
                Custom Production Code
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#171717]" />
                Direct WhatsApp Collaboration
              </span>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Layered, Interactive Website Preview Deck */}
          <div className="lg:col-span-6 relative pt-4 lg:pt-0">
            
            {/* Interactive Concept Switcher Tabs */}
            <div className="flex items-center justify-between pb-3 mb-2">
              <div className="flex items-center space-x-1.5">
                {previews.map((preview, index) => {
                  const isActive = activeCard === index;
                  return (
                    <button
                      key={preview.id}
                      onClick={() => setActiveCard(index)}
                      className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border transition-all duration-200 ${
                        isActive
                          ? 'bg-[#171717] text-[#DCEB78] border-[#171717] shadow-sm font-bold'
                          : 'bg-[#F2F0E8]/70 text-[#171717]/80 border-[#171717]/25 hover:bg-[#F2F0E8] hover:text-[#171717]'
                      }`}
                    >
                      {preview.tabLabel}
                    </button>
                  );
                })}
              </div>

              <span className="text-[10px] font-mono uppercase tracking-wider text-[#171717]/60 hidden sm:inline">
                Interactive Previews
              </span>
            </div>

            {/* The Layered Deck Container */}
            <div className="relative min-h-[380px] sm:min-h-[440px] w-full flex items-center justify-center">
              
              {previews.map((preview, index) => {
                const isActive = activeCard === index;
                
                // Parallax offsets based on cursor movement
                const translateX = shouldReduceMotion ? 0 : mouseOffset.x * preview.parallaxMultiplier.x;
                const translateY = shouldReduceMotion ? 0 : mouseOffset.y * preview.parallaxMultiplier.y;

                return (
                  <motion.div
                    key={preview.id}
                    onMouseEnter={() => setActiveCard(index)}
                    initial={{
                      opacity: 0,
                      y: shouldReduceMotion ? 0 : 40,
                      rotate: preview.rotation,
                      scale: 0.95,
                    }}
                    animate={{
                      opacity: 1,
                      x: translateX,
                      y: translateY,
                      rotate: isActive ? 0 : preview.rotation,
                      scale: isActive ? 1.02 : 0.96,
                      zIndex: isActive ? 30 : 10 + (2 - index),
                    }}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.03, rotate: 0 }}
                    transition={{
                      duration: 0.45,
                      ease: STUDIO_EASING,
                    }}
                    className={`absolute inset-x-0 mx-auto max-w-lg border border-[#171717] ${preview.bgClass} p-5 sm:p-6 shadow-2xl shadow-[#171717]/20 cursor-pointer transition-shadow duration-300 ${
                      isActive ? 'ring-2 ring-[#171717]' : 'opacity-90 hover:opacity-100'
                    }`}
                  >
                    {/* Realistic Browser Window Top Chrome */}
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-current/15">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-current opacity-70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-current opacity-30" />
                        <span className="w-2.5 h-2.5 rounded-full bg-current opacity-30" />
                      </div>
                      
                      {/* URL Pill */}
                      <div className="text-[10px] font-mono tracking-tight uppercase px-3 py-0.5 border border-current/20 bg-current/5 flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DCEB78] border border-[#171717]/30" />
                        <span>{preview.url}</span>
                      </div>

                      <div className="text-[9px] font-mono uppercase tracking-widest opacity-60">
                        {preview.badge}
                      </div>
                    </div>

                    {/* Mockup Body Content */}
                    <div className="space-y-4 text-left">
                      
                      {/* Nav Bar in Mockup */}
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider pb-2 border-b border-current/10 opacity-75">
                        <span className="font-bold">{preview.genre}</span>
                        <div className="space-x-3 text-[9px]">
                          <span>INDEX</span>
                          <span>STORY</span>
                          <span className="underline font-bold">DISCOVER</span>
                        </div>
                      </div>

                      {/* Mockup Hero Headline & Description */}
                      <div className="p-4 sm:p-5 bg-current/5 border border-current/10 space-y-2.5">
                        <div className="text-[9px] font-mono tracking-widest uppercase opacity-60">
                          {preview.tagline}
                        </div>
                        <div className="text-lg sm:text-xl font-bold uppercase tracking-tight leading-snug">
                          {preview.title}
                        </div>
                        <p className="text-[11px] sm:text-xs opacity-75 leading-relaxed font-normal">
                          {preview.description}
                        </p>
                      </div>

                      {/* Mockup Metrics / Meta Grid */}
                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div className="border-t border-current/15 pt-2">
                          <div className="text-[9px] font-mono uppercase tracking-wider opacity-60">
                            {preview.metaLeftLabel}
                          </div>
                          <div className="text-xs font-bold uppercase mt-0.5">
                            {preview.metaLeftVal}
                          </div>
                        </div>

                        <div className="border-t border-current/15 pt-2">
                          <div className="text-[9px] font-mono uppercase tracking-wider opacity-60">
                            {preview.metaRightLabel}
                          </div>
                          <div className="text-xs font-bold uppercase mt-0.5">
                            {preview.metaRightVal}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Mockup Action Bar */}
                      <div className="flex items-center justify-between pt-2 border-t border-current/15 text-[10px] font-mono">
                        <span className="opacity-70">{preview.accentBadge}</span>
                        <span className="inline-flex items-center space-x-1 font-bold underline uppercase">
                          <span>{preview.ctaText}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>

                    </div>
                  </motion.div>
                );
              })}

            </div>

          </div>

        </div>

        {/* =========================================================
            BOTTOM STRIP: Scroll Indicator & Editorial Reassurance
            ========================================================= */}
        <div className="flex items-center justify-between py-4 border-t border-[#171717]/15 text-xs font-mono uppercase tracking-widest text-[#171717]/75">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-[#171717] animate-pulse" />
            <span>High-performance web architecture & bespoke UI/UX</span>
          </div>

          <a
            href="#services"
            onClick={(e) => scrollToSection(e, '#services')}
            className="hidden sm:inline-flex items-center space-x-2 hover:text-[#171717] transition-colors group cursor-pointer"
          >
            <span>Scroll to Explore</span>
            <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-1" />
          </a>
        </div>

      </div>

      {/* =========================================================
          CONTINUOUS INFINITE MARQUEE TICKER (100% Seamless Loop)
          ========================================================= */}
      <div className="w-full bg-[#171717] text-[#DCEB78] py-3 sm:py-3.5 overflow-hidden border-t border-[#171717]">
        <div className="animate-studio-marquee flex items-center space-x-8 text-xs sm:text-sm font-bold uppercase tracking-widest whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="inline-flex items-center space-x-8">
              <span>WEB DESIGN</span>
              <span className="text-[#DCEB78]/60">✳</span>
              <span>DEVELOPMENT</span>
              <span className="text-[#DCEB78]/60">✳</span>
              <span>DIGITAL EXPERIENCES</span>
              <span className="text-[#DCEB78]/60">✳</span>
              <span>BRAND GROWTH</span>
              <span className="text-[#DCEB78]/60">✳</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}

/* =========================================================================
   3. SERVICES COMPONENT (AWARD-WINNING INTERACTIVE SHOWCASE)
   ========================================================================= */
function Services() {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  const activePreview = hoveredIndex !== null ? hoveredIndex : 0;

  const services = [
    {
      number: '01',
      title: 'WEBSITE DEVELOPMENT',
      description: 'Custom-built websites that give your business a strong digital presence.',
      detail: 'Tailored frontend code crafted with modern standards. Mobile-first fluidity, clean semantic structure, sub-second load times, and zero unnecessary bloat.',
      tag: 'BESPOKE PRODUCTION',
    },
    {
      number: '02',
      title: 'UI/UX DESIGN',
      description: 'Intuitive, visually distinctive experiences designed around your customers.',
      detail: 'Editorial typography, balanced spatial grids, and thoughtful user flows engineered to guide visitors effortlessly toward action.',
      tag: 'CONVERSION FLOWS',
    },
    {
      number: '03',
      title: 'SEO OPTIMIZATION',
      description: 'Improve your search visibility and help the right customers discover your business.',
      detail: 'Semantic metadata architecture, Google Core Web Vitals optimization, and clean indexing schema so your business ranks at the top.',
      tag: 'SEARCH VISIBILITY',
    },
    {
      number: '04',
      title: 'WEBSITE MAINTENANCE',
      description: 'Reliable website care, updates and performance improvements after launch.',
      detail: 'Continuous technical monitoring, software patches, speed maintenance, and direct support so your digital presence never skips a beat.',
      tag: 'SYSTEM UPKEEP',
    },
  ];

  // Render authentic, high-craft HTML/CSS visual mockups for each service
  const renderPreviewMockup = (index) => {
    switch (index) {
      case 0:
        // Service 01: Website Development (Restaurant / Business Website Mockup)
        return (
          <div className="border border-[#171717] bg-[#F2F0E8] p-5 sm:p-6 shadow-2xl shadow-[#171717]/15 text-left transition-all">
            {/* Chrome Bar */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#171717]/15">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#171717]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#171717]/30" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#171717]/30" />
              </div>
              <div className="text-[10px] font-mono tracking-tight uppercase px-2.5 py-0.5 bg-[#DCEB78] border border-[#171717]/25 text-[#171717] font-semibold">
                artisan-hearth.com
              </div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#171717]/60">BESPOKE CODE</span>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#171717]/70 pb-2 border-b border-[#171717]/10">
                <span className="font-bold text-[#171717]">L'AUBERGE / TASTING ROOM</span>
                <span>EST. 2026</span>
              </div>

              <div className="bg-[#171717] text-[#F2F0E8] p-4 sm:p-5 space-y-2">
                <span className="text-[9px] font-mono tracking-widest uppercase text-[#DCEB78]">
                  PROVENCE TABLE • WOOD & EMBER
                </span>
                <h4 className="text-base sm:text-lg font-bold uppercase tracking-tight leading-snug">
                  SEASONAL HEIRLOOM & WAGYU
                </h4>
                <p className="text-[11px] text-[#F2F0E8]/70 leading-relaxed font-normal">
                  Sub-second load times, bespoke responsive layouts, zero generic template bloat.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="border-t border-[#171717]/15 pt-2">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#171717]/60">Frontend Stack</span>
                  <div className="text-xs font-bold uppercase text-[#171717] mt-0.5">React • Tailwind • Vite</div>
                </div>
                <div className="border-t border-[#171717]/15 pt-2">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#171717]/60">Audit Speed</span>
                  <div className="text-xs font-bold uppercase text-[#171717] mt-0.5">0.4s Fast Load (99%)</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        // Service 02: UI/UX Design (Design System & Mobile Interface Mockup)
        return (
          <div className="border border-[#171717] bg-[#F2F0E8] p-5 sm:p-6 shadow-2xl shadow-[#171717]/15 text-left transition-all">
            {/* Chrome Bar */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#171717]/15">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#171717]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#171717]/30" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#171717]/30" />
              </div>
              <div className="text-[10px] font-mono tracking-tight uppercase px-2.5 py-0.5 bg-[#171717] text-[#DCEB78] font-semibold">
                design-system.pixelforge
              </div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#171717]/60">FIGMA → PROD</span>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#171717]/70 pb-2 border-b border-[#171717]/10">
                <span className="font-bold text-[#171717]">KRONOS SPATIAL SYSTEM</span>
                <span>V2.4 SPEC</span>
              </div>

              <div className="p-4 bg-white border border-[#171717]/15 space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[#171717]/60">TYPOGRAPHY / SPACE GROTESK</span>
                  <span className="px-2 py-0.5 bg-[#DCEB78] text-[#171717] font-bold">ACTIVE TOKEN</span>
                </div>

                <div className="border border-[#171717]/15 p-3 bg-[#F2F0E8]/50 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold uppercase text-[#171717]">Intuitive Customer Journey</div>
                    <div className="text-[10px] text-[#171717]/60">Zero cognitive friction user flows</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#171717] text-[#DCEB78] flex items-center justify-center text-xs font-bold">
                    98%
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-[#171717]/70 pt-1">
                  <span>● Wireframe</span>
                  <span>→</span>
                  <span>● High Fidelity</span>
                  <span>→</span>
                  <span className="font-bold text-[#171717]">● Live Conversion</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="border-t border-[#171717]/15 pt-2">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#171717]/60">Flow Retention</span>
                  <div className="text-xs font-bold uppercase text-[#171717] mt-0.5">+44% Click-Through</div>
                </div>
                <div className="border-t border-[#171717]/15 pt-2">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#171717]/60">Usability Score</span>
                  <div className="text-xs font-bold uppercase text-[#171717] mt-0.5">99.4/100 Benchmark</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        // Service 03: SEO Optimization (Search Console & Organic Analytics Mockup)
        return (
          <div className="border border-[#171717] bg-[#F2F0E8] p-5 sm:p-6 shadow-2xl shadow-[#171717]/15 text-left transition-all">
            {/* Chrome Bar */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#171717]/15">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#171717]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#171717]/30" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#171717]/30" />
              </div>
              <div className="text-[10px] font-mono tracking-tight uppercase px-2.5 py-0.5 bg-[#DCEB78] border border-[#171717]/25 text-[#171717] font-semibold">
                search-console.metrics
              </div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#171717]/60">RANK #1</span>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#171717]/70 pb-2 border-b border-[#171717]/10">
                <span className="font-bold text-[#171717]">SEARCH DISCOVERY ENGINE</span>
                <span>ORGANIC REACH</span>
              </div>

              <div className="p-3.5 bg-white border border-[#171717]/15 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#171717]/60">
                  <span>GOOGLE SERP SNIPPET</span>
                  <span className="text-[#171717] font-bold">POSITION 1.0</span>
                </div>
                <div className="text-xs font-bold text-[#171717] uppercase tracking-tight">
                  PixelForge Studio — High-Performance Web Production
                </div>
                <p className="text-[10px] text-[#171717]/70 font-mono leading-relaxed">
                  pixelforgestudio.com • Clean semantic markup, structured JSON-LD schema & fast indexing.
                </p>
              </div>

              <div className="p-3 bg-[#171717] text-[#F2F0E8] flex items-center justify-between">
                <div>
                  <div className="text-[9px] font-mono tracking-widest uppercase text-[#DCEB78]">
                    ORGANIC IMPRESSIONS SURGE
                  </div>
                  <div className="text-xl font-bold tracking-tight text-white mt-0.5">
                    +284% GROWTH
                  </div>
                </div>
                <div className="flex items-end space-x-1.5 h-8">
                  <span className="w-2 bg-[#DCEB78]/40 h-3" />
                  <span className="w-2 bg-[#DCEB78]/50 h-4" />
                  <span className="w-2 bg-[#DCEB78]/70 h-5" />
                  <span className="w-2 bg-[#DCEB78]/85 h-7" />
                  <span className="w-2 bg-[#DCEB78] h-8" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="border-t border-[#171717]/15 pt-2">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#171717]/60">CTR Performance</span>
                  <div className="text-xs font-bold uppercase text-[#171717] mt-0.5">18.4% Average Click Rate</div>
                </div>
                <div className="border-t border-[#171717]/15 pt-2">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#171717]/60">Meta Schema</span>
                  <div className="text-xs font-bold uppercase text-[#171717] mt-0.5">100% Rich Results</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
      default:
        // Service 04: Website Maintenance (Lighthouse & Health Monitor Mockup)
        return (
          <div className="border border-[#171717] bg-[#F2F0E8] p-5 sm:p-6 shadow-2xl shadow-[#171717]/15 text-left transition-all">
            {/* Chrome Bar */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#171717]/15">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#171717]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#171717]/30" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#171717]/30" />
              </div>
              <div className="text-[10px] font-mono tracking-tight uppercase px-2.5 py-0.5 bg-[#171717] text-[#DCEB78] font-semibold">
                health-monitor.status
              </div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#171717]/60">LIVE 99.99%</span>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#171717]/70 pb-2 border-b border-[#171717]/10">
                <span className="font-bold text-[#171717]">SYSTEM HEALTH & UPTIME</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  ALL SYSTEMS OK
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2 border border-[#171717]/20 bg-[#DCEB78]/30">
                  <div className="text-base sm:text-lg font-bold font-mono text-[#171717]">99</div>
                  <div className="text-[8px] font-mono uppercase text-[#171717]/70 mt-0.5">Speed</div>
                </div>
                <div className="p-2 border border-[#171717]/20 bg-white">
                  <div className="text-base sm:text-lg font-bold font-mono text-[#171717]">100</div>
                  <div className="text-[8px] font-mono uppercase text-[#171717]/70 mt-0.5">Access</div>
                </div>
                <div className="p-2 border border-[#171717]/20 bg-white">
                  <div className="text-base sm:text-lg font-bold font-mono text-[#171717]">100</div>
                  <div className="text-[8px] font-mono uppercase text-[#171717]/70 mt-0.5">Security</div>
                </div>
                <div className="p-2 border border-[#171717]/20 bg-[#DCEB78]/30">
                  <div className="text-base sm:text-lg font-bold font-mono text-[#171717]">100</div>
                  <div className="text-[8px] font-mono uppercase text-[#171717]/70 mt-0.5">SEO</div>
                </div>
              </div>

              <div className="p-3 bg-[#171717] text-[#F2F0E8] space-y-1.5 text-xs font-mono">
                <div className="flex justify-between items-center text-[10px] text-[#DCEB78]">
                  <span>CORE WEB VITALS METRICS</span>
                  <span>PASSED</span>
                </div>
                <div className="flex justify-between text-[11px] pt-1">
                  <span>LCP: 0.52s</span>
                  <span>FID: 8ms</span>
                  <span>CLS: 0.00</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="border-t border-[#171717]/15 pt-2">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#171717]/60">Backup Cadence</span>
                  <div className="text-xs font-bold uppercase text-[#171717] mt-0.5">Daily Cloud Snapshot</div>
                </div>
                <div className="border-t border-[#171717]/15 pt-2">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#171717]/60">SLA Support</span>
                  <div className="text-xs font-bold uppercase text-[#171717] mt-0.5">24/7 Monitoring</div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="services" className="bg-[#F2F0E8] text-[#171717] py-24 sm:py-36 border-b border-[#171717] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================
            SECTION HEADER: Small Label & Bold Editorial Title
            ========================================================= */}
        <div className="pb-12 sm:pb-16 mb-12 sm:mb-16 border-b border-[#171717]/15 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#171717]/60 block mb-3">
              02 / WHAT WE DO
            </span>

            <div className="space-y-1">
              <div className="overflow-hidden py-0.5">
                <motion.h2
                  initial={{ y: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 1 : 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, ease: STUDIO_EASING }}
                  className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter uppercase text-[#171717]"
                >
                  GOOD IDEAS.
                </motion.h2>
              </div>

              <div className="overflow-hidden py-0.5">
                <motion.h2
                  initial={{ y: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 1 : 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, delay: 0.12, ease: STUDIO_EASING }}
                  className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter uppercase text-[#171717] flex items-center gap-3"
                >
                  <span>BETTER</span>
                  <span className="font-serif-editorial font-normal italic lowercase tracking-tight text-[#171717]/90 text-[1.08em]">
                    execution.
                  </span>
                </motion.h2>
              </div>
            </div>
          </div>

          <p className="text-sm sm:text-base font-medium text-[#171717]/70 max-w-sm leading-relaxed">
            Four focused disciplines executed with bespoke craft, mathematical precision, and conversion intent.
          </p>
        </div>

        {/* =========================================================
            MAIN SHOWCASE:
            Left/Main: 4 Oversized Horizontal Rows
            Right: Sticky Responsive Craft Preview Stage (Desktop)
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* THE 4 OVERSIZED SERVICE ROWS */}
          <div className="lg:col-span-7 divide-y divide-[#171717]/15 border-t border-b border-[#171717]/15">
            {services.map((service, index) => {
              const isHovered = hoveredIndex === index;
              const isMobileOpen = mobileExpanded === index;
              const isDimmed = hoveredIndex !== null && !isHovered;

              return (
                <div
                  key={service.number}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setMobileExpanded(isMobileOpen ? null : index)}
                  className={`py-10 sm:py-14 transition-all duration-300 cursor-pointer group -mx-3 px-3 sm:-mx-4 sm:px-4 ${
                    isDimmed ? 'opacity-35' : 'opacity-100'
                  } ${isHovered ? 'bg-[#171717]/[0.02]' : ''}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    
                    <div className="space-y-3 flex-grow">
                      
                      {/* Top Label with Number */}
                      <div className="flex items-center space-x-3 text-xs font-mono tracking-wider">
                        <span
                          className={`font-mono text-lg sm:text-xl font-bold transition-colors duration-300 ${
                            isHovered ? 'text-[#171717]' : 'text-[#171717]/40'
                          }`}
                        >
                          {service.number}
                        </span>
                        <span className="text-[#171717]/30">—</span>
                        <span className="text-[10px] uppercase tracking-widest text-[#171717]/60">
                          {service.tag}
                        </span>
                      </div>

                      {/* Huge Service Title with Shift & Expand Underline */}
                      <div className="relative inline-block">
                        <h3
                          className={`text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase text-[#171717] transition-all duration-300 ease-out ${
                            isHovered ? 'translate-x-2 sm:translate-x-3 text-[#171717]' : ''
                          }`}
                        >
                          {service.title}
                        </h3>
                        <span
                          className={`absolute bottom-0 left-0 h-[2px] bg-[#171717] transition-all duration-300 ease-out ${
                            isHovered ? 'w-full translate-x-2 sm:translate-x-3' : 'w-0'
                          }`}
                        />
                      </div>

                      {/* Short Description */}
                      <p
                        className={`text-base sm:text-lg text-[#171717]/85 font-medium leading-relaxed max-w-xl transition-all duration-300 ${
                          isHovered ? 'translate-x-1 sm:translate-x-2' : ''
                        }`}
                      >
                        {service.description}
                      </p>

                    </div>

                    {/* Animated Arrow Indicator */}
                    <div className="pt-2 shrink-0">
                      <div
                        className={`w-10 h-10 rounded-full border border-[#171717]/20 flex items-center justify-center transition-all duration-300 ${
                          isHovered
                            ? 'bg-[#171717] text-[#DCEB78] border-[#171717] shadow-sm'
                            : 'bg-transparent text-[#171717]/50'
                        }`}
                      >
                        <ArrowUpRight
                          className={`w-4 h-4 transition-transform duration-300 ${
                            isHovered
                              ? 'translate-x-0.5 -translate-y-0.5 scale-110'
                              : isMobileOpen
                              ? 'rotate-90'
                              : ''
                          }`}
                        />
                      </div>
                    </div>

                  </div>

                  {/* MOBILE TAP-TO-EXPAND ACCORDION (Hidden on lg screens) */}
                  <div className="lg:hidden">
                    <AnimatePresence>
                      {isMobileOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: STUDIO_EASING }}
                          className="overflow-hidden pt-6 space-y-4"
                        >
                          <p className="text-sm text-[#171717]/75 leading-relaxed border-t border-[#171717]/10 pt-4">
                            {service.detail}
                          </p>
                          <div className="pt-1">
                            {renderPreviewMockup(index)}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>
              );
            })}
          </div>

          {/* DESKTOP STICKY CRAFT PREVIEW STAGE (Visible on lg screens) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28 pt-2">
            
            <div className="space-y-3">
              {/* Stage Top Meta Pill */}
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#171717]/70 pb-1">
                <span className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#171717] animate-pulse" />
                  <span className="font-semibold">Interactive Craft Preview</span>
                </span>
                <span className="px-2 py-0.5 bg-[#DCEB78] border border-[#171717]/20 text-[#171717] font-bold">
                  {services[activePreview].number} / 04
                </span>
              </div>

              {/* Dynamic Preview Container with Smooth Transitions */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePreview}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: STUDIO_EASING }}
                >
                  {renderPreviewMockup(activePreview)}
                </motion.div>
              </AnimatePresence>

              {/* Helpful Hint */}
              <div className="pt-2 text-center text-[10px] font-mono uppercase tracking-wider text-[#171717]/50">
                Hover any discipline to inspect live production standard
              </div>
            </div>

          </div>

        </div>

        {/* =========================================================
            BOTTOM ELEMENT: Minimal Editorial CTA
            ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: STUDIO_EASING }}
          className="mt-20 sm:mt-28 pt-10 sm:pt-14 border-t border-[#171717]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#171717]/60 block mb-1.5">
              NEED SOMETHING DIFFERENT?
            </span>
            <p className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#171717]">
              Let's discuss your project.
            </p>
          </div>

          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="group inline-flex items-center space-x-2.5 text-xs font-mono font-bold uppercase tracking-widest text-[#171717] border-b-2 border-[#171717] pb-1 hover:text-[#171717]/70 transition-colors w-fit"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}

/* =========================================================================
   4. PRICING COMPONENT (EDITORIAL STUDIO MENU & TRANSPARENT INVESTMENT)
   ========================================================================= */
function Pricing({ selectedPackage, onSelectPackage }) {
  const shouldReduceMotion = useReducedMotion();

  const plans = [
    {
      id: 'STARTER',
      number: '01',
      name: 'STARTER',
      price: '₹5,000',
      description: 'For businesses getting started with their online presence.',
      cta: 'CHOOSE STARTER',
      popular: false,
      features: [
        'Up to 3 pages.',
        'Responsive design.',
        'Home, About and Contact pages.',
        'WhatsApp integration.',
        'Contact form functionality within the delivered client website.',
        'Basic SEO setup.',
        '15 days technical support.',
      ],
    },
    {
      id: 'PROFESSIONAL',
      number: '02',
      name: 'PROFESSIONAL',
      price: '₹9,000',
      description: 'For growing businesses that need a stronger digital presence.',
      cta: 'CHOOSE PROFESSIONAL',
      popular: true,
      features: [
        'Up to 6 pages.',
        'Everything in Starter.',
        'Premium UI/UX design.',
        'Services and portfolio sections.',
        'Google Analytics integration.',
        'Enhanced SEO.',
        '30 days technical support.',
        '1 month maintenance.',
      ],
    },
    {
      id: 'PREMIUM',
      number: '03',
      name: 'PREMIUM',
      price: '₹13,000',
      description: 'For established businesses looking for a complete digital experience.',
      cta: 'CHOOSE PREMIUM',
      popular: false,
      features: [
        'Up to 10 pages.',
        'Everything in Professional.',
        'Custom UI/UX design.',
        'Advanced interactions.',
        'Blog section.',
        'Advanced enquiry forms.',
        'SEO optimization.',
        '60 days technical support.',
        '2 months maintenance.',
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
        
        {/* =========================================================
            SECTION INTRODUCTION: Small Label & Bold Editorial Title
            ========================================================= */}
        <div className="pb-12 sm:pb-16 mb-12 sm:mb-16 border-b border-[#333333] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#DCEB78] block mb-3">
              03 / THE INVESTMENT
            </span>

            <div className="space-y-1">
              <div className="overflow-hidden py-0.5">
                <motion.h2
                  initial={{ y: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 1 : 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, ease: STUDIO_EASING }}
                  className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter uppercase text-[#F2F0E8]"
                >
                  GOOD DESIGN.
                </motion.h2>
              </div>

              <div className="overflow-hidden py-0.5">
                <motion.h2
                  initial={{ y: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 1 : 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, delay: 0.12, ease: STUDIO_EASING }}
                  className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter uppercase text-[#F2F0E8] flex items-center gap-3"
                >
                  <span>FAIR</span>
                  <span className="font-serif-editorial font-normal italic lowercase tracking-tight text-[#DCEB78] text-[1.08em]">
                    pricing.
                  </span>
                </motion.h2>
              </div>
            </div>
          </div>

          <p className="text-base sm:text-lg text-[#F2F0E8]/70 max-w-md leading-relaxed font-medium">
            Choose the right starting point for your business. Clear packages, thoughtful design and no unnecessary surprises.
          </p>
        </div>

        {/* =========================================================
            THREE BALANCED EDITORIAL PRICING COLUMNS
            Thin separators, large typography, and highlighted Professional package
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-b border-[#333333] divide-y lg:divide-y-0 lg:divide-x divide-[#333333] items-stretch mb-16">
          {plans.map((plan, index) => {
            const isRec = plan.popular;
            const isSelected = selectedPackage === plan.id;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.12,
                  ease: STUDIO_EASING,
                }}
                whileHover={shouldReduceMotion ? {} : { y: isRec ? -8 : -5, transition: { duration: 0.25, ease: STUDIO_EASING } }}
                className={`relative p-8 sm:p-12 flex flex-col justify-between transition-all duration-300 group ${
                  isRec
                    ? 'bg-[#DCEB78] text-[#171717] lg:-my-4 lg:py-16 shadow-2xl z-10'
                    : 'bg-[#171717] text-[#F2F0E8] hover:bg-[#1c1c1c]'
                } ${isSelected && !isRec ? 'ring-2 ring-[#DCEB78]' : ''}`}
              >
                <div>
                  
                  {/* Top Header: Number, Name & Popular Badge */}
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-current/15">
                    <div className="flex items-center space-x-2.5">
                      <span className="font-mono text-xs opacity-50 font-bold">
                        {plan.number}
                      </span>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider">
                        {plan.name}
                      </span>
                    </div>

                    {isRec && (
                      <span className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest bg-[#171717] text-[#DCEB78]">
                        MOST POPULAR
                      </span>
                    )}
                  </div>

                  {/* Package Description (Above Price) */}
                  <p className={`text-sm sm:text-base font-medium leading-relaxed mb-6 min-h-[48px] ${
                    isRec ? 'text-[#171717]/85' : 'text-[#F2F0E8]/75'
                  }`}>
                    {plan.description}
                  </p>

                  {/* Large Typography Price Display */}
                  <div className="pb-8 mb-8 border-b border-current/15">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-5xl sm:text-6xl font-bold font-mono tracking-tighter">
                        {plan.price}
                      </span>
                    </div>
                    <span className={`text-[11px] font-mono uppercase tracking-wider block mt-2 ${
                      isRec ? 'text-[#171717]/60' : 'text-[#F2F0E8]/50'
                    }`}>
                      One-time website development fee
                    </span>
                  </div>

                  {/* Clean Feature List with Micro-Stagger */}
                  <div className="space-y-3.5 mb-10">
                    <div className="text-[10px] font-mono uppercase tracking-widest font-bold opacity-60 mb-4">
                      DELIVERABLES INCLUDED:
                    </div>

                    {plan.features.map((feat, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -6 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: 0.12 + idx * 0.03, ease: STUDIO_EASING }}
                        className="flex items-start space-x-3 text-sm font-medium group/feat"
                      >
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 transition-transform duration-200 group-hover/feat:scale-110 ${
                            isRec ? 'text-[#171717]' : 'text-[#DCEB78]'
                          }`}
                        />
                        <span className="leading-snug">{feat}</span>
                      </motion.div>
                    ))}
                  </div>

                </div>

                {/* Bottom Actions: Primary CTA + Direct WhatsApp Option */}
                <div className="pt-6 border-t border-current/15 space-y-3">
                  
                  {/* Primary Package CTA Button */}
                  <motion.button
                    whileHover={shouldReduceMotion ? {} : { scale: 1.015 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                    transition={{ duration: 0.2, ease: STUDIO_EASING }}
                    onClick={() => handleChoosePlan(plan.id)}
                    className={`group/btn w-full py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 border shadow-sm ${
                      isRec
                        ? 'bg-[#171717] text-[#DCEB78] border-[#171717] hover:bg-transparent hover:text-[#171717]'
                        : 'bg-transparent text-[#F2F0E8] border-white/20 hover:bg-[#DCEB78] hover:text-[#171717] hover:border-[#DCEB78]'
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </motion.button>

                  {/* Direct WhatsApp Quick Chat for this Package */}
                  <div className="text-center">
                    <a
                      href={`https://wa.me/918239554141?text=${encodeURIComponent(
                        `Hello PixelForge Studio! I would like to choose the ${plan.name} Package (${plan.price}) for my website project.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center space-x-1.5 text-[11px] font-mono uppercase tracking-wider py-1 transition-colors ${
                        isRec
                          ? 'text-[#171717]/70 hover:text-[#171717] hover:underline'
                          : 'text-[#F2F0E8]/60 hover:text-[#DCEB78] hover:underline'
                      }`}
                    >
                      <span>Inquire via WhatsApp</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* =========================================================
            PRICING TRANSPARENCY & CUSTOM INQUIRIES
            ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: STUDIO_EASING }}
          className="pt-10 border-t border-[#333333]"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Transparency Disclosure */}
            <div className="md:col-span-8 space-y-2">
              <p className="text-xs sm:text-sm text-[#F2F0E8]/75 leading-relaxed font-mono">
                All packages are one-time website development charges. Domain registration, hosting, paid plugins and third-party subscriptions are charged separately where applicable.
              </p>
              <p className="text-[11px] text-[#F2F0E8]/45 font-mono">
                *Included technical support covers post-launch bug fixes, deployment guidance and handover for the stated duration. Ongoing retainer maintenance is available on an optional monthly basis.
              </p>
            </div>

            {/* Custom Project Link */}
            <div className="md:col-span-4 md:text-right pt-2 md:pt-0">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="group inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-[#DCEB78] hover:text-white transition-colors border-b border-[#DCEB78] pb-1"
              >
                <span>Need something different? Let's discuss a custom project.</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

/* =========================================================================
   5. ABOUT COMPONENT (AWARD-WINNING EDITORIAL MANIFESTO)
   ========================================================================= */
function About() {
  const shouldReduceMotion = useReducedMotion();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <section
      id="about"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-[#F2F0E8] text-[#171717] py-28 sm:py-40 border-b border-[#171717] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================
            SECTION HEADER: Small Label & Top Coordinates
            ========================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-12 mb-12 border-b border-[#171717]/15">
          <span className="text-xs font-mono uppercase tracking-widest text-[#171717]/60 block">
            04 / WHO WE ARE
          </span>

          <div className="flex items-center space-x-3 text-[11px] font-mono tracking-widest uppercase text-[#171717]/70">
            <span className="font-bold">INDEPENDENT DIGITAL ATELIER</span>
            <span className="text-[#171717]/30">/</span>
            <span>DESIGN & CODE SYNTHESIS</span>
          </div>
        </div>

        {/* =========================================================
            MAIN TYPOGRAPHY EXPERIENCE: Interactive 4-Line Manifesto
            "WE THINK. WE DESIGN. WE BUILD. WE REPEAT."
            ========================================================= */}
        <div className="pb-16 sm:pb-24 space-y-3 sm:space-y-6">
          
          {/* Line 1: WE THINK. */}
          <div className="overflow-hidden py-1">
            <motion.div
              initial={{ y: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 1 : 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: STUDIO_EASING }}
              className="text-[clamp(2.75rem,8.2vw,8.5rem)] font-bold tracking-[-0.04em] uppercase text-[#171717] leading-[0.88]"
            >
              WE THINK.
            </motion.div>
          </div>

          {/* Line 2: WE DESIGN. (Offset with Italic Editorial Serif) */}
          <div className="overflow-hidden py-1 sm:pl-10 md:pl-20 lg:pl-32">
            <motion.div
              initial={{ y: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 1 : 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.12, ease: STUDIO_EASING }}
              className="text-[clamp(2.75rem,8.2vw,8.5rem)] font-bold tracking-[-0.04em] uppercase text-[#171717] leading-[0.88] flex flex-wrap items-baseline gap-3 sm:gap-6"
            >
              <span>WE</span>
              <span className="font-serif-editorial font-normal italic lowercase tracking-tight text-[#171717] text-[1.12em]">
                design.
              </span>
            </motion.div>
          </div>

          {/* Line 3: WE BUILD. (Inverted Bold Block with Lime Accent) */}
          <div className="overflow-hidden py-1.5 sm:pl-16 md:pl-32 lg:pl-56">
            <motion.div
              initial={{ y: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 1 : 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.24, ease: STUDIO_EASING }}
              className="text-[clamp(2.75rem,8.2vw,8.5rem)] font-bold tracking-[-0.04em] uppercase text-[#171717] leading-[0.88] flex items-center gap-3 sm:gap-6"
            >
              <span>WE</span>
              <span className="inline-block bg-[#171717] text-[#DCEB78] px-4 sm:px-8 py-1 sm:py-2 text-[clamp(2.4rem,7.5vw,7.6rem)] font-bold tracking-tighter uppercase shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                BUILD.
              </span>
            </motion.div>
          </div>

          {/* Line 4: WE REPEAT. (Asymmetric Offset with Underline Accent) */}
          <div className="overflow-hidden py-1 sm:pl-24 md:pl-48 lg:pl-80">
            <motion.div
              initial={{ y: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 1 : 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.36, ease: STUDIO_EASING }}
              className="text-[clamp(2.75rem,8.2vw,8.5rem)] font-bold tracking-[-0.04em] uppercase text-[#171717]/80 leading-[0.88] flex items-baseline gap-3 sm:gap-6"
            >
              <span>WE</span>
              <span className="text-[#171717] underline decoration-[#171717]/40 underline-offset-8">
                REPEAT.
              </span>
            </motion.div>
          </div>

        </div>

        {/* =========================================================
            ASYMMETRIC CORE:
            Left: Short Studio Story & Core Principles
            Right: Rotating Circular Visual (Creativity & Technology)
            ========================================================= */}
        <div className="pt-16 sm:pt-20 border-t border-[#171717]/15 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Short Studio Story & Principles */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: STUDIO_EASING }}
              className="space-y-6"
            >
              <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-[#171717] leading-relaxed">
                We are PixelForge Studio, an independent digital studio focused on building modern websites for businesses.
              </p>
              <p className="text-base sm:text-xl font-normal text-[#171717]/75 leading-relaxed">
                We bring design and development together to create digital experiences that look distinctive, work smoothly and help businesses grow.
              </p>
            </motion.div>

            {/* Core Tenets Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: STUDIO_EASING }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#171717]/15 text-xs font-mono uppercase tracking-wider"
            >
              <div className="space-y-1">
                <span className="block text-[10px] text-[#171717]/40 font-bold">01 / INTENT</span>
                <span className="text-[#171717] font-bold block text-sm">Design & Logic</span>
                <span className="text-[#171717]/60 text-[11px] normal-case block">No generic templates or AI bloat.</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] text-[#171717]/40 font-bold">02 / RIGOR</span>
                <span className="text-[#171717] font-bold block text-sm">Bespoke Code</span>
                <span className="text-[#171717]/60 text-[11px] normal-case block">Fast, clean and modular frontend.</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] text-[#171717]/40 font-bold">03 / COLLABORATION</span>
                <span className="text-[#171717] font-bold block text-sm">Direct Access</span>
                <span className="text-[#171717]/60 text-[11px] normal-case block">Work directly with active creators.</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Rotating Circular Visual (Creativity & Technology) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              style={{
                transform: shouldReduceMotion
                  ? 'none'
                  : `translate3d(${mouseOffset.x * 12}px, ${mouseOffset.y * 10}px, 0)`,
              }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex items-center justify-center select-none"
            >
              {/* Concentric Decorative Rings */}
              <div className="absolute inset-0 rounded-full border border-[#171717]/15" />
              <div className="absolute inset-6 rounded-full border border-dashed border-[#171717]/25" />
              <div className="absolute inset-16 rounded-full border border-[#171717]/10" />

              {/* Rotating Circular Typography Ring */}
              <motion.div
                animate={shouldReduceMotion ? {} : { rotate: 360 }}
                transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                className="absolute inset-0 w-full h-full flex items-center justify-center"
              >
                <svg viewBox="0 0 300 300" className="w-full h-full">
                  <defs>
                    <path
                      id="studioCirclePath"
                      d="M 150, 150 m -115, 0 a 115,115 0 1,1 230,0 a 115,115 0 1,1 -230,0"
                      fill="none"
                    />
                  </defs>
                  <text className="text-[10px] sm:text-[10.5px] font-mono uppercase tracking-[0.27em] fill-[#171717] font-bold">
                    <textPath href="#studioCirclePath">
                      DESIGN ✳ CODE ✳ IDEAS ✳ CREATIVITY ✳ DETAIL ✳ DEVELOPMENT ✳{' '}
                    </textPath>
                  </text>
                </svg>
              </motion.div>

              {/* Central Element: Brand Monogram & Label */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center p-4 bg-[#F2F0E8] rounded-full border border-[#171717]/20 w-32 h-32 sm:w-36 sm:h-36 shadow-lg shadow-[#171717]/5">
                <div className="w-8 h-8 bg-[#171717] flex items-center justify-center mb-2 shadow-sm">
                  <div className="w-3.5 h-3.5 bg-[#DCEB78]" />
                </div>
                <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.24em] uppercase text-[#171717]">
                  PIXELFORGE
                </span>
                <span className="text-[9px] font-mono tracking-widest text-[#171717]/50 uppercase mt-0.5">
                  EST. 2026
                </span>
              </div>
            </motion.div>
          </div>

        </div>

        {/* =========================================================
            LARGE FINAL STATEMENT
            "WE MAKE THE INTERNET LOOK BETTER."
            ========================================================= */}
        <div className="mt-20 sm:mt-28 pt-12 sm:pt-16 border-t border-[#171717]/15">
          <div className="max-w-5xl space-y-6">
            
            <span className="text-xs font-mono uppercase tracking-widest text-[#171717]/60 block">
              STUDIO COMMITMENT
            </span>

            {/* Huge Statement Line 1 */}
            <div className="overflow-hidden py-0.5">
              <motion.div
                initial={{ y: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 1 : 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: STUDIO_EASING }}
                className="text-[clamp(2.5rem,7vw,6.5rem)] font-bold tracking-tight uppercase text-[#171717] leading-[0.92]"
              >
                WE MAKE THE INTERNET
              </motion.div>
            </div>

            {/* Huge Statement Line 2: LOOK BETTER. (Highlighted) */}
            <div className="overflow-hidden py-1">
              <motion.div
                initial={{ y: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 1 : 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: 0.15, ease: STUDIO_EASING }}
                className="inline-block"
              >
                <span className="inline-block bg-[#171717] text-[#DCEB78] px-4 sm:px-8 py-1.5 sm:py-3 text-[clamp(2.4rem,7vw,6.5rem)] font-bold tracking-tighter uppercase shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  LOOK BETTER.
                </span>
              </motion.div>
            </div>

            {/* Small Action Link: LET'S BUILD SOMETHING → */}
            <div className="pt-6">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="group inline-flex items-center space-x-2.5 text-xs font-mono font-bold uppercase tracking-widest text-[#171717] border-b-2 border-[#171717] pb-1 hover:text-[#171717]/70 transition-colors w-fit"
              >
                <span>LET'S BUILD SOMETHING</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

/* =========================================================================
   6. CONTACT COMPONENT (EXPERIMENTAL GRAND FINALE)
   ========================================================================= */
function Contact({ selectedPackage, onSelectPackage }) {
  const shouldReduceMotion = useReducedMotion();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const packages = [
    { id: 'STARTER', label: 'STARTER (₹5,000)' },
    { id: 'PROFESSIONAL', label: 'PROFESSIONAL (₹9,000)' },
    { id: 'PREMIUM', label: 'PREMIUM (₹13,000)' },
  ];

  // Helper to generate WhatsApp link preserving the selected package and updated price
  const getWhatsAppLink = (numberRaw) => {
    const priceMap = { STARTER: '₹5,000', PROFESSIONAL: '₹9,000', PREMIUM: '₹13,000' };
    const priceText = priceMap[selectedPackage] ? ` - ${priceMap[selectedPackage]}` : '';
    const pkgText = selectedPackage ? ` (Interested in ${selectedPackage} Package${priceText})` : '';
    const message = `Hello PixelForge Studio! I am interested in your website development services${pkgText}. I would like to discuss a project.`;
    return `https://wa.me/${numberRaw}?text=${encodeURIComponent(message)}`;
  };

  // Helper to generate Email link preserving selected package
  const getEmailLink = (emailAddress) => {
    const subject = `Project Inquiry: PixelForge Studio (${selectedPackage || 'Custom'} Package)`;
    const body = `Hello PixelForge Studio,\n\nI would like to discuss building a website for my business (Interested in ${selectedPackage || 'Custom'} package).\n\nBest regards,`;
    return `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section
      id="contact"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-[#171717] text-[#F2F0E8] py-28 sm:py-44 border-b border-[#333333] relative overflow-hidden"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#F2F0E8_1px,transparent_1px),linear-gradient(to_bottom,#F2F0E8_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================
            SECTION HEADER: Small Label & Status Indicator
            ========================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-12 mb-12 border-b border-[#333333]">
          <span className="text-xs font-mono uppercase tracking-widest text-[#DCEB78] block">
            05 / LET'S TALK
          </span>

          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-[#DCEB78]">
            <span className="w-2 h-2 rounded-full bg-[#DCEB78] animate-pulse" />
            <span>Accepting New Clients • Q1/Q2 2026</span>
          </div>
        </div>

        {/* =========================================================
            THE MAIN VISUAL — HUGE CONTACT STATEMENT
            "LET'S MAKE SOMETHING MATTER."
            ========================================================= */}
        <div className="pb-14 sm:pb-20 space-y-2 sm:space-y-4">
          
          {/* Line 1: LET'S MAKE */}
          <div className="overflow-hidden py-1">
            <motion.div
              initial={{ y: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 1 : 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: STUDIO_EASING }}
              className="text-[clamp(2.75rem,8.5vw,8.5rem)] font-bold tracking-[-0.04em] uppercase text-[#F2F0E8] leading-[0.88]"
            >
              LET'S MAKE
            </motion.div>
          </div>

          {/* Line 2: SOMETHING (Editorial Italic Serif) */}
          <div className="overflow-hidden py-1 sm:pl-10 md:pl-20 lg:pl-32">
            <motion.div
              initial={{ y: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 1 : 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.12, ease: STUDIO_EASING }}
              className="font-serif-editorial text-[clamp(2.75rem,8.5vw,8.5rem)] font-normal italic lowercase tracking-tight text-[#F2F0E8]/90 leading-[0.88]"
            >
              something
            </motion.div>
          </div>

          {/* Line 3: MATTER. (Highlighted with Electric Lime Badge) */}
          <div className="overflow-hidden py-1.5 sm:pl-20 md:pl-40 lg:pl-64">
            <motion.div
              initial={{ y: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 1 : 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.24, ease: STUDIO_EASING }}
              className="inline-block"
            >
              <span className="inline-block bg-[#DCEB78] text-[#171717] px-4 sm:px-8 py-1 sm:py-2 text-[clamp(2.5rem,8vw,8rem)] font-bold tracking-tighter uppercase shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                MATTER.
              </span>
            </motion.div>
          </div>

          {/* Short Supporting Statement */}
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.36, ease: STUDIO_EASING }}
            className="text-lg sm:text-2xl text-[#F2F0E8]/80 max-w-2xl font-medium leading-relaxed pt-6 sm:pl-2"
          >
            Have an ambitious idea? We would love to hear about it. Tell us what you're building, and let's turn it into something remarkable.
          </motion.p>
        </div>

        {/* =========================================================
            CURRENT PROJECT INTENT INDICATOR (Preserving Package)
            ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: STUDIO_EASING }}
          className="mb-14 p-5 sm:p-6 bg-[#1f1f1f] border border-[#333333] flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#DCEB78] block">
              CURRENT PROJECT INTENT
            </span>
            <div className="text-base sm:text-lg font-bold text-[#F2F0E8] mt-0.5">
              Selected Package: <span className="underline decoration-[#DCEB78]">{selectedPackage || 'PROFESSIONAL'}</span>
              <span className="ml-2 text-sm font-mono text-[#DCEB78]">
                ({selectedPackage === 'STARTER' ? '₹5,000' : selectedPackage === 'PREMIUM' ? '₹13,000' : '₹9,000'})
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-[#F2F0E8]/50 mr-1">Switch:</span>
            {packages.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => onSelectPackage && onSelectPackage(pkg.id)}
                className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 ${
                  selectedPackage === pkg.id
                    ? 'bg-[#DCEB78] text-[#171717] shadow-sm'
                    : 'bg-transparent text-[#F2F0E8] hover:bg-white/10 border border-[#444444]'
                }`}
              >
                {pkg.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* =========================================================
            SECTION 1: WHATSAPP — TWO EQUAL DESTINATIONS
            "CHOOSE YOUR WAY IN."
            ========================================================= */}
        <div className="mb-16 sm:mb-24">
          
          {/* Section Header */}
          <div className="flex flex-wrap items-end justify-between gap-4 pb-6 mb-8 border-b border-[#333333]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#DCEB78] flex items-center gap-1.5 mb-1.5">
                <MessageCircle className="w-3.5 h-3.5" /> 01 / DIRECT MESSAGING
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight uppercase text-[#F2F0E8]">
                CHOOSE YOUR WAY IN.
              </h3>
            </div>
            <p className="text-xs font-mono text-[#F2F0E8]/50 max-w-xs">
              Two direct lines to our development and design leads. Identical response speed.
            </p>
          </div>

          {/* Two Equal Side-by-Side Split Panels (Doors into the Studio) */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#333333] border border-[#333333] bg-[#1a1a1a]">
            
            {/* OPTION 01 — WHATSAPP (Contact 01: +91 82395 54141) */}
            <a
              href={getWhatsAppLink(CONTACT_DATA.phone1.raw)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 sm:p-12 block transition-all duration-300 hover:bg-[#DCEB78] hover:text-[#171717] group/opt1 relative"
            >
              {/* Top Subline */}
              <div className="flex items-center justify-between text-xs font-mono tracking-wider opacity-70 pb-6 mb-6 border-b border-current/15">
                <span className="font-bold uppercase flex items-center gap-2">
                  <Phone className="w-3 h-3" />
                  CONTACT 01
                </span>
                <span className="text-[10px] uppercase">LEAD DEVELOPER • NIDS</span>
              </div>

              {/* Huge Phone Number */}
              <div className="space-y-2 mb-8">
                <span className="text-[11px] font-mono uppercase tracking-widest opacity-60 block">
                  WHATSAPP DIRECT
                </span>
                <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-mono font-bold tracking-tighter transition-transform duration-300 group-hover/opt1:translate-x-1">
                  {CONTACT_DATA.phone1.display}
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-6 border-t border-current/15 text-xs font-mono">
                <span className="font-bold uppercase tracking-wider">
                  Open Chat 01
                </span>
                <div className="w-10 h-10 rounded-full border border-current flex items-center justify-center shrink-0 transition-all duration-300 group-hover/opt1:scale-110 group-hover/opt1:translate-x-1 group-hover/opt1:-translate-y-1">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </a>

            {/* OPTION 02 — WHATSAPP (Contact 02: +91 80105 70715) */}
            <a
              href={getWhatsAppLink(CONTACT_DATA.phone2.raw)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 sm:p-12 block transition-all duration-300 hover:bg-[#DCEB78] hover:text-[#171717] group/opt2 relative"
            >
              {/* Top Subline */}
              <div className="flex items-center justify-between text-xs font-mono tracking-wider opacity-70 pb-6 mb-6 border-b border-current/15">
                <span className="font-bold uppercase flex items-center gap-2">
                  <Phone className="w-3 h-3" />
                  CONTACT 02
                </span>
                <span className="text-[10px] uppercase">DESIGN & CODE • PRATHMESH</span>
              </div>

              {/* Huge Phone Number */}
              <div className="space-y-2 mb-8">
                <span className="text-[11px] font-mono uppercase tracking-widest opacity-60 block">
                  WHATSAPP DIRECT
                </span>
                <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-mono font-bold tracking-tighter transition-transform duration-300 group-hover/opt2:translate-x-1">
                  {CONTACT_DATA.phone2.display}
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-6 border-t border-current/15 text-xs font-mono">
                <span className="font-bold uppercase tracking-wider">
                  Open Chat 02
                </span>
                <div className="w-10 h-10 rounded-full border border-current flex items-center justify-center shrink-0 transition-all duration-300 group-hover/opt2:scale-110 group-hover/opt2:translate-x-1 group-hover/opt2:-translate-y-1">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </a>

          </div>

        </div>

        {/* =========================================================
            SECTION 2: EMAIL — TWO EQUAL DESTINATIONS
            "OR SEND US A MESSAGE."
            ========================================================= */}
        <div className="mb-20 sm:mb-28">
          
          {/* Section Header */}
          <div className="flex flex-wrap items-end justify-between gap-4 pb-6 mb-8 border-b border-[#333333]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#F2F0E8]/60 flex items-center gap-1.5 mb-1.5">
                <Mail className="w-3.5 h-3.5" /> 02 / FORMAL INQUIRIES & RFPS
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight uppercase text-[#F2F0E8]">
                OR SEND US A MESSAGE.
              </h3>
            </div>
            <p className="text-xs font-mono text-[#F2F0E8]/50 max-w-xs">
              Both inboxes are monitored directly by studio leadership. Response within 2 hours.
            </p>
          </div>

          {/* Two Equal Oversized Typography Rows / Split Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#333333] border border-[#333333] bg-[#1a1a1a]">
            
            {/* OPTION 01 — EMAIL (nidsvaishnav10@gmail.com) */}
            <a
              href={getEmailLink(CONTACT_DATA.email1)}
              className="p-8 sm:p-12 block transition-all duration-300 hover:bg-[#F2F0E8] hover:text-[#171717] group/mail1 relative"
            >
              {/* Top Subline */}
              <div className="flex items-center justify-between text-xs font-mono tracking-wider opacity-70 pb-6 mb-6 border-b border-current/15">
                <span className="font-bold uppercase flex items-center gap-2">
                  <Mail className="w-3 h-3" />
                  OPTION 01
                </span>
                <span className="text-[10px] uppercase">NIDS VAISHNAV</span>
              </div>

              {/* Huge Email Address */}
              <div className="space-y-2 mb-8">
                <span className="text-[11px] font-mono uppercase tracking-widest opacity-60 block">
                  DIRECT INBOX
                </span>
                <div className="text-base sm:text-xl lg:text-2xl xl:text-3xl font-mono font-bold tracking-tight break-all transition-transform duration-300 group-hover/mail1:translate-x-1">
                  {CONTACT_DATA.email1}
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-6 border-t border-current/15 text-xs font-mono">
                <span className="font-bold uppercase tracking-wider">
                  Compose Email 01
                </span>
                <div className="w-10 h-10 rounded-full border border-current flex items-center justify-center shrink-0 transition-all duration-300 group-hover/mail1:scale-110 group-hover/mail1:translate-x-1 group-hover/mail1:-translate-y-1">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </a>

            {/* OPTION 02 — EMAIL (prathmeshbole5@gmail.com) */}
            <a
              href={getEmailLink(CONTACT_DATA.email2)}
              className="p-8 sm:p-12 block transition-all duration-300 hover:bg-[#F2F0E8] hover:text-[#171717] group/mail2 relative"
            >
              {/* Top Subline */}
              <div className="flex items-center justify-between text-xs font-mono tracking-wider opacity-70 pb-6 mb-6 border-b border-current/15">
                <span className="font-bold uppercase flex items-center gap-2">
                  <Mail className="w-3 h-3" />
                  OPTION 02
                </span>
                <span className="text-[10px] uppercase">PRATHMESH BOLE</span>
              </div>

              {/* Huge Email Address */}
              <div className="space-y-2 mb-8">
                <span className="text-[11px] font-mono uppercase tracking-widest opacity-60 block">
                  DIRECT INBOX
                </span>
                <div className="text-base sm:text-xl lg:text-2xl xl:text-3xl font-mono font-bold tracking-tight break-all transition-transform duration-300 group-hover/mail2:translate-x-1">
                  {CONTACT_DATA.email2}
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-6 border-t border-current/15 text-xs font-mono">
                <span className="font-bold uppercase tracking-wider">
                  Compose Email 02
                </span>
                <div className="w-10 h-10 rounded-full border border-current flex items-center justify-center shrink-0 transition-all duration-300 group-hover/mail2:scale-110 group-hover/mail2:translate-x-1 group-hover/mail2:-translate-y-1">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </a>

          </div>

        </div>

        {/* =========================================================
            ASYMMETRIC CLOSING LOCKUP:
            Left: The Personal Touch Creed
            Right: The Experimental Orbital Graphic
            ========================================================= */}
        <div className="pt-16 sm:pt-20 border-t border-[#333333] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: The Personal Touch */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#DCEB78] block">
              THE PIXELFORGE CREED
            </span>
            <div className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase leading-snug text-[#F2F0E8]">
              NO BORING WEBSITES. <br />
              NO GENERIC SOLUTIONS. <br />
              <span className="text-[#DCEB78]">JUST GOOD DIGITAL WORK.</span>
            </div>
            <p className="text-sm font-mono text-[#F2F0E8]/60 pt-2 max-w-md leading-relaxed">
              Every project is engineered bespoke from scratch. No templates, no bloated page builders. Just clean code and strategic visual design.
            </p>
          </div>

          {/* RIGHT: The Experimental Orbital Graphic */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              style={{
                transform: shouldReduceMotion
                  ? 'none'
                  : `translate3d(${mouseOffset.x * 10}px, ${mouseOffset.y * 8}px, 0)`,
              }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center select-none"
            >
              {/* Orbital concentric rings */}
              <div className="absolute inset-0 rounded-full border border-white/10" />
              <div className="absolute inset-6 rounded-full border border-dashed border-[#DCEB78]/25" />
              <div className="absolute inset-14 rounded-full border border-white/5" />

              {/* Rotating typography orbital path */}
              <motion.div
                animate={shouldReduceMotion ? {} : { rotate: 360 }}
                transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                className="absolute inset-0 w-full h-full flex items-center justify-center"
              >
                <svg viewBox="0 0 300 300" className="w-full h-full">
                  <defs>
                    <path
                      id="contactOrbitalPath"
                      d="M 150, 150 m -115, 0 a 115,115 0 1,1 230,0 a 115,115 0 1,1 -230,0"
                      fill="none"
                    />
                  </defs>
                  <text className="text-[10px] sm:text-[10.5px] font-mono uppercase tracking-[0.27em] fill-[#DCEB78] font-bold">
                    <textPath href="#contactOrbitalPath">
                      IDEAS · DESIGN · DEVELOPMENT · DIGITAL · PIXELFORGE ·{' '}
                    </textPath>
                  </text>
                </svg>
              </motion.div>

              {/* Central Statement Core */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center p-5 bg-[#171717] rounded-full border border-[#333333] w-36 h-36 sm:w-44 sm:h-44 shadow-2xl">
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase text-[#F2F0E8] leading-snug">
                  GOOD IDEAS DESERVE GREAT WEBSITES.
                </span>
                <span className="w-2 h-2 rounded-full bg-[#DCEB78] mt-2 animate-pulse" />
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}

/* =========================================================================
   7. FOOTER COMPONENT
   ========================================================================= */
function Footer() {
  const shouldReduceMotion = useReducedMotion();

  const handleLinkClick = (e, href) => {
    scrollToSection(e, href);
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.75, ease: STUDIO_EASING }}
      className="bg-[#171717] text-[#F2F0E8] py-20 sm:py-28 border-t border-[#171717]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top: Large Brand Wordmark with subtle hover tracking */}
        <div className="pb-14 border-b border-[#333333]">
          <h2 className="text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tighter uppercase text-[#F2F0E8] leading-none transition-colors duration-300 hover:text-white">
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

          {/* COLUMN 2 — QUICK LINKS with Smooth Hover Underlines */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#DCEB78]">
              Quick Links
            </div>
            <ul className="space-y-2.5 text-xs uppercase font-bold tracking-wider">
              {['Home', 'Services', 'Pricing', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => handleLinkClick(e, `#${item.toLowerCase()}`)}
                    className="relative inline-block hover:text-[#DCEB78] transition-colors py-0.5 group"
                  >
                    <span>{item}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#DCEB78] transition-all duration-300 ease-out group-hover:w-full" />
                  </a>
                </li>
              ))}
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
                  <a
                    href={`tel:${CONTACT_DATA.phone1.display.replace(/\s+/g, '')}`}
                    className="hover:text-[#DCEB78] transition-colors inline-block hover:translate-x-1 duration-200"
                  >
                    {CONTACT_DATA.phone1.display}
                  </a>
                  <a
                    href={`tel:${CONTACT_DATA.phone2.display.replace(/\s+/g, '')}`}
                    className="hover:text-[#DCEB78] transition-colors inline-block hover:translate-x-1 duration-200"
                  >
                    {CONTACT_DATA.phone2.display}
                  </a>
                </div>
              </div>

              {/* WhatsApp direct links */}
              <div>
                <span className="text-[#F2F0E8]/50 block text-[10px] uppercase">WhatsApp Chat:</span>
                <div className="flex flex-col space-y-1.5 mt-0.5">
                  <a
                    href={`https://wa.me/${CONTACT_DATA.phone1.raw}?text=${encodeURIComponent('Hello PixelForge Studio! I would like to discuss a project.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#DCEB78] transition-colors inline-flex items-center space-x-1 group"
                  >
                    <span>Chat: {CONTACT_DATA.phone1.display}</span>
                    <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <a
                    href={`https://wa.me/${CONTACT_DATA.phone2.raw}?text=${encodeURIComponent('Hello PixelForge Studio! I would like to discuss a project.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#DCEB78] transition-colors inline-flex items-center space-x-1 group"
                  >
                    <span>Chat: {CONTACT_DATA.phone2.display}</span>
                    <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>

              {/* Emails with mailto: */}
              <div>
                <span className="text-[#F2F0E8]/50 block text-[10px] uppercase">Email:</span>
                <div className="flex flex-col space-y-1 mt-0.5">
                  <a
                    href={`mailto:${CONTACT_DATA.email1}`}
                    className="hover:text-[#DCEB78] transition-colors underline decoration-white/20 hover:decoration-[#DCEB78]"
                  >
                    {CONTACT_DATA.email1}
                  </a>
                  <a
                    href={`mailto:${CONTACT_DATA.email2}`}
                    className="hover:text-[#DCEB78] transition-colors underline decoration-white/20 hover:decoration-[#DCEB78]"
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
    </motion.footer>
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
