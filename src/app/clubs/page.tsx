import React from 'react';
import Link from 'next/link';

interface Club {
  id: number;
  name: string;
  description: string;
  members: number;
}

export default function ClubsPage() {
  const clubs: Club[] = [
    { id: 1, name: 'Jujutsu Kaisen Fan Club', description: 'Discuss everything about Jujutsu Kaisen!', members: 1500 },
    { id: 2, name: 'Manga Readers United', description: 'For all manga, manhwa, and manhua enthusiasts.', members: 2300 },
    { id: 3, name: 'Classic Anime Lovers', description: 'Celebrating anime from the 80s, 90s, and early 2000s.', members: 800 },
    { id: 4, name: 'New Episode Hype', description: 'Get hyped for the latest anime episodes!', members: 1200 },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Clubs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map(club => (
          <div key={club.id} className="bg-white/5 p-6 rounded-lg flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-anime-primary mb-2">{club.name}</h2>
              <p className="text-gray-300 mb-4">{club.description}</p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">{club.members} members</span>
              <Link href={`/clubs/${club.id}`} className="bg-anime-primary hover:bg-anime-primary/80 text-white px-4 py-2 rounded-lg">
                View Club
              </Link>
            </div>
          </div>
        ))}
        {clubs.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">No clubs found.</p>
        )}
      </div>
    </div>
  );
}