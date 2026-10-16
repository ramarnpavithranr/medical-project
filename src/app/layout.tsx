import type { Metadata } from "next";
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
  title: "Nuvica | Cardiology & Vascular Health AI Platform",
  description: "Advanced AI-assisted cardiovascular screening, 12-lead ECG analysis, cardiopulmonary chest X-ray segmentation, and explainable clinical decision-support.",
  keywords: ["Cardiology AI", "ECG Analysis", "Cardiovascular Screening", "Grad-CAM", "Medical Healthcare", "Nuvica"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
    >
      <body className="min-h-screen bg-[#f6fafd] text-[#0e2448]">
        {children}
      </body>
    </html>
  );
}
