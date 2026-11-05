import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import PageOverlayTransition from "@/components/PageOverlayTransition";
import Script from "next/script"; // ✅ Needed to load reCAPTCHA safely

// Font configuration
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrainsMono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

// ✅ Metadata stays here (server side)
export const metadata = {
  title: "Shivani Portfolio",
  description: "Professional portfolio by Shivani Kaiche",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning data-gramm="false">
      <head>
        {/* ✅ Google reCAPTCHA v3 */}
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      </head>

      <body
        suppressHydrationWarning
        className={`${jetbrainsMono.variable} relative overflow-x-hidden`}
      >
        {/* Page transitions and layout */}
        <PageTransition>
          <PageOverlayTransition />
          <Header />
          <main className="relative z-10">{children}</main>
        </PageTransition>
      </body>
    </html>
  );
}
