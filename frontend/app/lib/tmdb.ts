export const TMDB_API_KEY ="97ca10f5cde769f2a4954342ecad7b02";
export const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export function getImage(path: string | null, size = "w300") {
  if (!path) return "/placeholder.png";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
