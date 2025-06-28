import type { TideData } from '@shared/schema';

const NOAA_STATION_ID = '1612340'; // Honolulu Harbor

export async function getTidesData(): Promise<TideData> {
  try {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const beginDate = today.toISOString().split('T')[0].replace(/-/g, '');
    const endDate = tomorrow.toISOString().split('T')[0].replace(/-/g, '');

    // Fetch predictions for next 48 hours
    const response = await fetch(
      `https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=${beginDate}&end_date=${endDate}&datum=MLLW&station=${NOAA_STATION_ID}&time_zone=lst_ldt&units=english&interval=hilo&format=json`
    );

    if (!response.ok) {
      throw new Error(`NOAA API responded with status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.predictions || data.predictions.length === 0) {
      throw new Error('No tide predictions available');
    }

    // Get current water level
    const currentResponse = await fetch(
      `https://tidesandcurrents.noaa.gov/api/datagetter?product=water_level&application=NOS.COOPS.TAC.WL&begin_date=${beginDate}&end_date=${beginDate}&datum=MLLW&station=${NOAA_STATION_ID}&time_zone=lst_ldt&units=english&format=json`
    );

    let currentLevel = 2.0; // Default fallback
    let currentStatus: 'Rising' | 'Falling' | 'High' | 'Low' = 'Rising';

    if (currentResponse.ok) {
      const currentData = await currentResponse.json();
      if (currentData.data && currentData.data.length > 0) {
        currentLevel = parseFloat(currentData.data[currentData.data.length - 1].v);
      }
    }

    // Determine current status based on next tide
    const nextTide = data.predictions[0];
    if (nextTide) {
      currentStatus = nextTide.type === 'H' ? 'Rising' : 'Falling';
    }

    // Calculate percentage for progress bar (0-4 feet range)
    const percentage = Math.min(100, Math.max(0, (currentLevel / 4) * 100));

    const upcoming = data.predictions.slice(0, 4).map((prediction: any) => {
      const date = new Date(prediction.t);
      const now = new Date();
      const diffHours = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60));
      const diffMinutes = Math.floor(((date.getTime() - now.getTime()) % (1000 * 60 * 60)) / (1000 * 60));
      
      let timeLabel = '';
      if (diffHours < 1) {
        timeLabel = `in ${diffMinutes}m`;
      } else if (diffHours < 24) {
        timeLabel = `in ${diffHours}h ${diffMinutes}m`;
      } else {
        timeLabel = 'tomorrow';
      }

      return {
        type: prediction.type === 'H' ? 'High' : 'Low' as 'High' | 'Low',
        time: date.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
        timeLabel,
        height: parseFloat(prediction.v),
      };
    });

    const tidesData: TideData = {
      current: {
        status: currentStatus,
        level: parseFloat(currentLevel.toFixed(1)),
        percentage: Math.round(percentage),
      },
      upcoming,
      lastUpdated: new Date().toISOString(),
    };

    return tidesData;
  } catch (error) {
    console.error('Error fetching tides data:', error);
    throw error;
  }
}
