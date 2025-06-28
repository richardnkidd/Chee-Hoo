import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getWeatherData } from "./services/weatherService";
import { getTidesData } from "./services/tidesService";
import { getMoviesData } from "./services/moviesService";
import { getEventsData } from "./services/eventsService";

export async function registerRoutes(app: Express): Promise<Server> {
  // Add proper MIME type handling for JS modules
  app.use((req, res, next) => {
    if (req.url.endsWith('.tsx') || req.url.endsWith('.ts') || req.url.endsWith('.jsx') || req.url.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
    next();
  });

  // Weather endpoint
  app.get("/api/weather", async (req, res) => {
    try {
      const weatherData = await getWeatherData();
      res.json(weatherData);
    } catch (error) {
      console.error('Weather API error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch weather data',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Tides endpoint
  app.get("/api/tides", async (req, res) => {
    try {
      const tidesData = await getTidesData();
      res.json(tidesData);
    } catch (error) {
      console.error('Tides API error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch tides data',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Movies endpoint
  app.get("/api/movies", async (req, res) => {
    try {
      const moviesData = await getMoviesData();
      res.json(moviesData);
    } catch (error) {
      console.error('Movies API error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch movies data',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Events endpoint
  app.get("/api/events", async (req, res) => {
    try {
      const eventsData = await getEventsData();
      res.json(eventsData);
    } catch (error) {
      console.error('Events API error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch events data',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
