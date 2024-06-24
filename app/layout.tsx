import type { Metadata } from "next";
import "./globals.css";
import Header from "@components/Header";
import Footer from "@components/Footer";

export const metadata: Metadata = {
  title: "Cooking Recipes",
  description: "Cooking recipes for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="site">
          <main>
            <Header />
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
