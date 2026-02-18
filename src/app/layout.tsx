import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HackByteCodex – Student Projects & Tech Events",
  description: "HackByteCodex is a platform to discover student projects, participate in tech events, and collaborate with developers worldwide.",
  keywords: [
    "HackByteCodex",
    "student projects",
    "tech events",
    "hackathons",
    "open source",
    "developer community",
    "college projects",
    "coding competitions"
  ].join(", "),
  openGraph: {
    title: "HackByteCodex – Projects & Events Hub",
    description: "Discover projects built by students and explore upcoming tech events on HackByteCodex.",
    url: "https://hackbytecodex.com",
    siteName: "HackByteCodex",
    images: [
      {
        url: "https://hackbytecodex.com/og-default.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HackByteCodex – Projects & Events Hub",
    description: "Discover student projects and tech events on HackByteCodex.",
    creator: "@hackbytecodex",
  },
  alternates: {
    canonical: "https://hackbytecodex.com",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
