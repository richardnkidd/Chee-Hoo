import express from "express";

export const surfRouter = express.Router();

/**
 * GET /api/surf?lat=21.276&lng=-157.822
 * Returns the *next* hour of marine data from Open-Meteo,
 * converted to feet for Hawai‘i.
 */
surfRouter.get("/", async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) {
    return res.status(400).json({ error: "lat & lng are required" });
  }

  try {
    // We only need a two-hour slice so the JSON stays tiny
    const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lng}&hourly=wave_height,swell_wave_height,swell_wave_direction,swell_wave_period,wind_speed_10m,wind_direction_10m&length_unit=ft&wind_speed_unit=kn`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Open-Meteo ${response.status}`);

    const data = await response.json();
    // Pick the first hour (index 0).  API always starts at the present hour.
    res.json({
      time: data.hourly.time[0],
      waveHeight: data.hourly.wave_height[0],
      swellHeight: data.hourly.swell_wave_height[0],
      swellDir: data.hourly.swell_wave_direction[0],
      swellPeriod: data.hourly.swell_wave_period[0],
      windSpeed: data.hourly.wind_speed_10m[0],
      windDir: data.hourly.wind_direction_10m[0],
    });
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: "Surf data unavailable" });
  }
});
