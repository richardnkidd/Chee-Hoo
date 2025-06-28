import { ArrowUpRight, Waves } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useSurf } from "@/hooks/useSurf";
import { cn } from "@/lib/utils";

/** Utility to turn compass degrees into N, NE, E… – quick & light */
const headings = ["N","NE","E","SE","S","SW","W","NW"] as const;
const toHeading = (deg:number) => headings[Math.round(deg / 45) % 8];

/** Quick colour ramp for the surf “rating” chip */
const heightColor = (ft:number) => {
  if (ft < 2) return "bg-tropical-ocean-light";
  if (ft < 4) return "bg-tropical-ocean";
  if (ft < 6) return "bg-tropical-ocean-deep";
  return "bg-red-500";
};

type Props = { breakName?: string; lat?: number; lng?: number };

export default function SurfCard(props: Props) {
  const { data, isLoading, error } = useSurf({
    name: props.breakName ?? "Ala Moana Bowls",
    lat: props.lat ?? 21.276,
    lng: props.lng ?? -157.822,
  });

  if (error) return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <Waves className="w-5 h-5 text-tropical-ocean" />
        <h3 className="text-h3 font-display">Surf · Bowls</h3>
      </div>
      <div className="text-secondary text-small">Unable to load surf conditions</div>
    </div>
  );
  
  if (isLoading || !data) return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <Waves className="w-5 h-5 text-tropical-ocean" />
        <h3 className="text-h3 font-display">Surf · Bowls</h3>
      </div>
      <div className="loading-skeleton h-16 w-full"></div>
    </div>
  );

  const { waveHeight, swellDir, swellPeriod, windSpeed, windDir, time } = data as any;

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Waves className="w-5 h-5 text-tropical-ocean" />
          <h3 className="text-h3 font-display">Surf · {props.breakName ?? "Bowls"}</h3>
        </div>
        <div className="text-caption text-secondary">
          Updated {new Date(time).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="flex items-baseline space-x-1">
          <span className={cn(
            "font-display text-[48px] font-semibold leading-none tracking-tight",
            heightColor(waveHeight)
          )}>
            {waveHeight.toFixed(1)}
          </span>
          <span className="text-h3 text-secondary font-medium">ft</span>
        </div>

        <div className="text-right space-y-1">
          <div className="flex items-center justify-end space-x-1">
            <ArrowUpRight
              style={{ transform: `rotate(${swellDir}deg)` }}
              className="w-4 h-4 text-tropical-stone"
            />
            <span className="text-small text-secondary">
              Swell {toHeading(swellDir)} / {Math.round(swellPeriod)}s
            </span>
          </div>
          <div className="text-small text-secondary">
            Wind {windSpeed}kn {toHeading(windDir)}
          </div>
        </div>
      </div>
    </div>
  );
}
