'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Gift, Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  code: string;
  image: string;
  isLimited: boolean;
}

const offers: Offer[] = [
  {
    id: '1',
    title: 'First Order Special',
    description: 'Get 20% off on your first order above ₹500',
    discount: '20% OFF',
    validUntil: '2024-12-31',
    code: 'FIRST20',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    isLimited: false,
  },
  {
    id: '2',
    title: 'Weekend Thali Deal',
    description: 'Special weekend pricing on all thali combos',
    discount: '₹50 OFF',
    validUntil: '2024-12-31',
    code: 'WEEKEND50',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
    isLimited: true,
  },
  {
    id: '3',
    title: 'Family Pack Offer',
    description: 'Order for 4+ people and save big',
    discount: '30% OFF',
    validUntil: '2024-12-31',
    code: 'FAMILY30',
    image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg',
    isLimited: false,
  },
];

export default function SpecialOffers() {
  const [currentOffer, setCurrentOffer] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      const distance = endOfDay.getTime() - now;

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClaimOffer = (offer: Offer) => {
    const message = `Hi! I&apos;d like to claim the &quot;${offer.title}&quot; offer with code ${offer.code}. Can you help me place an order?`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 via-orange-50 to-amber-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Special <span className="gradient-text">Offers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don&apos;t miss out on our exclusive deals and limited-time offers
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentOffer}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={offers[currentOffer].image}
                    alt={offers[currentOffer].title}
                    fill
                    priority={currentOffer === 0}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                  
                  {offers[currentOffer].isLimited && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Limited Time
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-3xl font-bold">
                      {offers[currentOffer].discount}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col justify-center">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {offers[currentOffer].title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {offers[currentOffer].description}
                    </p>
                    
                    <div className="bg-amber-100 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Promo Code:</span>
                        <span className="font-mono font-bold text-amber-600">
                          {offers[currentOffer].code}
                        </span>
                      </div>
                    </div>

                    {offers[currentOffer].isLimited && (
                      <div className="flex items-center gap-2 text-red-600 mb-4">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Ends in: {timeLeft}
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleClaimOffer(offers[currentOffer])}
                    className="group bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Gift className="w-4 h-4" />
                    Claim Offer
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Offer Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {offers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentOffer(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentOffer
                    ? 'bg-amber-500 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* All Offers Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-white fill-current" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{offer.title}</h4>
                    <p className="text-sm text-amber-600 font-bold">{offer.discount}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
                
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <span className="text-xs text-gray-500">Code: </span>
                  <span className="font-mono font-bold text-gray-900">{offer.code}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}