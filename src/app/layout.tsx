import type { Metadata } from "next";
import {poppins, quicksand} from "@/util/font"
import "./globals.css";
import {Providers} from "@/redux/provider"

export const metadata: Metadata = {
  title: "Mafia Leading",
  description: "Site for Мини Пекка discord server for playing Mafia",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${quicksand.variable}`}>
      <Providers>
        {children}
      </Providers>
      </body>
    </html>
  );
}
