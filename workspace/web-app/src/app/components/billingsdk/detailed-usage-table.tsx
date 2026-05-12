import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";

export interface UsageResource {
  name: string;
  used: number;
  limit: number;
  percentage?: number;
  unit?: string;
}

export interface DetailedUsageTableProps {
  className?: string;
  title?: string;
  description?: string;
  resources: UsageResource[];
}

function getStatusBadge(pct: number) {
  if (pct >= 90)
    return (
      <Badge variant="destructive" className="h-4 text-[9px] px-1.5">
        Critical
      </Badge>
    );
  if (pct >= 75)
    return (
      <Badge variant="secondary" className="h-4 text-[9px] px-1.5 bg-orange-100 text-orange-700">
        High
      </Badge>
    );
  return (
    <Badge variant="secondary" className="h-4 text-[9px] px-1.5 bg-emerald-100 text-emerald-700">
      Normal
    </Badge>
  );
}

function getBarColor(pct: number) {
  if (pct >= 90) return "bg-red-500";
  if (pct >= 75) return "bg-orange-500";
  return "bg-emerald-500";
}

export function DetailedUsageTable({
  className,
  title = "Detailed Usage",
  description,
  resources,
}: DetailedUsageTableProps) {
  if (resources.length === 0) {
    return (
      <Card className={cn("w-full", className)}>
        <CardContent className="flex items-center justify-center py-8">
          <p className="text-[11px] text-muted-foreground italic">No resources to display.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-[13px] font-semibold">{title}</CardTitle>
        {description && (
          <CardDescription className="text-[11px]">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[10px] uppercase tracking-wider pl-4">Agent</TableHead>
              <TableHead className="text-[10px] uppercase tracking-wider text-right">Allocation</TableHead>
              <TableHead className="text-[10px] uppercase tracking-wider text-right pr-4">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resources.map((r) => {
              const pct = r.percentage ?? Math.min(100, (r.used / r.limit) * 100);
              const barColor = getBarColor(pct);
              return (
                <TableRow key={r.name}>
                  <TableCell className="py-2.5 pl-4">
                    <p className="text-[12px] font-medium">{r.name}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-1.5 w-24 rounded-full bg-muted overflow-hidden">
                        <div
                          className={cn("h-full rounded-full transition-all", barColor)}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground tabular-nums">
                        {r.used}{r.unit ?? ""} / {r.limit}{r.unit ?? ""}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right py-2.5">
                    <span className="text-[12px] font-semibold tabular-nums">
                      {pct.toFixed(1)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right py-2.5 pr-4">
                    {getStatusBadge(pct)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
