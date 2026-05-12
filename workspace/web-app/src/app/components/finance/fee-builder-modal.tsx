import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FinanceInput } from "./finance-input";
import { Switch } from "../ui/switch";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export interface FeeData {
  name: string;
  type: "flat" | "percentage";
  amount: number;
  timing: "pre-split" | "post-split";
  appliesTo: "agent" | "team";
  contributesToCap: boolean;
  hasSlidingScale: boolean;
}

export interface FeeBuilderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Partial<FeeData>;
  onSave: (data: FeeData) => void;
}

export function FeeBuilderModal({
  open,
  onOpenChange,
  initialData,
  onSave,
}: FeeBuilderModalProps) {
  const [formData, setFormData] = useState<FeeData>({
    name: initialData?.name || "",
    type: initialData?.type || "flat",
    amount: initialData?.amount || 0,
    timing: initialData?.timing || "post-split",
    appliesTo: initialData?.appliesTo || "agent",
    contributesToCap: initialData?.contributesToCap || false,
    hasSlidingScale: initialData?.hasSlidingScale || false,
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const updateField = <K extends keyof FeeData>(field: K, value: FeeData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const handleSave = () => {
    const newErrors: Record<string, boolean> = {};

    if (!formData.name.trim()) {
      newErrors.name = true;
    }
    if (formData.amount <= 0) {
      newErrors.amount = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Fee</DialogTitle>
          <DialogDescription>
            Configure a new fee or deduction for this commission plan
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="fee-name">Fee Name</Label>
            <Input
              id="fee-name"
              placeholder="e.g., Transaction Coordinator"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              className={errors.name ? "border-destructive" : ""}
            />
          </div>

          <div className="space-y-2">
            <Label>Fee Type</Label>
            <RadioGroup
              value={formData.type}
              onValueChange={(v) => updateField("type", v as "flat" | "percentage")}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="flat" id="type-flat" />
                <Label htmlFor="type-flat" className="font-normal cursor-pointer">
                  Flat Amount
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="percentage" id="type-percentage" />
                <Label htmlFor="type-percentage" className="font-normal cursor-pointer">
                  Percentage
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fee-amount">Amount</Label>
            <FinanceInput
              id="fee-amount"
              variant={formData.type === "flat" ? "currency" : "percentage"}
              value={formData.amount}
              onChange={(e) => updateField("amount", parseFloat(e.target.value) || 0)}
              error={errors.amount}
            />
          </div>

          <div className="space-y-2">
            <Label>When Applied</Label>
            <RadioGroup
              value={formData.timing}
              onValueChange={(v) => updateField("timing", v as "pre-split" | "post-split")}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pre-split" id="timing-pre" />
                <Label htmlFor="timing-pre" className="font-normal cursor-pointer">
                  Pre-Split
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="post-split" id="timing-post" />
                <Label htmlFor="timing-post" className="font-normal cursor-pointer">
                  Post-Split
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Applies To</Label>
            <RadioGroup
              value={formData.appliesTo}
              onValueChange={(v) => updateField("appliesTo", v as "agent" | "team")}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="agent" id="applies-agent" />
                <Label htmlFor="applies-agent" className="font-normal cursor-pointer">
                  Agent
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="team" id="applies-team" />
                <Label htmlFor="applies-team" className="font-normal cursor-pointer">
                  Team
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3 pt-2 border-t">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sliding-scale">Sliding Scale</Label>
                <p className="text-xs text-muted-foreground">
                  Amount varies based on commission tier
                </p>
              </div>
              <Switch
                id="sliding-scale"
                checked={formData.hasSlidingScale}
                onCheckedChange={(checked) => updateField("hasSlidingScale", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="contributes-cap">Contributes to Cap</Label>
                <p className="text-xs text-muted-foreground">
                  Counts toward agent's annual cap
                </p>
              </div>
              <Switch
                id="contributes-cap"
                checked={formData.contributesToCap}
                onCheckedChange={(checked) => updateField("contributesToCap", checked)}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Fee</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
