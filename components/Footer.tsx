'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Heart, Facebook, Instagram, Twitter } from 'lucide-react';

const footerLinks = {
  menu: [
    { name: 'Traditional Thali', href: '#' },
    { name: 'Main Dishes', href: '#' },
    { name: 'Snacks & Starters', href: '#' },
    { name: 'Beverages', href: '#' },
  ],
  services: [
    { name: 'Online Ordering', href: '#' },
    { name: 'Home Delivery', href: '#' },
    { name: 'Catering', href: '#' },
    { name: 'Gift Vouchers', href: '#' },
  ],
  support: [
    { name: 'Contact Us', href: '#' },
    { name: 'FAQs', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ],
};

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
  { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-600' },
  { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🍛</span>
              </div>
              <h3 className="font-display text-2xl font-bold">Guwahati Flavors</h3>
            </div>

            <p className="text-gray-400 mb-6 leading-relaxed">
              Serving authentic Assamese cuisine with love and tradition. Experience the rich heritage of Assam through our carefully crafted dishes.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span className="text-gray-400">Fancy Bazaar, Guwahati, Assam</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-amber-500" />
                <span className="text-gray-400">+91-9876543210</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-amber-500" />
                <span className="text-gray-400">hello@guwahatiflavors.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-amber-500" />
                <span className="text-gray-400">10 AM - 10 PM (Daily)</span>
              </div>
            </div>
          </motion.div>

          {/* Menu Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-lg mb-6">Our Menu</h4>
            <ul className="space-y-3">
              {footerLinks.menu.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-amber-500 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-amber-500 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-lg mb-6">Support</h4>
            <ul className="space-y-3 mb-8">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-amber-500 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div>
              <h5 className="font-medium mb-4">Follow Us</h5>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-300 ${social.color}`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Newsletter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="border-t border-gray-800"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-2">Stay Updated</h4>
              <p className="text-gray-400">Get notified about our special offers and new dishes</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:min-w-[250px] px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-amber-500 transition-colors duration-300"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Guwahati Flavors. All rights reserved.
            </p>
            
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>in Assam</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}