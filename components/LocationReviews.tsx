'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Star, Clock, Users } from 'lucide-react';
import { useState } from 'react';
import menuData from '@/data/menu.json';

const locationInfo = {
  address: "Fancy Bazaar, Guwahati, Assam 781001",
  coordinates: { lat: 26.1833, lng: 91.7333 },
  hours: "10:00 AM - 10:00 PM",
  phone: "+91-9876543210"
};

export default function LocationReviews() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const reviews = menuData.reviews;

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 sm:w-5 h-4 sm:h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Location Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8">
              Visit Our <span className="gradient-text">Location</span>
            </h2>

            {/* Map Container */}
            <div className="relative bg-gray-200 rounded-2xl overflow-hidden h-56 sm:h-64 md:h-72 lg:h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
                  className="text-center"
                >
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-red-500 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto shadow-lg">
                    <MapPin className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                  </div>
                  <div className="bg-white px-3 sm:px-4 py-2 rounded-lg shadow-lg">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">Guwahati Flavors</p>
                    <p className="text-xs sm:text-sm text-gray-600">Fancy Bazaar</p>
                  </div>
                </motion.div>
              </div>

              {/* Interactive Map Overlay */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(`https://maps.google.com/?q=${locationInfo.coordinates.lat},${locationInfo.coordinates.lng}`, '_blank')}
                className="absolute inset-0 w-full h-full bg-transparent hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100"
              >
                <div className="bg-white px-3 sm:px-4 py-2 rounded-lg shadow-lg">
                  <span className="font-medium text-gray-900 text-sm sm:text-base">Open in Maps</span>
                </div>
              </motion.button>
            </div>

            {/* Location Details (Moved Down) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4 sm:space-y-5"
            >
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl shadow-sm">
                <div className="w-8 sm:w-10 h-8 sm:h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Address</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{locationInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl shadow-sm">
                <div className="w-8 sm:w-10 h-8 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Hours</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{locationInfo.hours}</p>
                  <p className="text-xs sm:text-sm text-green-600 font-medium">Open Now</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl shadow-sm">
                <div className="w-8 sm:w-10 h-8 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Contact</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{locationInfo.phone}</p>
                  <button
                    onClick={() => window.open(`tel:${locationInfo.phone}`, '_self')}
                    className="text-xs sm:text-sm text-blue-600 font-medium hover:underline"
                  >
                    Call Now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Reviews Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 sm:space-y-8"
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8">
              Customer <span className="gradient-text">Reviews</span>
            </h2>

            {/* Reviews Carousel */}
            <div className="relative">
              <motion.div
                key={currentReviewIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg"
              >
                <div className="flex items-center gap-1 sm:gap-2 mb-4">
                  {renderStars(reviews[currentReviewIndex].rating)}
                </div>

                <blockquote className="text-base sm:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-6 italic">
                  "{reviews[currentReviewIndex].comment}"
                </blockquote>

                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-base sm:text-lg">
                      {reviews[currentReviewIndex].name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">
                      {reviews[currentReviewIndex].name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {new Date(reviews[currentReviewIndex].date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-4 sm:mt-6">
                <button
                  onClick={prevReview}
                  className="p-2 sm:p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-300 min-w-[40px] min-h-[40px]"
                >
                  <svg className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex gap-1 sm:gap-2">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentReviewIndex(index)}
                      className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-colors duration-300 ${
                        index === currentReviewIndex ? 'bg-amber-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextReview}
                  className="p-2 sm:p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-300 min-w-[40px] min-h-[40px]"
                >
                  <svg className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Review Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-6 sm:mt-8 grid grid-cols-3 gap-3 sm:gap-4"
            >
              <div className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm">
                <div className="text-xl sm:text-2xl font-bold text-amber-600">4.8</div>
                <div className="text-xs sm:text-sm text-gray-500">Rating</div>
                <div className="flex justify-center mt-1">
                  {renderStars(5).slice(0, 4)}
                  <Star className="w-3 sm:w-4 h-3 sm:h-4 text-gray-300" />
                </div>
              </div>

              <div className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm">
                <div className="text-xl sm:text-2xl font-bold text-green-600">500+</div>
                <div className="text-xs sm:text-sm text-gray-500">Reviews</div>
              </div>

              <div className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">95%</div>
                <div className="text-xs sm:text-sm text-gray-500">Recommend</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}