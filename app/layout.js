import PlausibleProvider from 'next-plausible';
import { Analytics } from '@vercel/analytics/react';

import { InkProvider } from '@/lib/ink/react';

import './fonts/kevin-sans.css';
import './global.css';

export const metadata = {
  metadataBase: new URL('https://attackonmorty.com'),
};

const Activity = Symbol.for('react.activity');

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Browser extensions (e.g. Grammarly) add attributes to <body> before hydration. */}
      <body suppressHydrationWarning>
        <PlausibleProvider domain="attackonmorty.com">
          <InkProvider textures={['fibre', 'relief', 'cloud']}>
            <div className="min-h-svh py-6 sm:px-6 sm:py-12">
              <Activity mode="visible">
                {children}
                <Analytics />
              </Activity>
            </div>
          </InkProvider>
        </PlausibleProvider>
      </body>
    </html>
  );
}
