import { useEffect, useMemo, useState } from "react";
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
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { TierBuilderRow, type TierData } from "./tier-builder-row";
import { Plus, X } from "lucide-react";

export interface FeeTypeDraft {
  id: string | null;
  name: string;
  type: "flat" | "percentage";
  amount: string;
  appliesToMode: "team" | "agents";
  agentIds: string[];
  timing: "pre-split" | "post-split";
  slidingScale: boolean;
  tiers: TierData[];
  contributesToCap: boolean;
}

export type FeeData = FeeTypeDraft;

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
  onOpenChange: (open: boolean) => void;
  initialData?: Partial<FeeTypeDraft>;
  onSave: (data: FeeTypeDraft) => void;
}

function createDraft(initialData?: Partial<FeeTypeDraft>): FeeTypeDraft {
  return {
    id: initialData?.id ?? null,
    name: initialData?.name || "",
    type: initialData?.type || "flat",
    amount: initialData?.amount || "",
    appliesToMode: initialData?.appliesToMode || "team",
    agentIds: initialData?.agentIds || [],
    timing: initialData?.timing || "post-split",
    slidingScale: initialData?.slidingScale || false,
    tiers: initialData?.tiers || [],
    contributesToCap: initialData?.contributesToCap || false,
  };
}

export function FeeBuilderModal({
  open,
  onOpenChange,
  initialData,
  onSave,
}: FeeBuilderModalProps) {
  const [formData, setFormData] = useState<FeeTypeDraft>(() => createDraft(initialData));
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const selectedAgents = useMemo(
    () => agents.filter((agent) => formData.agentIds.includes(agent.id)),
    [formData.agentIds],
  );

  useEffect(() => {
    if (!open) return;
    setFormData(createDraft(initialData));
    setErrors({});
  }, [initialData, open]);

  const updateField = <K extends keyof FeeTypeDraft>(field: K, value: FeeTypeDraft[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  function toggleAgent(agentId: string) {
    const next = formData.agentIds.includes(agentId)
      ? formData.agentIds.filter((id) => id !== agentId)
      : [...formData.agentIds, agentId];
    updateField("agentIds", next);
  }

  function updateTier(tierId: string, patch: Partial<TierData>) {
    setFormData((prev) => ({
      ...prev,
      tiers: prev.tiers.map((tier) => (tier.id === tierId ? { ...tier, ...patch } : tier)),
    }));
  }

  function addTier() {
    setFormData((prev) => ({
      ...prev,
      tiers: [
        ...prev.tiers,
        {
          id: crypto.randomUUID(),
          rangeStart: prev.tiers.length > 0 ? (prev.tiers[prev.tiers.length - 1].rangeEnd ?? 0) : 0,
          rangeEnd: null,
          splitPercentage: 100,
          resetPeriod: "annual",
          dealType: "all",
        },
      ],
    }));
  }

  function removeTier(tierId: string) {
    setFormData((prev) => ({ ...prev, tiers: prev.tiers.filter((tier) => tier.id !== tierId) }));
  }

  const handleSave = () => {
    const nextErrors: Record<string, boolean> = {};

    if (!formData.name.trim()) nextErrors.name = true;
    if (!formData.amount.trim() || Number(formData.amount) <= 0) nextErrors.amount = true;
    if (formData.appliesToMode === "agents" && formData.agentIds.length === 0) nextErrors.agentIds = true;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Fee Type</DialogTitle>
          <DialogDescription>Configure a new fee or deduction for this commission plan</DialogDescription>
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
            <Tabs
              value={formData.type}
              onValueChange={(v) => updateField("type", v as FeeTypeDraft["type"])}
            >
              <TabsList className="grid h-10 w-full grid-cols-2">
                <TabsTrigger value="flat">Flat</TabsTrigger>
                <TabsTrigger value="percentage">Percentage</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fee-amount">Amount</Label>
            <FinanceInput
              id="fee-amount"
              variant={formData.type === "flat" ? "currency" : "percentage"}
              value={formData.amount}
              onChange={(e) => updateField("amount", e.target.value)}
              error={errors.amount}
            />
          </div>

          <div className="space-y-2">
            <Label>When Applied</Label>
            <Tabs
              value={formData.timing}
              onValueChange={(v) => updateField("timing", v as FeeTypeDraft["timing"])}
            >
              <TabsList className="grid h-10 w-full grid-cols-2">
                <TabsTrigger value="pre-split">Pre-Split</TabsTrigger>
                <TabsTrigger value="post-split">Post-Split</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-3">
            <Label>Applies To</Label>
            <Tabs
              value={formData.appliesToMode}
              onValueChange={(value) => updateField("appliesToMode", value as FeeTypeDraft["appliesToMode"])}
            >
              <TabsList className="grid h-10 w-full grid-cols-2">
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="agents">Agents</TabsTrigger>
              </TabsList>
            </Tabs>
            {formData.appliesToMode === "team" ? (
              <p className="text-sm text-muted-foreground">Applies to all team members.</p>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{formData.agentIds.length} selected</p>
                </div>
                {selectedAgents.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedAgents.map((agent) => (
                      <Badge key={agent.id} variant="secondary" className="gap-1.5 pr-1.5">
                        {agent.name}
                        <button
                          type="button"
                          aria-label={`Remove ${agent.name}`}
                          className="inline-flex size-4 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
                          onClick={() => toggleAgent(agent.id)}
                        >
                          <X className="size-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                <Card className="overflow-hidden shadow-none">
                  <CardContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search agents..." />
                      <CommandList className="max-h-56">
                        <CommandEmpty>No agents found.</CommandEmpty>
                        <CommandGroup>
                          {agents.map((agent) => {
                            const selected = formData.agentIds.includes(agent.id);
                            return (
                              <CommandItem
                                key={agent.id}
                                value={`${agent.name} ${agent.email} ${agent.role}`}
                                onSelect={() => toggleAgent(agent.id)}
                                className="gap-3"
                              >
                                <Checkbox checked={selected} />
                                <Avatar className="size-8">
                                  <AvatarFallback className="text-xs">
                                    {agent.name
                                      .split(" ")
                                      .map((part) => part[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex min-w-0 flex-1 flex-col">
                                  <span className="truncate text-sm font-medium">{agent.name}</span>
                                  <span className="truncate text-xs text-muted-foreground">{agent.email}</span>
                                </div>
                                <Badge variant="outline">{agent.role}</Badge>
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </CardContent>
                </Card>
                {errors.agentIds && <p className="text-xs text-destructive">Select at least one agent.</p>}
              </div>
            )}
          </div>

          <div className="space-y-3 pt-2 border-t">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sliding-scale">Sliding Scale</Label>
                <p className="text-xs text-muted-foreground">Amount varies based on fee tiers</p>
              </div>
              <Switch
                id="sliding-scale"
                checked={formData.slidingScale}
                onCheckedChange={(checked) => updateField("slidingScale", checked)}
              />
            </div>

            {formData.slidingScale && (
              <div className="space-y-3">
                {formData.tiers.map((tier) => (
                  <TierBuilderRow
                    key={tier.id}
                    data={tier}
                    onChange={(next) => updateTier(tier.id, next)}
                    onDelete={() => removeTier(tier.id)}
                  />
                ))}
                <Button variant="outline" size="sm" onClick={addTier}>
                  <Plus className="size-4" />
                  Add Tier
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="space-y-0.5">
              <Label htmlFor="contributes-cap">Contributes to Cap</Label>
              <p className="text-xs text-muted-foreground">Counts toward the agent cap</p>
            </div>
            <Switch
              id="contributes-cap"
              checked={formData.contributesToCap}
              onCheckedChange={(checked) => updateField("contributesToCap", checked)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Fee Type</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
