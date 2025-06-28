import React from 'react';
import { Waves, ArrowUp, ArrowDown, Loader2, Activity } from 'lucide-react';
import { useTides } from '../hooks/useTides';

export const TideCard: React.FC = () => {
  const { data: tides, isLoading, error } = useTides();

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-2xl bg-[rgb(var(--tropical-volcanic)/0.1)] flex items-center justify-center mx-auto mb-4">
          <Waves className="w-8 h-8 text-[rgb(var(--tropical-volcanic))]" />
        </div>
        <p className="text-base font-medium text-primary">Tides Unavailable</p>
        <p className="text-sm text-muted mt-1">Unable to fetch tide data</p>
      </div>
    );
  }

  if (isLoading || !tides) {
    return (
      <div className="animate-pulse">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-[rgb(var(--tropical-stone)/0.3)] rounded-2xl"></div>
          <div className="space-y-2">
            <div className="h-5 bg-[rgb(var(--tropical-stone)/0.3)] rounded-xl w-24"></div>
            <div className="h-4 bg-[rgb(var(--tropical-stone)/0.2)] rounded-xl w-32"></div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-20 bg-[rgb(var(--tropical-stone)/0.3)] rounded-2xl"></div>
          <div className="h-4 bg-[rgb(var(--tropical-stone)/0.2)] rounded-xl w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative animate-float">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--tropical-ocean-light))] to-[rgb(var(--tropical-ocean))]"></div>
              <Waves className="w-6 h-6 text-white relative z-10" />
            </div>
          </div>
          <div>
            <h2 className="text-h2 font-display text-emphasis-high">Tides</h2>
            <p className="text-small text-emphasis-medium">Honolulu Harbor</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-small text-emphasis-low">Current</p>
          <p className="text-body font-semibold gradient-text">{tides.current.status}</p>
        </div>
      </div>

      {/* Current Tide Visual */}
      <div className="glass rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-small text-emphasis-medium">Tide Level</span>
          <span className="text-body font-semibold text-emphasis-high">{tides.current.level} ft</span>
        </div>

        <div className="relative">
          <div className="w-full rounded-full overflow-hidden" style={{ height: '12px', backgroundColor: 'rgb(var(--tropical-stone) / 0.3)' }}>
            <div className="absolute inset-0 opacity-20">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-[rgb(var(--tropical-ocean-light)/0.3)] to-transparent animate-wave"></div>
            </div>
            <div 
              className="relative h-full rounded-full transition-all duration-1000 ease-out"
              style={{ 
                width: `${tides.current.percentage}%`,
                background: `linear-gradient(90deg, 
                  rgb(var(--tropical-ocean)) 0%, 
                  rgb(var(--tropical-ocean-light)) 50%,
                  rgb(var(--tropical-sand)/0.5) 100%)`
              }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg"></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted mt-2">
            <span>Low Tide</span>
            <span>High Tide</span>
          </div>
        </div>
      </div>

      {/* Upcoming Tides */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-secondary mb-3">Next Tides</h3>
        {tides.upcoming.slice(0, 4).map((tide, index) => (
          <div key={index} className="glass rounded-2xl p-4 hover:bg-[rgb(var(--tropical-stone)/0.2)] transition-all duration-300" style={{ minHeight: '48px' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  tide.type === 'High' 
                    ? 'bg-gradient-to-br from-[rgb(var(--tropical-ocean)/0.2)] to-[rgb(var(--tropical-ocean-light)/0.2)]' 
                    : 'bg-gradient-to-br from-[rgb(var(--tropical-sand)/0.2)] to-[rgb(var(--tropical-sand)/0.1)]'
                }`}>
                  {tide.type === 'High' ? (
                    <ArrowUp className="text-[rgb(var(--tropical-ocean-light))]" style={{ width: '20px', height: '20px' }} />
                  ) : (
                    <ArrowDown className="text-[rgb(var(--tropical-sand))]" style={{ width: '20px', height: '20px' }} />
                  )}
                </div>
                <div>
                  <p className="text-base font-medium text-primary">
                    {tide.type} Tide
                  </p>
                  <p className="text-sm text-muted">{tide.height} ft</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-base font-medium text-primary">{tide.time}</p>
                <p className="text-xs text-muted">{tide.timeLabel}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-[rgb(var(--tropical-sage)/0.2)]">
        <p className="text-xs text-muted flex items-center">
          <Activity className="w-3 h-3 mr-2" />
          NOAA tide data • Updates every 30 minutes
        </p>
      </div>
    </div>
  );
};