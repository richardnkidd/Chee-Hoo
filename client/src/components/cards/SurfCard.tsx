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

  if (error) return <Card><CardContent>❌ Surf data error.</CardContent></Card>;
  if (isLoading || !data) return <Card className="animate-pulse h-40" />;

  const { waveHeight, swellDir, swellPeriod, windSpeed, windDir } = data as any;

  return (
    <Card className="relative overflow-hidden shadow-tropical
        bg-gradient-to-br from-tropical-ocean-light/30 via-white/0 to-white/0
        after:absolute after:-top-40 after:-left-40 after:w-[200%] after:h-[200%]
        after:bg-[url('/wave.svg')] after:bg-[length:400px_400px] after:opacity-5 after:animate-float-pattern">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Waves className="w-5 h-5" /> Surf · {props.breakName ?? "Bowls"}
        </CardTitle>
        <CardDescription className="text-xs">
          Updated {new Date((data as any).time).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex items-end justify-between">
        <span
          className={cn(
            "font-display text-5xl font-semibold leading-none tracking-tight pr-1",
            heightColor((data as any).waveHeight)
          )}
        >
          {(data as any).waveHeight?.toFixed(1)}<span className="text-2xl">ft</span>
        </span>

        <div className="text-right text-sm">
          <div className="flex items-center justify-end gap-1">
            <ArrowUpRight
              style={{ transform: `rotate(${swellDir}deg)` }}
              className="w-4 h-4 text-tropical-stone"
            />
            Swell {toHeading(swellDir)} / {Math.round((data as any).swellPeriod)} s
          </div>
          <div className="flex items-center justify-end gap-1">
            🌬 {windSpeed.toFixed(0)} kn {toHeading(windDir)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
