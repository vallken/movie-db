import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar/Navbar";
import SearchHandle from "../components/NavBar/SearchHandle";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Val DB",
  description:
    "Jelajahi database komprehensif kami untuk film, anime, dan drama series. Temukan informasi terperinci, sinopsis, dan platform streaming dengan mudah. Akses katalog media favorit Anda dengan cepat dan efisien.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <div className="bg-gray-200 dark:bg-gray-800 relative min-h-screen">
          <NavBar />
          <div className=" p-2">
            <SearchHandle /> {children}
            <Analytics />
          </div>
        </div>
      </body>
    </html>
  );
}
