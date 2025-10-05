'use client';

import { Suspense } from 'react';
import Hero3D from '@/components/Hero3D';
import MenuShowcase from '@/components/MenuShowcase';
import OrderingSection from '@/components/OrderingSection';
import LocationReviews from '@/components/LocationReviews';
import ReviewAnalysis from '@/components/ReviewAnalysis';
import Footer from '@/components/Footer';
import AIChatbot from '@/components/AIChatbot';
import AIRecommendations from '@/components/AIRecommendations';
import ImageRecognition from '@/components/ImageRecognition';
import ErrorBoundary from '@/components/ErrorBoundary';
import BackToTop from '@/components/BackToTop';
import LoadingSpinner from '@/components/LoadingSpinner';
import SpecialOffers from '@/components/SpecialOffers';
import Newsletter from '@/components/Newsletter';

export default function Home() {
  return (
    <ErrorBoundary>
      <main className="min-h-screen">
        {/* Hero Section with 3D Elements */}
        <section id="home" className="relative">
          <Suspense fallback={<LoadingSpinner />}>
            <Hero3D />
          </Suspense>
        </section>
        
        {/* Interactive Menu Showcase */}
        <section id="menu" className="relative">
          <Suspense fallback={<div className="h-96 bg-amber-50 animate-pulse" />}>
            <MenuShowcase />
          </Suspense>
        </section>
        
        {/* Special Offers Section */}
        <Suspense fallback={<div className="h-96 bg-red-50 animate-pulse" />}>
          <SpecialOffers />
        </Suspense>

        {/* Ordering & Delivery Section */}
        <section id="order" className="relative">
          <Suspense fallback={<div className="h-96 bg-orange-50 animate-pulse" />}>
            <OrderingSection />
          </Suspense>
        </section>
        
        {/* AI Review Analysis */}
        <Suspense fallback={<div className="h-96 bg-amber-50 animate-pulse" />}>
          <ReviewAnalysis />
        </Suspense>
        
        {/* Location & Reviews */}
        <section id="location" className="relative">
          <Suspense fallback={<div className="h-96 bg-orange-50 animate-pulse" />}>
            <LocationReviews />
          </Suspense>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gradient-to-b from-white to-amber-50">
          <div className="container mx-auto px-4">
            <Newsletter />
          </div>
        </section>
        
        {/* Footer */}
        <Footer />

        {/* AI Components - Lazy loaded */}
        <Suspense fallback={null}>
          <AIChatbot />
          <AIRecommendations />
          <ImageRecognition />
        </Suspense>

        {/* Back to Top Button */}
        <BackToTop />
      </main>
    </ErrorBoundary>
  );
}