import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { ThemeProvider } from "@/components/providers/theme";
import { ModeToggle } from "@/components/ModeToggle";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Space X Analizer",
  description:
    "App to show launches data provides by NodeJs app powered by SpaceX public API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <ModeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
