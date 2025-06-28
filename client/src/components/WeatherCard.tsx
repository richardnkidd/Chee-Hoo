import React from 'react';
import { Sun, Cloud, CloudRain, Loader2 } from 'lucide-react';
import { useWeather } from '../hooks/useWeather';

const getWeatherIcon = (condition: string) => {
  const lower = condition.toLowerCase();
  if (lower.includes('rain')) return CloudRain;
  if (lower.includes('cloud')) return Cloud;
  return Sun;
};

export const WeatherCard: React.FC = () => {
  const { data: weather, isLoading, error } = useWeather();

  if (error) {
    return (
      <div className="bg-gradient-to-br from-card to-slate-700/50 rounded-xl shadow-lg border border-slate-600/30 p-6 animate-slide-up">
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-destructive/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CloudRain className="w-6 h-6 text-destructive" />
          </div>
          <p className="text-sm font-medium text-foreground mb-1">Weather Unavailable</p>
          <p className="text-xs text-muted-foreground">Unable to fetch weather data</p>
        </div>
      </div>
    );
  }

  if (isLoading || !weather) {
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
            <div className="h-8 bg-slate-600 rounded w-32"></div>
            <div className="h-4 bg-slate-600 rounded w-3/4"></div>
            <div className="h-4 bg-slate-600 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  const WeatherIcon = getWeatherIcon(weather.current.condition);

  return (
    <div className="bg-gradient-to-br from-card to-slate-700/50 rounded-xl shadow-lg border border-slate-600/30 p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <WeatherIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Weather</h2>
            <p className="text-sm text-muted-foreground">Honolulu, HI</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow"></div>
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>

      {/* Current Weather */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="col-span-2 sm:col-span-1">
          <div className="flex items-center space-x-4">
            <div className="text-4xl font-light text-foreground">{weather.current.temp}°F</div>
            <div>
              <p className="text-lg font-medium text-foreground">{weather.current.condition}</p>
              <p className="text-sm text-muted-foreground">Feels like {weather.current.feelsLike}°F</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Humidity</p>
            <p className="font-medium text-foreground">{weather.current.humidity}%</p>
          </div>
          <div>
            <p className="text-muted-foreground">UV Index</p>
            <p className="font-medium text-foreground">{weather.current.uvIndex}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Wind</p>
            <p className="font-medium text-foreground">{weather.current.wind}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Pressure</p>
            <p className="font-medium text-foreground">{weather.current.pressure}</p>
          </div>
        </div>
      </div>

      {/* 3-Day Forecast */}
      <div className="border-t border-slate-600 pt-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">3-Day Forecast</h3>
        <div className="grid grid-cols-3 gap-2">
          {weather.forecast.slice(0, 3).map((day, index) => {
            const DayIcon = getWeatherIcon(day.condition);
            return (
              <div key={index} className="text-center p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors duration-200">
                <p className="text-xs text-muted-foreground mb-1">{day.day}</p>
                <DayIcon className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                <p className="text-sm font-medium text-foreground">{day.highTemp}°/{day.lowTemp}°</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
