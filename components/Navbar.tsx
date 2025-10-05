'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MapPin, Clock } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Detect active section
      const sections = ['home', 'menu', 'order', 'location'];
      const scrollPosition = window.scrollY + 200;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'Order', href: '#order' },
    { name: 'Location', href: '#location' },
  ];

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const element = document.querySelector(href) as HTMLElement;
      if (element) {
        const navbarHeight = 120;
        const elementPosition = element.offsetTop - navbarHeight;
        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        {/* Top Bar */}
        <div className="bg-amber-600 text-white py-1.5 sm:py-2 px-2 sm:px-4">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between text-xs gap-1 sm:gap-0">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 justify-center sm:justify-start">
              <div className="flex items-center gap-1 sm:gap-2">
                <Phone className="w-3 h-3" />
                <span className="text-xs">+91-9876543210</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Clock className="w-3 h-3" />
                <span className="text-xs">10AM-10PM</span>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <MapPin className="w-3 h-3" />
              <span className="text-xs">Fancy Bazaar</span>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="bg-gray-900/95 backdrop-blur-md shadow-lg transition-all duration-300">
          <div className="w-full px-2">
            <div className="flex items-center justify-between h-16 sm:h-20 relative">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => scrollToSection('#home')}
              >
                <div className="flex items-center gap-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">GF</span>
                  </div>
                  <div className="hidden sm:block">
                    <h1 className="font-display font-bold text-sm text-white">
                      Guwahati Flavors
                    </h1>
                  </div>
                </div>
              </motion.div>

              {/* Tablet Navigation */}
              <div className="hidden sm:flex md:hidden items-center gap-1">
                {navItems.slice(0, 2).map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.href)}
                    className={`font-medium text-xs px-2 py-1 rounded transition-all duration-300 ${
                      activeSection === item.href.slice(1) 
                        ? 'text-amber-400 bg-white/20' 
                        : 'text-white hover:text-amber-200 hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  onClick={() => scrollToSection('#order')}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded-full font-semibold text-xs transition-all duration-300"
                >
                  Order
                </motion.button>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-3 lg:gap-6 absolute left-1/2 transform -translate-x-1/2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.href)}
                    className={`font-medium text-sm transition-all duration-300 hover:scale-105 px-2 py-1.5 rounded-lg ${
                      activeSection === item.href.slice(1) 
                        ? 'text-amber-400 bg-white/20' 
                        : 'text-white hover:text-amber-200 hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
              
              {/* Order Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                onClick={() => scrollToSection('#order')}
                className="hidden md:block bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Order Now
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => setIsOpen(!isOpen)}
                className="sm:hidden p-2 rounded transition-all duration-300 text-white hover:bg-white/10 w-10 h-10 flex items-center justify-center flex-shrink-0"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="sm:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 overflow-hidden"
              >
                <div className="container mx-auto px-3 py-4">
                  <div className="flex flex-col gap-2">
                    {navItems.map((item, index) => (
                      <motion.button
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        onClick={() => scrollToSection(item.href)}
                        className={`text-left font-medium text-base py-3 px-3 rounded-lg transition-colors duration-300 min-h-[44px] flex items-center ${
                          activeSection === item.href.slice(1)
                            ? 'text-amber-600 bg-amber-50'
                            : 'text-gray-700 hover:text-amber-600'
                        }`}
                      >
                        {item.name}
                      </motion.button>
                    ))}
                    
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                      onClick={() => scrollToSection('#order')}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-3 rounded-full font-semibold text-base hover:shadow-lg transition-all duration-300 text-center mt-2 min-h-[44px] flex items-center justify-center"
                    >
                      Order Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-24 sm:h-32" />
    </>
  );
}