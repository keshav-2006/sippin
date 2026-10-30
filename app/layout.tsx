import type { Metadata, Viewport } from 'next';
import Providers from './providers';
import './globals.css';

const siteUrl = 'https://example.com'; // Replace with the client's final domain before launch.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Sippin' Stories Café | Stories Over Coffee", template: "%s | Sippin' Stories Café" },
  description: "A cozy café for good coffee, comforting bites and conversations worth remembering. Explore the menu and plan your visit to Sippin' Stories.",
  keywords: ["Sippin' Stories Café", 'cafe', 'coffee shop', 'pasta', 'pizza', 'waffles', 'pancakes'],
  openGraph: { title: "Sippin' Stories Café — Stories Over Coffee", description: 'Where every sip reveals a story.', type: 'website', images: ['/images/cafe-interior.webp'] },
  twitter: { card: 'summary_large_image', title: "Sippin' Stories Café", description: 'Stories over coffee.' },
  robots: { index: false, follow: false }, // Demo is intentionally noindex until owner approval and real domain launch.
};

export const viewport: Viewport = { themeColor: '#593B31' };

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'CafeOrCoffeeShop', name: "Sippin' Stories Café",
  description: 'A cozy café for coffee, conversations and comfort food.', image: ['/images/cafe-exterior.webp','/images/cafe-interior.webp'],
  servesCuisine: ['Cafe', 'Italian', 'Fast Food'], priceRange: '₹₹',
  sameAs: ['https://www.instagram.com/sippinstories23/'],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
