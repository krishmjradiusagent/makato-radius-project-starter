import { ArrowRight, Calculator, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { cn } from "../ui/utils";

export interface ProrationLineItem {
  label: string;
  originalAmount: string;
  revisedAmount: string;
  changed: boolean;
  delta?: string;
}

export interface ProrationPreviewProps {
  className?: string;
  originalLabel?: string;
  revisedLabel?: string;
  effectiveDate?: string;
  lineItems: ProrationLineItem[];
  originalTotal: string;
  revisedTotal: string;
  netDelta: string;
  netDeltaSign: "positive" | "negative" | "neutral";
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export function ProrationPreview({
  className,
  originalLabel = "Original CDA",
  revisedLabel = "Revised CDA",
  effectiveDate,
  lineItems,
  originalTotal,
  revisedTotal,
  netDelta,
  netDeltaSign,
  onConfirm,
  onCancel,
  confirmText = "Resubmit Revision",
  cancelText = "Cancel",
}: ProrationPreviewProps) {
  const deltaColors: Record<string, string> = {
    positive: "text-emerald-600",
    negative: "text-red-600",
    neutral: "text-muted-foreground",
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <Card className={cn("w-full border-orange-200 bg-orange-50/30", className)}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="size-4 text-orange-600" />
              <CardTitle className="text-[13px] font-semibold text-orange-900">
                Revision Preview
              </CardTitle>
            </div>
            <Badge
              variant="secondary"
              className="text-[9px] bg-orange-100 text-orange-700 border-orange-200"
            >
              Changes Requested
            </Badge>
          </div>
          {effectiveDate && (
            <div className="flex items-center gap-1.5 mt-1">
              <Clock className="size-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground">
                Effective upon resubmission · {effectiveDate}
              </span>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Plan comparison header */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-lg border bg-background p-3">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Before</p>
              <p className="text-[12px] font-semibold">{originalLabel}</p>
              <p className="text-[13px] font-bold tabular-nums mt-0.5">{originalTotal}</p>
            </div>
            <ArrowRight className="size-4 text-muted-foreground" />
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">After</p>
              <p className="text-[12px] font-semibold">{revisedLabel}</p>
              <p className="text-[13px] font-bold tabular-nums mt-0.5">{revisedTotal}</p>
            </div>
          </div>

          {/* Line items */}
          <div className="space-y-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Change Breakdown
            </p>
            {lineItems.map((item) => (
              <div
                key={item.label}
                className={cn(
                  "flex items-center justify-between rounded-md px-2.5 py-1.5 text-[11px]",
                  item.changed
                    ? "bg-amber-50 border border-amber-200"
                    : "text-muted-foreground"
                )}
              >
                <span className={item.changed ? "font-medium" : ""}>{item.label}</span>
                <div className="flex items-center gap-2">
                  {item.changed && (
                    <span className="text-muted-foreground line-through tabular-nums text-[10px]">
                      {item.originalAmount}
                    </span>
                  )}
                  <span className={cn("font-semibold tabular-nums", item.changed && "text-amber-700")}>
                    {item.revisedAmount}
                  </span>
                  {item.delta && (
                    <Badge
                      variant="outline"
                      className="text-[9px] h-4 px-1 border-amber-300 text-amber-700 bg-amber-50"
                    >
                      {item.delta}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Separator />

          {/* Net delta */}
          <div className="flex items-center justify-between rounded-lg bg-background border p-3">
            <span className="text-[12px] font-semibold">Net Change to Agent Payout</span>
            <span className={cn("text-[15px] font-bold tabular-nums", deltaColors[netDeltaSign])}>
              {netDelta}
            </span>
          </div>

          {/* Actions */}
          {(onConfirm || onCancel) && (
            <div className="flex items-center gap-2 pt-1">
              {onCancel && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-9 text-xs"
                  onClick={onCancel}
                >
                  {cancelText}
                </Button>
              )}
              {onConfirm && (
                <Button
                  size="sm"
                  className="flex-1 h-9 text-xs"
                  onClick={onConfirm}
                >
                  {confirmText}
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
