import React from 'react';
import { trendingAnime, newEpisodes, trendingManga, newManga, Anime, Manga } from '@/lib/mock-data';
import AnimeCard from './AnimeCard';
import MangaCard from './MangaCard';

interface RecommendationSectionProps {
  type: 'anime' | 'manga';
  currentId: number;
}

export default function RecommendationSection({ type, currentId }: RecommendationSectionProps) {
  const allContent = type === 'anime' ? [...trendingAnime, ...newEpisodes] : [...trendingManga, ...newManga];

  // Filter out the current item and get a few random recommendations
  const recommendations = allContent
    .filter(item => item.id !== currentId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 5); // Get up to 5 recommendations

  if (recommendations.length === 0) {
    return null; // Don't render if no recommendations
  }

  return (
    <div className="mt-12 bg-gray-900 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">You might also like...</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {recommendations.map(item => (
          type === 'anime' ? (
            <AnimeCard key={item.id} anime={item as Anime} />
          ) : (
            <MangaCard key={item.id} manga={item as Manga} />
          )
        ))}
      </div>
    </div>
  );
}
