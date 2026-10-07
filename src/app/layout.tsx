import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coiling Process Control",
  description: "Coventry Coil-o-Matic (Haryana) Ltd. Coiling Process Control System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#eef2fb] text-[#0f172a] font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}
