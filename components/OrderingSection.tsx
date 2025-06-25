'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MessageCircle, Smartphone, Clock, MapPin } from 'lucide-react';

const orderingOptions = [
  {
    name: 'WhatsApp',
    description: 'Quick order via WhatsApp',
    icon: MessageCircle,
    color: 'from-green-500 to-green-600',
    action: 'Order Now',
    estimate: '15-20 min',
    phone: '+91-9876543210'
  },
  {
    name: 'Zomato',
    description: 'Order through Zomato',
    icon: Smartphone,
    color: 'from-red-500 to-red-600',
    action: 'Open Zomato',
    estimate: '25-30 min',
    url: '#'
  },
  {
    name: 'Swiggy',
    description: 'Fast delivery via Swiggy',
    icon: Smartphone,
    color: 'from-orange-500 to-orange-600',
    action: 'Open Swiggy',
    estimate: '20-25 min',
    url: '#'
  }
];

const WhatsAppFloat = () => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse-ring" />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('https://wa.me/919876543210?text=Hi! I would like to order food', '_blank')}
          className="relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default function OrderingSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50" ref={ref}>
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Order Your <span className="gradient-text">Favorite</span> Dish
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose your preferred way to order. Fast delivery, authentic taste guaranteed!
            </p>
          </motion.div>

          {/* Ordering Options */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {orderingOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <motion.div
                  key={option.name}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${option.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="font-display text-2xl font-bold text-gray-900 mb-3">
                      {option.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {option.description}
                    </p>

                    {/* Delivery Time */}
                    <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>Est. delivery: {option.estimate}</span>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => {
                        if (option.phone) {
                          window.open(`https://wa.me/${option.phone.replace('+', '').replace('-', '')}?text=Hi! I would like to order food`, '_blank');
                        } else if (option.url) {
                          window.open(option.url, '_blank');
                        }
                      }}
                      className={`w-full bg-gradient-to-r ${option.color} text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                    >
                      {option.action}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Call Now Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-lg text-center max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-gray-900">
                  Call for Instant Order
                </h3>
                <p className="text-gray-600">Speak directly with our team</p>
              </div>
            </div>

            <div className="group relative inline-block">
              <div className="absolute inset-0 bg-blue-500 rounded-full animate-pulse-ring opacity-25" />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('tel:+919876543210', '_self')}
                className="relative bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-xl px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300"
              >
                📞 +91-9876543210
              </motion.button>
            </div>

            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Available: 10 AM - 10 PM</span>
            </div>
          </motion.div>

          {/* Location Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-12"
          >
            <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
              <MapPin className="w-5 h-5" />
              <span>Serving across Guwahati</span>
            </div>
            <p className="text-sm text-gray-500">
              Free delivery for orders above ₹300 • Delivery charge: ₹30
            </p>
          </motion.div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <WhatsAppFloat />
    </>
  );
}