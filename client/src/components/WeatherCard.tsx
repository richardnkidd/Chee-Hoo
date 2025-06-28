import React from 'react';
import { Sun, Cloud, CloudRain, Loader2, Droplets, Wind } from 'lucide-react';
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
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-2xl bg-[rgb(var(--tropical-volcanic)/0.1)] flex items-center justify-center mx-auto mb-4">
          <CloudRain className="w-8 h-8 text-[rgb(var(--tropical-volcanic))]" />
        </div>
        <p className="text-base font-medium text-[rgb(var(--tropical-sand))]">Weather Unavailable</p>
        <p className="text-sm text-[rgb(var(--tropical-sand)/0.6)] mt-1">Unable to fetch weather data</p>
      </div>
    );
  }

  if (isLoading || !weather) {
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
          <div className="h-12 bg-[rgb(var(--tropical-stone)/0.3)] rounded-2xl w-40"></div>
          <div className="h-4 bg-[rgb(var(--tropical-stone)/0.2)] rounded-xl w-3/4"></div>
        </div>
      </div>
    );
  }

  const WeatherIcon = getWeatherIcon(weather.current.condition);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--tropical-ocean))] to-[rgb(var(--tropical-ocean-light))]"></div>
              <WeatherIcon className="w-6 h-6 text-white relative z-10" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[rgb(var(--tropical-sand))]">Weather</h2>
            <p className="text-sm text-[rgb(var(--tropical-sand)/0.7)]">Honolulu, HI</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="status-indicator bg-green-400"></div>
          <span className="text-xs text-[rgb(var(--tropical-sand)/0.6)]">Live</span>
        </div>
      </div>

      {/* Current Weather */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="flex items-baseline space-x-3">
            <span className="text-5xl font-light gradient-text">{weather.current.temp}°</span>
            <span className="text-xl text-[rgb(var(--tropical-sand)/0.8)]">F</span>
          </div>
          <p className="text-lg text-[rgb(var(--tropical-sand))] mt-1">{weather.current.condition}</p>
          <p className="text-sm text-[rgb(var(--tropical-sand)/0.6)] mt-1">Feels like {weather.current.feelsLike}°F</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="glass rounded-2xl p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Droplets className="w-4 h-4 text-[rgb(var(--tropical-ocean-light))]" />
              <p className="text-xs text-[rgb(var(--tropical-sand)/0.6)]">Humidity</p>
            </div>
            <p className="text-lg font-medium text-[rgb(var(--tropical-sand))]">{weather.current.humidity}%</p>
          </div>
          <div className="glass rounded-2xl p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Sun className="w-4 h-4 text-[rgb(var(--tropical-sand))]" />
              <p className="text-xs text-[rgb(var(--tropical-sand)/0.6)]">UV Index</p>
            </div>
            <p className="text-lg font-medium text-[rgb(var(--tropical-sand))]">{weather.current.uvIndex}</p>
          </div>
          <div className="glass rounded-2xl p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Wind className="w-4 h-4 text-[rgb(var(--tropical-ocean-light))]" />
              <p className="text-xs text-[rgb(var(--tropical-sand)/0.6)]">Wind</p>
            </div>
            <p className="text-lg font-medium text-[rgb(var(--tropical-sand))]">{weather.current.wind}</p>
          </div>
          <div className="glass rounded-2xl p-3">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-4 h-4 rounded-full bg-[rgb(var(--tropical-ocean-light)/0.3)]"></div>
              <p className="text-xs text-[rgb(var(--tropical-sand)/0.6)]">Pressure</p>
            </div>
            <p className="text-lg font-medium text-[rgb(var(--tropical-sand))]">{weather.current.pressure}</p>
          </div>
        </div>
      </div>

      {/* 3-Day Forecast */}
      <div className="border-t border-[rgb(var(--tropical-sage)/0.2)] pt-4">
        <h3 className="text-sm font-medium text-[rgb(var(--tropical-sand)/0.8)] mb-4">3-Day Forecast</h3>
        <div className="grid grid-cols-3 gap-3">
          {weather.forecast.slice(0, 3).map((day, index) => {
            const DayIcon = getWeatherIcon(day.condition);
            return (
              <div key={index} className="text-center p-4 rounded-2xl glass hover:bg-[rgb(var(--tropical-stone)/0.2)] transition-all duration-300">
                <p className="text-sm text-[rgb(var(--tropical-sand)/0.7)] mb-2">{day.day}</p>
                <DayIcon className="w-8 h-8 text-[rgb(var(--tropical-ocean-light))] mx-auto mb-2" />
                <div className="flex items-center justify-center space-x-1">
                  <span className="text-base font-medium text-[rgb(var(--tropical-sand))]">{day.highTemp}°</span>
                  <span className="text-sm text-[rgb(var(--tropical-sand)/0.5)]">/</span>
                  <span className="text-sm text-[rgb(var(--tropical-sand)/0.7)]">{day.lowTemp}°</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};