import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Truck } from "lucide-react";
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
  title: "StrongSolo Demo Load Board",
  description: "A demonstration load board for freight brokers and carriers",
  keywords: ["freight", "trucking", "load board", "logistics", "transportation"],
  authors: [{ name: "StrongSolo" }],
  openGraph: {
    title: "StrongSolo Demo Load Board",
    description: "Find freight loads for your trucking business",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-slate-50`}
      >
        <div className="min-h-full">
          <header className="bg-white shadow-sm border-b border-slate-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <Link
                  href="/"
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 rounded-lg"
                >
                  <Truck className="h-8 w-8 text-slate-900" />
                  <span className="text-xl font-bold text-slate-900">
                    StrongSolo Demo Board
                  </span>
                </Link>
                <nav className="flex items-center gap-6">
                  <Link
                    href="/"
                    className="text-slate-600 hover:text-slate-900 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 rounded"
                  >
                    Home
                  </Link>
                  <Link
                    href="/board"
                    className="text-slate-600 hover:text-slate-900 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 rounded"
                  >
                    Load Board
                  </Link>
                </nav>
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>

          <footer className="bg-white border-t border-slate-200 mt-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center text-slate-500">
                <p>© 2025 StrongSolo Demo Load Board. For demonstration purposes only.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
