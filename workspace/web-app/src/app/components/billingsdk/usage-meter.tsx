import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { cn } from "../ui/utils";

export interface UsageItem {
  name: string;
  usage: number;
  limit: number;
}

export interface UsageMeterProps {
  usage: UsageItem[];
  className?: string;
  variant?: "linear" | "circle";
  title?: string;
  description?: string;
  progressColor?: "default" | "usage";
  showStatusBadges?: boolean;
}

function getColor(pct: number, fixed?: boolean) {
  if (fixed) return "bg-indigo-500";
  if (pct >= 90) return "bg-red-500";
  if (pct >= 75) return "bg-yellow-500";
  if (pct >= 50) return "bg-emerald-500";
  if (pct >= 25) return "bg-blue-500";
  return "bg-slate-400";
}

function getTextColor(pct: number) {
  if (pct >= 90) return "text-red-600";
  if (pct >= 75) return "text-yellow-600";
  if (pct >= 50) return "text-emerald-600";
  if (pct >= 25) return "text-blue-600";
  return "text-slate-500";
}

export function UsageMeterLinear({
  usage,
  className,
  title,
  description,
  showStatusBadges = true,
}: UsageMeterProps) {
  return (
    <Card className={cn("w-full", className)}>
      {(title || description) && (
        <CardHeader className="pb-3">
          {title && <CardTitle className="text-[13px] font-semibold">{title}</CardTitle>}
          {description && (
            <CardDescription className="text-[11px]">{description}</CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent className={cn("space-y-4", !title && !description && "pt-4")}>
        {usage.map((item) => {
          const pct = Math.min(100, (item.usage / item.limit) * 100);
          const barColor = getColor(pct, !showStatusBadges);
          const textColor = getTextColor(pct);
          return (
            <div key={item.name} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium">{item.name}</span>
                <div className="flex items-center gap-2">
                  {showStatusBadges && pct >= 90 && (
                    <Badge variant="destructive" className="h-4 text-[9px] px-1.5">Critical</Badge>
                  )}
                  {showStatusBadges && pct >= 75 && pct < 90 && (
                    <Badge variant="secondary" className="h-4 text-[9px] px-1.5 bg-yellow-100 text-yellow-700">High</Badge>
                  )}
                  <span className={cn("text-[11px] font-semibold tabular-nums", showStatusBadges ? textColor : "text-indigo-600")}>
                    {item.usage}%
                  </span>
                </div>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-700 ease-out", barColor)}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="text-[10px] text-muted-foreground">
                {item.usage}% of {item.limit}% allocated
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
