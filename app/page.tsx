'use client';

import Hero3D from '@/components/Hero3D';
import MenuShowcase from '@/components/MenuShowcase';
import OrderingSection from '@/components/OrderingSection';
import LocationReviews from '@/components/LocationReviews';
import ReviewAnalysis from '@/components/ReviewAnalysis';
import Footer from '@/components/Footer';
import AIChatbot from '@/components/AIChatbot';
import AIRecommendations from '@/components/AIRecommendations';
import ImageRecognition from '@/components/ImageRecognition';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with 3D Elements */}
      <section id="home">
        <Hero3D />
      </section>
      
      {/* Interactive Menu Showcase */}
      <section id="menu">
        <MenuShowcase />
      </section>
      
      {/* Ordering & Delivery Section */}
      <section id="order">
        <OrderingSection />
      </section>
      
      {/* AI Review Analysis */}
      <ReviewAnalysis />
      
      {/* Location & Reviews */}
      <section id="location">
        <LocationReviews />
      </section>
      
      {/* Footer */}
      <Footer />

      {/* AI Components */}
      <AIChatbot />
      <AIRecommendations />
      <ImageRecognition />
    </main>
  );
}