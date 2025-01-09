import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ExpenseGenie",
  description: "AI-Powered Insights for Financial Success.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}`}
      >
        {/* Header */}
        <Header/>
        <main className="min-h-screen">
          {children}
        </main>
        {/* footer */}
        <footer className="bg-blue-50 py-12">
          <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 AxpenseGenie. All rights reserved.</p>
          <p>Created by <strong>Kariuki Kenneth</strong></p>
          </div>
        </footer>
      </body>
    </html>
  );
}
