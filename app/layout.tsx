import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Puertajada - Influencer y Creador de Contenido",
  description:
    "Descubre el contenido más divertido de Puertajada, el famoso influencer conocido por sus videos virales y su humor único. Síguelo en todas sus redes sociales.",
  keywords: [
    "Puertajada",
    "influencer",
    "contenido viral",
    "humor",
    "redes sociales",
    "TikTok",
    "YouTube",
    "Instagram",
  ],
  authors: [{ name: "Puertajada" }],
  creator: "Puertajada",
  publisher: "Puertajada",
  robots: "index, follow",
  themeColor: "#000000",
  alternates: {
    canonical: "https://puertajada.com",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://puertajada.com",
    title: "Puertajada - Influencer y Creador de Contenido",
    description:
      "Descubre el contenido más divertido de Puertajada, el famoso influencer conocido por sus videos virales y su humor único.",
    siteName: "Puertajada",
    images: [
      {
        url: "/icon.jpg",
        width: 1200,
        height: 630,
        alt: "Puertajada - Influencer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Puertajada - Influencer y Creador de Contenido",
    description:
      "Descubre el contenido más divertido de Puertajada, el famoso influencer conocido por sus videos virales.",
    creator: "@puertajada",
    images: ["/icon.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: [{ url: "/icon.jpg", sizes: "180x180", type: "image/jpeg" }],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
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
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

