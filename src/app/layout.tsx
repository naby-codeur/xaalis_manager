import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Xaliss Manager - Gestion Financière Intelligente",
  description: "Application PWA de gestion des dépenses et ressources pour ONG, associations et PME. Transparence, sécurité et IA intégrée.",
  keywords: ["gestion financière", "ONG", "associations", "PWA", "multilingue", "IA"],
  authors: [{ name: "Xaliss Manager Team" }],
  creator: "Xaliss Manager",
  publisher: "Xaliss Manager",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://xaliss-manager.com"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://xaliss-manager.com",
    title: "Xaliss Manager - Gestion Financière Intelligente",
    description: "Application PWA de gestion des dépenses et ressources pour ONG, associations et PME.",
    siteName: "Xaliss Manager",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xaliss Manager - Gestion Financière Intelligente",
    description: "Application PWA de gestion des dépenses et ressources pour ONG, associations et PME.",
    creator: "@xalissmanager",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Xaliss Manager" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
