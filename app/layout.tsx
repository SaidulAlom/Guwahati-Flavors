import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Guwahati Flavors - Authentic Assamese Cuisine',
  description: 'Experience the rich heritage of Assam through our traditional recipes. Fresh ingredients, authentic flavors, and modern dining experience.',
  keywords: 'Assamese food, Guwahati restaurant, traditional cuisine, authentic flavors, Indian food, Northeast cuisine',
  authors: [{ name: 'Guwahati Flavors' }],
  creator: 'Guwahati Flavors',
  publisher: 'Guwahati Flavors',
  openGraph: {
    title: 'Guwahati Flavors - Authentic Assamese Cuisine',
    description: 'Experience the rich heritage of Assam through our traditional recipes',
    url: 'https://guwahatiflavors.com',
    siteName: 'Guwahati Flavors',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Guwahati Flavors - Authentic Assamese Cuisine',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guwahati Flavors - Authentic Assamese Cuisine',
    description: 'Experience the rich heritage of Assam through our traditional recipes',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#F59E0B" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}