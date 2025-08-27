import React from 'react';
import Link from 'next/link';

interface HistoryItem {
  id: number;
  title: string;
  poster: string;
  type: 'Anime' | 'Manga';
  lastWatchedChapter: string;
  progress: number; // 0-100
  lastViewed: string;
}

export default function HistoryPage() {
  const historyItems: HistoryItem[] = [
    {
      id: 1,
      title: 'Jujutsu Kaisen',
      poster: 'https://cdn.myanimelist.net/images/anime/1171/138173.jpg',
      type: 'Anime',
      lastWatchedChapter: 'Episode 44',
      progress: 85,
      lastViewed: '2025-08-25 18:30',
    },
    {
      id: 2,
      title: 'Berserk',
      poster: 'https://cdn.myanimelist.net/images/manga/1/157897.jpg',
      type: 'Manga',
      lastWatchedChapter: 'Chapter 374',
      progress: 60,
      lastViewed: '2025-08-24 12:00',
    },
    {
      id: 3,
      title: 'One Piece',
      poster: 'https://cdn.myanimelist.net/images/anime/6/73245.jpg',
      type: 'Anime',
      lastWatchedChapter: 'Episode 1119',
      progress: 100,
      lastViewed: '2025-08-23 20:00',
    },
    {
      id: 4,
      title: 'Solo Leveling',
      poster: 'https://cdn.myanimelist.net/images/manga/2/197867.jpg',
      type: 'Manga',
      lastWatchedChapter: 'Chapter 204',
      progress: 30,
      lastViewed: '2025-08-22 09:00',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Watch History</h1>

      <div className="space-y-6">
        {historyItems.length === 0 ? (
          <p className="text-gray-500 text-center">Your watch history is empty.</p>
        ) : (
          historyItems.map(item => (
            <div key={item.id} className="bg-white/5 p-4 rounded-lg flex items-center space-x-4">
              <div className="relative w-24 h-32 flex-shrink-0">
                <img src={item.poster} alt={item.title} className="w-full h-full object-cover rounded-md" />
              </div>
              <div className="flex-grow">
                <Link href={item.type === 'Anime' ? `/anime/${item.id}` : `/manga/${item.id}`}>
                  <h2 className="text-xl font-bold text-anime-primary hover:underline">{item.title}</h2>
                </Link>
                <p className="text-gray-300">{item.type} - {item.lastWatchedChapter}</p>
                <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                  <div
                    className="bg-anime-primary h-2 rounded-full"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 mt-1">Last viewed: {item.lastViewed}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}