import { pgTable, text, serial, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Weather data types
export interface WeatherData {
  current: {
    temp: number;
    feelsLike: number;
    condition: string;
    humidity: number;
    uvIndex: number;
    wind: string;
    pressure: string;
    icon: string;
  };
  forecast: Array<{
    date: string;
    day: string;
    icon: string;
    highTemp: number;
    lowTemp: number;
    condition: string;
  }>;
  lastUpdated: string;
}

// Tide data types
export interface TideData {
  current: {
    status: 'Rising' | 'Falling' | 'High' | 'Low';
    level: number;
    percentage: number;
  };
  upcoming: Array<{
    type: 'High' | 'Low';
    time: string;
    timeLabel: string;
    height: number;
  }>;
  lastUpdated: string;
}

// Movie data types
export interface MovieData {
  showtimes: Array<{
    title: string;
    rating: string;
    duration: string;
    genre: string;
    times: string[];
  }>;
  lastUpdated: string;
}

// Events data types
export interface EventData {
  upcoming: Array<{
    title: string;
    date: string;
    day: string;
    time: string;
    venue: string;
    description: string;
    price: string;
    priceType: 'free' | 'paid' | 'premium';
  }>;
  lastUpdated: string;
}
