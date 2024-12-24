import { Analytics } from "@vercel/analytics/react";
import styles from "./globals.css";
import Navbar from "./components/Navbar";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          {children}
          <Analytics />
        </div>
      </body>
    </html>
  );
}
