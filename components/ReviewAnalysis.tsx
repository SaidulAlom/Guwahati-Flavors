'use client';

import { motion } from 'framer-motion';
import { BarChart3, ThumbsUp, MessageCircle, Star } from 'lucide-react';
import menuData from '@/data/menu.json';

export default function ReviewAnalysis() {
  const reviews = menuData.reviews;
  
  // Simple sentiment analysis based on rating
  const sentimentAnalysis = {
    positive: reviews.filter(r => r.rating >= 4).length,
    neutral: reviews.filter(r => r.rating === 3).length,
    negative: reviews.filter(r => r.rating <= 2).length,
    total: reviews.length
  };

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const satisfactionRate = (sentimentAnalysis.positive / sentimentAnalysis.total) * 100;

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AI-Powered <span className="gradient-text">Review Analysis</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what our customers love about our authentic Assamese cuisine
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Overall Satisfaction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <ThumbsUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Satisfaction Rate</h3>
                <p className="text-sm text-gray-600">Customer happiness</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {satisfactionRate.toFixed(0)}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${satisfactionRate}%` }}
                />
              </div>
            </div>
          </motion.div>

          {/* Average Rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white fill-current" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Average Rating</h3>
                <p className="text-sm text-gray-600">Overall score</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {averageRating.toFixed(1)}/5
              </div>
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= averageRating 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sentiment Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Sentiment Analysis</h3>
                <p className="text-sm text-gray-600">Review breakdown</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Positive</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(sentimentAnalysis.positive / sentimentAnalysis.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-green-600">
                    {sentimentAnalysis.positive}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Neutral</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${(sentimentAnalysis.neutral / sentimentAnalysis.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-yellow-600">
                    {sentimentAnalysis.neutral}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Negative</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${(sentimentAnalysis.negative / sentimentAnalysis.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-red-600">
                    {sentimentAnalysis.negative}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Key Insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle className="w-6 h-6 text-amber-600" />
            <h3 className="font-display text-2xl font-bold text-gray-900">AI Insights</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                <div>
                  <h4 className="font-semibold text-gray-900">Authentic Taste</h4>
                  <p className="text-sm text-gray-600">Customers consistently praise the authentic Assamese flavors</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <div>
                  <h4 className="font-semibold text-gray-900">Quick Service</h4>
                  <p className="text-sm text-gray-600">Fast delivery and excellent customer service</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2" />
                <div>
                  <h4 className="font-semibold text-gray-900">Fresh Ingredients</h4>
                  <p className="text-sm text-gray-600">Quality ingredients and traditional cooking methods</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                <div>
                  <h4 className="font-semibold text-gray-900">Value for Money</h4>
                  <p className="text-sm text-gray-600">Reasonable prices for authentic traditional dishes</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 