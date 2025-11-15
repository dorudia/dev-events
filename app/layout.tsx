import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import "../components/LightRays.css";
import LightRays from "@/components/LightRays";
import Navbar from "@/components/Navbar";
const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const nartianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevEvents",
  description: "A platform for developers to connect and learn together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${schibstedGrotesk.variable} ${nartianMono.variable} min-h-screen antialiased`}
      >
        <Navbar />
        <div className="absolute inset-0 top-0 z-[-1] min-h-screen">
          <LightRays
            raysOrigin="top-center-offset"
            raysColor="#e0fce0"
            raysSpeed={1.2}
            lightSpread={1.2}
            rayLength={1.4}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.2}
            distortion={0.01}
            className="custom-rays"
          />
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}
