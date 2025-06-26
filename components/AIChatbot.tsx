'use client';

import { useEffect } from 'react';

export default function AIChatbot() {
  useEffect(() => {
    // Only load Tidio if we have a valid key
    const tidioKey = process.env.NEXT_PUBLIC_TIDIO_KEY;
    
    if (tidioKey && tidioKey !== 'your-tidio-key') {
      // Tidio Chat Widget
      const script = document.createElement('script');
      script.src = `//code.tidio.co/${tidioKey}.js`;
      script.async = true;
      document.body.appendChild(script);

      return () => {
        // Cleanup
        const existingScript = document.querySelector('script[src*="tidio"]');
        if (existingScript) {
          existingScript.remove();
        }
      };
    }
  }, []);

  return null; // This component doesn't render anything visible
} 