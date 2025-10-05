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
        <div className="bg-amber-600 text-white py-2 px-3 sm:px-4 md:px-6">
          <div className="container mx-auto flex flex-col xs:flex-row items-center justify-between text-xs sm:text-sm gap-2 xs:gap-0">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 justify-center xs:justify-start">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>+91-9876543210</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">10:00 AM - 10:00 PM</span>
                <span className="sm:hidden">10AM-10PM</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden md:inline">Fancy Bazaar, Guwahati</span>
              <span className="md:hidden">Fancy Bazaar</span>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="bg-gray-900/95 backdrop-blur-md shadow-lg transition-all duration-300">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16 md:h-18 lg:h-20 xl:h-24">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => scrollToSection('#home')}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-lg md:text-xl">GF</span>
                  </div>
                  <div>
                    <h1 className="font-display font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white transition-colors duration-300">
                      Guwahati Flavors
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base text-amber-100 transition-colors duration-300">
                      Authentic Assamese Cuisine
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.href)}
                    className={`font-medium text-sm xl:text-base transition-all duration-300 hover:scale-105 px-3 py-2 rounded-lg ${
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
                  transition={{ duration: 0.5, delay: 0.4 }}
                  onClick={() => scrollToSection('#order')}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm xl:text-base hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Order Now
                </motion.button>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 sm:p-3 rounded-lg transition-all duration-300 text-white hover:bg-white/10 hover:scale-105"
              >
                {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
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
                className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 overflow-hidden"
              >
                <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
                  <div className="flex flex-col gap-2 sm:gap-3">
                    {navItems.map((item, index) => (
                      <motion.button
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        onClick={() => scrollToSection(item.href)}
                        className={`text-left font-medium text-base sm:text-lg py-3 sm:py-4 px-3 sm:px-4 rounded-lg transition-colors duration-300 ${
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
                      className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:shadow-lg transition-all duration-300 text-center mt-2"
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
      <div className="h-24 sm:h-28 md:h-30 lg:h-32 xl:h-36" />
    </>
  );
}