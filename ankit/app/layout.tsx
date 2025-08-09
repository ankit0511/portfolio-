import type React from "react"
import type { Metadata } from "next/types"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"

import { Suspense } from "react"
import Loading from "@/components/loading"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ankit Patle - Software Developer",
  description: "Portfolio website of Ankit Patle, a Software Developer",
  icons: {
    icon: [
      { url: 'https://i.pinimg.com/736x/8f/a7/aa/8fa7aabafb9b042e040687f8f5ac74e6.jpg', sizes: 'any', type: 'image/x-icon' },
      { url: 'https://i.pinimg.com/736x/8f/a7/aa/8fa7aabafb9b042e040687f8f5ac74e6.jpg', sizes: '16x16', type: 'image/png' },
      { url: 'https://i.pinimg.com/736x/8f/a7/aa/8fa7aabafb9b042e040687f8f5ac74e6.jpg', sizes: '32x32', type: 'image/png' },
    ],
    apple: 'https://i.pinimg.com/736x/8f/a7/aa/8fa7aabafb9b042e040687f8f5ac74e6.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
         
          <Suspense fallback={<Loading />}>
            <Analytics/>
            <Header />
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}