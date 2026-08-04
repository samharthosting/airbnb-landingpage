import type { Metadata } from "next";
import { Montserrat, Open_Sans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hart Hosting | Airbnb Co-Host & Short-Term Rental Management, Surrey BC",
  description:
    "Hart Hosting provides professional Airbnb co-hosting and short-term rental property management for homeowners in Surrey and the Lower Mainland, BC. Request your free property income assessment.",
  keywords: [
    "Airbnb Co-Host Surrey",
    "Airbnb Management Surrey",
    "Short-Term Rental Management Surrey",
    "Airbnb Property Management BC",
    "Airbnb Co-Host Lower Mainland",
    "Vacation Rental Management Surrey",
    "Property Management Surrey",
  ],
  openGraph: {
    title: "Hart Hosting | Airbnb Co-Host & Short-Term Rental Management, Surrey BC",
    description:
      "Professional Airbnb co-hosting and short-term rental management for homeowners across Surrey & the Lower Mainland.",
    type: "website",
    locale: "en_CA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", montserrat.variable, openSans.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
