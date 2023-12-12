import type {Metadata} from "next";
import {Inter as FontSans} from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import Header from "@/components/Header";

export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" suppressHydrationWarning>
        <body
            className={cn("bg-background font-sans antialiased", fontSans.variable)}
        >
        <Header/>

        {children}
        </body>
        </html>
    );
}
