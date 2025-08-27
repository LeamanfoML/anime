import Link from 'next/link';
import { Manga } from '@/lib/mock-data'; // Assuming Manga type is also in mock-data
import { Star } from 'lucide-react';

export default function MangaCard({ manga }: { manga: Manga }) {
  return (
    <Link href={`/manga/${manga.id}`}>
      <div className="group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-anime-primary/50 transition-all duration-300 hover:scale-105 h-full flex flex-col">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={manga.poster}
            alt={manga.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzMzMzMzMyIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7QkNC90LjQvNC1PC90ZXh0Pgo8L3N2Zz4K'
            }}
          />
           {manga.rating && (
            <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-white text-xs font-medium">{manga.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-white font-medium text-sm mb-1 line-clamp-2 group-hover:text-anime-primary transition-colors flex-grow">
            {manga.title}
          </h3>
          <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
            <span>{manga.type}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}