import { Manga } from '@/lib/mock-data';
import MangaCard from './MangaCard';

interface MangaCarouselProps {
  title: string;
  mangaList: Manga[];
}

export default function MangaCarousel({ title, mangaList }: MangaCarouselProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {mangaList.map(manga => (
          <MangaCard key={manga.id} manga={manga} />
        ))}
      </div>
    </section>
  );
}