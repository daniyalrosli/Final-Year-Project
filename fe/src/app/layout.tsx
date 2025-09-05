import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorBoundary } from "@/components/ui/error-boundary";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "HeartCare - Your Heart Health Partner",
  description: "Empowering individuals with AI-powered heart health monitoring and personalized insights. Get instant heart disease risk assessments and expert recommendations.",
  keywords: ["heart health", "cardiovascular", "health monitoring", "AI prediction", "medical technology"],
  authors: [{ name: "HeartCare Team" }],
  creator: "HeartCare",
  publisher: "HeartCare Health Systems",
  robots: "index, follow",
  openGraph: {
    title: "HeartCare - Your Heart Health Partner",
    description: "AI-powered heart health monitoring and personalized insights",
    url: "https://heartcare.com",
    siteName: "HeartCare",
    images: [
      {
        url: "/img/OrgCoral_Med-04_Concept-01.jpg",
        width: 1200,
        height: 630,
        alt: "HeartCare - Heart Health Monitoring Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HeartCare - Your Heart Health Partner",
    description: "AI-powered heart health monitoring and personalized insights",
    images: ["/img/OrgCoral_Med-04_Concept-01.jpg"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ef4444",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ef4444" />
        <meta name="msapplication-TileColor" content="#ef4444" />
      </head>
      <body className="antialiased">
        <ErrorBoundary>
          <AuthProvider>
            {children}
            <ToastContainer 
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
