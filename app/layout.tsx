import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Nexus",
  description:
    "Nexus is the consultancy company you need to become successful",
  // icons: {
  //   icon: "/favicon.ico"
  // }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        {children}

        {/* Updated StatCounter script */}
        <Script
          id="statcounter-script"
          strategy="afterInteractive" // Ensures the script loads after the page is interactive
          dangerouslySetInnerHTML={{
            __html: `
              var sc_project=13038225; 
              var sc_invisible=1; 
              var sc_security="a4649aa8";
            `,
          }}
        />
        <Script
          id="statcounter-counter"
          strategy="afterInteractive"
          src="https://www.statcounter.com/counter/counter.js"
          async
        />

        {/* NoScript fallback */}
        <noscript>
          <div className="statcounter">
            <a
              title="real time web analytics"
              href="https://statcounter.com/"
              target="_blank"
            >
              <img
                className="statcounter"
                src="https://c.statcounter.com/13038225/0/a4649aa8/1/"
                alt="real time web analytics"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </a>
          </div>
        </noscript>
      </body>
    </html>
  );
}
