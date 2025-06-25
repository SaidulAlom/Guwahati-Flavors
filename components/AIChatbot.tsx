'use client';

import { useEffect } from 'react';

export default function AIChatbot() {
  useEffect(() => {
    // Tidio Chat Widget
    const script = document.createElement('script');
    script.src = '//code.tidio.co/your-tidio-key.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src*="tidio"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
} 