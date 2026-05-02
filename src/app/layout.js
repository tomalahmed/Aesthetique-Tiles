import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aesthetique Tiles",
  description: "Modern tile gallery for architects and designers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--color-bg)] text-[var(--color-text)]">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="mx-auto flex w-full max-w-[1280px] flex-1 px-6 py-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
