import { useEffect, useMemo, useState } from "react";
import {
  Archive,
  Bell,
  Briefcase,
  Building2,
  Copy,
  DollarSign,
  Edit3,
  FileText,
  Gift,
  History,
  HelpCircle,
  Megaphone,
  MoreVertical,
  Plus,
  ReceiptText,
  Rss,
  Settings,
  Trash2,
  X,
  UserCheck,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Separator } from "../components/ui/separator";
import { Switch } from "../components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Toaster } from "../components/ui/sonner";
import { FeeBuilderModal, type FeeTypeDraft } from "../components/finance/fee-builder-modal";

type PlanType = "standard" | "tiered";
type FeeType = "flat" | "percentage";
type ResetPeriod = "yearly" | "quarterly" | "monthly";
type BasedOn = "units" | "gci" | "sales-volume";
type DefaultMode = "all" | "specific";
type DialogName = "add-plan" | "add-fee" | "assign-defaults" | null;

type AssignDefaultsForm = {
  planId: string;
  feeIds: string[];
  assignMode: "all" | "specific";
  selectedAgentIds: string[];
  applyToActiveDeals: boolean;
};

type AssignDefaultsErrors = Partial<Record<"planId" | "selectedAgentIds", string>>;

type Agent = {
  id: string;
  name: string;
  email: string;
  role: "Team Lead" | "Agent";
  hasDefault: boolean;
};

type TierRow = {
  id: string;
  from: string;
  to: string;
  agentSplit: string;
  teamSplit: string;
};

type CommissionPlan = {
  id: string;
  name: string;
  type: PlanType;
  agentSplit: number;
  teamSplit: number;
  feeType: FeeType;
  feeAmount: number;
  capAmount: number;
  dealTypes: string[];
  assignedAgentsCount: number;
  resetPeriod: ResetPeriod;
  basedOn: BasedOn;
  tiers: TierRow[];
};

type FeeRecord = FeeTypeDraft & { id: string };

type PlanForm = {
  editingPlanId: string | null;
  planName: string;
  planType: PlanType;
  agentSplit: string;
  teamSplit: string;
  resetPeriod: ResetPeriod;
  basedOn: BasedOn;
  feeType: FeeType;
  feeAmount: string;
  capAmount: string;
  dealTypes: Record<string, boolean>;
  applyAsDefault: boolean;
  defaultMode: DefaultMode;
  selectedAgentIds: string[];
  tiers: TierRow[];
};

type PlanErrors = Partial<
  Record<"planName" | "splitTotal" | "dealTypes" | "selectedAgentIds", string>
> & {
  tiers?: Record<string, string>;
};

const agents: Agent[] = [
  { id: "vanessa", name: "Vanessa Brown", email: "vanessa@radiusagent.com", role: "Team Lead", hasDefault: true },
  { id: "rod", name: "Rod Watson", email: "rod@radiusagent.com", role: "Agent", hasDefault: false },
  { id: "ila", name: "Ila Corcoran", email: "ila@radiusagent.com", role: "Agent", hasDefault: true },
  { id: "michael", name: "Michael Loft", email: "michael@radiusagent.com", role: "Agent", hasDefault: false },
  { id: "scott", name: "Scott Kato", email: "scott@radiusagent.com", role: "Team Lead", hasDefault: false },
  { id: "priya", name: "Priya Shah", email: "priya@radiusagent.com", role: "Agent", hasDefault: false },
];

const defaultTiers: TierRow[] = [
  { id: "tier-1", from: "1", to: "5", agentSplit: "80", teamSplit: "20" },
  { id: "tier-2", from: "6", to: "10", agentSplit: "85", teamSplit: "15" },
  { id: "tier-3", from: "11", to: "25", agentSplit: "90", teamSplit: "10" },
  { id: "tier-4", from: "26", to: "", agentSplit: "95", teamSplit: "5" },
];

const seedPlans: CommissionPlan[] = [
  { id: "plan-seed-1", name: "80/20 Standard", type: "standard", agentSplit: 80, teamSplit: 20, feeType: "flat", feeAmount: 495, capAmount: 18000, dealTypes: ["Buyer", "Seller"], assignedAgentsCount: 12, resetPeriod: "yearly", basedOn: "units", tiers: [] },
  { id: "plan-seed-2", name: "70/30 Standard", type: "standard", agentSplit: 70, teamSplit: 30, feeType: "flat", feeAmount: 495, capAmount: 15000, dealTypes: ["Buyer", "Seller"], assignedAgentsCount: 4, resetPeriod: "yearly", basedOn: "units", tiers: [] },
  { id: "plan-seed-3", name: "Keystone Tiered", type: "tiered", agentSplit: 80, teamSplit: 20, feeType: "flat", feeAmount: 0, capAmount: 0, dealTypes: ["Buyer", "Seller"], assignedAgentsCount: 2, resetPeriod: "yearly", basedOn: "units", tiers: defaultTiers.map((t) => ({ ...t })) },
  { id: "plan-seed-4", name: "Lease Referral Plan", type: "standard", agentSplit: 60, teamSplit: 40, feeType: "flat", feeAmount: 0, capAmount: 0, dealTypes: ["Lease", "Landlord"], assignedAgentsCount: 0, resetPeriod: "yearly", basedOn: "units", tiers: [] },
];

const seedFees: FeeRecord[] = [
  { id: "fee-seed-1", name: "TC Fee", type: "flat", amount: "500", timing: "pre-split", appliesToMode: "team", agentIds: [], slidingScale: false, contributesToCap: false, tiers: [] },
  { id: "fee-seed-2", name: "RM Fee", type: "flat", amount: "300", timing: "post-split", appliesToMode: "agents", agentIds: [], slidingScale: false, contributesToCap: true, tiers: [] },
  { id: "fee-seed-3", name: "E&O Fee", type: "flat", amount: "125", timing: "post-split", appliesToMode: "agents", agentIds: [], slidingScale: false, contributesToCap: false, tiers: [] },
  { id: "fee-seed-4", name: "Compliance Review", type: "flat", amount: "250", timing: "pre-split", appliesToMode: "team", agentIds: [], slidingScale: false, contributesToCap: false, tiers: [] },
  { id: "fee-seed-5", name: "Broker Admin Fee", type: "percentage", amount: "2", timing: "post-split", appliesToMode: "team", agentIds: [], slidingScale: false, contributesToCap: true, tiers: [] },
  { id: "fee-seed-6", name: "Sliding Scale Team Fee", type: "percentage", amount: "3", timing: "post-split", appliesToMode: "team", agentIds: [], slidingScale: true, contributesToCap: false, tiers: [] },
];

function getFreshAssignDefaultsForm(): AssignDefaultsForm {
  return { planId: "", feeIds: [], assignMode: "specific", selectedAgentIds: [], applyToActiveDeals: false };
}

function getFreshPlanForm(): PlanForm {
  return {
    editingPlanId: null,
    planName: "",
    planType: "standard",
    agentSplit: "80",
    teamSplit: "20",
    resetPeriod: "yearly",
    basedOn: "units",
    feeType: "flat",
    feeAmount: "",
    capAmount: "18000",
    dealTypes: {
      buyer: false,
      seller: false,
      lease: false,
      landlord: false,
    },
    applyAsDefault: false,
    defaultMode: "all",
    selectedAgentIds: [],
    tiers: defaultTiers.map((tier) => ({ ...tier })),
  };
}

function formatMoney(value: number) {
  return `$${value.toLocaleString()}`;
}

function formatFee(plan: CommissionPlan) {
  if (plan.feeType === "percentage") return `${plan.feeAmount}%`;
  return `${formatMoney(plan.feeAmount)} flat`;
}

function formatBasedOn(value: BasedOn) {
  if (value === "gci") return "GCI";
  if (value === "sales-volume") return "Sales Volume";
  return "Units";
}

function numericValue(value: string) {
  return Number(value.replace(/[^0-9.]/g, "")) || 0;
}

function RadiusLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative size-8 rounded-full border border-foreground/70">
        <div className="absolute inset-1 rounded-full border border-foreground/50" />
        <div className="absolute inset-2 rounded-full border border-foreground/40" />
        <div className="absolute inset-[11px] rounded-full bg-foreground/70" />
      </div>
      <div className="text-[25px] font-normal tracking-[0.28em] text-foreground/80">RADIUS</div>
    </div>
  );
}

function SidebarIcon({ icon: Icon, active = false, label }: { icon: LucideIcon; active?: boolean; label: string }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      className="size-9 rounded-[4px] text-[#1f2937] hover:bg-muted"
    >
      <Icon className={active ? "size-5 text-primary" : "size-5"} />
    </Button>
  );
}

function EmptySection({
  title,
  description,
  emptyDescription,
  icon: Icon,
  action,
  onAction,
}: {
  title: string;
  description: string;
  emptyDescription: string;
  icon: LucideIcon;
  action: string;
  onAction: () => void;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-base font-medium leading-6 text-foreground">{title}</h2>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>
      <Card className="h-[254px] rounded-[14px] border-border shadow-none">
        <CardContent className="flex size-full flex-col items-center justify-center p-0 text-center">
          <div className="mb-5 flex size-12 items-center justify-center rounded-[15px] bg-primary/10 text-primary">
            <Icon className="size-6" />
          </div>
          <h3 className="text-sm font-medium leading-5 text-foreground">
            {title === "Commission Plans"
              ? "No commission plans yet"
              : title === "Fee Types"
                ? "No fee types yet"
                : "No defaults assigned yet"}
          </h3>
          <p className="mt-1 text-sm leading-5 text-muted-foreground">{emptyDescription}</p>
          <Button variant="outline" size="sm" className="mt-4 border-primary text-primary hover:text-primary" onClick={onAction}>
            <Plus className="size-4" />
            {action}
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}

function PlanTypeBadge({ type }: { type: PlanType }) {
  return (
    <Badge
      variant={type === "tiered" ? "outline" : "secondary"}
      className={type === "tiered" ? "border-[#fee685] bg-[#fffbeb] text-[#bb4d00]" : "text-muted-foreground"}
    >
      {type === "tiered" ? "Tiered" : "Standard"}
    </Badge>
  );
}

function AdornedInput({
  id,
  value,
  placeholder,
  adornment,
  adornmentSide = "start",
  invalid,
  onChange,
}: {
  id: string;
  value: string;
  placeholder?: string;
  adornment: string;
  adornmentSide?: "start" | "end";
  invalid?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative w-full">
      {adornmentSide === "start" && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          {adornment}
        </span>
      )}
      <Input
        id={id}
        value={value}
        placeholder={placeholder}
        inputMode="decimal"
        aria-invalid={invalid}
        className={adornmentSide === "start" ? "h-10 w-full box-border pl-7" : "h-10 w-full box-border pr-8"}
        onChange={(event) => onChange(event.target.value)}
      />
      {adornmentSide === "end" && (
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          {adornment}
        </span>
      )}
    </div>
  );
}

function CommissionPlanCard({
  plan,
  onEdit,
  onDuplicate,
  onAssignDefaults,
  onVersionHistory,
  onDelete,
}: {
  plan: CommissionPlan;
  onEdit: (plan: CommissionPlan) => void;
  onDuplicate: (plan: CommissionPlan) => void;
  onAssignDefaults: (plan: CommissionPlan) => void;
  onVersionHistory: (plan: CommissionPlan) => void;
  onDelete: (planId: string) => void;
}) {
  return (
    <div className="flex min-h-[66px] items-center justify-between border-b px-6 py-3 last:border-b-0">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium leading-5 text-foreground">{plan.name}</p>
          <PlanTypeBadge type={plan.type} />
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          {plan.type === "standard" ? (
            <span>Agent {plan.agentSplit}% / Team {plan.teamSplit}%</span>
          ) : (
            <>
              <span>Based on: {formatBasedOn(plan.basedOn)}</span>
              <span>{plan.tiers.length} tiers</span>
            </>
          )}
          <span>Fee: {formatFee(plan)}</span>
          <span>Cap: {formatMoney(plan.capAmount)}</span>
          {plan.dealTypes.map((dealType) => (
            <Badge key={dealType} variant="secondary" className="text-muted-foreground">
              {dealType}
            </Badge>
          ))}
          <span className="inline-flex items-center gap-1">
            <Users className="size-3" />
            {plan.assignedAgentsCount} agents
          </span>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label={`${plan.name} menu`} className="size-8">
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px]">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => onEdit(plan)}>
              <Edit3 className="size-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDuplicate(plan)}>
              <Copy className="size-4" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAssignDefaults(plan)}>
              <UserPlus className="size-4" />
              Assign Defaults
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onVersionHistory(plan)}>
              <History className="size-4" />
              Version History
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={() => onDelete(plan.id)}>
              <Trash2 className="size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function AgentSelector({
  selectedAgentIds,
  onChange,
}: {
  selectedAgentIds: string[];
  onChange: (ids: string[]) => void;
}) {
  const selectedAgents = agents.filter((agent) => selectedAgentIds.includes(agent.id));

  function toggleAgent(agentId: string) {
    onChange(
      selectedAgentIds.includes(agentId)
        ? selectedAgentIds.filter((id) => id !== agentId)
        : [...selectedAgentIds, agentId],
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Label>Specific agents</Label>
        <span className="text-xs text-muted-foreground">{selectedAgentIds.length} selected</span>
      </div>
      {selectedAgents.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedAgents.map((agent) => (
            <Badge key={agent.id} variant="secondary">
              {agent.name}
            </Badge>
          ))}
        </div>
      )}
      <Card className="gap-0 overflow-hidden rounded-lg shadow-none">
        <Command>
          <CommandInput placeholder="Search agents..." />
          <CommandList className="max-h-[180px]">
            <CommandEmpty>No agents found.</CommandEmpty>
            <CommandGroup>
              {agents.map((agent) => (
                <CommandItem
                  key={agent.id}
                  value={`${agent.name} ${agent.email} ${agent.role}`}
                  onSelect={() => toggleAgent(agent.id)}
                  className="gap-3"
                >
                  <Checkbox checked={selectedAgentIds.includes(agent.id)} />
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
                  {agent.hasDefault && <Badge variant="secondary">Has default</Badge>}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </Card>
    </div>
  );
}

function TierBuilder({
  form,
  errors,
  onUpdateTier,
  onAddTier,
  onRemoveTier,
}: {
  form: PlanForm;
  errors: PlanErrors;
  onUpdateTier: (tierId: string, patch: Partial<TierRow>) => void;
  onAddTier: () => void;
  onRemoveTier: (tierId: string) => void;
}) {
  const moneyMode = form.basedOn !== "units";

  return (
    <div className="flex flex-col gap-3">
      <div>
        <Label>Tier Builder</Label>
        <p className="mt-1 text-xs text-muted-foreground">
          {moneyMode ? "Currency range" : "Deal count range"}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {form.tiers.map((tier, index) => {
          const tierError = errors.tiers?.[tier.id];
          return (
            <Card key={tier.id} className="rounded-lg shadow-none">
              <CardContent className="flex flex-col gap-3 p-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Tier {index + 1}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={form.tiers.length === 1}
                    onClick={() => onRemoveTier(tier.id)}
                  >
                    Remove
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor={`${tier.id}-from`}>From</Label>
                    {moneyMode ? (
                      <AdornedInput
                        id={`${tier.id}-from`}
                        value={tier.from}
                        adornment="$"
                        invalid={Boolean(tierError)}
                        onChange={(value) => onUpdateTier(tier.id, { from: value })}
                      />
                    ) : (
                      <Input
                        id={`${tier.id}-from`}
                        value={tier.from}
                        inputMode="numeric"
                        aria-invalid={Boolean(tierError)}
                        className="h-10"
                        onChange={(event) => onUpdateTier(tier.id, { from: event.target.value })}
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor={`${tier.id}-to`}>To</Label>
                    {moneyMode ? (
                      <AdornedInput
                        id={`${tier.id}-to`}
                        value={tier.to}
                        adornment="$"
                        invalid={Boolean(tierError)}
                        onChange={(value) => onUpdateTier(tier.id, { to: value })}
                      />
                    ) : (
                      <Input
                        id={`${tier.id}-to`}
                        value={tier.to}
                        inputMode="numeric"
                        aria-invalid={Boolean(tierError)}
                        className="h-10"
                        onChange={(event) => onUpdateTier(tier.id, { to: event.target.value })}
                      />
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor={`${tier.id}-agent`}>Agent Split %</Label>
                    <Input
                      id={`${tier.id}-agent`}
                      value={tier.agentSplit}
                      inputMode="numeric"
                      aria-invalid={Boolean(tierError)}
                      className="h-10"
                      onChange={(event) => {
                        const value = event.target.value;
                        onUpdateTier(tier.id, {
                          agentSplit: value,
                          teamSplit: String(Math.max(0, 100 - numericValue(value))),
                        });
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor={`${tier.id}-team`}>Team Split %</Label>
                    <Input
                      id={`${tier.id}-team`}
                      value={tier.teamSplit}
                      inputMode="numeric"
                      aria-invalid={Boolean(tierError)}
                      className="h-10"
                      onChange={(event) => {
                        const value = event.target.value;
                        onUpdateTier(tier.id, {
                          teamSplit: value,
                          agentSplit: String(Math.max(0, 100 - numericValue(value))),
                        });
                      }}
                    />
                  </div>
                </div>
                {tierError && <p className="text-xs text-destructive">{tierError}</p>}
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Button variant="outline" size="sm" onClick={onAddTier}>
        <Plus className="size-4" />
        Add Tier
      </Button>
    </div>
  );
}

function PlanSetupSummaryCard({
  form,
  expanded,
  onExpandToggle,
  onEdit,
}: {
  form: PlanForm;
  expanded: boolean;
  onExpandToggle: () => void;
  onEdit: () => void;
}) {
  const selectedDealTypes = Object.entries(form.dealTypes)
    .filter(([, selected]) => selected)
    .map(([dealType]) => dealType.charAt(0).toUpperCase() + dealType.slice(1));
  const splitSummary =
    form.planType === "standard"
      ? `Agent ${form.agentSplit}% / Team ${form.teamSplit}%`
      : `${form.tiers.length} tiers`;
  const feeSummary =
    form.feeType === "flat"
      ? `${formatMoney(numericValue(form.feeAmount || "495"))} flat`
      : `${form.feeAmount || "2.5"}%`;

  return (
    <Card className="rounded-lg border bg-muted/40 shadow-none">
      <CardContent className="p-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1 space-y-1.5">
            <p className="text-sm font-medium leading-5 text-foreground">Plan setup</p>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm text-foreground">{form.planName || "Unnamed plan"}</p>
              <span className="text-xs text-muted-foreground">·</span>
              <Badge variant="secondary">{form.planType === "standard" ? "Standard" : "Tiered"}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {splitSummary} · {feeSummary} · Cap {formatMoney(numericValue(form.capAmount || "0"))}
            </p>
            {selectedDealTypes.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {selectedDealTypes.map((dealType) => (
                  <Badge key={dealType} variant="outline" className="bg-background">
                    {dealType}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 px-2.5" onClick={onEdit}>
              Edit
            </Button>
            <Button variant="outline" size="sm" className="h-8 px-2.5" onClick={onExpandToggle}>
              {expanded ? "Collapse" : "Expand"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PlanSetupFields({
  form,
  errors,
  feeLabel,
  splitTotal,
  onFormChange,
  onAgentSplitChange,
  onTeamSplitChange,
  onUpdateTier,
  onAddTier,
  onRemoveTier,
}: {
  form: PlanForm;
  errors: PlanErrors;
  feeLabel: string;
  splitTotal: number;
  onFormChange: (patch: Partial<PlanForm>) => void;
  onAgentSplitChange: (value: string) => void;
  onTeamSplitChange: (value: string) => void;
  onUpdateTier: (tierId: string, patch: Partial<TierRow>) => void;
  onAddTier: () => void;
  onRemoveTier: (tierId: string) => void;
}) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label htmlFor="plan-name" className="text-sm font-medium">Plan Name</Label>
        <Input
          id="plan-name"
          value={form.planName}
          placeholder="e.g., 80/20 Standard"
          aria-invalid={Boolean(errors.planName)}
          className="h-10 w-full box-border"
          onChange={(event) => onFormChange({ planName: event.target.value })}
        />
        {errors.planName && <p className="text-xs text-destructive">{errors.planName}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium">Plan Type</Label>
        <Tabs value={form.planType} onValueChange={(value) => onFormChange({ planType: value as PlanType })}>
          <TabsList className="grid h-10 w-full grid-cols-2">
            <TabsTrigger value="standard">Standard</TabsTrigger>
            <TabsTrigger value="tiered">Tiered</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {form.planType === "standard" ? (
        <>
          <div className="grid w-full grid-cols-2 gap-4">
            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="agent-split" className="text-sm font-medium">Agent Split %</Label>
              <Input
                id="agent-split"
                value={form.agentSplit}
                inputMode="numeric"
                aria-invalid={Boolean(errors.splitTotal)}
                className="h-10 w-full box-border"
                onChange={(event) => onAgentSplitChange(event.target.value)}
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="team-split" className="text-sm font-medium">Team Split %</Label>
              <Input
                id="team-split"
                value={form.teamSplit}
                inputMode="numeric"
                aria-invalid={Boolean(errors.splitTotal)}
                className="h-10 w-full box-border"
                onChange={(event) => onTeamSplitChange(event.target.value)}
              />
            </div>
          </div>
          <p className={errors.splitTotal ? "text-xs text-destructive" : "text-xs text-muted-foreground"}>
            {errors.splitTotal ?? `Split total must equal 100%. Current: ${splitTotal}%`}
          </p>
        </>
      ) : (
        <div className="grid w-full grid-cols-2 gap-4">
          <div className="flex w-full flex-col gap-2">
            <Label className="text-sm font-medium">Reset Period</Label>
            <Select value={form.resetPeriod} onValueChange={(value) => onFormChange({ resetPeriod: value as ResetPeriod })}>
              <SelectTrigger className="h-10 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-full flex-col gap-2">
            <Label className="text-sm font-medium">Based On</Label>
            <Select value={form.basedOn} onValueChange={(value) => onFormChange({ basedOn: value as BasedOn })}>
              <SelectTrigger className="h-10 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="units">Units</SelectItem>
                  <SelectItem value="gci">Gross Commission</SelectItem>
                  <SelectItem value="sales-volume">Sales Volume</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium">Fee Type</Label>
        <Tabs value={form.feeType} onValueChange={(value) => onFormChange({ feeType: value as FeeType, feeAmount: "" })}>
          <TabsList className="grid h-10 w-full grid-cols-2">
            <TabsTrigger value="flat">Flat</TabsTrigger>
            <TabsTrigger value="percentage">Percentage</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid w-full grid-cols-2 gap-4">
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="fee-amount" className="text-sm font-medium">{feeLabel}</Label>
          <AdornedInput
            id="fee-amount"
            value={form.feeAmount}
            placeholder={form.feeType === "flat" ? "495" : "2.5"}
            adornment={form.feeType === "flat" ? "$" : "%"}
            adornmentSide={form.feeType === "flat" ? "start" : "end"}
            onChange={(value) => onFormChange({ feeAmount: value })}
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="cap" className="text-sm font-medium">Cap Amount</Label>
          <AdornedInput
            id="cap"
            value={form.capAmount}
            placeholder="18000"
            adornment="$"
            onChange={(value) => onFormChange({ capAmount: value })}
          />
        </div>
      </div>

      {form.planType === "tiered" && (
        <>
          <Separator />
          <TierBuilder
            form={form}
            errors={errors}
            onUpdateTier={onUpdateTier}
            onAddTier={onAddTier}
            onRemoveTier={onRemoveTier}
          />
        </>
      )}

      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium">Deal Types</Label>
        <div className="grid w-full grid-cols-2 gap-3">
          {Object.keys(form.dealTypes).map((dealType) => (
            <label key={dealType} className="flex w-full items-center gap-2 text-sm font-medium">
              <Checkbox
                checked={form.dealTypes[dealType]}
                onCheckedChange={(checked) =>
                  onFormChange({
                    dealTypes: {
                      ...form.dealTypes,
                      [dealType]: checked === true,
                    },
                  })
                }
              />
              {dealType.charAt(0).toUpperCase() + dealType.slice(1)}
            </label>
          ))}
        </div>
        {errors.dealTypes && <p className="text-xs text-destructive">{errors.dealTypes}</p>}
      </div>
    </>
  );
}

function AssignDefaultsDialog({
  open,
  form,
  errors,
  plans,
  fees,
  onFormChange,
  onOpenChange,
  onSave,
}: {
  open: boolean;
  form: AssignDefaultsForm;
  errors: AssignDefaultsErrors;
  plans: CommissionPlan[];
  fees: FeeRecord[];
  onFormChange: (patch: Partial<AssignDefaultsForm>) => void;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}) {
  const isValid = Boolean(form.planId) && (form.assignMode === "all" || form.selectedAgentIds.length > 0);

  function toggleFee(feeId: string) {
    onFormChange({
      feeIds: form.feeIds.includes(feeId)
        ? form.feeIds.filter((id) => id !== feeId)
        : [...form.feeIds, feeId],
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!flex !h-auto !max-h-[82vh] !w-[560px] !max-w-[calc(100vw-48px)] !flex-col !gap-0 !overflow-hidden !rounded-[12px] !p-0 sm:!max-w-[560px] [&>button[data-slot=dialog-close]]:hidden">
        <DialogHeader className="!flex !flex-row !items-start !justify-between !gap-4 border-b px-6 pt-6 pb-4 !text-left">
          <DialogTitle className="text-base font-semibold leading-5">Assign Defaults</DialogTitle>
          <DialogDescription className="sr-only">Assign commission plan and fee defaults to agents.</DialogDescription>
          <button
            type="button"
            aria-label="Close"
            className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            onClick={() => onOpenChange(false)}
          >
            <X className="size-4" />
          </button>
        </DialogHeader>

        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 py-5">
          {/* Commission Plan */}
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium">
              Commission Plan <span className="text-destructive">*</span>
            </Label>
            <Select value={form.planId} onValueChange={(value) => onFormChange({ planId: value })}>
              <SelectTrigger className="h-10 w-full" aria-invalid={Boolean(errors.planId)}>
                <SelectValue placeholder="Select a commission plan…" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {plans.map((plan) => (
                    <SelectItem key={plan.id} value={plan.id}>
                      <span className="font-medium">{plan.name}</span>
                      <span className="ml-2 text-xs text-muted-foreground">
                        {plan.type === "standard" ? `${plan.agentSplit}/${plan.teamSplit}` : "Tiered"}
                      </span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.planId && <p className="text-xs text-destructive">{errors.planId}</p>}
          </div>

          {/* Default Fees */}
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium">Default Fees</Label>
            {form.feeIds.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {form.feeIds.map((feeId) => {
                  const fee = fees.find((f) => f.id === feeId);
                  return fee ? (
                    <Badge key={feeId} variant="secondary" className="gap-1 pr-1.5">
                      {fee.name}
                      <button
                        type="button"
                        aria-label={`Remove ${fee.name}`}
                        className="ml-0.5 rounded-full opacity-60 hover:opacity-100"
                        onClick={() => toggleFee(feeId)}
                      >
                        <X className="size-3" />
                      </button>
                    </Badge>
                  ) : null;
                })}
              </div>
            )}
            <Card className="gap-0 overflow-hidden rounded-lg shadow-none">
              <Command>
                <CommandInput placeholder="Search fees…" />
                <CommandList className="max-h-[160px]">
                  <CommandEmpty>No fees found.</CommandEmpty>
                  <CommandGroup>
                    {fees.map((fee) => (
                      <CommandItem
                        key={fee.id}
                        value={fee.name}
                        onSelect={() => toggleFee(fee.id)}
                        className="gap-3"
                      >
                        <Checkbox checked={form.feeIds.includes(fee.id)} />
                        <span className="flex-1 text-sm">{fee.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {fee.type === "flat" ? `$${fee.amount}` : `${fee.amount}%`}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </Card>
          </div>

          {/* Assign To */}
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium">Assign To</Label>
            <RadioGroup
              value={form.assignMode}
              onValueChange={(value) => onFormChange({ assignMode: value as "all" | "specific" })}
              className="flex flex-col gap-2"
            >
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-3">
                <RadioGroupItem value="specific" className="mt-0.5" />
                <span className="text-sm font-medium leading-5">Specific agents</span>
              </label>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-3">
                <RadioGroupItem value="all" className="mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium leading-5">All team members</span>
                  <span className="text-xs text-muted-foreground">
                    Applies to all current team members for new CDA calculations.
                  </span>
                </div>
              </label>
            </RadioGroup>
            {form.assignMode === "specific" && (
              <>
                <AgentSelector
                  selectedAgentIds={form.selectedAgentIds}
                  onChange={(selectedAgentIds) => onFormChange({ selectedAgentIds })}
                />
                {errors.selectedAgentIds && (
                  <p className="text-xs text-destructive">{errors.selectedAgentIds}</p>
                )}
              </>
            )}
          </div>

          {/* Active Deals */}
          <div className="flex items-start justify-between gap-4 rounded-md border px-4 py-3">
            <div className="space-y-0.5">
              <Label htmlFor="active-deals" className="text-sm font-medium">Apply to under contract deals</Label>
              <p className="text-xs text-muted-foreground">
                Recalculates CDA forecasts for active transactions.
              </p>
            </div>
            <Switch
              id="active-deals"
              checked={form.applyToActiveDeals}
              onCheckedChange={(checked) => onFormChange({ applyToActiveDeals: checked })}
            />
          </div>
        </div>

        <DialogFooter className="!flex !flex-row !items-center !justify-end !gap-3 shrink-0 border-t bg-background px-6 py-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onSave} disabled={!isValid}>Assign Defaults</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AddPlanDialog({
  open,
  form,
  errors,
  onFormChange,
  onAgentSplitChange,
  onTeamSplitChange,
  onUpdateTier,
  onAddTier,
  onRemoveTier,
  onOpenChange,
  onSave,
}: {
  open: boolean;
  form: PlanForm;
  errors: PlanErrors;
  onFormChange: (patch: Partial<PlanForm>) => void;
  onAgentSplitChange: (value: string) => void;
  onTeamSplitChange: (value: string) => void;
  onUpdateTier: (tierId: string, patch: Partial<TierRow>) => void;
  onAddTier: () => void;
  onRemoveTier: (tierId: string) => void;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}) {
  const splitTotal = numericValue(form.agentSplit) + numericValue(form.teamSplit);
  const feeLabel = form.feeType === "flat" ? "Flat Fee" : "Fee Percentage";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!flex !h-auto !max-h-[82vh] !w-[560px] !max-w-[calc(100vw-48px)] !flex-col !gap-0 !overflow-hidden !rounded-[12px] !p-0 sm:!max-w-[560px] [&>button[data-slot=dialog-close]]:hidden">
        <DialogHeader className="!flex !flex-row !items-start !justify-between !gap-4 border-b px-6 pt-6 pb-4 !text-left">
          <DialogTitle className="whitespace-nowrap text-base font-semibold leading-5">Add Commission Plan</DialogTitle>
          <DialogDescription className="sr-only">Create commission plan.</DialogDescription>
          <button
            type="button"
            aria-label="Close"
            className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            onClick={() => onOpenChange(false)}
          >
            <X className="size-4" />
          </button>
        </DialogHeader>
        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-6 py-5">
          <PlanSetupFields
            form={form}
            errors={errors}
            feeLabel={feeLabel}
            splitTotal={splitTotal}
            onFormChange={onFormChange}
            onAgentSplitChange={onAgentSplitChange}
            onTeamSplitChange={onTeamSplitChange}
            onUpdateTier={onUpdateTier}
            onAddTier={onAddTier}
            onRemoveTier={onRemoveTier}
          />
        </div>
        <DialogFooter className="!flex !flex-row !items-center !justify-end !gap-3 shrink-0 border-t bg-background px-6 py-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onSave}>Save Plan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function CDASettings() {
  const [state, setState] = useState<{
    plans: CommissionPlan[];
    activePlanId: string | null;
    activeDialog: DialogName;
    form: PlanForm;
    errors: PlanErrors;
    pendingPlan: CommissionPlan | null;
    overwriteOpen: boolean;
    fees: FeeRecord[];
    feeDraft: Partial<FeeTypeDraft>;
    assignDefaultsForm: AssignDefaultsForm;
    assignDefaultsErrors: AssignDefaultsErrors;
  }>({
    plans: seedPlans,
    activePlanId: null,
    activeDialog: null,
    form: getFreshPlanForm(),
    errors: {},
    pendingPlan: null,
    overwriteOpen: false,
    fees: seedFees,
    feeDraft: {},
    assignDefaultsForm: getFreshAssignDefaultsForm(),
    assignDefaultsErrors: {},
  });

  const selectedDefaultAgents = useMemo(() => {
    if (!state.form.applyAsDefault) return [];
    if (state.form.defaultMode === "all") return agents;
    return agents.filter((agent) => state.form.selectedAgentIds.includes(agent.id));
  }, [state.form.applyAsDefault, state.form.defaultMode, state.form.selectedAgentIds]);

  function closeDialog() {
    setState((current) => ({ ...current, activeDialog: null }));
  }

  function updateAssignDefaultsForm(patch: Partial<AssignDefaultsForm>) {
    setState((current) => ({
      ...current,
      assignDefaultsForm: { ...current.assignDefaultsForm, ...patch },
    }));
  }

  function handleSaveAssignDefaults() {
    const errs: AssignDefaultsErrors = {};
    if (!state.assignDefaultsForm.planId) errs.planId = "Commission plan required";
    if (state.assignDefaultsForm.assignMode === "specific" && state.assignDefaultsForm.selectedAgentIds.length === 0) {
      errs.selectedAgentIds = "Select at least one agent";
    }
    if (Object.keys(errs).length > 0) {
      setState((current) => ({ ...current, assignDefaultsErrors: errs }));
      return;
    }
    setState((current) => ({
      ...current,
      activeDialog: null,
      assignDefaultsForm: getFreshAssignDefaultsForm(),
      assignDefaultsErrors: {},
    }));
    toast("Defaults assigned");
  }

  function updateForm(patch: Partial<PlanForm>) {
    setState((current) => ({ ...current, form: { ...current.form, ...patch } }));
  }

  function handleAgentSplitChange(value: string) {
    updateForm({ agentSplit: value, teamSplit: String(Math.max(0, 100 - numericValue(value))) });
  }

  function handleTeamSplitChange(value: string) {
    updateForm({ teamSplit: value, agentSplit: String(Math.max(0, 100 - numericValue(value))) });
  }

  function updateTier(tierId: string, patch: Partial<TierRow>) {
    setState((current) => ({
      ...current,
      form: {
        ...current.form,
        tiers: current.form.tiers.map((tier) => (tier.id === tierId ? { ...tier, ...patch } : tier)),
      },
    }));
  }

  function addTier() {
    setState((current) => ({
      ...current,
      form: {
        ...current.form,
        tiers: [
          ...current.form.tiers,
          {
            id: crypto.randomUUID(),
            from: "",
            to: "",
            agentSplit: "80",
            teamSplit: "20",
          },
        ],
      },
    }));
  }

  function removeTier(tierId: string) {
    setState((current) => ({
      ...current,
      form: {
        ...current.form,
        tiers: current.form.tiers.filter((tier) => tier.id !== tierId),
      },
    }));
  }

  function validatePlanForm() {
    const nextErrors: PlanErrors = {};
    const hasDealType = Object.values(state.form.dealTypes).some(Boolean);

    if (!state.form.planName.trim()) nextErrors.planName = "Plan Name required";

    if (state.form.planType === "standard") {
      const splitTotal = numericValue(state.form.agentSplit) + numericValue(state.form.teamSplit);
      if (splitTotal !== 100) nextErrors.splitTotal = `Split total must equal 100%. Current: ${splitTotal}%`;
    }

    if (state.form.planType === "tiered") {
      const tierErrors: Record<string, string> = {};
      state.form.tiers.forEach((tier, index) => {
        const splitTotal = numericValue(tier.agentSplit) + numericValue(tier.teamSplit);
        const finalRow = index === state.form.tiers.length - 1;
        if (!tier.from) tierErrors[tier.id] = "From required";
        else if (!finalRow && !tier.to) tierErrors[tier.id] = "To required except final row";
        else if (splitTotal !== 100) tierErrors[tier.id] = `Split total must equal 100%. Current: ${splitTotal}%`;
      });
      if (Object.keys(tierErrors).length > 0) nextErrors.tiers = tierErrors;
    }

    if (!hasDealType) nextErrors.dealTypes = "At least one deal type selected";

    if (state.form.applyAsDefault && state.form.defaultMode === "specific" && state.form.selectedAgentIds.length === 0) {
      nextErrors.selectedAgentIds = "Select at least one agent";
    }

    setState((current) => ({ ...current, errors: nextErrors }));
    return Object.keys(nextErrors).length === 0;
  }

  function createPlanFromForm(): CommissionPlan {
    const selectedDealTypes = Object.entries(state.form.dealTypes)
      .filter(([, selected]) => selected)
      .map(([dealType]) => dealType.charAt(0).toUpperCase() + dealType.slice(1));

    return {
      id: state.form.editingPlanId ?? crypto.randomUUID(),
      name: state.form.planName.trim(),
      type: state.form.planType,
      agentSplit: numericValue(state.form.agentSplit),
      teamSplit: numericValue(state.form.teamSplit),
      feeType: state.form.feeType,
      feeAmount: numericValue(state.form.feeAmount || (state.form.feeType === "flat" ? "495" : "2.5")),
      capAmount: numericValue(state.form.capAmount),
      dealTypes: selectedDealTypes,
      assignedAgentsCount: state.form.applyAsDefault ? selectedDefaultAgents.length : 0,
      resetPeriod: state.form.resetPeriod,
      basedOn: state.form.basedOn,
      tiers: state.form.tiers.map((tier) => ({ ...tier })),
    };
  }

  function needsOverwriteConfirmation() {
    return state.form.applyAsDefault && selectedDefaultAgents.some((agent) => agent.hasDefault);
  }

  function commitPlan(plan: CommissionPlan, overwriteConfirmed = false) {
    setState((current) => {
      const existingIndex = current.plans.findIndex((item) => item.id === plan.id);
      const plans =
        existingIndex >= 0
          ? current.plans.map((item) => (item.id === plan.id ? plan : item))
          : [...current.plans, plan];

      return {
        ...current,
        plans,
        activePlanId: plan.id,
        activeDialog: null,
        form: getFreshPlanForm(),
        errors: {},
        pendingPlan: null,
        overwriteOpen: false,
      };
    });

    toast(
      plan.assignedAgentsCount > 0
        ? "Commission plan added and defaults assigned"
        : overwriteConfirmed
          ? "Commission plan added and defaults assigned"
          : "Commission plan added",
    );
  }

  function handleSavePlan() {
    if (!validatePlanForm()) return;
    const nextPlan = createPlanFromForm();
    if (needsOverwriteConfirmation()) {
      setState((current) => ({ ...current, pendingPlan: nextPlan, overwriteOpen: true }));
      return;
    }
    commitPlan(nextPlan);
  }

  function editPlan(plan: CommissionPlan) {
    setState((current) => ({
      ...current,
      activeDialog: "add-plan",
      errors: {},
      form: {
        ...getFreshPlanForm(),
        editingPlanId: plan.id,
        planName: plan.name,
        planType: plan.type,
        agentSplit: String(plan.agentSplit),
        teamSplit: String(plan.teamSplit),
        feeType: plan.feeType,
        feeAmount: String(plan.feeAmount),
        capAmount: String(plan.capAmount),
        resetPeriod: plan.resetPeriod,
        basedOn: plan.basedOn,
        dealTypes: {
          buyer: plan.dealTypes.includes("Buyer"),
          seller: plan.dealTypes.includes("Seller"),
          lease: plan.dealTypes.includes("Lease"),
          landlord: plan.dealTypes.includes("Landlord"),
        },
        tiers: plan.tiers.map((tier) => ({ ...tier })),
      },
    }));
  }

  function duplicatePlan(plan: CommissionPlan) {
    const duplicate = {
      ...plan,
      id: crypto.randomUUID(),
      name: `${plan.name} Copy`,
      assignedAgentsCount: 0,
    };
    setState((current) => ({ ...current, plans: [...current.plans, duplicate] }));
    toast("Commission plan duplicated");
  }

  function assignDefaults(plan: CommissionPlan) {
    setState((current) => ({
      ...current,
      activeDialog: "assign-defaults",
      assignDefaultsForm: { ...getFreshAssignDefaultsForm(), planId: plan.id },
      assignDefaultsErrors: {},
    }));
  }

  function versionHistory(plan: CommissionPlan) {
    toast(`Version history opened for ${plan.name}`);
  }

  function deletePlan(planId: string) {
    setState((current) => ({ ...current, plans: current.plans.filter((plan) => plan.id !== planId) }));
    toast("Commission plan deleted");
  }

  function renderCommissionPlans() {
    if (state.plans.length === 0) {
      return (
        <EmptySection
          title="Commission Plans"
          description="Create default split structures for agents and teams."
          emptyDescription="Create plans like 80/20 Standard or tiered plans for agents."
          icon={FileText}
          action="Add Plan"
          onAction={() => setState((current) => ({ ...current, activeDialog: "add-plan", form: getFreshPlanForm(), errors: {} }))}
        />
      );
    }

    return (
      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-base font-medium leading-6 text-foreground">Commission Plans</h2>
            <p className="mt-1 text-xs text-muted-foreground">Create default split structures for agents and teams.</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-primary text-primary hover:text-primary"
            onClick={() => setState((current) => ({ ...current, activeDialog: "add-plan", form: getFreshPlanForm(), errors: {} }))}
          >
            <Plus className="size-4" />
            Add Plan
          </Button>
        </div>
        <Card className="rounded-[14px] border-border shadow-none">
          <CardContent className="px-0 pb-0 [&:last-child]:pb-0">
            {state.plans.map((plan) => (
              <CommissionPlanCard
                key={plan.id}
                plan={plan}
                onEdit={editPlan}
                onDuplicate={duplicatePlan}
                onAssignDefaults={assignDefaults}
                onVersionHistory={versionHistory}
                onDelete={deletePlan}
              />
            ))}
          </CardContent>
        </Card>
      </section>
    );
  }

  function saveFeeType(data: FeeTypeDraft) {
    const feeId = data.id ?? crypto.randomUUID();
    const fee: FeeRecord = { ...data, id: feeId };
    const exists = state.fees.some((item) => item.id === feeId);
    setState((current) => ({
      ...current,
      fees: exists
        ? current.fees.map((item) => (item.id === feeId ? fee : item))
        : [...current.fees, fee],
      feeDraft: {},
    }));

    toast(fee.appliesToMode === "agents" ? "Fee type added and applied" : "Fee type added");
  }

  function duplicateFee(fee: FeeRecord) {
    setState((current) => ({
      ...current,
      activeDialog: "add-fee",
      feeDraft: {
        ...fee,
        id: null,
        step: 1,
        name: `Copy of ${fee.name}`,
      },
    }));
  }

  function editFee(fee: FeeRecord) {
    setState((current) => ({
      ...current,
      activeDialog: "add-fee",
      feeDraft: {
        ...fee,
        step: fee.appliesToMode === "agents" ? 2 : 1,
      },
    }));
  }

  function renderFeeTypes() {
    if (state.fees.length === 0) {
      return (
        <EmptySection
          title="Fee Types"
          description="Define reusable deductions for CDA calculations."
          emptyDescription="Create reusable deductions such as TC Fee, RM Fee, E&O Fee, or Compliance Review."
          icon={DollarSign}
          action="Add Fee"
          onAction={() => setState((current) => ({ ...current, activeDialog: "add-fee", feeDraft: {} }))}
        />
      );
    }

    return (
      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-base font-medium leading-6 text-foreground">Fee Types</h2>
            <p className="mt-1 text-xs text-muted-foreground">Define reusable deductions for CDA calculations.</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-primary text-primary hover:text-primary"
            onClick={() => setState((current) => ({ ...current, activeDialog: "add-fee", feeDraft: {} }))}
          >
            <Plus className="size-4" />
            Add Fee
          </Button>
        </div>
        <Card className="rounded-[14px] border-border shadow-none">
          <CardContent className="px-0 pb-0 [&:last-child]:pb-0">
            {state.fees.map((fee) => (
              <div key={fee.id} className="flex min-h-[66px] items-center justify-between border-b px-6 py-3 last:border-b-0">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{fee.name}</p>
                    <Badge variant="secondary">{fee.type === "flat" ? "Flat" : "Percentage"}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span>{fee.type === "flat" ? `$${fee.amount} flat` : `${fee.amount}%`}</span>
                    <span>{fee.timing === "pre-split" ? "Pre-Split" : "Post-Split"}</span>
                    <span>
                      Applies to: {fee.appliesToMode === "team" ? "Team" : `${fee.agentIds.length} agents`}
                    </span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreVertical className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => editFee(fee)}>
                        <Edit3 className="size-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => duplicateFee(fee)}>
                        <Copy className="size-4" />
                        Duplicate
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    );
  }

  const tabs = [
    "Accounts",
    "Billing",
    "Finances",
    "CDA Settings",
    "Team settings",
    "Collaborators",
    "Transaction settings",
    "Pods",
    "Automations",
    "Integrations",
    "Phone Numbers",
    "Notification settings",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed left-0 right-0 top-0 z-30 flex h-[68px] items-center justify-between border-b bg-background shadow-sm">
        <div className="px-5">
          <RadiusLogo />
        </div>
        <div className="flex h-full items-center gap-4 border-l px-6">
          <div className="size-12 rounded-full bg-muted" />
          <div>
            <div className="text-base font-medium leading-5">Vanessa Brown</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="size-3 rounded-full bg-primary" />
              Radius Agent
            </div>
          </div>
        </div>
      </header>

      <aside className="fixed bottom-0 left-0 top-[68px] z-20 flex w-[72px] flex-col items-center border-r bg-background py-8">
        <div className="mb-14 size-9 rounded-full border-[5px] border-[#0f1f2e]">
          <div className="mt-5 h-3 w-7 rotate-[-35deg] rounded-full bg-primary" />
        </div>
        <nav className="flex flex-col gap-3">
          <SidebarIcon icon={Users} label="Users" />
          <SidebarIcon icon={FileText} label="Documents" />
          <SidebarIcon icon={ReceiptText} label="Reports" />
        </nav>
        <nav className="mt-16 flex flex-col gap-3">
          <SidebarIcon icon={Building2} label="Office" />
          <SidebarIcon icon={Briefcase} label="Briefcase" />
          <SidebarIcon icon={Gift} label="Gifts" />
        </nav>
        <nav className="mt-auto flex flex-col gap-3">
          <SidebarIcon icon={Rss} label="Feed" />
          <SidebarIcon icon={Briefcase} label="Work" />
          <SidebarIcon icon={Users} label="Team" />
          <SidebarIcon icon={Megaphone} label="Marketing" />
          <SidebarIcon icon={Bell} label="Notifications" />
          <SidebarIcon icon={HelpCircle} label="Help" />
          <SidebarIcon icon={Settings} label="Settings" />
        </nav>
      </aside>

      <main className="pl-[72px] pt-[68px]">
        <div className="flex h-[92px] items-center px-8">
          <h1 className="text-2xl font-semibold leading-tight text-[#373758]">Settings</h1>
        </div>
        <div className="flex h-10 items-center overflow-hidden border-y px-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`flex h-10 shrink-0 items-center px-4 text-sm font-semibold text-[#373758] ${
                tab === "CDA Settings" ? "border-b-2 border-primary text-primary" : ""
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-8 px-4 py-9">
          {renderCommissionPlans()}
          {renderFeeTypes()}
          <EmptySection
            title="Default Assignments"
            description="Connect plans and fees to agents so new CDA estimates use the right calculation rules."
            emptyDescription="Assign commission plans and fee types to agents so CDA estimates are created automatically."
            icon={UserCheck}
            action="Add Defaults"
            onAction={() => setState((current) => ({ ...current, activeDialog: "assign-defaults", assignDefaultsForm: getFreshAssignDefaultsForm(), assignDefaultsErrors: {} }))}
          />
        </div>
      </main>

      <AddPlanDialog
        open={state.activeDialog === "add-plan"}
        form={state.form}
        errors={state.errors}
        onFormChange={updateForm}
        onAgentSplitChange={handleAgentSplitChange}
        onTeamSplitChange={handleTeamSplitChange}
        onUpdateTier={updateTier}
        onAddTier={addTier}
        onRemoveTier={removeTier}
        onOpenChange={(open) => setState((current) => ({ ...current, activeDialog: open ? "add-plan" : null }))}
        onSave={handleSavePlan}
      />

      <FeeBuilderModal
        open={state.activeDialog === "add-fee"}
        initialData={state.feeDraft}
        onOpenChange={(open) => setState((current) => ({ ...current, activeDialog: open ? "add-fee" : null }))}
        onSave={saveFeeType}
      />

      <AssignDefaultsDialog
        open={state.activeDialog === "assign-defaults"}
        form={state.assignDefaultsForm}
        errors={state.assignDefaultsErrors}
        plans={state.plans}
        fees={state.fees}
        onFormChange={updateAssignDefaultsForm}
        onOpenChange={(open) => setState((current) => ({ ...current, activeDialog: open ? "assign-defaults" : null }))}
        onSave={handleSaveAssignDefaults}
      />

      <AlertDialog
        open={state.overwriteOpen}
        onOpenChange={(open) => setState((current) => ({ ...current, overwriteOpen: open }))}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Replace existing default plan?</AlertDialogTitle>
            <AlertDialogDescription>
              One or more selected agents already have another default plan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => state.pendingPlan && commitPlan(state.pendingPlan, true)}>
              Replace defaults
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Toaster />
    </div>
  );
}
