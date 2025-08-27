'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Filter } from 'lucide-react'
import axios from 'axios'
import AnimeCard from '@/components/AnimeCard'

interface Anime {
  id: string
  title: string
  poster: string
  rating?: number
  year?: number
  episodes?: number
  genres?: string[]
}

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<Anime[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState(query)
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    status: ''
  })

  const searchAnime = async (searchTerm: string) => {
    if (!searchTerm.trim()) return
    
    setLoading(true)
    try {
      const response = await axios.get(`https://api.anilibria.tv/v3/title/search?search=${encodeURIComponent(searchTerm)}&limit=50`)
      
      const searchResults = response.data.list?.map((item: any) => ({
        id: `anilibria_${item.id}`,
        title: item.names?.ru || item.names?.en,
        poster: item.posters?.original?.url ? `https://anilibria.tv${item.posters.original.url}` : '/placeholder.jpg',
        rating: item.rating?.rating,
        year: item.season?.year,
        episodes: item.type?.episodes,
        genres: item.genres || []
      })) || []

      setResults(searchResults)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (query) {
      setSearchQuery(query)
      searchAnime(query)
    }
  }, [query])

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Поисковая строка */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="relative flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchAnime(searchQuery)}
            placeholder="Поиск аниме..."
            className="flex-1 px-6 py-4 pl-14 text-lg bg-white/10 backdrop-blur-lg border border-white/20 rounded-l-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-anime-primary"
          />
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <button
            onClick={() => searchAnime(searchQuery)}
            className="bg-anime-primary hover:bg-anime-primary/80 text-white px-8 py-4 rounded-r-full transition-colors font-medium"
          >
            Поиск
          </button>
        </div>
      </div>

      {/* Результаты */}
      <div className="text-white mb-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-xl">Поиск...</div>
          </div>
        ) : results.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold mb-2">
              Найдено: {results.length} результатов
            </h2>
            <p className="text-gray-400">По запросу: "{searchQuery}"</p>
          </>
        ) : searchQuery ? (
          <div className="text-center py-12">
            <div className="text-xl">Ничего не найдено</div>
            <p className="text-gray-400 mt-2">Попробуйте изменить запрос</p>
          </div>
        ) : null}
      </div>

      {/* Сетка результатов */}
      {results.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {results.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      )}
    </main>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-white text-center py-12">Загрузка...</div>}>
      <SearchContent />
    </Suspense>
  )
}


