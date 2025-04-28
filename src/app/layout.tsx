import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SWRConfig } from "swr";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Todo App",
    description: "Todo App",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-indigo-50 to-purple-50`}
            >
                <SWRConfig
                    value={{
                        refreshInterval: 40000,
                    }}
                >
                    {children}
                </SWRConfig>
            </body>
        </html>
    );
}
