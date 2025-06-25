'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import menuData from '@/data/menu.json';

export default function AIRecommendations() {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      generateRecommendations();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const generateRecommendations = () => {
    const allItems = menuData.categories.flatMap(category => category.items);
    const popularItems = allItems.filter(item => item.popular).slice(0, 3);
    setRecommendations(popularItems);
  };

  const handleOrderClick = (item: any) => {
    const message = `Hi! I would like to order ${item.name} for ₹${item.price}. Can you please help me with the order?`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-24 right-6 z-40 max-w-sm"
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5" />
            <div>
              <h3 className="font-semibold">AI Recommendations</h3>
              <p className="text-sm opacity-90">Popular dishes for you</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {recommendations.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                {item.name.charAt(0)}
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-600">₹{item.price}</p>
              </div>

              <button
                onClick={() => handleOrderClick(item)}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
              >
                Order
              </button>
            </motion.div>
          ))}
        </div>

        <div className="p-3 bg-gray-50 border-t border-gray-100 rounded-b-2xl">
          <button
            onClick={() => setIsVisible(false)}
            className="w-full text-center text-sm text-gray-500 hover:text-gray-700"
          >
            Dismiss
          </button>
        </div>
      </div>
    </motion.div>
  );
} 