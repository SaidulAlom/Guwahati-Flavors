'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Search, X } from 'lucide-react';

export default function ImageRecognition() {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        analyzeImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (file: File) => {
    setIsAnalyzing(true);
    setResult(null);

    // Simulate AI analysis (in real implementation, you'd use Google Vision API or similar)
    setTimeout(() => {
      const mockResults = [
        {
          dish: "Assamese Thali",
          confidence: 95,
          description: "Traditional Assamese meal with rice, dal, fish curry, and vegetables",
          price: "₹180",
          available: true
        },
        {
          dish: "Masor Tenga",
          confidence: 87,
          description: "Sour fish curry with tomatoes and lemon",
          price: "₹220",
          available: true
        },
        {
          dish: "Assamese Momos",
          confidence: 82,
          description: "Steamed dumplings with spiced filling",
          price: "₹120",
          available: true
        }
      ];

      setResult(mockResults[Math.floor(Math.random() * mockResults.length)]);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleCameraClick = () => {
    // In a real implementation, this would open the device camera
    alert("Camera feature would open device camera for food recognition");
  };

  const resetAnalysis = () => {
    setUploadedImage(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
      >
        <Camera className="w-6 h-6" />
      </motion.button>

      {/* Modal */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI Food Recognition</h3>
                  <p className="text-sm text-gray-600">Upload or take a photo</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {!uploadedImage ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">
                      Upload a photo of any dish to get instant information and ordering options
                    </p>
                  </div>

                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors duration-300">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      Drag and drop an image here, or click to browse
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                    >
                      Choose Image
                    </button>
                  </div>

                  {/* Camera Button */}
                  <div className="text-center">
                    <p className="text-gray-500 text-sm mb-3">or</p>
                    <button
                      onClick={handleCameraClick}
                      className="flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-300 mx-auto"
                    >
                      <Camera className="w-4 h-4" />
                      Take Photo
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Uploaded Image */}
                  <div className="relative">
                    <img
                      src={uploadedImage}
                      alt="Uploaded food"
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <button
                      onClick={resetAnalysis}
                      className="absolute top-2 right-2 bg-white/90 p-2 rounded-full hover:bg-white transition-colors duration-300"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  {/* Analysis Result */}
                  {isAnalyzing ? (
                    <div className="text-center py-8">
                      <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4" />
                      <p className="text-gray-600">Analyzing your food image...</p>
                      <p className="text-sm text-gray-500">This may take a few seconds</p>
                    </div>
                  ) : result ? (
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                          <Search className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{result.dish}</h4>
                          <p className="text-sm text-gray-600">
                            Confidence: {result.confidence}%
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{result.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-purple-600">
                          {result.price}
                        </div>
                        <button
                          onClick={() => {
                            const message = `Hi! I would like to order ${result.dish} for ${result.price}. Can you please help me with the order?`;
                            const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
                            window.open(whatsappUrl, '_blank');
                          }}
                          className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                        >
                          Order Now
                        </button>
                      </div>

                      {result.available && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          Available for order
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
} 