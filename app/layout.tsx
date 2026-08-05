import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "BULADEV | Building & Land Development",
  description:
    "BULADEV construction landing page for residential, commercial, land development, design build, and project management services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script src="https://cdn.lordicon.com/lordicon.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

