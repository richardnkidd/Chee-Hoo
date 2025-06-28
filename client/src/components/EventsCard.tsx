import React from 'react';
import { Calendar, Loader2 } from 'lucide-react';
import { useEvents } from '../hooks/useEvents';

export const EventsCard: React.FC = () => {
  const { data: events, isLoading, error } = useEvents();

  if (error) {
    return (
      <div className="bg-gradient-to-br from-card to-slate-700/50 rounded-xl shadow-lg border border-slate-600/30 p-6 animate-slide-up">
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-destructive/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-destructive" />
          </div>
          <p className="text-sm font-medium text-primary mb-1">Events Unavailable</p>
          <p className="text-xs text-muted">Unable to fetch event data</p>
        </div>
      </div>
    );
  }

  if (isLoading || !events) {
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
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-slate-600 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-600 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getPriceColor = (priceType: string) => {
    switch (priceType) {
      case 'free': return 'bg-green-500/20 text-green-400';
      case 'premium': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-blue-500/20 text-blue-400';
    }
  };

  return (
    <div className="bg-gradient-to-br from-card to-slate-700/50 rounded-xl shadow-lg border border-slate-600/30 p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-h2 font-display text-emphasis-high">Events</h2>
            <p className="text-small text-emphasis-medium">Upcoming in Honolulu</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {events.upcoming.slice(0, 5).map((event, index) => (
          <div key={index} className="border-b border-slate-600 last:border-b-0 pb-4 last:pb-0">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg flex flex-col items-center justify-center" style={{ width: '48px', height: '48px' }}>
                  <span className="text-xs font-semibold text-orange-400">{event.date.split(' ')[0]}</span>
                  <span className="text-sm font-bold text-emphasis-high">{event.day}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-h3 font-medium text-emphasis-high">{event.title}</h3>
                <p className="text-caption text-emphasis-medium mb-1">
                  {event.venue} • {event.time}
                </p>
                <p className="text-caption text-emphasis-low">{event.description}</p>
              </div>
              <div className="flex-shrink-0">
                <span className={`px-2 py-1 text-xs rounded-full ${getPriceColor(event.priceType)}`}>
                  {event.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-600">
        <p className="text-xs text-muted flex items-center">
          <Calendar className="w-3 h-3 mr-1" />
          Events sourced from Eventbrite • Updated every 6 hours
        </p>
      </div>
    </div>
  );
};
