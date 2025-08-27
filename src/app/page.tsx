'use client'

import { useState, useEffect } from 'react'
import { Search, Play, Star, Download } from 'lucide-react'
import axios from 'axios'
import AnimeCard from '@/components/AnimeCard'
import MangaCarousel from '@/components/MangaCarousel'
import { trendingManga, newManga, Manga } from '@/lib/mock-data'

interface Anime {
  id: string
  title: string
  poster: string
  rating?: number
  year?: number
  episodes?: number
  genres?: string[]
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [animeList, setAnimeList] = useState<Anime[]>([])
  const [loading, setLoading] = useState(false)
  const [trending, setTrending] = useState<Anime[]>([])

  // Поиск аниме
  const searchAnime = async (query: string) => {
    if (!query.trim()) return
    
    setLoading(true)
    try {
      // Интеграция с Anilibria API
      const response = await axios.get(`https://api.anilibria.tv/v3/title/search?search=${encodeURIComponent(query)}&limit=20`)
      
      const results = response.data.list?.map((item: any) => ({
        id: `anilibria_${'''item.id'''}`,
        title: item.names?.ru || item.names?.en || 'Без названия',
        poster: item.posters?.original?.url ? `https://anilibria.tv${item.posters.original.url}` : '/placeholder.jpg',
        rating: item.rating?.rating || 0,
        year: item.season?.year,
        episodes: item.type?.episodes,
        genres: item.genres || []
      })) || []

      setAnimeList(results)
    } catch (error) {
      console.error('Ошибка поиска:', error)
      // Fallback данные
      setAnimeList([
        {
          id: '1',
          title: 'Атака титанов',
          poster: '/placeholder.jpg',
          rating: 9.0,
          year: 2013,
          episodes: 75,
          genres: ['Сёнен', 'Драма', 'Фэнтези']
        },
        {
          id: '2', 
          title: 'Магическая битва',
          poster: '/placeholder.jpg',
          rating: 8.7,
          year: 2020,
          episodes: 24,
          genres: ['Сёнен', 'Экшен', 'Мистика']
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  // Загрузка трендов при старте
  useEffect(() => {
    const loadTrending = async () => {
      try {
        const response = await axios.get('https://api.anilibria.tv/v3/title/updates?limit=12')
        const trendingData = response.data.list?.map((item: any) => ({
          id: `trending_${'''item.id'''}`,
          title: item.names?.ru || item.names?.en,
          poster: item.posters?.original?.url ? `https://anilibria.tv${item.posters.original.url}` : '/placeholder.jpg',
          rating: item.rating?.rating,
          year: item.season?.year,
        })) || []
        
        setTrending(trendingData)
      } catch (error) {
        console.error('Ошибка загрузки трендов:', error)
      }
    }

    loadTrending()
  }, [])

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Заголовок и поиск */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-white mb-4 font-anime">
          Anime<span className="text-anime-primary">Hub</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          🎌 Многофункциональный портал для просмотра аниме
        </p>

        {/* Поиск */}
        <div className="max-w-2xl mx-auto relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchAnime(searchQuery)}
            placeholder="🔍 Поиск аниме..."
            className="w-full px-6 py-4 pl-14 text-lg bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-anime-primary"
          />
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <button
            onClick={() => searchAnime(searchQuery)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-anime-primary hover:bg-anime-primary/80 text-white px-6 py-2 rounded-full transition-colors"
          >
            Найти
          </button>
        </div>
      </div>

      {/* Особенности */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="text-4xl mb-4">🎙️</div>
          <h3 className="text-xl font-bold text-white mb-2">Популярные озвучки</h3>
          <p className="text-gray-300">Anilibria, OnWave, Studio Bands, AnimeVost</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="text-4xl mb-4">📺</div>
          <h3 className="text-xl font-bold text-white mb-2">Удобный плеер</h3>
          <p className="text-gray-300">360p, 480p, 720p + автоматические уведомления</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="text-4xl mb-4">💾</div>
          <h3 className="text-xl font-bold text-white mb-2">Скачивание</h3>
          <p className="text-gray-300">MP4, MKV до 2 ГБ</p>
        </div>
      </div>

      {/* Трендовые аниме */}
      {trending.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">🔥 Популярное сейчас</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {trending.slice(0, 12).map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        </section>
      )}

      {/* Trending Manga */}
      <MangaCarousel title="📚 Популярная манга" mangaList={trendingManga} />

      {/* New Manga */}
      <MangaCarousel title="📖 Новая манга" mangaList={newManga} />

      {/* Результаты поиска */}
      {loading && (
        <div className="text-center py-12">
          <div className="text-white text-xl">Поиск аниме...</div>
        </div>
      )}

      {animeList.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">📚 Результаты поиска</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {animeList.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        </section>
      )}

      {/* Жанры */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">🎭 Популярные жанры</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {['Сёнен', 'Романтика', 'Фэнтези', 'Экшен', 'Комедия', 'Драма', 'Мистика', 'Психология'].map((genre) => (
            <button
              key={genre}
              className="bg-white/10 hover:bg-anime-primary/20 text-white px-6 py-3 rounded-full border border-white/20 hover:border-anime-primary/50 transition-colors"
              onClick={() => {
                setSearchQuery(genre)
                searchAnime(genre)
              }}
            >
              {genre}
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}


