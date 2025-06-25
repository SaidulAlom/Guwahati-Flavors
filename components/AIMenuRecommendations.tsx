'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Clock, Star, TrendingUp } from 'lucide-react';
import menuData from '@/data/menu.json';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isVeg: boolean;
  isSpicy: boolean;
  popular: boolean;
}

export default function AIMenuRecommendations() {
  const [recommendations, setRecommendations] = useState<MenuItem[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show recommendations after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      generateRecommendations();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const generateRecommendations = () => {
    const allItems = menuData.categories.flatMap(category => category.items);
    const currentHour = new Date().getHours();
    
    let recommendedItems: MenuItem[] = [];

    // Time-based recommendations
    if (currentHour >= 6 && currentHour < 12) {
      // Breakfast time - recommend lighter items
      recommendedItems = allItems.filter(item => 
        item.name.toLowerCase().includes('tea') || 
        item.name.toLowerCase().includes('pitha') ||
        !item.isSpicy
      );
    } else if (currentHour >= 12 && currentHour < 17) {
      // Lunch time - recommend main dishes
      recommendedItems = allItems.filter(item => 
        item.name.toLowerCase().includes('thali') ||
        item.name.toLowerCase().includes('curry') ||
        item.popular
      );
    } else if (currentHour >= 17 && currentHour < 22) {
      // Dinner time - recommend popular items
      recommendedItems = allItems.filter(item => item.popular);
    } else {
      // Late night - recommend snacks
      recommendedItems = allItems.filter(item => 
        item.name.toLowerCase().includes('momos') ||
        item.name.toLowerCase().includes('snack')
      );
    }

    // Add some popular items if not enough recommendations
    if (recommendedItems.length < 3) {
      const popularItems = allItems.filter(item => item.popular);
      recommendedItems = [...recommendedItems, ...popularItems].slice(0, 3);
    }

    // Shuffle and take top 3
    recommendedItems = recommendedItems
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    setRecommendations(recommendedItems);
  };

  const getRecommendationReason = (item: MenuItem) => {
    const currentHour = new Date().getHours();
    
    if (item.popular) return "🔥 Popular Choice";
    if (currentHour >= 6 && currentHour < 12) return "🌅 Perfect for Breakfast";
    if (currentHour >= 12 && currentHour < 17) return "🌞 Great for Lunch";
    if (currentHour >= 17 && currentHour < 22) return "🌙 Ideal for Dinner";
    return "⭐ Highly Recommended";
  };

  const handleOrderClick = (item: MenuItem) => {
    const message = `Hi! I would like to order ${item.name} for ₹${item.price}. Can you please help me with the order?`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed bottom-24 right-6 z-40 max-w-sm"
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold">AI Recommendations</h3>
              <p className="text-sm opacity-90">Based on time & popularity</p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="p-4 space-y-3">
          {recommendations.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-amber-50 transition-colors duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                {item.name.charAt(0)}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 truncate">{item.name}</h4>
                <p className="text-sm text-gray-600 truncate">{item.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                    {getRecommendationReason(item)}
                  </span>
                  <span className="text-sm font-semibold text-amber-600">₹{item.price}</span>
                </div>
              </div>

              <button
                onClick={() => handleOrderClick(item)}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Order
              </button>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-100">
          <button
            onClick={() => setIsVisible(false)}
            className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300"
          >
            Dismiss
          </button>
        </div>
      </div>
    </motion.div>
  );
} 