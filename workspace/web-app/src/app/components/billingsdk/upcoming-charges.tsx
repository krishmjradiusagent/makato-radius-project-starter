import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "../ui/utils";
import { Calendar } from "lucide-react";

export interface ChargeItem {
  id: string;
  description: string;
  amount: string;
  date: string;
  type: "prorated" | "recurring" | "one-time";
}

export interface UpcomingChargesProps {
  className?: string;
  title?: string;
  description?: string;
  nextBillingDate: string;
  totalAmount: string;
  charges: ChargeItem[];
}

export function UpcomingCharges({
  className,
  title = "Upcoming Charges",
  description,
  nextBillingDate,
  totalAmount,
  charges,
}: UpcomingChargesProps) {
  const getChargeTypeBadge = (type: ChargeItem["type"]) => {
    switch (type) {
      case "prorated":
        return <Badge variant="secondary">Prorated</Badge>;
      case "recurring":
        return <Badge variant="default">Recurring</Badge>;
      case "one-time":
        return <Badge variant="outline">One-time</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-[13px] font-semibold">{title}</CardTitle>
        {description && (
          <CardDescription className="text-[11px]">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/30 rounded-lg border p-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Calendar className="text-muted-foreground h-4 w-4 shrink-0" />
              <div>
                <p className="text-muted-foreground text-[10px]">Closing Date</p>
                <p className="text-[12px] font-semibold">{nextBillingDate}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-[10px]">Total Deducted</p>
              <p className="text-[18px] font-bold tabular-nums text-destructive">{totalAmount}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Breakdown</h3>
          <div className="space-y-1.5">
            {charges.map((charge) => (
              <div
                key={charge.id}
                className="hover:bg-muted/50 rounded-lg border p-2.5 transition-colors"
              >
                <div className="mb-1 flex items-start justify-between gap-3">
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    <span className="text-[12px] font-medium">{charge.description}</span>
                    {getChargeTypeBadge(charge.type)}
                  </div>
                  <span className="shrink-0 text-[12px] font-semibold tabular-nums text-destructive">
                    {charge.amount}
                  </span>
                </div>
                <p className="text-muted-foreground text-[10px]">{charge.date}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
