'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Settings, Maximize, Volume2, Play, Pause } from 'lucide-react'

export default function WatchPage() {
  const params = useParams()
  const router = useRouter()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [quality, setQuality] = useState('720p')
  const [voiceover, setVoiceover] = useState('Anilibria')

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Шапка плеера */}
      <div className="bg-black/80 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => router.back()}
              className="text-white hover:text-anime-primary transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-white font-medium">Магическая битва</h1>
              <p className="text-gray-400 text-sm">Серия 1 • {voiceover}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select 
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="bg-white/10 text-white border border-white/20 rounded px-3 py-1 text-sm"
            >
              <option value="720p" className="bg-gray-800">720p</option>
              <option value="480p" className="bg-gray-800">480p</option>
              <option value="360p" className="bg-gray-800">360p</option>
            </select>
            
            <select 
              value={voiceover}
              onChange={(e) => setVoiceover(e.target.value)}
              className="bg-white/10 text-white border border-white/20 rounded px-3 py-1 text-sm"
            >
              <option value="Anilibria" className="bg-gray-800">Anilibria</option>
              <option value="OnWave" className="bg-gray-800">OnWave</option>
              <option value="Studio Bands" className="bg-gray-800">Studio Bands</option>
              <option value="AnimeVost" className="bg-gray-800">AnimeVost</option>
            </select>
          </div>
        </div>
      </div>

      {/* Видеоплеер */}
      <div className="relative bg-black group">
        <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Play className="w-12 h-12" />
            </div>
            <p className="text-lg mb-2">Видео загружается...</p>
            <p className="text-gray-400">Подключение к серверу {voiceover}</p>
          </div>
        </div>

        {/* Контролы плеера */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Прогресс бар */}
          <div className="mb-4">
            <div className="w-full h-2 bg-white/20 rounded-full cursor-pointer">
              <div className="h-2 bg-anime-primary rounded-full relative" style={{ width: '25%' }}>
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-anime-primary rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:text-anime-primary transition-colors"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
              </button>
              
              <div className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration || 1440)}
              </div>

              <div className="flex items-center space-x-2">
                <Volume2 className="w-5 h-5 text-white" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-20"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="text-white hover:text-anime-primary transition-colors">
                <Settings className="w-6 h-6" />
              </button>
              <button className="text-white hover:text-anime-primary transition-colors">
                <Maximize className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Список серий */}
      <div className="container mx-auto p-6">
        <h2 className="text-white text-xl font-bold mb-4">Серии</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-3">
          {Array.from({ length: 24 }, (_, i) => (
            <button
              key={i + 1}
              className={`aspect-square rounded-lg border-2 transition-colors flex items-center justify-center font-medium ${
                i === 0
                  ? 'bg-anime-primary border-anime-primary text-white'
                  : 'bg-white/5 border-white/20 text-white hover:border-anime-primary/50 hover:bg-anime-primary/10'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}