import React from 'react';
import { Film, Image, Loader2 } from 'lucide-react';
import { useMovies } from '../hooks/useMovies';

export const MoviesCard: React.FC = () => {
  const { data: movies, isLoading, error } = useMovies();

  if (error) {
    return (
      <div className="bg-gradient-to-br from-card to-slate-700/50 rounded-xl shadow-lg border border-slate-600/30 p-6 animate-slide-up">
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-destructive/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Film className="w-6 h-6 text-destructive" />
          </div>
          <p className="text-sm font-medium text-primary mb-1">Movies Unavailable</p>
          <p className="text-xs text-muted">Unable to fetch movie showtimes</p>
        </div>
      </div>
    );
  }

  if (isLoading || !movies) {
    return (
      <div className="bg-gradient-to-br from-card to-slate-700/50 rounded-xl shadow-lg border border-slate-600/30 p-6 animate-slide-up">
        <div className="animate-pulse">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-slate-600 rounded-lg"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-600 rounded w-20"></div>
              <div className="h-3 bg-slate-700 rounded w-32"></div>
            </div>
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="w-12 h-16 bg-slate-600 rounded-md"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-600 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-700 rounded w-1/2"></div>
                  <div className="flex gap-1">
                    <div className="h-6 bg-slate-600 rounded w-16"></div>
                    <div className="h-6 bg-slate-600 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-card to-slate-700/50 rounded-xl shadow-lg border border-slate-600/30 p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <Film className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-h2 font-display text-emphasis-high">Movies</h2>
            <p className="text-small text-emphasis-medium">Ward Theater</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {movies.showtimes.slice(0, 4).map((movie, index) => (
          <div key={index} className="border-b border-slate-600 last:border-b-0 pb-4 last:pb-0">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0" style={{ width: '48px', height: '64px' }}>
                <div className="w-full h-full bg-gradient-to-br from-slate-600 to-slate-700 rounded-md flex items-center justify-center">
                  <Image className="w-5 h-5 text-slate-400" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-h3 font-medium text-emphasis-high truncate">{movie.title}</h3>
                <p className="text-caption text-emphasis-low mb-2">
                  {movie.rating} • {movie.duration} • {movie.genre}
                </p>
                <div className="flex flex-wrap gap-1">
                  {movie.times.map((time, timeIndex) => (
                    <span key={timeIndex} className="px-2 py-1 bg-slate-700 rounded text-xs text-emphasis-high" style={{ height: '24px', display: 'flex', alignItems: 'center' }}>
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-600">
        <p className="text-xs text-muted flex items-center">
          <Film className="w-3 h-3 mr-1" />
          Showtimes updated daily at 6 AM HST
        </p>
      </div>
    </div>
  );
};
