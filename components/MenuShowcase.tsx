'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Star, Leaf, Flame } from 'lucide-react';
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

interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  items: MenuItem[];
}

const filters = [
  { id: 'all', name: 'All Items', icon: '🍽️' },
  { id: 'veg', name: 'Vegetarian', icon: '🥬' },
  { id: 'non-veg', name: 'Non-Veg', icon: '🍖' },
  { id: 'popular', name: 'Popular', icon: '⭐' },
];

export default function MenuShowcase() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categories: MenuCategory[] = menuData.categories;

  const filteredItems = categories.flatMap(category => 
    category.items.filter(item => {
      // First filter by category if one is selected
      if (selectedCategory && category.id !== selectedCategory) {
        return false;
      }
      
      // Then filter by dietary preferences
      if (activeFilter === 'all') return true;
      if (activeFilter === 'veg') return item.isVeg;
      if (activeFilter === 'non-veg') return !item.isVeg;
      if (activeFilter === 'popular') return item.popular;
      return true;
    })
  );

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      // If clicking the same category, deselect it (show all)
      setSelectedCategory(null);
    } else {
      // Select the new category
      setSelectedCategory(categoryId);
    }
  };

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-amber-50" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="gradient-text">Signature</span> Menu
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover authentic Assamese flavors crafted with traditional recipes and fresh local ingredients
          </p>
        </motion.div>

        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {/* Show All Button */}
          <button
            onClick={() => handleCategoryClick('all')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === null
                ? 'bg-amber-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-amber-100 border border-gray-200'
            }`}
          >
            <span className="mr-2">🍽️</span>
            Show All
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-amber-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-amber-100 border border-gray-200'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterClick(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
              }`}
            >
              <span className="mr-1">{filter.icon}</span>
              {filter.name}
            </button>
          ))}
        </motion.div>

        {/* Menu Items Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${activeFilter}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {/* Popular Badge */}
                {item.popular && (
                  <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Popular
                  </div>
                )}

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    priority={filteredItems.indexOf(item) === 0}
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display text-xl font-semibold text-gray-900 group-hover:text-amber-600 transition-colors duration-300">
                      {item.name}
                    </h3>
                    <div className="flex gap-1">
                      {item.isVeg && (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Leaf className="w-3 h-3 text-white fill-current" />
                        </div>
                      )}
                      {item.isSpicy && (
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <Flame className="w-3 h-3 text-white fill-current" />
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-amber-600">
                      ₹{item.price}
                    </span>
                    <button 
                      onClick={() => {
                        const message = `Hi! I would like to order ${item.name} for ₹${item.price}. Can you please help me with the order?`;
                        const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
                        window.open(whatsappUrl, '_blank');
                      }}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      Add to Order
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View Full Menu CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <button 
            onClick={() => {
              const message = "Hi! Can you please send me your complete menu? I'd like to see all the available dishes.";
              const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, '_blank');
            }}
            className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span className="relative z-10">View Complete Menu</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}