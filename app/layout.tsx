import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import dynamic from 'next/dynamic'

const Navbar = dynamic(() => import('@/components/navbar'), { ssr: true })
const Footer = dynamic(() => import('@/components/footer'), { ssr: true })

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Padel Academy",
  description: "Tu plataforma para torneos de pádel",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}

