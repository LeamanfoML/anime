'use client'

import { useState, useEffect } from 'react'
import { Play, Star, Download, Heart, Share } from 'lucide-react'
import { useParams } from 'next/navigation'

interface AnimeDetails {
  id: string
  title: string
  description: string
  poster: string
  rating: number
  year: number
  episodes: number
  status: string
  genres: string[]
  voiceovers: string[]
}

export default function AnimePage() {
  const params = useParams()
  const [anime, setAnime] = useState<AnimeDetails | null>(null)
  const [selectedVoiceover, setSelectedVoiceover] = useState('Anilibria')
  const [selectedQuality, setSelectedQuality] = useState('720p')

  useEffect(() => {
    // Симуляция загрузки данных аниме
    const mockAnime: AnimeDetails = {
      id: params.id as string,
      title: 'Магическая битва',
      description: 'Сильные едят слабых. Это неоспоримая истина мира, где живут демоны, невидимые обычным людям. Юдзи Итадори — старшеклассник с поразительной физической силой.',
      poster: '/placeholder.jpg',
      rating: 8.7,
      year: 2020,
      episodes: 24,
      status: 'Завершён',
      genres: ['Сёнен', 'Экшен', 'Мистика', 'Школа'],
      voiceovers: ['Anilibria', 'OnWave', 'Studio Bands', 'AnimeVost']
    }
    setAnime(mockAnime)
  }, [params.id])

  if (!anime) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      {/* Фон с размытием */}
      <div className="fixed inset-0 z-0">
        <img 
          src={anime.poster}
          alt=""
          className="w-full h-full object-cover opacity-20 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-anime-dark/80 via-anime-dark/90 to-anime-dark"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Постер */}
          <div className="md:col-span-1">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src={anime.poster}
                alt={anime.title}
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Кнопки действий */}
              <div className="absolute bottom-4 left-4 right-4 space-y-2">
                <button className="w-full bg-anime-primary hover:bg-anime-primary/80 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 font-medium transition-colors">
                  <Play className="w-5 h-5" />
                  <span>Смотреть</span>
                </button>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 px-3 rounded-lg flex items-center justify-center space-x-1 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>В список</span>
                  </button>
                  <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 px-3 rounded-lg flex items-center justify-center space-x-1 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Скачать</span>
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 text-white py-2 px-3 rounded-lg transition-colors">
                    <Share className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Информация */}
          <div className="md:col-span-2">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <h1 className="text-4xl font-bold text-white mb-4">{anime.title}</h1>
              
              {/* Рейтинг и инфо */}
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-white font-medium">{anime.rating}</span>
                </div>
                <span className="text-gray-300">{anime.year}</span>
                <span className="text-gray-300">{anime.episodes} эп.</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                  {anime.status}
                </span>
              </div>

              {/* Жанры */}
              <div className="flex flex-wrap gap-2 mb-6">
                {anime.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-white/10 text-white rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Описание */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                {anime.description}
              </p>

              {/* Настройки просмотра */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Озвучка:</label>
                  <select 
                    value={selectedVoiceover}
                    onChange={(e) => setSelectedVoiceover(e.target.value)}
                    className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-anime-primary"
                  >
                    {anime.voiceovers.map((vo) => (
                      <option key={vo} value={vo} className="bg-gray-800">
                        {vo}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Качество:</label>
                  <select 
                    value={selectedQuality}
                    onChange={(e) => setSelectedQuality(e.target.value)}
                    className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-anime-primary"
                  >
                    <option value="720p" className="bg-gray-800">720p</option>
                    <option value="480p" className="bg-gray-800">480p</option>
                    <option value="360p" className="bg-gray-800">360p</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Список эпизодов */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 mt-6">
              <h2 className="text-2xl font-bold text-white mb-4">Эпизоды</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {Array.from({ length: anime.episodes }, (_, i) => (
                  <button
                    key={i + 1}
                    className="aspect-square bg-white/10 hover:bg-anime-primary/20 text-white rounded-lg border border-white/20 hover:border-anime-primary/50 transition-colors flex items-center justify-center font-medium"
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}