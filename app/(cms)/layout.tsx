import React from 'react';
import { Poppins } from 'next/font/google';

export const metadata = {
   title: 'Studio Admin - Nexus CMS Portal',
   description: 'Nexus CMS Portal',
};

const poppins = Poppins({
   subsets: ['latin'],
   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body className={poppins.className}>{children}</body>
      </html>
   );
}
