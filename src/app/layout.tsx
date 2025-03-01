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
  title: "FrontendWarrior",
  description: "The warrior way to prepare for Frontend Interview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main className="w-screen h-screen flex flex-col bg-[#070708]">
          {children}

          <footer className="p-3 bg-[#070708] flex justify-center items-center">
            <p className="text-white">Footer</p>
          </footer>
        </main>
      </body>
    </html>
  );
}
