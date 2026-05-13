import { useEffect, useState } from "react";
import { Loader2, Plus, X } from "lucide-react";
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
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

export type FeeTier = {
  id: string;
  from: string;
  to: string;
  fee: string;
};

export interface FeeTypeDraft {
  id: string | null;
  name: string;
  type: "flat" | "percentage";
  amount: string;
  appliesToMode: "team" | "agents";
  agentIds: string[];
  timing: "pre-split" | "post-split";
  slidingScale: boolean;
  tiers: FeeTier[];
  contributesToCap: boolean;
}

const agents = [
  { id: "vanessa", name: "Vanessa Brown", email: "vanessa@radiusagent.com", role: "Team Lead" },
  { id: "rod", name: "Rod Watson", email: "rod@radiusagent.com", role: "Agent" },
  { id: "ila", name: "Ila Corcoran", email: "ila@radiusagent.com", role: "Agent" },
  { id: "michael", name: "Michael Loft", email: "michael@radiusagent.com", role: "Agent" },
  { id: "scott", name: "Scott Kato", email: "scott@radiusagent.com", role: "Team Lead" },
  { id: "priya", name: "Priya Shah", email: "priya@radiusagent.com", role: "Agent" },
] as const;

export interface FeeBuilderModalProps {
  open: boolean;
  title: string;
  onOpenChange: (open: boolean) => void;
  initialData?: Partial<FeeTypeDraft>;
  onSave: (data: FeeTypeDraft) => void;
}

function createDraft(initialData?: Partial<FeeTypeDraft>): FeeTypeDraft {
  return {
    id: initialData?.id ?? null,
    name: initialData?.name ?? "",
    type: initialData?.type ?? "flat",
    amount: initialData?.amount ?? "",
    appliesToMode: initialData?.appliesToMode ?? "team",
    agentIds: initialData?.agentIds ?? [],
    timing: initialData?.timing ?? "pre-split",
    slidingScale: initialData?.slidingScale ?? false,
    tiers: initialData?.tiers ?? [],
    contributesToCap: initialData?.contributesToCap ?? false,
  };
}

function numericValue(value: string) {
  return Number(value.replace(/[^0-9.]/g, "")) || 0;
}

function formatAmount(type: FeeTypeDraft["type"], amount: string) {
  if (type === "flat") return `$${amount || "0"}`;
  return `${amount || "0"}%`;
}

function FeeAmountInput({
  value,
  type,
  invalid,
  onChange,
}: {
  value: string;
  type: FeeTypeDraft["type"];
  invalid: boolean;
  onChange: (value: string) => void;
}) {
  const prefix = type === "flat" ? "$" : undefined;
  const suffix = type === "percentage" ? "%" : undefined;
  const placeholder = type === "flat" ? "495" : "2.5";

  return (
    <div className="relative">
      {prefix ? (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          {prefix}
        </span>
      ) : null}
      <Input
        value={value}
        inputMode="decimal"
        placeholder={placeholder}
        aria-invalid={invalid}
        className={`h-10 ${prefix ? "pl-7" : ""} ${suffix ? "pr-8" : ""}`}
        onChange={(event) => onChange(event.target.value)}
      />
      {suffix ? (
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          {suffix}
        </span>
      ) : null}
    </div>
  );
}

function TierRows({
  draft,
  onDraftChange,
}: {
  draft: FeeTypeDraft;
  onDraftChange: (next: FeeTypeDraft) => void;
}) {
  const [flashTierId, setFlashTierId] = useState<string | null>(null);

  function updateTier(tierId: string, patch: Partial<FeeTier>) {
    onDraftChange({
      ...draft,
      tiers: draft.tiers.map((tier) => (tier.id === tierId ? { ...tier, ...patch } : tier)),
    });
  }

  function addTier() {
    const newTier: FeeTier = { id: crypto.randomUUID(), from: "", to: "", fee: "" };
    onDraftChange({ ...draft, tiers: [...draft.tiers, newTier] });
    setFlashTierId(newTier.id);
    window.setTimeout(() => setFlashTierId(null), 600);
  }

  function removeTier(tierId: string) {
    onDraftChange({ ...draft, tiers: draft.tiers.filter((tier) => tier.id !== tierId) });
  }

  return (
    <div className="space-y-3">
      <ScrollArea className="max-h-[220px]">
        <div className="space-y-2 pr-4">
          {draft.tiers.map((tier) => (
            <div
              key={tier.id}
              className={`grid grid-cols-[1fr_1fr_1fr_auto] gap-2 rounded-md border p-2 transition-all duration-300 ${
                flashTierId === tier.id ? "bg-primary/10" : "bg-background"
              }`}
            >
              <Input
                className="h-9 text-xs"
                placeholder="From"
                value={tier.from}
                onChange={(event) => updateTier(tier.id, { from: event.target.value })}
              />
              <Input
                className="h-9 text-xs"
                placeholder="To"
                value={tier.to}
                onChange={(event) => updateTier(tier.id, { to: event.target.value })}
              />
              <FeeAmountInput
                type={draft.type}
                value={tier.fee}
                invalid={false}
                onChange={(value) => updateTier(tier.id, { fee: value })}
              />
              <Button
                variant="ghost"
                size="icon"
                className="size-9 text-muted-foreground transition-opacity hover:text-foreground"
                onClick={() => removeTier(tier.id)}
              >
                <X className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
      <Button variant="outline" size="sm" onClick={addTier} className="w-full">
        <Plus className="size-4" />
        Add Tier
      </Button>
    </div>
  );
}

export function FeeBuilderModal({
  open,
  title,
  onOpenChange,
  initialData,
  onSave,
}: FeeBuilderModalProps) {
  const [draft, setDraft] = useState<FeeTypeDraft>(() => createDraft(initialData));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setDraft(createDraft(initialData));
    setErrors({});
    setSaving(false);
  }, [initialData, open]);

  function updateField<K extends keyof FeeTypeDraft>(field: K, value: FeeTypeDraft[K]) {
    setDraft((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function validate() {
    const nextErrors: Record<string, string> = {};
    if (!draft.name.trim()) nextErrors.name = "Fee name required";
    if (numericValue(draft.amount) <= 0) nextErrors.amount = "Amount required";
    if (draft.slidingScale) {
      const invalidTier = draft.tiers.find((tier) => !tier.from || numericValue(tier.fee) <= 0);
      if (invalidTier) nextErrors.tiers = "Complete all tier rows";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    setSaving(true);
    window.setTimeout(() => {
      onSave(draft);
      setSaving(false);
      onOpenChange(false);
    }, 400);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] w-[600px] max-w-[calc(100vw-48px)] flex-col gap-0 overflow-hidden p-0 sm:max-w-[600px]">
        <DialogHeader className="border-b px-6 pb-4 pt-5">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Configure fee type details.</DialogDescription>
        </DialogHeader>

        <ScrollArea className="min-h-0">
          <div className="flex flex-col gap-3 px-6 py-4">

            {/* Fee Setup */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="fee-name">Fee Name</Label>
                <Input
                  id="fee-name"
                  className="h-10"
                  placeholder="e.g., Transaction Coordinator Fee"
                  value={draft.name}
                  aria-invalid={Boolean(errors.name)}
                  onChange={(event) => updateField("name", event.target.value)}
                />
                {errors.name ? <p className="text-xs text-destructive">{errors.name}</p> : null}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Fee Type</Label>
                  <Select value={draft.type} onValueChange={(value) => updateField("type", value as FeeTypeDraft["type"])}>
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flat">Flat</SelectItem>
                      <SelectItem value="percentage">Percentage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label>{draft.type === "flat" ? "Flat Fee" : "Fee Percentage"}</Label>
                  <FeeAmountInput
                    value={draft.amount}
                    type={draft.type}
                    invalid={Boolean(errors.amount)}
                    onChange={(value) => updateField("amount", value)}
                  />
                  {errors.amount ? <p className="text-xs text-destructive">{errors.amount}</p> : null}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>When Applied</Label>
                <Select value={draft.timing} onValueChange={(value) => updateField("timing", value as FeeTypeDraft["timing"])}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pre-split">Pre-Split</SelectItem>
                    <SelectItem value="post-split">Post-Split</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between rounded-md border px-3 py-2.5">
                  <div className="space-y-0.5">
                    <Label htmlFor="sliding-scale" className="text-sm">Sliding Scale</Label>
                    <p className="text-xs text-muted-foreground truncate">Enable tiered fee values.</p>
                  </div>
                  <Switch
                    id="sliding-scale"
                    checked={draft.slidingScale}
                    onCheckedChange={(checked) => updateField("slidingScale", checked)}
                  />
                </div>

                <div className="flex items-center justify-between rounded-md border px-3 py-2.5">
                  <div className="space-y-0.5">
                    <Label htmlFor="contributes-cap" className="text-sm">Contributes to Cap</Label>
                    <p className="text-xs text-muted-foreground truncate">Count toward cap.</p>
                  </div>
                  <Switch
                    id="contributes-cap"
                    checked={draft.contributesToCap}
                    onCheckedChange={(checked) => updateField("contributesToCap", checked)}
                  />
                </div>
              </div>
            </div>

            <Separator className="my-1" />

            {/* Sliding Scale Tiers — only shown when ON */}
            {draft.slidingScale ? (
              <div className="space-y-3 pt-2">
                <div className="flex flex-col gap-1 px-1">
                  <h3 className="text-sm font-semibold">Sliding Scale Tiers</h3>
                  <p className="text-xs text-muted-foreground">Set fee amounts by commission range.</p>
                </div>
                <div className="px-1 pb-4">
                  <TierRows draft={draft} onDraftChange={setDraft} />
                  {errors.tiers ? <p className="text-xs text-destructive mt-2">{errors.tiers}</p> : null}
                </div>
              </div>
            ) : null}

          </div>
        </ScrollArea>

        <DialogFooter className="shrink-0 border-t bg-background px-6 py-[14px]">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="size-4 animate-spin" /> : null}
            Save Fee Type
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
