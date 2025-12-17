export interface TMDBResponse<T> {
  page: number;
  total_pages: number;
  results: T[];
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}
