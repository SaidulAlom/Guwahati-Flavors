'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      toast({
        title: "Successfully subscribed!",
        description: "You&apos;ll receive updates about our latest dishes and offers.",
      });
    }, 1000);
  };

  if (isSubscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8 text-center text-white"
      >
        <Check className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
        <p>You&apos;re now subscribed to our newsletter.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-white"
    >
      <div className="text-center mb-6">
        <Mail className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
        <p className="opacity-90">
          Get notified about new dishes, special offers, and events
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-3 bg-white text-amber-600 font-semibold rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      <p className="text-xs opacity-75 mt-4 text-center">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </motion.div>
  );
}