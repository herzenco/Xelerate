import type { Metadata } from "next";
import { DM_Sans, Crimson_Pro } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "./providers";
import { Analytics } from "@/components/Analytics";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://xelerate.me'),
  title: {
    template: "%s | Xelerate",
    default: "Xelerate - Fractional Product Management",
  },
  description:
    "Xelerate helps product leaders build and ship custom solutions faster.",
  openGraph: {
    siteName: "Xelerate",
    locale: "en_US",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${crimsonPro.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
