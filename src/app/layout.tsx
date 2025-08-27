import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AnimeHub - Многофункциональный аниме-портал',
  description: 'Смотрите аниме онлайн с популярными озвучками: Anilibria, OnWave, Studio Bands, AnimeVost. Поиск, просмотр, скачивание.',
  keywords: 'аниме, онлайн, anilibria, озвучка, скачать, смотреть',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FF6B6B" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-anime-dark via-anime-darker to-black flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}