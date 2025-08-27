import { trendingManga, newManga } from '@/lib/mock-data';
import Image from 'next/image';
import Link from 'next/link';
import CommentSection from '@/components/CommentSection';
import RatingReviewSection from '@/components/RatingReviewSection';
import RecommendationSection from '@/components/RecommendationSection';

export default function MangaDetailPage({ params }: { params: { id: string } }) {
  const allManga = [...trendingManga, ...newManga];
  const manga = allManga.find(m => m.id === parseInt(params.id));

  if (!manga) {
    return <div className="text-center py-10 text-white">Manga not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <img src={manga.poster} alt={manga.title} className="rounded-lg w-full h-auto" />
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-bold text-white">{manga.title}</h1>
          <div className="flex items-center gap-4 my-4">
            <span className="text-lg font-bold text-anime-primary bg-white/10 px-3 py-1 rounded">{manga.type}</span>
            <span className="text-lg text-yellow-400">⭐ {manga.rating}</span>
          </div>
          <p className="text-gray-300 leading-relaxed">{manga.description}</p>
          <div className="mt-8">
            <Link href={`/manga/${manga.id}/read`} className="bg-anime-primary hover:bg-anime-primary/80 text-white px-6 py-3 rounded-lg text-lg font-semibold">
              Read Now
            </Link>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Chapters</h2>
            <div className="bg-white/5 p-4 rounded-lg h-64">
              {/* Placeholder for chapter list */}
              <p className="text-gray-500">Chapter list will be here.</p>
            </div>
          </div>
        </div>
      </div>
      <RecommendationSection type="manga" currentId={manga.id} />
      <RatingReviewSection />
      <CommentSection />
    </div>
  );
}