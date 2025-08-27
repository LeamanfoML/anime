export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-anime-primary">
          <img src="https://via.placeholder.com/128/FF6B6B/FFFFFF?text=User" alt="User Avatar" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-4xl font-bold text-white mt-4">AnimeFan2025</h1>
        <p className="text-gray-400 text-lg">Joined: August 2025</p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/5 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Stats</h2>
          <ul className="text-gray-300 space-y-2">
            <li>Anime Watched: <span className="font-semibold text-anime-primary">150</span></li>
            <li>Manga Read: <span className="font-semibold text-anime-primary">80</span></li>
            <li>Comments Posted: <span className="font-semibold text-anime-primary">345</span></li>
            <li>Followers: <span className="font-semibold text-anime-primary">120</span></li>
          </ul>
        </div>

        <div className="bg-white/5 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Favorite Genres</h2>
          <div className="flex flex-wrap gap-2">
            <span className="bg-anime-primary/20 text-anime-primary text-sm px-3 py-1 rounded-full">Action</span>
            <span className="bg-anime-primary/20 text-anime-primary text-sm px-3 py-1 rounded-full">Fantasy</span>
            <span className="bg-anime-primary/20 text-anime-primary text-sm px-3 py-1 rounded-full">Sci-Fi</span>
            <span className="bg-anime-primary/20 text-anime-primary text-sm px-3 py-1 rounded-full">Slice of Life</span>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white/5 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Recently Watched Anime</h2>
        {/* Placeholder for recently watched anime */}
        <p className="text-gray-500">List of recently watched anime will be here.</p>
      </div>

      <div className="mt-8 bg-white/5 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Recently Read Manga</h2>
        {/* Placeholder for recently read manga */}
        <p className="text-gray-500">List of recently read manga will be here.</p>
      </div>
    </div>
  );
}