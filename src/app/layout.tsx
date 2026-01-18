import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Prooflayer - Collect & Embed Client Testimonials',
  description: 'The easiest way for agencies and freelancers to collect, approve, and embed beautiful client testimonials on any website.',
  icons: {
    icon: '/logos/prooflayer-icon-only.svg',
    apple: '/logos/prooflayer-icon-only.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}