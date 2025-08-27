import React from 'react';
import Link from 'next/link';
import { trendingAnime, newEpisodes, trendingManga, newManga, Anime, Manga } from '@/lib/mock-data';

interface Collection {
  id: number;
  title: string;
  description: string;
  curator: string;
  featuredItems: (Anime | Manga)[];
}

export default function CollectionsPage() {
  const allContent = [...trendingAnime, ...newEpisodes, ...trendingManga, ...newManga];

  const curatedCollections: Collection[] = [
    {
      id: 1,
      title: 'Best Psychological Thrillers',
      description: 'Dive deep into the minds of characters with these mind-bending anime and manga.',
      curator: 'AnimeHub Editor',
      featuredItems: [allContent[0], allContent[1], allContent[10], allContent[11]].filter(Boolean) as (Anime | Manga)[],
    },
    {
      id: 2,
      title: 'Hidden Gems of 2024',
      description: 'Underrated titles from the past year that deserve more attention.',
      curator: 'Community Pick',
      featuredItems: [allContent[6], allContent[8], allContent[16], allContent[17]].filter(Boolean) as (Anime | Manga)[],
    },
    {
      id: 3,
      title: 'Isekai Week Marathon',
      description: 'Transport yourself to another world with these fantastic isekai adventures.',
      curator: 'AnimeHub Staff',
      featuredItems: [allContent[4], allContent[7], allContent[13], allContent[14]].filter(Boolean) as (Anime | Manga)[],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Curated Collections</h1>

      <div className="space-y-8">
        {curatedCollections.map(collection => (
          <div key={collection.id} className="bg-white/5 p-6 rounded-lg">
            <h2 className="text-3xl font-bold text-anime-primary mb-2">{collection.title}</h2>
            <p className="text-gray-300 mb-3">{collection.description}</p>
            <p className="text-gray-400 text-sm mb-4">Curated by: {collection.curator}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {collection.featuredItems.map(item => (
                <Link key={item.id} href={item.type === 'TV' || item.type === 'Movie' || item.type === 'OVA' ? `/anime/${item.id}` : `/manga/${item.id}`}>
                  <div className="relative w-full h-48 rounded-lg overflow-hidden group">
                    <img src={item.poster} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-center font-semibold text-lg p-2">{item.title}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
        {curatedCollections.length === 0 && (
          <p className="text-gray-500 text-center">No curated collections available.</p>
        )}
      </div>
    </div>
  );
}