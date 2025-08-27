export interface Anime {
  id: number;
  title: string;
  poster: string;
  type: 'TV' | 'Movie' | 'OVA';
  rating: number;
  description: string;
}

export interface Manga {
  id: number;
  title: string;
  poster: string;
  type: 'Manga' | 'Manhwa' | 'Manhua';
  rating: number;
  description: string;
}

export const trendingAnime: Anime[] = [
  { id: 1, title: 'Jujutsu Kaisen', poster: 'https://cdn.myanimelist.net/images/anime/1171/138173.jpg', type: 'TV', rating: 8.6, description: 'A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself. He enters a shaman\'s school to be able to locate the demon\'s other body parts and thus exorcise himself.' },
  { id: 2, title: 'Attack on Titan', poster: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg', type: 'TV', rating: 9.1, description: 'After his hometown is destroyed and his mother is killed, young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans that have brought humanity to the brink of extinction.' },
  { id: 3, title: 'Demon Slayer', poster: 'https://cdn.myanimelist.net/images/anime/12 demon.jpg', type: 'TV', rating: 8.5, description: 'A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly. Tanjiro sets out to become a demon slayer to avenge his family and cure his sister.' },
  { id: 4, title: 'My Hero Academia', poster: 'https://cdn.myanimelist.net/images/anime/10/78745.jpg', type: 'TV', rating: 8.0, description: 'In a world where people with superpowers (known as Quirks) are the norm, a boy without any inherits the powers of the world\'s greatest hero and enrolls in a school for heroes in training.' };