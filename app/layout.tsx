import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'Guwahati Flavors - Authentic Assamese Cuisine',
  description: 'Experience the rich taste of authentic Assamese cuisine in Guwahati. Order now via WhatsApp, Zomato, or Swiggy for fresh, traditional dishes.',
  keywords: 'Assamese food, Guwahati restaurant, authentic cuisine, traditional dishes, online food delivery',
  openGraph: {
    title: 'Guwahati Flavors - Authentic Assamese Cuisine',
    description: 'Experience authentic Assamese flavors with our traditional dishes',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${poppins.variable} font-sans`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}