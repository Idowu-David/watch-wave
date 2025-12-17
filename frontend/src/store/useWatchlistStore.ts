// src/store/useWatchlistStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// --- Type Definitions for Data Structures ---

export interface User { // <--- 1. NEW DEDICATED USER INTERFACE
    email: string;
}

export type WatchlistItem = {
  id: number;
  type: 'movie' | 'tv';
  title: string;
  poster_path: string | null;
  release_date: string;
  genres: string[]; // Store genre names when adding
};

// Items that have been watched (must include rating/notes)
export type WatchedItem = WatchlistItem & {
  rating: number; // 1-10 rating
  notes?: string;
  dateWatched: number; // Timestamp for sorting
};

// The central state shape
type Store = {
  // User State
  user: User | null; // <--- USING NEW INTERFACE

  // List States
  wantToWatch: WatchlistItem[];
  watched: WatchedItem[];

  // --- Actions ---

  // Auth Actions
  login: (user: User) => void; // <--- 2. UPDATED LOGIN TYPE
  logout: () => void;
  
  // List CRUD Actions
  addToWant: (item: WatchlistItem) => void;
  removeFromList: (id: number, list: 'wantToWatch' | 'watched') => void;
  markAsWatched: (item: WatchlistItem, rating: number, notes?: string) => void;
  updateWatchedItem: (id: number, rating: number, notes?: string) => void;
  
  // Utility
  isItemInList: (id: number, list: 'wantToWatch' | 'watched') => boolean;
  // Explicitly type the return based on the list argument
  getItemFromList: (id: number, list: 'wantToWatch' | 'watched') => WatchedItem | WatchlistItem | undefined;
};

// --- Store Creation ---

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      wantToWatch: [],
      watched: [],

      // --- Auth Implementation ---
      login: (user) => set({ user: user }), // <--- 3. UPDATED LOGIN IMPLEMENTATION
      logout: () => set({ 
        user: null, 
        wantToWatch: [], 
        watched: [] 
      }),

      // --- List CRUD Implementation ---
      
      addToWant: (item) => {
        if (!get().isItemInList(item.id, 'wantToWatch') && !get().isItemInList(item.id, 'watched')) {
          set((state) => ({ wantToWatch: [...state.wantToWatch, item] }));
        }
      },
      
      removeFromList: (id, list) => {
        set((state) => ({
          [list]: state[list].filter((item) => item.id !== id),
        }));
      },

      markAsWatched: (item, rating, notes) => {
        // 1. Check if it's currently in 'Want to Watch' and remove it
        if (get().isItemInList(item.id, 'wantToWatch')) {
          get().removeFromList(item.id, 'wantToWatch');
        }
         
        // 2. Prepare the new/updated watched item
        const watchedItem: WatchedItem = {
          ...item,
          rating,
          notes,
          dateWatched: Date.now(),
        };
        
        // 3. Add to 'Watched' list or ensure it's updated (if it's already there, updateWatchedItem handles it)
        if (!get().isItemInList(item.id, 'watched')) {
             set((state) => ({ watched: [...state.watched, watchedItem] }));
        } else {
             get().updateWatchedItem(item.id, rating, notes);
        }
      },

      updateWatchedItem: (id, rating, notes) => {
        set((state) => ({
          watched: state.watched.map((item) =>
            item.id === id ? { ...item, rating, notes } : item
          ),
        }));
      },
      
      // --- Utility Implementation ---
      
      isItemInList: (id, list) => {
        return get()[list].some((item) => item.id === id);
      },
      
      getItemFromList: (id, list) => {
        // The type assertion here helps satisfy TypeScript when accessing the list array
    return (get()[list] as (WatchlistItem | WatchedItem)[]).find((item) => item.id === id);
      },
      
    }),
    {
      name: 'watchlist-storage', // key for localStorage
      // only store the data, not the functions
      partialize: (state) => ({
        user: state.user,
        wantToWatch: state.wantToWatch,
        watched: state.watched,
      }),
    }
  )
);

// --- Dashboard Helper (Stats Hook) ---

export const useDashboardStats = () => {
  const { watched, wantToWatch } = useStore();

  const totalWatched = watched.length;
  const totalWantToWatch = wantToWatch.length;

  // Average Rating
  const totalRatingSum = watched.reduce((sum, item) => sum + item.rating, 0);
  const averageRating = totalWatched > 0 ? (totalRatingSum / totalWatched).toFixed(1) : 'N/A';
    
  // --- Genre Calculation ---
  const genreCounts = new Map<string, number>();
  watched.forEach(item => {
      item.genres?.forEach(genre => {
          genreCounts.set(genre, (genreCounts.get(genre) || 0) + 1);
      });
  });

  let topGenre = 'N/A';
  let maxCount = 0;
  genreCounts.forEach((count, genre) => {
      if (count > maxCount) {
          maxCount = count;
          topGenre = genre;
      }
  });


  // Rating Distribution (for Bar Chart)
  const ratingDistribution = watched.reduce((acc, item) => {
    const rating = Math.floor(item.rating); // Group by integer rating (1-10)
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const barChartData = Object.keys(ratingDistribution)
    .sort((a, b) => parseInt(a) - parseInt(b)) // Sort by rating number
    .map(rating => ({
      rating: `${rating} Stars`,
      count: ratingDistribution[parseInt(rating)],
    }));

  // Recent Activity (Last 5 watched)
  const recentActivity = watched
    .slice() // create a copy
    .sort((a, b) => b.dateWatched - a.dateWatched) // sort by dateWatched DESC
    .slice(0, 5);

  return {
    totalWatched,
    totalWantToWatch,
    averageRating,
    topGenre, // Added Top Genre to the hook return
    barChartData,
    recentActivity,
  };
};