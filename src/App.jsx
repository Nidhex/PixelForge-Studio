import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ArrowDown, 
  Check, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  Search 
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Studio Motion Physics Curve
const STUDIO_EASING = [0.22, 1, 0.36, 1];
const CURRENT_YEAR = 2026;

// Studio Contact Data
const CONTACT_DATA = {
  phone1: { display: '+91 82395 54141', raw: '918239554141', name: 'Nids Vaishnav', role: 'Lead Developer' },
  phone2: { display: '+91 80105 70715', raw: '918010570715', name: 'Prathmesh Bole', role: 'Design & Code' },
  email1: 'nidsvaishnav10@gmail.com',
  email2: 'prathmeshbole5@gmail.com',
};

// Smooth scroll helper
const scrollToSection = (e, href) => {
  if (e) e.preventDefault();
  if (href === '#home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const target = document.querySelector(href);
  if (target) {
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

/* =========================================================================
   PHASE 3 — GLOBAL NAVIGATION
   Minimal, architectural, responsive drawer, active section tracking
   ========================================================================= */
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const shouldReduceMotion = useReducedMotion();

  const navLinks = [
    { num: '01', name: 'Home', href: '#home' },
    { num: '02', name: 'Services', href: '#services' },
    { num: '03', name: 'Pricing', href: '#pricing' },
    { num: '04', name: 'About', href: '#about' },
    { num: '05', name: 'Contact', href: '#contact' },
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
          ? 'bg-[#DCEB78]/95 backdrop-blur-md shadow-sm border-b border-[#171717]/20 py-3 sm:py-3.5'
          : 'bg-[#DCEB78] border-b border-[#171717]/15 py-3.5 sm:py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Wordmark with Kinetic Monogram */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="group flex items-center space-x-3 text-left focus:outline-none"
          >
            <div className="relative w-7 h-7 bg-[#171717] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
              <span className="w-2.5 h-2.5 bg-[#DCEB78] block" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-[#171717] uppercase leading-none font-display">
                PixelForge Studio
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#171717]/60 uppercase mt-0.5 hidden sm:block">
                Digital Atelier • 2026
              </span>
            </div>
          </a>

          {/* Desktop Links with Numbered Indices */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative text-xs font-mono font-bold uppercase tracking-wider py-1 group transition-colors duration-200 flex items-center space-x-1.5 ${
                    isActive ? 'text-[#171717]' : 'text-[#171717]/65 hover:text-[#171717]'
                  }`}
                >
                  <span className={`text-[10px] transition-opacity duration-200 ${isActive ? 'opacity-100 font-bold' : 'opacity-40 group-hover:opacity-75'}`}>
                    {link.num}
                  </span>
                  <span>{link.name}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#171717] transition-all duration-300 ease-out ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Let's Talk CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#171717]/70 hidden lg:inline">
              [COMMISSIONS OPEN]
            </span>
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              transition={{ duration: 0.2, ease: STUDIO_EASING }}
              className="group inline-flex items-center space-x-2 px-5 py-2.5 bg-[#171717] text-[#DCEB78] text-xs font-mono font-bold uppercase tracking-wider border border-[#171717] hover:bg-[#F2F0E8] hover:text-[#171717] transition-colors duration-300 shadow-sm"
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

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: STUDIO_EASING }}
            className="md:hidden bg-[#DCEB78] border-b-2 border-[#171717] px-6 pt-4 pb-8 overflow-hidden"
          >
            <div className="flex flex-col space-y-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#171717]/60 pb-2 border-b border-[#171717]/15">
                // NAVIGATION DIRECTORY
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-2xl font-bold uppercase tracking-tight text-[#171717] py-2 border-b border-[#171717]/10 flex items-center justify-between font-display"
                >
                  <span className="flex items-baseline space-x-3">
                    <span className="text-xs font-mono text-[#171717]/50">{link.num}</span>
                    <span>{link.name}</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#171717]/40" />
                </a>
              ))}
              
              <div className="pt-4 grid grid-cols-2 gap-3">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-[#171717] text-[#DCEB78] text-xs font-mono font-bold uppercase tracking-wider text-center"
                >
                  <span>Let's Talk</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://wa.me/918239554141"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 px-4 py-3 border border-[#171717] text-[#171717] text-xs font-mono font-bold uppercase tracking-wider text-center"
                >
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* =========================================================================
   PHASE 4 — HERO SECTION: LIVING TYPOGRAPHY & INTERACTIVE EXPERIENCE
   Magnetic word physics, 3D block tilt, independent serif motion, stable deck
   ========================================================================= */
function Hero({ onStartProject, onViewPlans }) {
  const shouldReduceMotion = useReducedMotion();
  const [activeCard, setActiveCard] = useState(0);

  // Living Typography & Parallax Physics using Framer Motion Spring Values
  const mouseNormX = useMotionValue(0); // -1 to 1 relative to hero center
  const mouseNormY = useMotionValue(0); // -1 to 1 relative to hero center

  // Snappy, organic spring physics for responsive magnetic movement
  const springConfig = { damping: 22, stiffness: 160, mass: 0.45 };
  const smoothX = useSpring(mouseNormX, springConfig);
  const smoothY = useSpring(mouseNormY, springConfig);

  // Clearly noticeable magnetic movement strengths across individual words
  // Line 1: "WE DON'T JUST"
  const w1X = useTransform(smoothX, [-1, 1], [-26, 26]);
  const w1Y = useTransform(smoothY, [-1, 1], [-16, 16]);

  const w2X = useTransform(smoothX, [-1, 1], [36, -36]);
  const w2Y = useTransform(smoothY, [-1, 1], [-22, 22]);

  const w3X = useTransform(smoothX, [-1, 1], [-22, 22]);
  const w3Y = useTransform(smoothY, [-1, 1], [18, -18]);

  // Line 2: "BUILD WEBSITES." (Dynamic counter-shift)
  const w4X = useTransform(smoothX, [-1, 1], [32, -32]);
  const w4Y = useTransform(smoothY, [-1, 1], [20, -20]);

  const w5X = useTransform(smoothX, [-1, 1], [-42, 42]);
  const w5Y = useTransform(smoothY, [-1, 1], [-24, 24]);

  // Line 3: "We build your" (Independent serif motion)
  const italicX = useTransform(smoothX, [-1, 1], [-24, 24]);
  const italicY = useTransform(smoothY, [-1, 1], [18, -18]);
  const italicRotate = useTransform(smoothX, [-1, 1], [-2.2, 2.2]);

  // Line 4: "NEXT MOVE." Block (3D Tilt & Magnetic Depth)
  const blockRotateX = useTransform(smoothY, [-1, 1], [15, -15]);
  const blockRotateY = useTransform(smoothX, [-1, 1], [-18, 18]);
  const blockShiftX = useTransform(smoothX, [-1, 1], [22, -22]);
  const blockShiftY = useTransform(smoothY, [-1, 1], [16, -16]);

  // Browser Preview 3D Perspective Tilt & Shift
  const deckTiltX = useTransform(smoothY, [-1, 1], [14, -14]);
  const deckTiltY = useTransform(smoothX, [-1, 1], [-18, 18]);
  const deckShiftX = useTransform(smoothX, [-1, 1], [16, -16]);
  const deckShiftY = useTransform(smoothY, [-1, 1], [12, -12]);

  // Cursor-reactive tracking handler
  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width - 0.5) * 2));
    const normY = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height - 0.5) * 2));
    mouseNormX.set(normX);
    mouseNormY.set(normY);

    // Subtle background sheen coordinates
    e.currentTarget.style.setProperty('--mouse-px', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    e.currentTarget.style.setProperty('--mouse-py', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  const handleMouseLeave = () => {
    mouseNormX.set(0);
    mouseNormY.set(0);
  };

  // 3 Distinct layered website preview mockups
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
      description: 'Scaling deep-tech founders and sovereign enterprises through algorithmic finance & capital engineering.',
      accentBadge: 'Tier-1 Institutional Partner',
      metaLeftLabel: 'CAPITAL DEPLOYED',
      metaLeftVal: '$420M+ Across 38 Firms',
      metaRightLabel: 'EXECUTION SPEED',
      metaRightVal: '99.8% Core Uptime',
      ctaText: 'Access Data Room',
      accentColor: 'text-[#DCEB78]',
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
      description: 'Monolithic concrete forms, acoustic stillness and raw light manipulation across civic structures.',
      accentBadge: 'Gold Lion Nominee • 2026',
      metaLeftLabel: 'EXHIBITION',
      metaLeftVal: '34.6937° N, 135.5023° E',
      metaRightLabel: 'MONOGRAPH',
      metaRightVal: 'Hardcover Vol. 04',
      ctaText: 'Explore Monograph',
    },
  ];

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-[#DCEB78] text-[#171717] pt-12 sm:pt-16 lg:pt-20 pb-0 border-b border-[#171717] scroll-mt-28 overflow-hidden min-h-[92vh] flex flex-col justify-between select-none"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07] bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />

      {/* Subtle Cursor-Responsive Lighting Grid Sheen */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(750px circle at var(--mouse-px, 50%) var(--mouse-py, 50%), rgba(255, 255, 255, 0.22), transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex-grow flex flex-col justify-between">
        
        {/* TOP STATUS BAR */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: STUDIO_EASING }}
          className="flex flex-wrap items-center justify-between gap-4 pt-2 pb-5 sm:pb-6 border-b border-[#171717]/15"
        >
          <div className="inline-flex items-center space-x-2.5 px-3 py-1 bg-[#171717] text-[#DCEB78] text-[11px] font-mono uppercase tracking-wider shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DCEB78] opacity-80" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DCEB78]" />
            </span>
            <span className="font-semibold">Available for new projects</span>
          </div>

          <div className="flex items-center space-x-3 text-[11px] font-mono tracking-widest uppercase text-[#171717]/80">
            <span className="font-bold">Digital Design & Development</span>
            <span className="text-[#171717]/30">/</span>
            <span className="hidden sm:inline">Bespoke Production</span>
            <span className="hidden md:inline text-[#171717]/30">/</span>
            <span className="hidden md:inline font-semibold">2026 Studio Edition</span>
          </div>
        </motion.div>

        {/* MAIN POSTER HEADLINE: LIVING TYPOGRAPHY */}
        <div className="pt-4 sm:pt-6 pb-4 sm:pb-6">
          
          {/* Line 1: WE DON'T JUST (Word-by-word magnetic spring physics) */}
          <motion.div
            initial={{ y: shouldReduceMotion ? 0 : 35, opacity: shouldReduceMotion ? 1 : 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.85, delay: 0.12, ease: STUDIO_EASING }}
            className="flex flex-wrap items-baseline gap-x-[0.25em] text-[clamp(2.75rem,8.2vw,8.5rem)] font-bold tracking-[-0.04em] leading-[0.92] uppercase text-[#171717] select-none font-display py-1"
          >
            <motion.span
              style={{
                x: shouldReduceMotion ? 0 : w1X,
                y: shouldReduceMotion ? 0 : w1Y,
              }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 18 }}
              className="inline-block will-change-transform cursor-default"
            >
              WE
            </motion.span>
            <motion.span
              style={{
                x: shouldReduceMotion ? 0 : w2X,
                y: shouldReduceMotion ? 0 : w2Y,
              }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 18 }}
              className="inline-block will-change-transform cursor-default"
            >
              DON'T
            </motion.span>
            <motion.span
              style={{
                x: shouldReduceMotion ? 0 : w3X,
                y: shouldReduceMotion ? 0 : w3Y,
              }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 18 }}
              className="inline-block will-change-transform cursor-default"
            >
              JUST
            </motion.span>
          </motion.div>

          {/* Line 2: BUILD WEBSITES. (Word-by-word counter-phase magnetic spring) */}
          <motion.div
            initial={{ y: shouldReduceMotion ? 0 : 35, opacity: shouldReduceMotion ? 1 : 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.85, delay: 0.24, ease: STUDIO_EASING }}
            className="flex flex-wrap items-baseline gap-x-[0.25em] text-[clamp(2.75rem,8.2vw,8.5rem)] font-bold tracking-[-0.04em] leading-[0.92] uppercase text-[#171717] select-none font-display py-1"
          >
            <motion.span
              style={{
                x: shouldReduceMotion ? 0 : w4X,
                y: shouldReduceMotion ? 0 : w4Y,
              }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 18 }}
              className="inline-block will-change-transform cursor-default"
            >
              BUILD
            </motion.span>
            <motion.span
              style={{
                x: shouldReduceMotion ? 0 : w5X,
                y: shouldReduceMotion ? 0 : w5Y,
              }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 18 }}
              className="inline-block will-change-transform cursor-default"
            >
              WEBSITES.
            </motion.span>
          </motion.div>

        </div>

        {/* ASYMMETRIC STAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start pb-12 sm:pb-16">
          
          {/* LEFT COLUMN: Line 3, Line 4 Block, Narrative & CTAs */}
          <div className="lg:col-span-6 space-y-7">
            <div className="space-y-2">
              
              {/* Line 3: We build your (Editorial Italic Serif with independent kinetic motion) */}
              <div className="py-1">
                <motion.div
                  initial={{ y: shouldReduceMotion ? 0 : 35, opacity: shouldReduceMotion ? 1 : 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.85, delay: 0.38, ease: STUDIO_EASING }}
                  style={{
                    x: shouldReduceMotion ? 0 : italicX,
                    y: shouldReduceMotion ? 0 : italicY,
                    rotate: shouldReduceMotion ? 0 : italicRotate,
                  }}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.02, x: 8 }}
                  className="font-serif-editorial text-[clamp(2.6rem,7.5vw,7.6rem)] font-normal italic tracking-tight leading-[0.92] text-[#171717] select-none will-change-transform inline-block cursor-default"
                >
                  We build your
                </motion.div>
              </div>

              {/* Line 4: NEXT MOVE. Block with living 3D tilt & depth */}
              <div className="pt-2 pb-2 [perspective:1000px]">
                <motion.div
                  initial={{ y: shouldReduceMotion ? 0 : 40, opacity: shouldReduceMotion ? 1 : 0, scale: 0.95 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.85, delay: 0.52, ease: STUDIO_EASING }}
                  style={{
                    x: shouldReduceMotion ? 0 : blockShiftX,
                    y: shouldReduceMotion ? 0 : blockShiftY,
                    rotateX: shouldReduceMotion ? 0 : blockRotateX,
                    rotateY: shouldReduceMotion ? 0 : blockRotateY,
                    transformStyle: 'preserve-3d',
                  }}
                  className="inline-block will-change-transform cursor-pointer"
                >
                  <motion.span
                    whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                    transition={{ duration: 0.25, ease: STUDIO_EASING }}
                    className="inline-block text-[clamp(2.4rem,7vw,7.2rem)] font-bold tracking-[-0.04em] leading-[0.88] uppercase bg-[#171717] text-[#DCEB78] px-4 sm:px-8 py-2 sm:py-3 shadow-2xl shadow-[#171717]/30 font-display select-none transition-shadow hover:shadow-[#171717]/50"
                  >
                    NEXT MOVE.
                  </motion.span>
                </motion.div>
              </div>
            </div>

            {/* Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: STUDIO_EASING }}
              className="text-base sm:text-lg lg:text-xl font-medium text-[#171717]/85 max-w-xl leading-relaxed pt-1"
            >
              We design and engineer bespoke, high-conversion websites for businesses ready to dominate their category. Minimal aesthetics, maximum speed, and measurable client acquisition.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.78, ease: STUDIO_EASING }}
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
                className="group px-8 py-4 bg-[#171717] text-[#DCEB78] text-xs font-mono font-bold uppercase tracking-widest border border-[#171717] hover:bg-[#F2F0E8] hover:text-[#171717] transition-colors duration-300 flex items-center justify-center space-x-2.5 shadow-xl shadow-[#171717]/15"
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
                className="group px-8 py-4 bg-transparent text-[#171717] text-xs font-mono font-bold uppercase tracking-widest border-2 border-[#171717] hover:bg-[#171717] hover:text-[#DCEB78] transition-colors duration-300 text-center flex items-center justify-center space-x-2"
              >
                <span>Explore Our Plans</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </motion.div>

            {/* Credibility Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.88, ease: STUDIO_EASING }}
              className="flex flex-wrap items-center gap-y-2 gap-x-6 text-[11px] font-mono uppercase tracking-wider text-[#171717]/75 pt-2 border-t border-[#171717]/15"
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

          {/* RIGHT COLUMN: INTERACTIVE BROWSER PREVIEW DECK */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.32, ease: STUDIO_EASING }}
            className="lg:col-span-6 relative pt-4 lg:pt-0 [perspective:1200px]"
          >
            
            {/* Switcher Tabs with Stable Visual State */}
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
                Live Studio Previews
              </span>
            </div>

            {/* 3D Dynamic Perspective Deck Container with Fixed Dimensions */}
            <motion.div
              style={{
                rotateX: shouldReduceMotion ? 0 : deckTiltX,
                rotateY: shouldReduceMotion ? 0 : deckTiltY,
                x: shouldReduceMotion ? 0 : deckShiftX,
                y: shouldReduceMotion ? 0 : deckShiftY,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full max-w-lg mx-auto h-[440px] sm:h-[480px] will-change-transform"
            >
              {/* Background Depth Card 2 */}
              <div
                className="absolute inset-0 border border-[#171717]/25 bg-[#F2F0E8]/40 rotate-2 translate-x-3 translate-y-4 pointer-events-none -z-20 transition-transform duration-300"
                aria-hidden="true"
              />

              {/* Background Depth Card 1 */}
              <div
                className="absolute inset-0 border-2 border-[#171717]/35 bg-[#171717]/15 -rotate-2 translate-x-2 translate-y-2 pointer-events-none -z-10 transition-transform duration-300"
                aria-hidden="true"
              />

              {/* Active Card with AnimatePresence */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={previews[activeCard].id}
                  initial={{ opacity: 0, y: 16, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: STUDIO_EASING }}
                  className={`w-full h-full border-2 border-[#171717] ${previews[activeCard].bgClass} p-5 sm:p-6 shadow-2xl flex flex-col justify-between`}
                >
                  {/* Realistic Browser Window Top Chrome */}
                  <div className="flex items-center justify-between pb-3 border-b border-current/15">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-current opacity-70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-current opacity-30" />
                      <span className="w-2.5 h-2.5 rounded-full bg-current opacity-30" />
                    </div>
                    
                    <div className="text-[10px] font-mono tracking-tight uppercase px-3 py-0.5 border border-current/20 bg-current/5 flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DCEB78] border border-[#171717]/30" />
                      <span>{previews[activeCard].url}</span>
                    </div>

                    <div className="text-[9px] font-mono uppercase tracking-widest opacity-60">
                      {previews[activeCard].badge}
                    </div>
                  </div>

                  {/* Mockup Body Content */}
                  <div className="space-y-4 text-left my-auto">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider pb-2 border-b border-current/10 opacity-75">
                      <span className="font-bold">{previews[activeCard].genre}</span>
                      <div className="space-x-3 text-[9px]">
                        <span>INDEX</span>
                        <span>STORY</span>
                        <span className="underline font-bold">DISCOVER</span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 bg-current/5 border border-current/10 space-y-2.5">
                      <div className="text-[9px] font-mono tracking-widest uppercase opacity-60">
                        {previews[activeCard].tagline}
                      </div>
                      <div className="text-lg sm:text-xl font-bold uppercase tracking-tight leading-snug font-display">
                        {previews[activeCard].title}
                      </div>
                      <p className="text-[11px] sm:text-xs opacity-75 leading-relaxed font-normal">
                        {previews[activeCard].description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="border-t border-current/15 pt-2">
                        <div className="text-[9px] font-mono uppercase tracking-wider opacity-60">
                          {previews[activeCard].metaLeftLabel}
                        </div>
                        <div className="text-xs font-bold uppercase mt-0.5 font-mono">
                          {previews[activeCard].metaLeftVal}
                        </div>
                      </div>

                      <div className="border-t border-current/15 pt-2">
                        <div className="text-[9px] font-mono uppercase tracking-wider opacity-60">
                          {previews[activeCard].metaRightLabel}
                        </div>
                        <div className="text-xs font-bold uppercase mt-0.5 font-mono">
                          {previews[activeCard].metaRightVal}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-current/15 text-[10px] font-mono">
                    <span className="opacity-70">{previews[activeCard].accentBadge}</span>
                    <span className="inline-flex items-center space-x-1 font-bold underline uppercase">
                      <span>{previews[activeCard].ctaText}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

          </motion.div>

        </div>

        {/* BOTTOM TICKER STRIP */}
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

      {/* CONTINUOUS INFINITE MARQUEE */}
      <div className="w-full bg-[#171717] text-[#DCEB78] py-3 sm:py-3.5 overflow-hidden border-t border-[#171717]">
        <div className="animate-studio-marquee flex items-center space-x-8 text-xs sm:text-sm font-bold font-mono uppercase tracking-widest whitespace-nowrap">
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
   PHASE 5 — SERVICES: THE SERVICE PLAYGROUND (CREATIVE EXHIBITION)
   Four distinct visual environments discovered through scrolling
   ========================================================================= */
function Services() {
  const shouldReduceMotion = useReducedMotion();
  const [activeDevMockup, setActiveDevMockup] = useState('restaurant');
  const [searchQueryIdx, setSearchQueryIdx] = useState(0);

  // Auto-rotating queries for Service 03 Search Universe
  const searchQueries = [
    'bespoke creative website studio',
    'high-conversion architectural portfolio',
    'provence wood-fired dining experience',
    'fast modern independent digital agency',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSearchQueryIdx((prev) => (prev + 1) % searchQueries.length);
    }, 3400);
    return () => clearInterval(timer);
  }, [searchQueries.length]);

  return (
    <section id="services" className="bg-[#F2F0E8] text-[#171717] pt-24 sm:pt-36 pb-28 sm:pb-40 border-b border-[#171717] relative overflow-hidden">
      
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* =========================================================
            3. OPENING COMPOSITION
            Headline: WE MAKE DIGITAL MATTER.
            Supporting sentence in unexpected position.
            ========================================================= */}
        <div className="pb-20 sm:pb-32 border-b border-[#171717]/15">
          
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-[#171717]/10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#171717]/60 block">
              02 / WHAT WE DO
            </span>
            <div className="text-[11px] font-mono tracking-widest uppercase text-[#171717]/70 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#171717] animate-pulse" />
              <span>THE SERVICE PLAYGROUND • 4 DISCIPLINES</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 space-y-1">
              <div className="overflow-hidden py-1">
                <motion.h2
                  initial={{ y: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 1 : 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, ease: STUDIO_EASING }}
                  className="text-[clamp(3rem,8.5vw,8.5rem)] font-bold tracking-tighter uppercase text-[#171717] leading-[0.88] font-display"
                >
                  WE MAKE
                </motion.h2>
              </div>

              <div className="overflow-hidden py-1">
                <motion.h2
                  initial={{ y: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 1 : 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, delay: 0.12, ease: STUDIO_EASING }}
                  className="text-[clamp(3rem,8.5vw,8.5rem)] font-bold tracking-tighter uppercase text-[#171717] leading-[0.88] font-display"
                >
                  DIGITAL
                </motion.h2>
              </div>

              <div className="overflow-hidden py-1 sm:pl-16">
                <motion.h2
                  initial={{ y: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 1 : 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, delay: 0.24, ease: STUDIO_EASING }}
                  className="text-[clamp(3rem,8.5vw,8.5rem)] font-bold tracking-tighter uppercase text-[#171717] leading-[0.88] flex items-baseline gap-4 font-display"
                >
                  <span className="font-serif-editorial font-normal italic lowercase tracking-tight text-[#171717]/90 text-[1.12em]">
                    matter.
                  </span>
                </motion.h2>
              </div>
            </div>

            {/* Supporting sentence in an unexpected asymmetrical position */}
            <div className="lg:col-span-4 lg:pb-3 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.35, ease: STUDIO_EASING }}
                className="p-6 bg-[#171717] text-[#F2F0E8] border border-[#171717] shadow-xl space-y-3"
              >
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#DCEB78] font-bold">
                  // STUDIO AMBITION
                </div>
                <p className="text-sm sm:text-base font-medium leading-relaxed">
                  "Four focused disciplines. One ambition: making businesses impossible to ignore online."
                </p>
              </motion.div>

              {/* Scroll invitation */}
              <div className="flex items-center space-x-3 text-xs font-mono uppercase tracking-widest text-[#171717]/60">
                <ArrowDown className="w-4 h-4 animate-bounce text-[#171717]" />
                <span>Scroll to explore the exhibition</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            THE EXHIBITION: 4 DISTINCT VISUAL ENVIRONMENTS
            ========================================================= */}
        <div className="space-y-28 sm:space-y-40 pt-16 sm:pt-24">

          {/* -------------------------------------------------------
              STAGE 01 — WEBSITE DEVELOPMENT
              Visual: Large layered browser-preview installation
              ------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: STUDIO_EASING }}
            className="border-2 border-[#171717] bg-white p-6 sm:p-10 lg:p-14 shadow-2xl relative"
          >
            {/* Stage Identification Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#171717]/15">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-[#171717] text-[#DCEB78] text-xs font-mono font-bold">
                  01 / 04
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-[#171717]/70 font-bold">
                  INSTALLATION // BESPOKE WEB ARCHITECTURE
                </span>
              </div>

              {/* Preview Category Switcher */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveDevMockup('restaurant')}
                  className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider border transition-colors ${
                    activeDevMockup === 'restaurant'
                      ? 'bg-[#171717] text-[#DCEB78] border-[#171717] font-bold'
                      : 'bg-[#F2F0E8] text-[#171717] border-[#171717]/20 hover:border-[#171717]'
                  }`}
                >
                  Restaurant
                </button>
                <button
                  onClick={() => setActiveDevMockup('business')}
                  className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider border transition-colors ${
                    activeDevMockup === 'business'
                      ? 'bg-[#171717] text-[#DCEB78] border-[#171717] font-bold'
                      : 'bg-[#F2F0E8] text-[#171717] border-[#171717]/20 hover:border-[#171717]'
                  }`}
                >
                  Business
                </button>
                <button
                  onClick={() => setActiveDevMockup('portfolio')}
                  className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider border transition-colors ${
                    activeDevMockup === 'portfolio'
                      ? 'bg-[#171717] text-[#DCEB78] border-[#171717] font-bold'
                      : 'bg-[#F2F0E8] text-[#171717] border-[#171717]/20 hover:border-[#171717]'
                  }`}
                >
                  Portfolio
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Oversized Typography & Narrative */}
              <div className="lg:col-span-5 space-y-6">
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight uppercase text-[#171717] font-display leading-[0.95]">
                  WEBSITE <br />DEVELOPMENT
                </h3>

                <p className="text-lg sm:text-xl font-medium text-[#171717] leading-relaxed">
                  Custom-built websites that give your business a distinctive digital presence.
                </p>

                <p className="text-sm text-[#171717]/70 leading-relaxed font-mono">
                  Tailored frontend code crafted with modern standards. Mobile-first fluidity, clean semantic structure, sub-second load times, and zero unnecessary bloat.
                </p>

                <div className="pt-2">
                  <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, '#contact')}
                    className="group inline-flex items-center space-x-2 px-6 py-3.5 bg-[#171717] text-[#DCEB78] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#DCEB78] hover:text-[#171717] border border-[#171717] transition-colors"
                  >
                    <span>Commission A Website</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>

              {/* Right Column: Multi-layered Browser Preview Installation */}
              <div className="lg:col-span-7 relative">
                
                {/* Background Shadow Layer */}
                <div className="absolute inset-0 translate-x-4 translate-y-4 bg-[#DCEB78] border-2 border-[#171717] pointer-events-none" />

                {/* Primary Browser Window */}
                <div className="relative z-10 border-2 border-[#171717] bg-[#F2F0E8] p-5 sm:p-7 shadow-xl">
                  
                  {/* Browser Chrome Bar */}
                  <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#171717]/15 font-mono text-xs">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#171717]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#171717]/30" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#171717]/30" />
                    </div>

                    <div className="px-3 py-1 bg-white border border-[#171717]/25 text-[10px] uppercase font-bold flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DCEB78] border border-[#171717]" />
                      <span>
                        {activeDevMockup === 'restaurant' && 'lauberge-provence.fr'}
                        {activeDevMockup === 'business' && 'apex-capital.io'}
                        {activeDevMockup === 'portfolio' && 'studiomono.arch'}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold text-[#171717]/50 uppercase hidden sm:inline">
                      LIVE CLIENT ENVIRONMENT
                    </span>
                  </div>

                  {/* Render Mockup Depending on Selected State */}
                  {activeDevMockup === 'restaurant' && (
                    <div className="space-y-4 text-left">
                      <div className="flex items-center justify-between text-[11px] font-mono uppercase pb-2 border-b border-[#171717]/10">
                        <span className="font-bold">L’AUBERGE DU TEMPS</span>
                        <span className="text-[#171717]/60">EST. 2026 • PROVENCE</span>
                      </div>

                      <div className="bg-[#171717] text-[#F2F0E8] p-5 sm:p-6 space-y-2.5">
                        <span className="text-[10px] font-mono text-[#DCEB78] tracking-widest uppercase">
                          WOOD-FIRED HEARTH & NATURAL WINES
                        </span>
                        <div className="text-xl sm:text-2xl font-bold uppercase tracking-tight font-display">
                          SEASONAL HEIRLOOM TASTING MENU
                        </div>
                        <p className="text-xs text-[#F2F0E8]/75 leading-relaxed font-normal">
                          Five-course winter harvest, dry-aged heritage beef, and cellar pairings.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div className="p-3 bg-white border border-[#171717]/15">
                          <div className="text-[9px] font-mono uppercase text-[#171717]/60">EXPERIENCE</div>
                          <div className="text-xs font-bold uppercase text-[#171717] mt-0.5">5-Course Tasting €85</div>
                        </div>
                        <div className="p-3 bg-[#DCEB78] border border-[#171717]/25">
                          <div className="text-[9px] font-mono uppercase text-[#171717]/70">RESERVATIONS</div>
                          <div className="text-xs font-bold uppercase text-[#171717] mt-0.5">Tables Available</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDevMockup === 'business' && (
                    <div className="space-y-4 text-left">
                      <div className="flex items-center justify-between text-[11px] font-mono uppercase pb-2 border-b border-[#171717]/10">
                        <span className="font-bold">APEX STRATEGIC CAPITAL</span>
                        <span className="text-[#171717]/60">GLOBAL VENTURES</span>
                      </div>

                      <div className="bg-[#171717] text-[#F2F0E8] p-5 sm:p-6 space-y-2.5">
                        <span className="text-[10px] font-mono text-[#DCEB78] tracking-widest uppercase">
                          INSTITUTIONAL ARCHITECTURE
                        </span>
                        <div className="text-xl sm:text-2xl font-bold uppercase tracking-tight font-display">
                          CAPITAL ALLOCATION & SCALING
                        </div>
                        <p className="text-xs text-[#F2F0E8]/75 leading-relaxed font-normal">
                          Strategic engineering for sovereign founders, deep-tech innovators and category leaders.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div className="p-3 bg-white border border-[#171717]/15">
                          <div className="text-[9px] font-mono uppercase text-[#171717]/60">DEPLOYED ASSETS</div>
                          <div className="text-xs font-bold uppercase text-[#171717] mt-0.5">$420M+ Sovereign Fund</div>
                        </div>
                        <div className="p-3 bg-white border border-[#171717]/15">
                          <div className="text-[9px] font-mono uppercase text-[#171717]/60">DATA ROOM</div>
                          <div className="text-xs font-bold uppercase text-[#171717] mt-0.5">Verified Access</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDevMockup === 'portfolio' && (
                    <div className="space-y-4 text-left">
                      <div className="flex items-center justify-between text-[11px] font-mono uppercase pb-2 border-b border-[#171717]/10">
                        <span className="font-bold">STUDIO MONO / SPACES</span>
                        <span className="text-[#171717]/60">KYOTO BIENNALE</span>
                      </div>

                      <div className="bg-[#E5E2D8] text-[#171717] p-5 sm:p-6 space-y-2.5 border border-[#171717]/20">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-[#171717]/70">
                          MONOLITHIC CONCRETE & LIGHT
                        </span>
                        <div className="text-xl sm:text-2xl font-bold uppercase tracking-tight font-display">
                          PAVILION VI MONOGRAPH
                        </div>
                        <p className="text-xs text-[#171717]/80 leading-relaxed font-normal">
                          Raw concrete spatial exploration, acoustic silence, and shadow manipulation across civic halls.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div className="p-3 bg-white border border-[#171717]/15">
                          <div className="text-[9px] font-mono uppercase text-[#171717]/60">COORDINATES</div>
                          <div className="text-xs font-bold uppercase text-[#171717] mt-0.5 font-mono">34.6937° N, 135.5023° E</div>
                        </div>
                        <div className="p-3 bg-[#171717] text-[#DCEB78]">
                          <div className="text-[9px] font-mono uppercase text-[#DCEB78]/70">EDITION</div>
                          <div className="text-xs font-bold uppercase mt-0.5">Hardcover Vol. 04</div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

              </div>

            </div>
          </motion.div>


          {/* -------------------------------------------------------
              STAGE 02 — UI/UX DESIGN
              Visual: Experimental digital design playground
              ------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: STUDIO_EASING }}
            className="border-2 border-[#171717] bg-[#171717] text-[#F2F0E8] p-6 sm:p-10 lg:p-14 shadow-2xl relative"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#333333]">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-[#DCEB78] text-[#171717] text-xs font-mono font-bold">
                  02 / 04
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-[#DCEB78] font-bold">
                  WORKSPACE // EXPERIMENTAL DESIGN PLAYGROUND
                </span>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#F2F0E8]/50">
                FIGMA TO LIVE DOM PROTOCOL
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Interactive Design Playground & Specimen Board */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Visual Typography & Specimen Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  
                  {/* Big Glyph Specimen Card */}
                  <div className="sm:col-span-6 p-5 bg-[#202020] border border-[#333333] space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#F2F0E8]/50 uppercase">
                      <span>TYPE SPECIMEN</span>
                      <span className="text-[#DCEB78]">SPACE GROTESK</span>
                    </div>
                    <div className="text-5xl sm:text-6xl font-bold tracking-tighter text-[#DCEB78] font-display">
                      Aa 78
                    </div>
                    <div className="text-[11px] font-mono text-[#F2F0E8]/70 leading-tight">
                      Display tracking -0.05em • Geometric proportional rhythm
                    </div>
                  </div>

                  {/* Editorial Serif Italic Specimen */}
                  <div className="sm:col-span-6 p-5 bg-[#202020] border border-[#333333] space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#F2F0E8]/50 uppercase">
                      <span>EDITORIAL ACCENT</span>
                      <span className="text-[#DCEB78]">INSTRUMENT SERIF</span>
                    </div>
                    <div className="font-serif-editorial text-3xl sm:text-4xl italic text-white leading-snug">
                      "Form follows feeling."
                    </div>
                    <div className="text-[11px] font-mono text-[#F2F0E8]/70 leading-tight">
                      Humanist cadence paired with brutalist structure
                    </div>
                  </div>

                </div>

                {/* Spatial Grid & User Flow Board */}
                <div className="p-5 bg-[#202020] border border-[#333333] space-y-4">
                  
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-[#DCEB78]" />
                      <span className="text-[#DCEB78] font-bold">SPATIAL TOKENS SPECIFICATION</span>
                    </div>
                    <span className="text-[#F2F0E8]/50">[8PX BASELINE GRID]</span>
                  </div>

                  {/* Color Swatch Tokens */}
                  <div className="grid grid-cols-3 gap-2 font-mono text-[10px]">
                    <div className="p-2.5 bg-[#DCEB78] text-[#171717] font-bold text-center">
                      #DCEB78 LIME
                    </div>
                    <div className="p-2.5 bg-[#171717] text-[#F2F0E8] border border-white/20 font-bold text-center">
                      #171717 DARK
                    </div>
                    <div className="p-2.5 bg-[#F2F0E8] text-[#171717] font-bold text-center">
                      #F2F0E8 CREAM
                    </div>
                  </div>

                  {/* Interactive User Flow Step Sequence */}
                  <div className="pt-2 border-t border-[#333333] flex flex-wrap items-center justify-between text-[11px] font-mono gap-2 text-[#F2F0E8]/75">
                    <span className="px-2 py-1 bg-white/10 text-white">01 Discovery Wireframe</span>
                    <span>→</span>
                    <span className="px-2 py-1 bg-white/10 text-white">02 Spatial Artboard</span>
                    <span>→</span>
                    <span className="px-2 py-1 bg-[#DCEB78] text-[#171717] font-bold">03 Conversion Reality</span>
                  </div>

                </div>

              </div>

              {/* Right Column: Title & Description */}
              <div className="lg:col-span-5 space-y-6">
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight uppercase text-[#F2F0E8] font-display leading-[0.95]">
                  UI / UX <br />DESIGN
                </h3>

                <p className="text-lg sm:text-xl font-medium text-[#F2F0E8] leading-relaxed">
                  Intuitive, visually distinctive experiences designed around your customers.
                </p>

                <p className="text-sm text-[#F2F0E8]/70 leading-relaxed font-mono">
                  Editorial typography, balanced spatial grids, and thoughtful user flows engineered to guide visitors effortlessly toward action.
                </p>

                <div className="pt-2">
                  <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, '#contact')}
                    className="group inline-flex items-center space-x-2 px-6 py-3.5 bg-[#DCEB78] text-[#171717] text-xs font-mono font-bold uppercase tracking-wider hover:bg-white hover:text-[#171717] transition-colors shadow-md"
                  >
                    <span>Request UI/UX Direction</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>

            </div>
          </motion.div>


          {/* -------------------------------------------------------
              STAGE 03 — SEO OPTIMIZATION
              Visual: Experimental search universe
              ------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: STUDIO_EASING }}
            className="border-2 border-[#171717] bg-white p-6 sm:p-10 lg:p-14 shadow-2xl relative"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#171717]/15">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-[#171717] text-[#DCEB78] text-xs font-mono font-bold">
                  03 / 04
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-[#171717]/70 font-bold">
                  THE SEARCH UNIVERSE // ORGANIC DISCOVERABILITY
                </span>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#171717]/50">
                TECHNICAL & ON-PAGE ARCHITECTURE
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Title & Description */}
              <div className="lg:col-span-5 space-y-6">
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight uppercase text-[#171717] font-display leading-[0.95]">
                  SEO <br />OPTIMIZATION
                </h3>

                <p className="text-lg sm:text-xl font-medium text-[#171717] leading-relaxed">
                  Improve your website's discoverability through thoughtful technical and on-page SEO.
                </p>

                <p className="text-sm text-[#171717]/70 leading-relaxed font-mono">
                  Semantic metadata architecture, Google Core Web Vitals optimization, and clean indexing schema so the right customers find your business naturally.
                </p>

                <div className="pt-2">
                  <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, '#contact')}
                    className="group inline-flex items-center space-x-2 px-6 py-3.5 bg-[#171717] text-[#DCEB78] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#DCEB78] hover:text-[#171717] border border-[#171717] transition-colors"
                  >
                    <span>Elevate Search Visibility</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>

              {/* Right Column: Experimental Search Universe Installation */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* Oversized Animated Search Interface */}
                <div className="p-6 bg-[#171717] text-[#F2F0E8] border-2 border-[#171717] shadow-xl space-y-4">
                  
                  <div className="flex items-center justify-between text-xs font-mono text-[#DCEB78] pb-2 border-b border-[#333333]">
                    <span className="flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5" />
                      <span>SEARCH QUERY SIMULATION</span>
                    </span>
                    <span className="animate-pulse">● LIVE INDEX</span>
                  </div>

                  {/* Animated Search Bar with Cycling Queries */}
                  <div className="p-4 bg-[#222222] border border-[#444444] flex items-center justify-between font-mono text-sm sm:text-base">
                    <div className="flex items-center space-x-2 truncate">
                      <span className="text-[#DCEB78] font-bold">query:</span>
                      <span className="text-white font-medium truncate">
                        "{searchQueries[searchQueryIdx]}"
                      </span>
                    </div>
                    <span className="w-2.5 h-5 bg-[#DCEB78] animate-pulse shrink-0 ml-2" />
                  </div>

                  {/* Connected Search Constellation Nodes */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-xs font-mono">
                    <div className="p-2.5 bg-[#2a2a2a] border border-[#333333] text-center space-y-0.5">
                      <div className="text-[9px] text-[#DCEB78]">01 SCHEMA</div>
                      <div className="font-bold text-white text-[11px]">JSON-LD Entities</div>
                    </div>
                    <div className="p-2.5 bg-[#2a2a2a] border border-[#333333] text-center space-y-0.5">
                      <div className="text-[9px] text-[#DCEB78]">02 INDEXING</div>
                      <div className="font-bold text-white text-[11px]">Sitemap Protocol</div>
                    </div>
                    <div className="p-2.5 bg-[#2a2a2a] border border-[#333333] text-center space-y-0.5 col-span-2 sm:col-span-1">
                      <div className="text-[9px] text-[#DCEB78]">03 VITALS</div>
                      <div className="font-bold text-white text-[11px]">Sub-Second LCP</div>
                    </div>
                  </div>

                </div>

                {/* Floating Discoverability Tokens */}
                <div className="p-4 bg-[#F2F0E8] border border-[#171717]/15 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#171717]">
                  <span className="flex items-center gap-1.5 font-bold">
                    <span className="w-1.5 h-1.5 bg-[#171717]" />
                    Semantic Meta Architecture
                  </span>
                  <span className="flex items-center gap-1.5 font-bold">
                    <span className="w-1.5 h-1.5 bg-[#171717]" />
                    Contextual Authority
                  </span>
                  <span className="flex items-center gap-1.5 font-bold">
                    <span className="w-1.5 h-1.5 bg-[#171717]" />
                    Zero Black-Hat Tricks
                  </span>
                </div>

              </div>

            </div>
          </motion.div>


          {/* -------------------------------------------------------
              STAGE 04 — WEBSITE MAINTENANCE
              Visual: A living digital system
              ------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: STUDIO_EASING }}
            className="border-2 border-[#171717] bg-[#171717] text-[#F2F0E8] p-6 sm:p-10 lg:p-14 shadow-2xl relative"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#333333]">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-[#DCEB78] text-[#171717] text-xs font-mono font-bold">
                  04 / 04
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-[#DCEB78] font-bold">
                  LIVING DIGITAL SYSTEM // CONTINUOUS STEWARDSHIP
                </span>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                SYSTEM SYNCHRONIZED
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Living System Architecture & Waveform */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* Cyclical Pulse Monitor */}
                <div className="p-6 bg-[#202020] border border-[#333333] space-y-4">
                  
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#DCEB78] font-bold">CONTINUOUS SYSTEM HEARTBEAT</span>
                    <span className="text-[#F2F0E8]/50">STEWARDSHIP CYCLE</span>
                  </div>

                  {/* Animated Waveform Display */}
                  <div className="p-4 bg-[#141414] border border-[#333333] flex items-center justify-between h-20 overflow-hidden relative">
                    <svg viewBox="0 0 500 60" className="w-full h-full stroke-[#DCEB78] fill-none" preserveAspectRatio="none">
                      <path
                        d="M 0,30 L 80,30 L 100,10 L 120,50 L 140,20 L 160,40 L 180,30 L 260,30 L 280,10 L 300,50 L 320,20 L 340,40 L 360,30 L 500,30"
                        strokeWidth="2"
                        className="animate-pulse"
                      />
                    </svg>
                    <div className="absolute right-3 top-2 text-[10px] font-mono text-[#DCEB78]">
                      ACTIVE CADENCE
                    </div>
                  </div>

                  {/* Maintenance Cadence Pillars */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 bg-[#171717] border border-[#333333] space-y-1">
                      <div className="text-[10px] font-mono text-[#DCEB78] uppercase">CADENCE 01</div>
                      <div className="text-xs font-bold uppercase text-white">Continuous Code Updates</div>
                      <p className="text-[10px] text-[#F2F0E8]/60 font-mono">Software patches, dependencies & security scans</p>
                    </div>

                    <div className="p-3 bg-[#171717] border border-[#333333] space-y-1">
                      <div className="text-[10px] font-mono text-[#DCEB78] uppercase">CADENCE 02</div>
                      <div className="text-xs font-bold uppercase text-white">Cloud Backups & Snapshots</div>
                      <p className="text-[10px] text-[#F2F0E8]/60 font-mono">Automated data redundancy and instant recovery</p>
                    </div>

                    <div className="p-3 bg-[#171717] border border-[#333333] space-y-1">
                      <div className="text-[10px] font-mono text-[#DCEB78] uppercase">CADENCE 03</div>
                      <div className="text-xs font-bold uppercase text-white">Browser Compatibility</div>
                      <p className="text-[10px] text-[#F2F0E8]/60 font-mono">Continuous cross-device & view testing</p>
                    </div>

                    <div className="p-3 bg-[#171717] border border-[#333333] space-y-1">
                      <div className="text-[10px] font-mono text-[#DCEB78] uppercase">CADENCE 04</div>
                      <div className="text-xs font-bold uppercase text-white">Direct SLA Support</div>
                      <p className="text-[10px] text-[#F2F0E8]/60 font-mono">Fast-turnaround requests & troubleshooting</p>
                    </div>
                  </div>

                </div>

              </div>

              {/* Right Column: Title & Description */}
              <div className="lg:col-span-5 space-y-6">
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight uppercase text-[#F2F0E8] font-display leading-[0.95]">
                  WEBSITE <br />MAINTENANCE
                </h3>

                <p className="text-lg sm:text-xl font-medium text-[#F2F0E8] leading-relaxed">
                  Keep your digital presence updated, maintained and running smoothly.
                </p>

                <p className="text-sm text-[#F2F0E8]/70 leading-relaxed font-mono">
                  Reliable website care, updates and performance improvements after launch. We monitor, patch and optimize so your site never misses a beat.
                </p>

                <div className="pt-2">
                  <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, '#contact')}
                    className="group inline-flex items-center space-x-2 px-6 py-3.5 bg-[#DCEB78] text-[#171717] text-xs font-mono font-bold uppercase tracking-wider hover:bg-white hover:text-[#171717] transition-colors shadow-md"
                  >
                    <span>Secure Website Care</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

        {/* SECTION FOOTER: Minimal Editorial Handover */}
        <div className="mt-24 sm:mt-36 pt-12 border-t border-[#171717]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#171717]/60 block mb-1">
              THE NEXT STEP
            </span>
            <div className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#171717] font-display">
              Transparent investment. Fixed packages.
            </div>
          </div>

          <a
            href="#pricing"
            onClick={(e) => scrollToSection(e, '#pricing')}
            className="group inline-flex items-center space-x-2.5 text-xs font-mono font-bold uppercase tracking-widest text-[#171717] border-b-2 border-[#171717] pb-1 hover:text-[#171717]/70 transition-colors w-fit"
          >
            <span>VIEW PRICING & TIERS</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>

      </div>
    </section>
  );
}

/* =========================================================================
   PHASE 6 — PRICING: THE PRICE MACHINE
   Full-width experimental installation, giant price stage, distinct art direction
   ========================================================================= */
function Pricing({ selectedPackage, onSelectPackage }) {
  const shouldReduceMotion = useReducedMotion();

  const packagesData = {
    STARTER: {
      id: 'STARTER',
      index: '01',
      name: 'STARTER',
      price: '₹5,000',
      numericPrice: 5000,
      scope: 'Up to 3 pages.',
      tagline: 'Minimal, sharp, confident launch pad for modern ventures.',
      badge: 'ESSENTIAL LAUNCH',
      badgeClass: 'bg-[#171717] text-[#F2F0E8] border border-white/20',
      stageBg: 'bg-[#171717] text-[#F2F0E8] border-2 border-[#333333]',
      priceColor: 'text-[#F2F0E8]',
      accentColor: 'text-[#DCEB78]',
      buttonClass: 'bg-[#DCEB78] text-[#171717] hover:bg-white hover:text-[#171717]',
      secondaryClass: 'text-[#F2F0E8]/70 hover:text-[#DCEB78]',
      features: [
        'Up to 3 pages.',
        'Responsive design.',
        'Home, About, Contact.',
        'WhatsApp integration.',
        'Contact form functionality within the delivered client website.',
        'Basic SEO.',
        '15 days technical support.',
      ],
      specs: [
        { label: 'PAGES', val: 'Up to 3 pages' },
        { label: 'SUPPORT', val: '15 Days Included' },
        { label: 'STACK', val: 'React • Tailwind • Vite' },
        { label: 'TURNAROUND', val: 'Fast Track Sprint' },
      ],
    },
    PROFESSIONAL: {
      id: 'PROFESSIONAL',
      index: '02',
      name: 'PROFESSIONAL',
      price: '₹9,000',
      numericPrice: 9000,
      scope: 'Up to 6 pages.',
      tagline: 'The studio choice. Built for growing businesses demanding category dominance.',
      badge: 'RECOMMENDED STUDIO CHOICE',
      badgeClass: 'bg-[#171717] text-[#DCEB78] font-bold shadow-md',
      stageBg: 'bg-[#DCEB78] text-[#171717] border-2 border-[#171717]',
      priceColor: 'text-[#171717]',
      accentColor: 'text-[#171717]',
      buttonClass: 'bg-[#171717] text-[#DCEB78] hover:bg-transparent hover:text-[#171717] border-2 border-[#171717]',
      secondaryClass: 'text-[#171717]/80 hover:text-[#171717]',
      features: [
        'Up to 6 pages.',
        'Everything in Starter.',
        'Premium UI/UX.',
        'Services and portfolio sections.',
        'Google Analytics.',
        'Enhanced SEO.',
        '30 days technical support.',
        '1 month maintenance.',
      ],
      specs: [
        { label: 'PAGES', val: 'Up to 6 pages' },
        { label: 'MAINTENANCE', val: '1 Month Included' },
        { label: 'SUPPORT', val: '30 Days Included' },
        { label: 'ANALYTICS', val: 'Google Analytics 4' },
      ],
    },
    PREMIUM: {
      id: 'PREMIUM',
      index: '03',
      name: 'PREMIUM',
      price: '₹13,000',
      numericPrice: 13000,
      scope: 'Up to 10 pages.',
      tagline: 'The complete digital flagship experience for ambitious market leaders.',
      badge: 'FULL DIGITAL ENTERPRISE',
      badgeClass: 'bg-[#DCEB78] text-[#171717] font-bold shadow-md',
      stageBg: 'bg-[#111111] text-[#F2F0E8] border-2 border-[#444444]',
      priceColor: 'text-white',
      accentColor: 'text-[#DCEB78]',
      buttonClass: 'bg-[#DCEB78] text-[#171717] hover:bg-white hover:text-[#171717]',
      secondaryClass: 'text-[#F2F0E8]/70 hover:text-[#DCEB78]',
      features: [
        'Up to 10 pages.',
        'Everything in Professional.',
        'Custom UI/UX.',
        'Advanced interactions.',
        'Blog section.',
        'Advanced enquiry forms.',
        'SEO optimization.',
        '60 days technical support.',
        '2 months maintenance.',
      ],
      specs: [
        { label: 'PAGES', val: 'Up to 10 pages' },
        { label: 'MAINTENANCE', val: '2 Months Included' },
        { label: 'SUPPORT', val: '60 Days Included' },
        { label: 'FEATURES', val: 'Blog + Custom UI/UX' },
      ],
    },
  };

  const currentPkgKey = selectedPackage && packagesData[selectedPackage] ? selectedPackage : 'PROFESSIONAL';
  const currentPkg = packagesData[currentPkgKey];

  const handleSelect = (key) => {
    if (onSelectPackage) {
      onSelectPackage(key);
    }
  };

  const openWhatsAppInquiry = (phoneRaw) => {
    const message = `Hello PixelForge Studio! I would like to choose the ${currentPkg.name} Package (${currentPkg.price}) for my website project.`;
    window.open(`https://wa.me/${phoneRaw}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="pricing" className="bg-[#171717] text-[#F2F0E8] py-24 sm:py-36 border-b border-[#171717] relative overflow-hidden">
      
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[linear-gradient(to_right,#F2F0E8_1px,transparent_1px),linear-gradient(to_bottom,#F2F0E8_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================
            1. SECTION INTRODUCTION
            Label: 03 / THE INVESTMENT
            Headline: WHAT'S YOUR NEXT MOVE?
            ========================================================= */}
        <div className="pb-16 sm:pb-24 border-b border-[#333333]">
          
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-[#333333]">
            <span className="text-xs font-mono uppercase tracking-widest text-[#DCEB78] block">
              03 / THE INVESTMENT
            </span>

            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-[#DCEB78]">
              <span className="w-2 h-2 rounded-full bg-[#DCEB78] animate-pulse" />
              <span>THE PRICE MACHINE // SPECIFICATION ENGINE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-1">
              <div className="overflow-hidden py-1">
                <motion.h2
                  initial={{ y: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 1 : 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, ease: STUDIO_EASING }}
                  className="text-[clamp(2.75rem,8.2vw,8.5rem)] font-bold tracking-tighter uppercase text-[#F2F0E8] leading-[0.88] font-display"
                >
                  WHAT'S YOUR
                </motion.h2>
              </div>

              <div className="overflow-hidden py-1 sm:pl-16">
                <motion.h2
                  initial={{ y: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 1 : 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, delay: 0.15, ease: STUDIO_EASING }}
                  className="text-[clamp(2.75rem,8.2vw,8.5rem)] font-bold tracking-tighter uppercase text-[#DCEB78] leading-[0.88] font-display"
                >
                  NEXT MOVE?
                </motion.h2>
              </div>
            </div>

            <div className="lg:col-span-4 lg:pb-3 space-y-2 font-mono text-xs text-[#F2F0E8]/70">
              <div className="text-[#DCEB78] font-bold uppercase tracking-wider">
                // TRANSPARENT COMMERCIAL SPECIFICATION
              </div>
              <p className="leading-relaxed">
                Three fixed-scope production tiers. Zero ambiguous retainers. Select a package to engage the machine.
              </p>
            </div>
          </div>

        </div>

        {/* =========================================================
            2. THE KINETIC SWITCHBOARD (Interactive Package Selector)
            Oversized typographic package names and index numbers
            ========================================================= */}
        <div className="py-10 sm:py-14">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#F2F0E8]/50 mb-3 flex items-center justify-between">
            <span>ENGAGE SELECTION ENGINE:</span>
            <span className="text-[#DCEB78]">CURRENT SELECTION: {currentPkg.name} ({currentPkg.price})</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border-2 border-[#333333] divide-y md:divide-y-0 md:divide-x divide-[#333333] bg-[#1a1a1a]">
            {['STARTER', 'PROFESSIONAL', 'PREMIUM'].map((key) => {
              const item = packagesData[key];
              const isSelected = currentPkgKey === key;
              const isPro = key === 'PROFESSIONAL';

              return (
                <button
                  key={key}
                  onClick={() => handleSelect(key)}
                  className={`p-6 sm:p-8 text-left transition-all duration-300 relative group flex flex-col justify-between space-y-6 ${
                    isSelected
                      ? isPro
                        ? 'bg-[#DCEB78] text-[#171717] shadow-xl'
                        : 'bg-white text-[#171717] shadow-xl'
                      : 'hover:bg-[#222222] text-[#F2F0E8]'
                  }`}
                >
                  {/* Top Subline */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className={`font-bold ${isSelected ? 'text-[#171717]' : 'text-[#F2F0E8]/50'}`}>
                      {item.index} // TIER
                    </span>
                    {isPro && (
                      <span className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest ${
                        isSelected ? 'bg-[#171717] text-[#DCEB78]' : 'bg-[#DCEB78] text-[#171717]'
                      }`}>
                        RECOMMENDED
                      </span>
                    )}
                  </div>

                  {/* Large Package Title */}
                  <div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight uppercase font-display">
                      {item.name}
                    </div>
                    <div className={`text-xs font-mono mt-1 ${isSelected ? 'text-[#171717]/80' : 'text-[#F2F0E8]/60'}`}>
                      {item.scope}
                    </div>
                  </div>

                  {/* Price Preview & Active Indicator */}
                  <div className="flex items-center justify-between pt-4 border-t border-current/20 font-mono text-sm">
                    <span className="font-bold">{item.price}</span>
                    <span className="text-[10px] uppercase tracking-wider font-bold">
                      {isSelected ? '● ACTIVE STAGE' : 'SELECT TIER →'}
                    </span>
                  </div>

                  {/* Active Bottom Glow Line */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeSelectorIndicator"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-[#171717]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            3. THE GIANT PRICE STAGE (TRANSFORMED VISUAL IDENTITY)
            Enormous price display, distinct art direction, full details
            ========================================================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPkgKey}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20, scale: 0.99 }}
            transition={{ duration: 0.45, ease: STUDIO_EASING }}
            className={`p-8 sm:p-12 lg:p-16 shadow-2xl relative ${currentPkg.stageBg}`}
          >
            {/* Top Stage Identification Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-current/20 font-mono text-xs">
              <div className="flex items-center space-x-3">
                <span className="font-bold">TIER {currentPkg.index} // SPECIFICATION</span>
                <span className="opacity-40">•</span>
                <span className="opacity-80 uppercase tracking-widest">{currentPkg.scope}</span>
              </div>

              <div className={`px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest ${currentPkg.badgeClass}`}>
                {currentPkg.badge}
              </div>
            </div>

            {/* Giant Price Presentation Grid: Strictly constrained two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-8 lg:gap-12 items-start w-full min-w-0">
              
              {/* Left Column: Enormous Price Display & Actions (Constrained container) */}
              <div className="min-w-0 max-w-full box-border space-y-7 overflow-hidden">
                
                <div className="space-y-2 min-w-0">
                  <div className="text-xs font-mono uppercase tracking-widest opacity-60">
                    ONE-TIME PRODUCTION FEE
                  </div>
                  
                  {/* Giant Price Number: Responsive clamp scaling without overflow */}
                  <div className={`text-[clamp(2.75rem,6.2vw,6.5rem)] font-bold font-mono tracking-tight leading-[0.9] select-none break-normal whitespace-nowrap ${currentPkg.priceColor}`}>
                    {currentPkg.price}
                  </div>

                  <p className="text-base sm:text-lg font-medium leading-relaxed pt-2 opacity-90 max-w-md">
                    {currentPkg.tagline}
                  </p>
                </div>

                {/* Key Specs Bar */}
                <div className="grid grid-cols-2 gap-3 pt-1 font-mono text-xs">
                  {currentPkg.specs.map((spec, idx) => (
                    <div key={idx} className="p-3 bg-black/10 border border-current/15 min-w-0">
                      <div className="text-[9px] uppercase opacity-60 truncate">{spec.label}</div>
                      <div className="text-xs font-bold uppercase mt-0.5 truncate">{spec.val}</div>
                    </div>
                  ))}
                </div>

                {/* Direct Action CTAs with WhatsApp Links */}
                <div className="space-y-3 pt-3 border-t border-current/20">
                  <button
                    onClick={() => openWhatsAppInquiry('918239554141')}
                    className={`w-full py-4 px-6 text-xs font-mono font-bold uppercase tracking-widest transition-all duration-200 flex items-center justify-center space-x-3 shadow-xl ${currentPkg.buttonClass}`}
                  >
                    <span>COMMISSION {currentPkg.name} ({currentPkg.price})</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <div className="flex flex-wrap items-center justify-between text-xs font-mono pt-1 gap-2">
                    <span className="opacity-60">Alternate WhatsApp channel:</span>
                    <button
                      onClick={() => openWhatsAppInquiry('918010570715')}
                      className={`font-bold underline uppercase ${currentPkg.secondaryClass}`}
                    >
                      Line 02 (+91 80105 70715) →
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Column: Full Readable Feature List (Constrained container) */}
              <div className="min-w-0 max-w-full box-border space-y-6">
                
                <div className="pb-3 border-b border-current/20 flex items-center justify-between font-mono text-xs">
                  <span className="font-bold uppercase tracking-wider">ALL DELIVERABLES INCLUDED IN {currentPkg.name}:</span>
                  <span className="opacity-60">{currentPkg.features.length} SPECIFICATIONS</span>
                </div>

                <div className="space-y-3">
                  {currentPkg.features.map((feat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.04, ease: STUDIO_EASING }}
                      className="p-3.5 bg-black/10 border border-current/15 flex items-start space-x-3 text-sm font-medium"
                    >
                      <Check className="w-4 h-4 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Guarantee & Studio Quality Reassurance */}
                <div className="p-4 bg-black/15 border border-current/20 space-y-1 font-mono text-xs">
                  <div className="font-bold uppercase flex items-center gap-2">
                    <span>●</span>
                    <span>PIXELFORGE PRODUCTION GUARANTEE</span>
                  </div>
                  <p className="text-[11px] opacity-75 leading-relaxed">
                    Custom production code crafted from scratch. Zero generic templates, zero page builder bloatware, and complete handover upon completion.
                  </p>
                </div>

              </div>

            </div>

          </motion.div>
        </AnimatePresence>

        {/* =========================================================
            4. IMPORTANT PRICING TRANSPARENCY
            ========================================================= */}
        <div className="mt-14 pt-10 border-t border-[#333333]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            <div className="md:col-span-8 space-y-2 font-mono text-xs text-[#F2F0E8]/75">
              <p className="leading-relaxed font-bold text-[#F2F0E8]">
                Domain, hosting, paid plugins and third-party subscriptions are charged separately where applicable.
              </p>
              <p className="text-[11px] text-[#F2F0E8]/50 leading-relaxed">
                *Included technical support covers post-launch bug fixes, deployment guidance, and system handover for the stated duration (15, 30, or 60 days). Optional ongoing retainer maintenance is available on a separate monthly basis after the included maintenance term.
              </p>
            </div>

            <div className="md:col-span-4 md:text-right">
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
        </div>

      </div>
    </section>
  );
}

/* =========================================================================
   PHASE 7 — ABOUT: VISUAL KINETIC MANIFESTO & CELESTIAL BRAND CENTERPIECE
   Overlapping Typography, Animated Orbital Composition, Brand Seal
   ========================================================================= */
function About() {
  const shouldReduceMotion = useReducedMotion();
  const [activePhilosophy, setActivePhilosophy] = useState(0);

  const philosophies = [
    { num: '01', title: 'INTENT', sub: 'Design & Logic', desc: 'No generic templates or AI bloat. Every line of code and spatial token is engineered deliberately.' },
    { num: '02', title: 'RIGOR', sub: 'Bespoke Code', desc: 'Sub-second rendering, clean semantic HTML, modular components, and fluid responsive adaptability.' },
    { num: '03', title: 'COLLABORATION', sub: 'Direct Access', desc: 'Work directly with studio founders and senior engineers without agency bureaucracy.' },
  ];

  return (
    <section id="about" className="bg-[#F2F0E8] text-[#171717] py-28 sm:py-40 border-b border-[#171717] relative overflow-hidden">
      
      {/* Ghost Typography Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none text-[18vw] font-bold tracking-tighter text-[#171717]/[0.03] uppercase font-display whitespace-nowrap">
        PIXELFORGE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER */}
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

        {/* OVERLAPPING KINETIC TYPOGRAPHY MANIFESTO */}
        <div className="pb-16 sm:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="text-[clamp(2.75rem,8.2vw,8.5rem)] font-bold tracking-[-0.04em] uppercase text-[#171717] leading-[0.88] font-display">
              WE THINK.
            </div>

            <div className="text-[clamp(2.75rem,8.2vw,8.5rem)] font-bold tracking-[-0.04em] uppercase text-[#171717] leading-[0.88] sm:pl-12 flex flex-wrap items-baseline gap-4 font-display">
              <span>WE</span>
              <span className="font-serif-editorial font-normal italic lowercase tracking-tight text-[#171717] text-[1.12em]">
                design.
              </span>
            </div>

            <div className="sm:pl-24">
              <span className="inline-block bg-[#171717] text-[#DCEB78] px-5 sm:px-8 py-2 text-[clamp(2.4rem,7.5vw,7.6rem)] font-bold tracking-tighter uppercase shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-300 font-display">
                WE BUILD.
              </span>
            </div>

            <div className="text-[clamp(2.75rem,8.2vw,8.5rem)] font-bold tracking-[-0.04em] uppercase text-[#171717]/80 leading-[0.88] sm:pl-36 flex items-baseline gap-4 font-display">
              <span>WE</span>
              <span className="text-[#171717] underline decoration-[#171717]/40 underline-offset-8">
                REPEAT.
              </span>
            </div>
          </div>

          {/* CELESTIAL ROTATING ORBITAL BRAND SEAL */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center select-none">
              
              {/* Concentric rings */}
              <div className="absolute inset-0 rounded-full border border-[#171717]/15" />
              <div className="absolute inset-8 rounded-full border border-dashed border-[#171717]/30" />
              <div className="absolute inset-16 rounded-full border border-[#171717]/10" />

              {/* Counter-rotating SVG Typography Ring */}
              <motion.div
                animate={shouldReduceMotion ? {} : { rotate: 360 }}
                transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
                className="absolute inset-0 w-full h-full flex items-center justify-center"
              >
                <svg viewBox="0 0 300 300" className="w-full h-full">
                  <defs>
                    <path
                      id="studioOrbitPath"
                      d="M 150, 150 m -115, 0 a 115,115 0 1,1 230,0 a 115,115 0 1,1 -230,0"
                      fill="none"
                    />
                  </defs>
                  <text className="text-[10.5px] font-mono uppercase tracking-[0.27em] fill-[#171717] font-bold">
                    <textPath href="#studioOrbitPath">
                      DESIGN / CODE / IDEAS / CREATIVITY / DETAIL / DEVELOPMENT /{' '}
                    </textPath>
                  </text>
                </svg>
              </motion.div>

              {/* Monolithic Core */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center p-5 bg-[#F2F0E8] rounded-full border-2 border-[#171717] w-36 h-36 sm:w-44 sm:h-44 shadow-2xl">
                <div className="w-8 h-8 bg-[#171717] flex items-center justify-center mb-2 shadow-sm">
                  <div className="w-3.5 h-3.5 bg-[#DCEB78]" />
                </div>
                <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.24em] uppercase text-[#171717]">
                  PIXELFORGE
                </span>
                <span className="text-[9px] font-mono tracking-widest text-[#171717]/60 uppercase mt-0.5">
                  EST. 2026
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* NARRATIVE & 3 INTERACTIVE PHILOSOPHY PILLARS */}
        <div className="pt-16 sm:pt-20 border-t border-[#171717]/15 space-y-12">
          
          <div className="max-w-4xl space-y-6">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#171717] leading-relaxed">
              We are PixelForge Studio, an independent digital studio focused on building modern websites for businesses. We bring design and development together to create digital experiences that look distinctive, work smoothly and help businesses grow.
            </p>
          </div>

          {/* Interactive Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {philosophies.map((item, idx) => (
              <div
                key={item.num}
                onClick={() => setActivePhilosophy(idx)}
                className={`p-6 border transition-all duration-300 cursor-pointer ${
                  activePhilosophy === idx
                    ? 'bg-[#171717] text-[#F2F0E8] border-[#171717] shadow-lg'
                    : 'bg-white/50 text-[#171717] border-[#171717]/20 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono pb-3 mb-3 border-b border-current/15">
                  <span className="font-bold opacity-60">{item.num} / TENET</span>
                  <span className="font-bold uppercase tracking-wider">{item.title}</span>
                </div>
                <div className="text-base font-bold uppercase mb-2 font-display">{item.sub}</div>
                <p className="text-xs leading-relaxed opacity-75 font-mono">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>

        {/* FINAL MANIFESTO STATEMENT */}
        <div className="mt-20 sm:mt-28 pt-12 sm:pt-16 border-t border-[#171717]/15">
          <div className="max-w-5xl space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#171717]/60 block">
              STUDIO COMMITMENT
            </span>

            <div className="text-[clamp(2.5rem,7vw,6.5rem)] font-bold tracking-tight uppercase text-[#171717] leading-[0.92] font-display">
              WE MAKE THE INTERNET
            </div>

            <div>
              <span className="inline-block bg-[#171717] text-[#DCEB78] px-5 sm:px-10 py-2 sm:py-3 text-[clamp(2.4rem,7vw,6.5rem)] font-bold tracking-tighter uppercase shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-300 font-display">
                LOOK BETTER.
              </span>
            </div>

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
   PHASE 8 — CONTACT: THE FOUR PORTALS
   4 Distinctive Architectural Monolith Gateways
   Opening Headline, Label: 05 / THE CONNECTION
   Closing Statement: "DON'T JUST HAVE AN IDEA. BUILD IT."
   No Contact Form.
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

  const packagePricingMap = {
    STARTER: '₹5,000',
    PROFESSIONAL: '₹9,000',
    PREMIUM: '₹13,000',
  };

  // Direct URLs preserving package if selected
  const getWhatsAppURL = (numberRaw) => {
    const pkgText = selectedPackage ? ` (Interested in ${selectedPackage} Package - ${packagePricingMap[selectedPackage] || ''})` : '';
    const message = `Hello PixelForge Studio! I am interested in your website development services${pkgText}. I would like to discuss a project.`;
    return `https://wa.me/${numberRaw}?text=${encodeURIComponent(message)}`;
  };

  const getEmailURL = (emailAddress) => {
    const subject = `Project Inquiry: PixelForge Studio (${selectedPackage || 'Custom'} Package)`;
    const body = `Hello PixelForge Studio,\n\nI would like to discuss building a website for my business (Interested in ${selectedPackage || 'Custom'} package).\n\nBest regards,`;
    return `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const portals = [
    {
      id: 'portal-01',
      number: 'PORTAL 01',
      channel: 'WHATSAPP',
      display: '+91 82395 54141',
      url: getWhatsAppURL('918239554141'),
      lead: 'NIDS VAISHNAV',
      role: 'LEAD DEVELOPER',
      actionLabel: 'OPEN CHAT 01',
      hoverStyle: 'hover:bg-[#DCEB78] hover:text-[#171717]',
    },
    {
      id: 'portal-02',
      number: 'PORTAL 02',
      channel: 'WHATSAPP',
      display: '+91 80105 70715',
      url: getWhatsAppURL('918010570715'),
      lead: 'PRATHMESH BOLE',
      role: 'DESIGN & CODE LEAD',
      actionLabel: 'OPEN CHAT 02',
      hoverStyle: 'hover:bg-[#DCEB78] hover:text-[#171717]',
    },
    {
      id: 'portal-03',
      number: 'PORTAL 03',
      channel: 'EMAIL',
      display: 'nidsvaishnav10@gmail.com',
      url: getEmailURL('nidsvaishnav10@gmail.com'),
      lead: 'NIDS VAISHNAV',
      role: 'STUDIO DIRECT INBOX',
      actionLabel: 'COMPOSE EMAIL 01',
      hoverStyle: 'hover:bg-[#F2F0E8] hover:text-[#171717]',
    },
    {
      id: 'portal-04',
      number: 'PORTAL 04',
      channel: 'EMAIL',
      display: 'prathmeshbole5@gmail.com',
      url: getEmailURL('prathmeshbole5@gmail.com'),
      lead: 'PRATHMESH BOLE',
      role: 'STUDIO DIRECT INBOX',
      actionLabel: 'COMPOSE EMAIL 02',
      hoverStyle: 'hover:bg-[#F2F0E8] hover:text-[#171717]',
    },
  ];

  return (
    <section
      id="contact"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-[#171717] text-[#F2F0E8] py-28 sm:py-44 border-b border-[#333333] relative overflow-hidden"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[linear-gradient(to_right,#F2F0E8_1px,transparent_1px),linear-gradient(to_bottom,#F2F0E8_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER: 05 / THE CONNECTION */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-12 mb-12 border-b border-[#333333]">
          <span className="text-xs font-mono uppercase tracking-widest text-[#DCEB78] block">
            05 / THE CONNECTION
          </span>

          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-[#DCEB78]">
            <span className="w-2 h-2 rounded-full bg-[#DCEB78] animate-pulse" />
            <span>Accepting New Clients • 2026 Season</span>
          </div>
        </div>

        {/* OPENING HEADLINE */}
        <div className="pb-14 sm:pb-20 space-y-3">
          <div className="text-[clamp(2.75rem,8.5vw,8.5rem)] font-bold tracking-[-0.04em] uppercase text-[#F2F0E8] leading-[0.88] font-display">
            YOUR NEXT
          </div>

          <div className="font-serif-editorial text-[clamp(2.75rem,8.5vw,8.5rem)] font-normal italic lowercase tracking-tight text-[#F2F0E8]/90 leading-[0.88] sm:pl-16">
            big idea
          </div>

          <div className="sm:pl-32 pt-2">
            <span className="inline-block bg-[#DCEB78] text-[#171717] px-6 sm:px-12 py-2 sm:py-3.5 text-[clamp(2.5rem,8vw,8rem)] font-bold tracking-tighter uppercase shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-300 font-display">
              STARTS HERE.
            </span>
          </div>

          <p className="text-lg sm:text-2xl text-[#F2F0E8]/80 max-w-2xl font-medium leading-relaxed pt-6">
            Four direct interactive portals to our studio leads. Every portal has equal importance. Pick the communication channel and creator that fits your workflow.
          </p>
        </div>

        {/* COMMISSION CONTEXT STRIP */}
        <div className="mb-14 p-5 sm:p-6 bg-[#1f1f1f] border border-[#333333] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#DCEB78] block">
              COMMISSION CONTEXT
            </span>
            <div className="text-base sm:text-lg font-bold text-[#F2F0E8] mt-0.5 font-display">
              Selected Scope: <span className="underline decoration-[#DCEB78]">{selectedPackage || 'PROFESSIONAL'}</span>
              <span className="ml-2 text-sm font-mono text-[#DCEB78]">
                ({packagePricingMap[selectedPackage] || '₹9,000'})
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-[#F2F0E8]/50 mr-1">Switch:</span>
            {['STARTER', 'PROFESSIONAL', 'PREMIUM'].map((pkg) => (
              <button
                key={pkg}
                onClick={() => onSelectPackage && onSelectPackage(pkg)}
                className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 ${
                  selectedPackage === pkg
                    ? 'bg-[#DCEB78] text-[#171717] shadow-sm'
                    : 'bg-transparent text-[#F2F0E8] hover:bg-white/10 border border-[#444444]'
                }`}
              >
                {pkg} ({packagePricingMap[pkg]})
              </button>
            ))}
          </div>
        </div>

        {/* THE FOUR PORTALS: 2x2 Grid (Desktop) / Stacked (Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 border border-[#333333] divide-y md:divide-y-0 md:divide-x divide-[#333333] bg-[#1a1a1a] mb-20 sm:mb-28">
          {portals.map((portal) => (
            <a
              key={portal.id}
              href={portal.url}
              target={portal.channel === 'WHATSAPP' ? '_blank' : undefined}
              rel={portal.channel === 'WHATSAPP' ? 'noopener noreferrer' : undefined}
              className={`p-8 sm:p-12 block transition-all duration-300 ${portal.hoverStyle} group relative border-b border-[#333333] last:border-b-0`}
            >
              <div className="flex items-center justify-between text-xs font-mono tracking-wider opacity-70 pb-6 mb-6 border-b border-current/15">
                <span className="font-bold uppercase flex items-center gap-2">
                  {portal.channel === 'WHATSAPP' ? (
                    <Phone className="w-3.5 h-3.5" />
                  ) : (
                    <Mail className="w-3.5 h-3.5" />
                  )}
                  {portal.number} — {portal.channel}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest">
                  {portal.role}
                </span>
              </div>

              <div className="text-[11px] font-mono uppercase tracking-widest opacity-60 mb-2">
                {portal.lead}
              </div>

              <div className="space-y-2 mb-8">
                <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-mono font-bold tracking-tight break-all transition-transform duration-300 group-hover:translate-x-1.5">
                  {portal.display}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-current/15 text-xs font-mono">
                <span className="font-bold uppercase tracking-wider">
                  {portal.actionLabel}
                </span>
                <div className="w-10 h-10 rounded-full border border-current flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:translate-x-1 group-hover:-translate-y-1">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* DRAMATIC CLOSING CREED */}
        <div className="pt-16 sm:pt-24 border-t border-[#333333]">
          <div className="max-w-5xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#DCEB78] block">
              THE CLOSING CREED
            </span>

            <div className="text-[clamp(2.75rem,8vw,7.5rem)] font-bold tracking-tight uppercase text-[#F2F0E8] leading-[0.9] font-display">
              DON'T JUST
            </div>

            <div className="text-[clamp(2.75rem,8vw,7.5rem)] font-bold tracking-tight uppercase text-[#F2F0E8]/70 leading-[0.9] sm:pl-16 font-display">
              HAVE AN IDEA.
            </div>

            <div className="sm:pl-32">
              <motion.div
                style={{
                  transform: shouldReduceMotion
                    ? 'none'
                    : `translate3d(${mouseOffset.x * 8}px, ${mouseOffset.y * 6}px, 0)`,
                }}
                className="inline-block"
              >
                <span className="inline-block bg-[#DCEB78] text-[#171717] px-6 sm:px-12 py-2 sm:py-4 text-[clamp(2.5rem,8vw,8rem)] font-bold tracking-tighter uppercase shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-300 font-display">
                  BUILD IT.
                </span>
              </motion.div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* =========================================================================
   PHASE 9 — FOOTER: THE FINAL IMPRESSION
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
        
        {/* Top: Large Brand Wordmark */}
        <div className="pb-14 border-b border-[#333333]">
          <h2 className="text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tighter uppercase text-[#F2F0E8] leading-none transition-colors duration-300 hover:text-white font-display select-none">
            PixelForge Studio
          </h2>
        </div>

        {/* Middle: 3 Main Columns */}
        <div className="py-14 border-b border-[#333333] grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* COLUMN 1 — BRAND */}
          <div className="md:col-span-5 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#DCEB78]">
              About the Brand
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-tight text-[#F2F0E8] font-display">
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
            <ul className="space-y-2.5 text-xs uppercase font-mono font-bold tracking-wider">
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
              <div>
                <span className="text-[#F2F0E8]/50 block text-[10px] uppercase">WhatsApp:</span>
                <div className="flex flex-col space-y-1.5 mt-0.5">
                  <a
                    href={`https://wa.me/${CONTACT_DATA.phone1.raw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#DCEB78] transition-colors inline-flex items-center space-x-1 group font-bold"
                  >
                    <span>{CONTACT_DATA.phone1.display}</span>
                    <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <a
                    href={`https://wa.me/${CONTACT_DATA.phone2.raw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#DCEB78] transition-colors inline-flex items-center space-x-1 group font-bold"
                  >
                    <span>{CONTACT_DATA.phone2.display}</span>
                    <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>

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

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#F2F0E8]/60 gap-4">
          <div>
            © {CURRENT_YEAR} PIXELFORGE STUDIO. All rights reserved.
          </div>
          <div>
            Designed with care. Built for business.
          </div>
        </div>

        {/* Attribution */}
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
    <div className="min-h-screen bg-[#F2F0E8] text-[#171717] font-sans selection:bg-[#DCEB78] selection:text-[#171717] flex flex-col relative">
      {/* Subtle Film Grain Texture Overlay */}
      <div className="studio-grain" aria-hidden="true" />

      {/* 1. Global Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* 2. Hero Section with 3D Depth Deck */}
        <Hero
          onStartProject={() => setSelectedPackage('PROFESSIONAL')}
          onViewPlans={() => {}}
        />

        {/* 3. Services (Interactive Studio Showcase & Discipline Lab) */}
        <Services />

        {/* 4. Pricing (Asymmetric Editorial Dossier Architecture) */}
        <Pricing
          selectedPackage={selectedPackage}
          onSelectPackage={handleSelectPackage}
        />

        {/* 5. About (Kinetic Manifesto & Celestial Brand Centerpiece) */}
        <About />

        {/* 6. Contact (The Four Portals) */}
        <Contact
          selectedPackage={selectedPackage}
          onSelectPackage={handleSelectPackage}
        />
      </main>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}
