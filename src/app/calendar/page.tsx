import React from 'react';

interface Release {
  id: number;
  title: string;
  type: 'Anime' | 'Manga';
  episodeChapter: string;
  releaseDate: string;
}

export default function CalendarPage() {
  const upcomingReleases: Release[] = [
    { id: 1, title: 'Jujutsu Kaisen', type: 'Anime', episodeChapter: 'Episode 45', releaseDate: 'August 27, 2025' },
    { id: 2, title: 'One Piece', type: 'Anime', episodeChapter: 'Episode 1120', releaseDate: 'August 28, 2025' },
    { id: 3, title: 'Berserk', type: 'Manga', episodeChapter: 'Chapter 375', releaseDate: 'August 29, 2025' },
    { id: 4, title: 'Solo Leveling', type: 'Manga', episodeChapter: 'Chapter 205', releaseDate: 'August 30, 2025' },
    { id: 5, title: 'Frieren: Beyond Journey\'s End', type: 'Anime', episodeChapter: 'Episode 25', releaseDate: 'September 1, 2025' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Release Calendar</h1>

      <div className="bg-white/5 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Upcoming Releases</h2>
        <div className="space-y-4">
          {upcomingReleases.map(release => (
            <div key={release.id} className="bg-white/10 p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-anime-primary">{release.title}</p>
                <p className="text-gray-300">{release.type} - {release.episodeChapter}</p>
              </div>
              <span className="text-gray-400 text-sm">{release.releaseDate}</span>
            </div>
          ))}
        {upcomingReleases.length === 0 && (
          <p className="text-gray-500">No upcoming releases at the moment.</p>
        )}
        </div>
      </div>
    </div>
  );
}