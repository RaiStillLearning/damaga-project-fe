import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Damaga",
  description: "Damaga project reservastion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* navbar / wrapper global bisa di sini */}
        {children}
      </body>
    </html>
  );
}
