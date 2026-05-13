import { useState } from "react";
import { Link } from "react-router";
import {
  CDASectionHeader,
  TierBuilderRow,
  FinanceInput,
  FeeBadge,
  type TierData,
} from "../components/finance";
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Switch } from "../components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  ArrowLeft,
  ChevronRight,
  Plus,
  Library,
  Settings,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  DollarSign,
  TrendingDown,
} from "lucide-react";
import { cn } from "../components/ui/utils";

export function FeeTypeBuilder() {
  const [feeName, setFeeName] = useState("RM Fee");
  const [feeType, setFeeType] = useState<"flat" | "percentage">("flat");
  const [feeAmount, setFeeAmount] = useState("300");
  const [percentageBasis, setPercentageBasis] = useState("gci");
  const [timing, setTiming] = useState<"pre-split" | "post-split">("post-split");
  const [appliesTo, setAppliesTo] = useState<"agent" | "team" | "both">("agent");
  const [contributesToCap, setContributesToCap] = useState(true);
  const [slidingScale, setSlidingScale] = useState(false);

  const [slidingScaleTiers, setSlidingScaleTiers] = useState<TierData[]>([
    {
      id: "s1",
      rangeStart: 0,
      rangeEnd: 8000,
      splitPercentage: 65,
      resetPeriod: "annual",
      dealType: "all",
    },
    {
      id: "s2",
      rangeStart: 8000,
      rangeEnd: null,
      splitPercentage: 100,
      resetPeriod: "annual",
      dealType: "all",
    },
  ]);

  const [defaultAssignment, setDefaultAssignment] = useState({
    applyToNewCDA: true,
    applyToPlans: false,
    applyToAgents: false,
  });

  const isValid = feeAmount && (feeType === "flat" || percentageBasis);

  // Sample calculation
  const agentGross = 11640;
  const feeValue = feeType === "flat" ? parseFloat(feeAmount || "0") : 0;
  const netAfterFee = agentGross - feeValue;

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background border-b px-8 py-4">
        <div className="max-w-[1320px] mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
            <Link to="/" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Library className="size-3.5" />
              Components
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-xs text-muted-foreground">Settings</span>
            <ChevronRight className="size-3" />
            <Link to="/cda-settings" className="hover:text-foreground transition-colors">
              CDA
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground font-medium">Fee Type</span>
          </div>

          {/* Title Row */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <Link to="/cda-settings">
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <ArrowLeft className="size-4 mr-1.5" />
                  Back to CDA Settings
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold mb-1">Add Fee Type</h1>
                <p className="text-sm text-muted-foreground">
                  Define reusable deductions for CDA calculations.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 mr-2 pr-2 border-r">
                <Link to="/commission-plan-builder">
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    <ExternalLink className="size-3 mr-1.5" />
                    Plan Builder
                  </Button>
                </Link>
                <Link to="/breakdown">
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    <ExternalLink className="size-3 mr-1.5" />
                    Breakdown
                  </Button>
                </Link>
              </div>
              <Button variant="outline" size="sm">
                Save Draft
              </Button>
              <Button size="sm" disabled={!isValid}>
                Save Fee Type
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1320px] mx-auto px-8 py-6">
        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-[65%_35%] gap-6">
          {/* Left Form */}
          <div className="space-y-6">
            {/* A. Basic Details */}
            <section className="bg-background border rounded-lg overflow-hidden shadow-sm">
              <CDASectionHeader title="Basic Details" className="bg-muted/30" />
              <div className="p-4 space-y-4">
                <div>
                  <Label htmlFor="fee-name">Fee Name</Label>
                  <Input
                    id="fee-name"
                    value={feeName}
                    onChange={(e) => setFeeName(e.target.value)}
                    placeholder="e.g., Transaction Coordinator Fee"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Optional description for internal use..."
                    className="mt-1.5 min-h-[80px]"
                  />
                </div>
                <div>
                  <Label htmlFor="fee-status">Status</Label>
                  <Select defaultValue="active">
                    <SelectTrigger id="fee-status" className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            {/* B. Fee Type */}
            <section>
              <CDASectionHeader title="Fee Type" />
              <Card>
                <CardContent className="pt-6">
                  <Select value={feeType} onValueChange={(v) => setFeeType(v as any)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flat">Flat</SelectItem>
                      <SelectItem value="percentage">Percentage</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-3">
                    {feeType === "flat"
                      ? "Flat fees are fixed dollar amounts deducted from commission."
                      : "Percentage fees are calculated as a percentage of a specified basis."}
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* C. Amount */}
            <section className="bg-background border rounded-lg overflow-hidden shadow-sm">
              <CDASectionHeader title="Amount" className="bg-muted/30" />
              <div className="p-4 space-y-4">
                <div>
                  <Label htmlFor="fee-amount">
                    {feeType === "flat" ? "Fee Amount" : "Percentage"}
                  </Label>
                  <FinanceInput
                    id="fee-amount"
                    variant={feeType === "flat" ? "currency" : "percentage"}
                    value={feeAmount}
                    onChange={(e) => setFeeAmount(e.target.value)}
                    placeholder={feeType === "flat" ? "500.00" : "2.0"}
                    className="mt-1.5"
                  />
                </div>

                {feeType === "percentage" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div>
                      <Label htmlFor="percentage-basis">Percentage Basis</Label>
                      <Select value={percentageBasis} onValueChange={setPercentageBasis}>
                        <SelectTrigger id="percentage-basis" className="mt-1.5">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="property">Property Value</SelectItem>
                          <SelectItem value="gci">GCI (Gross Commission Income)</SelectItem>
                          <SelectItem value="net">Net Commission</SelectItem>
                          <SelectItem value="post-split">Post-split Commission</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-2">
                        The base amount used to calculate the percentage fee.
                      </p>
                    </div>
                    {!percentageBasis && (
                      <div className="flex items-center gap-2 text-xs p-2 rounded bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400">
                        <AlertCircle className="size-3" />
                        Percentage basis is required for percentage fees
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* D. Timing */}
            <section className="bg-background border rounded-lg overflow-hidden shadow-sm">
              <CDASectionHeader title="Timing" className="bg-muted/30" />
              <div className="p-4 space-y-3">
                <Select value={timing} onValueChange={(v) => setTiming(v as any)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pre-split">Pre-split</SelectItem>
                    <SelectItem value="post-split">Post-split</SelectItem>
                  </SelectContent>
                </Select>
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <p className="text-xs text-blue-900 dark:text-blue-100 font-medium">
                    {timing === "pre-split"
                      ? "Pre-split fees are deducted before agent allocation. They reduce the split basis for all agents."
                      : "Post-split fees are deducted after agent allocation. They apply to individual agent portions."}
                  </p>
                </div>
              </div>
            </section>

            {/* E. Applies To */}
            <section className="bg-background border rounded-lg overflow-hidden shadow-sm">
              <CDASectionHeader title="Applies To" className="bg-muted/30" />
              <div className="p-4 space-y-3">
                <Select value={appliesTo} onValueChange={(v) => setAppliesTo(v as any)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agent">Agent</SelectItem>
                    <SelectItem value="team">Team</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground font-medium">
                  {appliesTo === "agent" && "Fee applies to agent portion only."}
                  {appliesTo === "team" && "Fee applies to team portion only."}
                  {appliesTo === "both" && "Fee applies to both agent and team portions."}
                </p>
              </div>
            </section>

            {/* F. Cap Contribution */}
            <section className="bg-background border rounded-lg overflow-hidden shadow-sm">
              <CDASectionHeader title="Cap Contribution" className="bg-muted/30" />
              <div className="p-4">
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg border">
                  <Switch
                    id="contributes-cap"
                    checked={contributesToCap}
                    onCheckedChange={setContributesToCap}
                  />
                  <div className="flex-1">
                    <label htmlFor="contributes-cap" className="text-sm font-semibold cursor-pointer">
                      Contributes to cap
                    </label>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Cap contribution is calculated in background and not displayed on CDA.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* G. Sliding Scale */}
            <section className="bg-background border rounded-lg overflow-hidden shadow-sm">
              <CDASectionHeader title="Sliding Scale" className="bg-muted/30" />
              <div className="p-4 space-y-4">
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg border">
                  <Switch
                    id="sliding-scale"
                    checked={slidingScale}
                    onCheckedChange={setSlidingScale}
                  />
                  <div className="flex-1">
                    <label htmlFor="sliding-scale" className="text-sm font-semibold cursor-pointer">
                      Enable sliding scale
                    </label>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Apply different percentages based on commission tiers.
                    </p>
                  </div>
                </div>

                {slidingScale && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                    <Separator />
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-semibold">Scale Tiers</Label>
                        <Button variant="outline" size="sm" className="h-8 text-xs">
                          <Plus className="size-3.5 mr-1.5" />
                          Add Tier
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {slidingScaleTiers.map((tier, index) => (
                          <div key={tier.id} className="p-3 border rounded-lg bg-muted/20">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold uppercase tracking-tight text-muted-foreground">Tier {index + 1}</span>
                              {slidingScaleTiers.length > 1 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2 text-[10px] uppercase font-bold"
                                  onClick={() =>
                                    setSlidingScaleTiers(
                                      slidingScaleTiers.filter((t) => t.id !== tier.id)
                                    )
                                  }
                                >
                                  Remove
                                </Button>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight mb-0.5">Commission Range</p>
                                <p className="font-semibold text-foreground">
                                  {tier.rangeEnd
                                    ? `Up to $${tier.rangeEnd.toLocaleString()}`
                                    : `Above $${tier.rangeStart.toLocaleString()}`}
                                </p>
                              </div>
                              <div>
                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight mb-0.5">Fee Percentage</p>
                                <p className="font-semibold text-foreground">{tier.splitPercentage}%</p>
                              </div>
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full h-9" size="sm">
                          <Plus className="size-4 mr-2" />
                          Add Tier
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section className="bg-background border rounded-lg overflow-hidden shadow-sm">
              <CDASectionHeader title="Default Assignment" className="bg-muted/30" />
              <div className="p-4 space-y-3">
                <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <Checkbox
                    checked={defaultAssignment.applyToNewCDA}
                    onCheckedChange={(checked) =>
                      setDefaultAssignment({
                        ...defaultAssignment,
                        applyToNewCDA: Boolean(checked),
                      })
                    }
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">Apply to new CDA by default</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Automatically include this fee in all new CDA calculations
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <Checkbox
                    checked={defaultAssignment.applyToPlans}
                    onCheckedChange={(checked) =>
                      setDefaultAssignment({
                        ...defaultAssignment,
                        applyToPlans: Boolean(checked),
                      })
                    }
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">Apply to selected commission plans</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Link this fee to specific commission plans
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <Checkbox
                    checked={defaultAssignment.applyToAgents}
                    onCheckedChange={(checked) =>
                      setDefaultAssignment({
                        ...defaultAssignment,
                        applyToAgents: Boolean(checked),
                      })
                    }
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">Apply to selected agents</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Assign this fee to specific agent profiles
                    </p>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* Right Live Preview */}
          <div className="sticky top-24 h-fit bg-background border rounded-lg overflow-hidden shadow-sm">
            <div className="bg-muted/30 px-4 py-3 border-b">
              <h3 className="text-sm font-semibold">Live Preview</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Fee Details</p>
                <div className="p-3 bg-muted/50 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{feeName}</p>
                    <FeeBadge
                      label={feeType === "flat" ? "Flat" : "Percentage"}
                      variant={feeType === "flat" ? "flat" : "percentage"}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <FeeBadge
                      label={timing === "pre-split" ? "Pre-split" : "Post-split"}
                      variant={timing === "pre-split" ? "pre-split" : "post-split"}
                    />
                    <FeeBadge
                      label={appliesTo.charAt(0).toUpperCase() + appliesTo.slice(1)}
                      variant={
                        appliesTo === "agent"
                          ? "agent"
                          : appliesTo === "team"
                          ? "team"
                          : "flat"
                      }
                    />
                    {contributesToCap && <FeeBadge label="Cap" variant="cap" />}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-medium">
                      {feeType === "flat"
                        ? `$${parseFloat(feeAmount || "0").toLocaleString()}`
                        : `${feeAmount}%`}
                    </span>
                  </div>
                  {feeType === "percentage" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Basis</span>
                      <span className="font-medium text-xs">
                        {percentageBasis === "property" && "Property Value"}
                        {percentageBasis === "gci" && "GCI"}
                        {percentageBasis === "net" && "Net Commission"}
                        {percentageBasis === "post-split" && "Post-split"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-xs text-muted-foreground mb-2">Sample Impact</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="size-4 text-muted-foreground" />
                    <div className="flex-1 flex justify-between text-sm">
                      <span className="text-muted-foreground">Agent Gross</span>
                      <span className="font-medium">${agentGross.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingDown className="size-4 text-destructive" />
                    <div className="flex-1 flex justify-between text-sm">
                      <span className="text-muted-foreground">{feeName}</span>
                      <span className="font-medium text-destructive">
                        -${feeValue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-2">
                    <DollarSign className="size-4 text-muted-foreground" />
                    <div className="flex-1 flex justify-between text-sm">
                      <span className="text-muted-foreground">Net After Fee</span>
                      <span className="font-semibold">${netAfterFee.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <p className="text-xs text-blue-900 dark:text-blue-100">
                  This preview shows how the fee impacts a sample agent gross of ${agentGross.toLocaleString()}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div className="sticky bottom-0 z-20 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-8 py-[14px] mt-auto">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {isValid ? "Ready to save" : "Fee amount required"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/cda-settings">
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              Save Draft
            </Button>
            <Button size="sm" disabled={!isValid}>
              Save Fee Type
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
