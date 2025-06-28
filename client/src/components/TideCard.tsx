import React from 'react';
import { Waves, ArrowUp, ArrowDown, Loader2 } from 'lucide-react';
import { useTides } from '../hooks/useTides';

export const TideCard: React.FC = () => {
  const { data: tides, isLoading, error } = useTides();

  if (error) {
    return (
      <div className="bg-gradient-to-br from-card to-slate-700/50 rounded-xl shadow-lg border border-slate-600/30 p-6 animate-slide-up">
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-destructive/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Waves className="w-6 h-6 text-destructive" />
          </div>
          <p className="text-sm font-medium text-foreground mb-1">Tides Unavailable</p>
          <p className="text-xs text-muted-foreground">Unable to fetch tide data</p>
        </div>
      </div>
    );
  }

  if (isLoading || !tides) {
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
          <div className="space-y-3">
            <div className="h-4 bg-slate-600 rounded"></div>
            <div className="h-4 bg-slate-600 rounded w-3/4"></div>
            <div className="h-4 bg-slate-600 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-card to-slate-700/50 rounded-xl shadow-lg border border-slate-600/30 p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
            <Waves className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Tides</h2>
            <p className="text-sm text-muted-foreground">Honolulu Harbor</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Current</p>
          <p className="text-lg font-semibold text-foreground">{tides.current.status}</p>
        </div>
      </div>

      {/* Current Tide Status */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Tide Level</span>
          <span className="text-sm font-medium text-foreground">{tides.current.level} ft</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-teal-500 to-teal-400 h-2 rounded-full transition-all duration-500" 
            style={{ width: `${tides.current.percentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>

      {/* Next 4 Tides */}
      <div className="border-t border-slate-600 pt-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Next Tides</h3>
        <div className="space-y-3">
          {tides.upcoming.slice(0, 4).map((tide, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  tide.type === 'High' ? 'bg-blue-500/20' : 'bg-red-500/20'
                }`}>
                  {tide.type === 'High' ? (
                    <ArrowUp className="w-4 h-4 text-blue-400" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-400" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{tide.type} Tide</p>
                  <p className="text-xs text-muted-foreground">{tide.height} ft</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{tide.time}</p>
                <p className="text-xs text-muted-foreground">{tide.timeLabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
