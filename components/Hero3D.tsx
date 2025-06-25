'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Center } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import * as THREE from 'three';

function TeaCup() {
  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <group>
        {/* Cup body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.8, 0.6, 1.2, 16]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        {/* Tea liquid */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.75, 0.75, 0.1, 16]} />
          <meshStandardMaterial color="#D2691E" />
        </mesh>
        {/* Handle */}
        <mesh position={[0.9, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.3, 0.08, 8, 16]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        {/* Steam effect */}
        <group position={[0, 0.8, 0]}>
          {[...Array(3)].map((_, i) => (
            <Float key={i} speed={2 + i} floatIntensity={1}>
              <mesh position={[Math.sin(i) * 0.2, i * 0.3, Math.cos(i) * 0.2]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color="#FFFFFF" transparent opacity={0.6} />
              </mesh>
            </Float>
          ))}
        </group>
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <TeaCup />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F59E0B' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="font-display text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                <span className="block">Authentic</span>
                <span className="block gradient-text">Assamese</span>
                <span className="block">Cuisine</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-gray-600 max-w-lg leading-relaxed"
            >
              Experience the rich heritage of Assam through our traditional recipes, 
              passed down through generations. Fresh ingredients, authentic flavors.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <button 
                onClick={() => {
                  const element = document.querySelector('#order');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <span className="relative z-10">Order Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <button 
                onClick={() => {
                  const element = document.querySelector('#menu');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-8 py-4 border-2 border-amber-500 text-amber-600 font-semibold rounded-full hover:bg-amber-500 hover:text-white transition-all duration-300"
              >
                View Menu
              </button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex gap-8 pt-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">500+</div>
                <div className="text-sm text-gray-500">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">30min</div>
                <div className="text-sm text-gray-500">Avg Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">4.8★</div>
                <div className="text-sm text-gray-500">Rating</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right 3D Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-96 lg:h-[500px]"
          >
            <Canvas>
              <Suspense fallback={null}>
                <Scene />
              </Suspense>
            </Canvas>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-amber-500 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-amber-500 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}