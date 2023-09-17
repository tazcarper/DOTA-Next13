import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ApolloClientWrapper } from "@/providers/ApolloClientProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DotaQuest :: Home",
  description: "DotaQuest. Daily, weekly and monthly quests for greatness!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="forest">
      <ApolloClientWrapper>
        <body>{children}</body>
      </ApolloClientWrapper>
    </html>
  );
}
