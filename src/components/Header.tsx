'use client'; // Add this because we are using hooks (useState, useRouter)

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-black/80 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link href="/" className="text-2xl font-bold text-white font-anime">
          Anime<span className="text-anime-primary">Hub</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/anime" className="text-gray-300 hover:text-anime-primary transition-colors">Anime</Link>
          <Link href="/manga" className="text-gray-300 hover:text-anime-primary transition-colors">Manga</Link>
          <Link href="/calendar" className="text-gray-300 hover:text-anime-primary transition-colors">Calendar</Link>
          <Link href="/collections" className="text-gray-300 hover:text-anime-primary transition-colors">Collections</Link>
          <Link href="/profile" className="text-gray-300 hover:text-anime-primary transition-colors">Profile</Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-white/10 border border-white/20 rounded-full pl-4 pr-10 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-anime-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="w-4 h-4 text-gray-400" />
              </button>
            </form>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-lg">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <Link href="/anime" className="text-gray-300 hover:text-anime-primary transition-colors">Anime</Link>
            <Link href="/manga" className="text-gray-300 hover:text-anime-primary transition-colors">Manga</Link>
            <Link href="/calendar" className="text-gray-300 hover:text-anime-primary transition-colors">Calendar</Link>
            <Link href="/collections" className="text-gray-300 hover:text-anime-primary transition-colors">Collections</Link>
            <Link href="/profile" className="text-gray-300 hover:text-anime-primary transition-colors">Profile</Link>
            <Link href="/history" className="text-gray-300 hover:text-anime-primary transition-colors">History</Link>
            <Link href="/clubs" className="text-gray-300 hover:text-anime-primary transition-colors">Clubs</Link>
            <Link href="/polls" className="text-gray-300 hover:text-anime-primary transition-colors">Polls</Link>
             <form onSubmit={handleSearch} className="relative mt-4">
              <input
                type="text"
                placeholder="Search..."
                className="bg-white/10 border border-white/20 rounded-full pl-4 pr-10 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-anime-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="w-4 h-4 text-gray-400" />
              </button>
            </form>
          </nav>
        </div>
      )}
    </header>
  );
}