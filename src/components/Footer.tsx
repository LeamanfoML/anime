export default function Footer() {
  return (
    <footer className="bg-black/50 border-t border-white/10 text-white p-4 mt-12">
      <div className="container mx-auto text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} AnimeHub. All Rights Reserved.</p>
        <p className="mt-1">Created with ❤️ for anime fans.</p>
      </div>
    </footer>
  );
}