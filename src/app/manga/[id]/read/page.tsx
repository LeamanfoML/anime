'use client';
import { trendingManga, newManga } from '@/lib/mock-data';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

export default function MangaReadPage({ params }: { params: { id: string } }) {
  const allManga = [...trendingManga, ...newManga];
  const manga = allManga.find(m => m.id === parseInt(params.id));

  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [smartCrop, setSmartCrop] = useState(false);
  const [nightModeReader, setNightModeReader] = useState(false);
  const [filterOldScans, setFilterOldScans] = useState(false);

  if (!manga) {
    return <div className="text-center py-10">Manga not found</div>;
  }

  // Placeholder images for manga pages
  const mangaPages = [
    'https://via.placeholder.com/800x1200/1a1a1a/ffffff?text=Manga+Page+1',
    'https://via.placeholder.com/800x1200/1a1a1a/ffffff?text=Manga+Page+2',
    'https://via.placeholder.com/800x1200/1a1a1a/ffffff?text=Manga+Page+3',
    'https://via.placeholder.com/800x1200/1a1a1a/ffffff?text=Manga+Page+4',
    'https://via.placeholder.com/800x1200/1a1a1a/ffffff?text=Manga+Page+5',
  ];

  const imageStyle = {
    filter: `brightness(${brightness}%) contrast(${contrast}%)`,
    backgroundColor: nightModeReader ? '#333' : 'transparent',
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-white mb-4">Reading: {manga.title} - Chapter 1 (Placeholder)</h1>

      {/* Reader Settings */}
      <div className="bg-gray-900 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-bold text-white mb-3">Reader Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label htmlFor="brightness" className="block text-gray-300 text-sm font-bold mb-1">Brightness ({brightness}%)</label>
            <input
              type="range"
              id="brightness"
              min="50"
              max="150"
              value={brightness}
              onChange={(e) => setBrightness(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>
          <div>
            <label htmlFor="contrast" className="block text-gray-300 text-sm font-bold mb-1">Contrast ({contrast}%)</label>
            <input
              type="range"
              id="contrast"
              min="50"
              max="150"
              value={contrast}
              onChange={(e) => setContrast(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="smartCrop"
              checked={smartCrop}
              onChange={(e) => setSmartCrop(e.target.checked)}
              className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="smartCrop" className="ml-2 text-gray-300">Smart Crop</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="nightModeReader"
              checked={nightModeReader}
              onChange={(e) => setNightModeReader(e.target.checked)}
              className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="nightModeReader" className="ml-2 text-gray-300">Night Mode (Reader)</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="filterOldScans"
              checked={filterOldScans}
              onChange={(e) => setFilterOldScans(e.target.checked)}
              className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="filterOldScans" className="ml-2 text-gray-300">Filter Old Scans</label>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center bg-gray-900 rounded-lg p-4">
        {mangaPages.map((pageSrc, index) => (
          <div key={index} className="mb-4 last:mb-0 w-full max-w-3xl">
            <Image src={pageSrc} alt={`Manga Page ${index + 1}`} width={800} height={1200} layout="responsive" className="rounded-lg" style={imageStyle} />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <Link href={`/manga/${manga.id}`} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
          Back to Details
        </Link>
        {/* Placeholder for Next Chapter button */}
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
          Next Chapter
        </button>
      </div>
    </div>
  );
}