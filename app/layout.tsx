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
      <head>
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Rajdhani:wght@500;600;700&display=swap"
          rel="stylesheet"
        /><link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Script src="https://cdn.lordicon.com/lordicon.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

