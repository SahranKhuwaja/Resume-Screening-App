import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/nav";

export const metadata: Metadata = {
  title: "Resume Screening App",
  description: "Filters resumes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Navbar />
      <body>
        {children}
      </body>
    </html>
  );
}
