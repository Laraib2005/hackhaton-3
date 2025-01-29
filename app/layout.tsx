import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

import { Outfit } from "next/font/google";
import ReduxProvider from "./redux/provider";
import { WishlistProvider } from "../context/WishlistContext"; // Wishlist context import kiya

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "Avion",
  description: "laraib rizwan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <ReduxProvider>
          <WishlistProvider> {/* Wishlist context ko wrap kiya */}
            <Navbar />
            {children}
            <Footer />
          </WishlistProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
