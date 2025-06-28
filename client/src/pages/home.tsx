import React, { useState, useEffect } from 'react';
import { Waves, RefreshCw, WifiOff } from 'lucide-react';
import { WeatherCard } from '../components/WeatherCard';
import { TideCard } from '../components/TideCard';
import { MoviesCard } from '../components/MoviesCard';
import { EventsCard } from '../components/EventsCard';
import { mutate } from 'swr';
import { useToast } from '../hooks/use-toast';

export default function Home() {
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { toast } = useToast();

  useEffect(() => {
    const updateLastUpdated = () => {
      const now = new Date();
      const timeAgo = Math.floor((Date.now() - now.getTime()) / 60000);
      setLastUpdated(timeAgo === 0 ? 'Just now' : `${timeAgo} min ago`);
    };

    updateLastUpdated();
    const interval = setInterval(updateLastUpdated, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Back online",
        description: "Data will be refreshed automatically",
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "You're offline",
        description: "Showing cached data from your last visit",
        variant: "destructive",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([
        mutate('/api/weather'),
        mutate('/api/tides'),
        mutate('/api/movies'),
        mutate('/api/events'),
      ]);
      setLastUpdated('Just now');
      toast({
        title: "Refreshed",
        description: "All data has been updated",
      });
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Unable to update some data sources",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Waves className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Honolulu Live</h1>
                <p className="text-xs text-muted-foreground">Real-time island info</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs text-muted-foreground">Updated {lastUpdated}</span>
              <button 
                className="p-2 rounded-lg bg-card hover:bg-slate-700 transition-colors duration-200 touch-target disabled:opacity-50"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`w-4 h-4 text-muted-foreground ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WeatherCard />
          <TideCard />
          <MoviesCard />
          <EventsCard />
        </div>
      </main>

      {/* Offline Indicator */}
      {!isOnline && (
        <div className="fixed bottom-4 left-4 right-4 bg-yellow-600 text-slate-900 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 animate-slide-up">
          <WifiOff className="w-5 h-5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">You're offline</p>
            <p className="text-xs opacity-80">Showing cached data from your last visit</p>
          </div>
        </div>
      )}
    </div>
  );
}
