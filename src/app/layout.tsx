import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ProofLayer - Get Your First Users & Build Social Proof',
  description: 'A community marketplace connecting founders with early adopters. Get matched with real users, collect testimonials, and display social proof. One platform, one-time payment.',
  icons: {
    icon: '/logos/prooflayer-icon-only.svg',
    apple: '/logos/prooflayer-icon-only.svg',
  },
  metadataBase: new URL('https://www.prooflayer.app'),
  openGraph: {
    title: 'ProofLayer - Get Your First Users & Build Social Proof',
    description: 'A community marketplace connecting founders with early adopters. Get matched with real users, collect testimonials, and display social proof. One platform, one-time payment.',
    url: 'https://www.prooflayer.app',
    siteName: 'ProofLayer',
    images: [
      {
        url: '/logos/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ProofLayer - Get Your First Users & Build Social Proof',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProofLayer - Get Your First Users & Build Social Proof',
    description: 'A community marketplace connecting founders with early adopters. Get matched with real users, collect testimonials, and display social proof. One platform, one-time payment.',
    images: ['/logos/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}