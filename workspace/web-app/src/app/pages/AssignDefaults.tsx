import { useState } from "react";
import { Link } from "react-router";
import {
  CDASectionHeader,
  FeeBadge,
  ApprovalStatus,
} from "../components/finance";
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
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
  Search,
  Library,
  Settings,
  ExternalLink,
  Plus,
  Trash2,
  Users,
  FileText,
  AlertCircle,
  CheckCircle2,
  Eye,
  Filter,
} from "lucide-react";
import { cn } from "../components/ui/utils";

export function AssignDefaults() {
  const [selectedAgentId, setSelectedAgentId] = useState("1");
  const [applyToUnderContract, setApplyToUnderContract] = useState(false);
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const agents = [
    {
      id: "1",
      name: "Ila Corcoran",
      initials: "IC",
      role: "Agent",
      plan: "80/20 Standard",
      feeCount: 3,
      status: "complete",
    },
    {
      id: "2",
      name: "Michael Tran",
      initials: "MT",
      role: "Agent",
      plan: "80/20 Standard",
      feeCount: 2,
      status: "complete",
    },
    {
      id: "3",
      name: "Ava Patel",
      initials: "AP",
      role: "Agent",
      plan: null,
      feeCount: 0,
      status: "missing",
    },
    {
      id: "4",
      name: "Rod Watson",
      initials: "RW",
      role: "Team Lead",
      plan: "Keystone Tiered",
      feeCount: 4,
      status: "complete",
    },
  ];

  const selectedAgent = agents.find((a) => a.id === selectedAgentId);

  const defaultFees = [
    { id: "f1", name: "TC Fee", timing: "Pre-split", appliesTo: "Team", amount: "$500" },
    { id: "f2", name: "RM Fee", timing: "Post-split", appliesTo: "Agent", amount: "$300" },
    { id: "f3", name: "E&O Fee", timing: "Post-split", appliesTo: "Agent", amount: "$125" },
  ];

  const filteredAgents = agents.filter((agent) => {
    if (searchQuery && !agent.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filterStatus === "has-plan" && !agent.plan) return false;
    if (filterStatus === "missing-plan" && agent.plan) return false;
    if (filterStatus === "has-fees" && agent.feeCount === 0) return false;
    if (filterStatus === "missing-fees" && agent.feeCount > 0) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background border-b px-8 py-4">
        <div className="max-w-[1440px] mx-auto">
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
            <span className="text-foreground font-medium">Assign Defaults</span>
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
                <h1 className="text-xl font-semibold mb-1">Assign Defaults</h1>
                <p className="text-sm text-muted-foreground">
                  Assign commission plans and fees to agents for automatic CDA calculations.
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
                <Link to="/fee-type-builder">
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    <ExternalLink className="size-3 mr-1.5" />
                    Fee Builder
                  </Button>
                </Link>
              </div>
              <Button variant="outline" size="sm" onClick={() => setBulkModalOpen(true)}>
                <Users className="size-4 mr-2" />
                Bulk Assign
              </Button>
              <Button size="sm">Save Assignments</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto px-8 py-6">
        {/* Warning Card */}
        <Card className="mb-6 border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="size-5 text-amber-600 dark:text-amber-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                  Changing defaults can recalculate CDA forecasts for under contract deals
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                  Use the "Apply to under contract deals" toggle to update active transactions.
                </p>
              </div>
              <Button variant="ghost" size="sm">
                <Eye className="size-4 mr-2" />
                View Affected Deals
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Three-Panel Layout */}
        <div className="grid grid-cols-[300px_1fr_350px] gap-6">
          {/* Left: Agent List */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Agents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    placeholder="Search agents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                {/* Filters */}
                <div>
                  <Label className="text-xs mb-2 flex items-center gap-2">
                    <Filter className="size-3" />
                    Filter
                  </Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Agents</SelectItem>
                      <SelectItem value="has-plan">Has Plan</SelectItem>
                      <SelectItem value="missing-plan">Missing Plan</SelectItem>
                      <SelectItem value="has-fees">Has Fees</SelectItem>
                      <SelectItem value="missing-fees">Missing Fees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Agent List */}
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {filteredAgents.map((agent) => (
                    <button
                      key={agent.id}
                      onClick={() => setSelectedAgentId(agent.id)}
                      className={cn(
                        "w-full text-left p-3 rounded-lg border transition-colors",
                        selectedAgentId === agent.id
                          ? "bg-accent border-border"
                          : "bg-background hover:bg-accent/50 border-transparent"
                      )}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium">
                          {agent.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{agent.name}</p>
                          <p className="text-xs text-muted-foreground">{agent.role}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        {agent.plan ? (
                          <p className="text-xs text-muted-foreground">{agent.plan}</p>
                        ) : (
                          <p className="text-xs text-amber-600 dark:text-amber-500">Missing plan</p>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {agent.feeCount} {agent.feeCount === 1 ? "fee" : "fees"}
                          </span>
                          {agent.status === "complete" ? (
                            <CheckCircle2 className="size-3 text-green-600" />
                          ) : (
                            <AlertCircle className="size-3 text-amber-600" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center: Selected Agent Defaults */}
          <div className="space-y-6">
            {selectedAgent && (
              <>
                {/* Agent Header */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-base font-medium">
                        {selectedAgent.initials}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{selectedAgent.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedAgent.role}</p>
                      </div>
                      {selectedAgent.status === "complete" ? (
                        <FeeBadge label="Complete" variant="post-split" />
                      ) : (
                        <FeeBadge label="Incomplete" variant="pre-split" />
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* A. Commission Plan */}
                <section>
                  <CDASectionHeader title="Commission Plan" />
                  <Card>
                    <CardContent className="pt-6 space-y-4">
                      {selectedAgent.plan ? (
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{selectedAgent.plan}</p>
                              <FeeBadge label="Standard" variant="flat" />
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Agent 80% / Team 20% · Cap $18,000
                          </p>
                        </div>
                      ) : (
                        <div className="p-4 border-2 border-dashed border-amber-200 dark:border-amber-800 rounded-lg text-center">
                          <AlertCircle className="size-5 text-amber-600 mx-auto mb-2" />
                          <p className="text-sm text-amber-900 dark:text-amber-100 font-medium">
                            No commission plan assigned
                          </p>
                          <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                            Select a plan to enable CDA calculations
                          </p>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Change Plan
                        </Button>
                        {selectedAgent.plan && (
                          <Button variant="ghost" size="sm">
                            Clear Plan
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* B. Default Fees */}
                <section>
                  <CDASectionHeader
                    title="Default Fees"
                    action={
                      <Button variant="outline" size="sm">
                        <Plus className="size-4 mr-2" />
                        Add Fee
                      </Button>
                    }
                  />
                  <Card>
                    <CardContent className="pt-6">
                      {defaultFees.length > 0 ? (
                        <div className="space-y-2">
                          {defaultFees.map((fee) => (
                            <div
                              key={fee.id}
                              className="flex items-center justify-between p-3 border rounded-lg group hover:bg-muted/50"
                            >
                              <div className="flex-1">
                                <p className="text-sm font-medium mb-1">{fee.name}</p>
                                <div className="flex items-center gap-2">
                                  <FeeBadge
                                    label={fee.timing}
                                    variant={fee.timing === "Pre-split" ? "pre-split" : "post-split"}
                                  />
                                  <FeeBadge
                                    label={fee.appliesTo}
                                    variant={fee.appliesTo === "Agent" ? "agent" : "team"}
                                  />
                                  <span className="text-xs text-muted-foreground">{fee.amount}</span>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100"
                              >
                                <Trash2 className="size-4 text-destructive" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 border-2 border-dashed rounded-lg text-center">
                          <FileText className="size-5 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">No default fees assigned</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </section>

                {/* C. Cap Details */}
                <section>
                  <CDASectionHeader title="Cap Details" />
                  <Card>
                    <CardContent className="pt-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs mb-2 block">Plan Cap</Label>
                          <p className="text-sm font-medium">$18,000</p>
                        </div>
                        <div>
                          <Label className="text-xs mb-2 block">Cap Anniversary</Label>
                          <p className="text-sm font-medium">Jan 1</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Switch id="override-cap" defaultChecked />
                        <label htmlFor="override-cap" className="text-sm cursor-pointer">
                          Agent cap override enabled
                        </label>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* D. Apply to Deals Toggle */}
                <section>
                  <CDASectionHeader title="Apply Changes" />
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <Switch
                          id="apply-under-contract"
                          checked={applyToUnderContract}
                          onCheckedChange={setApplyToUnderContract}
                        />
                        <div className="flex-1">
                          <label
                            htmlFor="apply-under-contract"
                            className="text-sm font-medium cursor-pointer"
                          >
                            Apply changes to all under contract deals
                          </label>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Use this when updating active transactions that have not finalized CDA.
                          </p>
                        </div>
                      </div>
                      {applyToUnderContract && (
                        <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="size-4 text-amber-600 dark:text-amber-500 mt-0.5" />
                            <div>
                              <p className="text-xs font-medium text-amber-900 dark:text-amber-100">
                                2 under contract deals will recalculate
                              </p>
                              <p className="text-xs text-amber-700 dark:text-amber-300 mt-0.5">
                                This may affect pending CDA forecasts
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </section>
              </>
            )}
          </div>

          {/* Right: Assignment Summary */}
          <div className="sticky top-24 h-fit">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Assignment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Users className="size-4 text-muted-foreground" />
                    <div className="flex-1 flex justify-between text-sm">
                      <span className="text-muted-foreground">Selected Agents</span>
                      <span className="font-medium">1</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="size-4 text-muted-foreground" />
                    <div className="flex-1 flex justify-between text-sm">
                      <span className="text-muted-foreground">Commission Plan</span>
                      <span className="font-medium text-xs">80/20 Standard</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="size-4 text-muted-foreground" />
                    <div className="flex-1 flex justify-between text-sm">
                      <span className="text-muted-foreground">Default Fees</span>
                      <span className="font-medium">3</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="size-4 text-muted-foreground" />
                    <div className="flex-1 flex justify-between text-sm">
                      <span className="text-muted-foreground">Under Contract Deals</span>
                      <span className="font-medium">2</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-xs font-medium mb-3">Validation</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <AlertCircle className="size-3 text-amber-600" />
                      <span className="text-muted-foreground">
                        1 agent missing commission plan
                      </span>
                    </div>
                    {applyToUnderContract && (
                      <div className="flex items-center gap-2 text-xs">
                        <AlertCircle className="size-3 text-amber-600" />
                        <span className="text-muted-foreground">
                          Under contract deals will recalculate
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button className="w-full" size="sm">
                    Save Assignments
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <Eye className="size-4 mr-2" />
                    Preview Impact
                  </Button>
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <p className="text-xs text-blue-900 dark:text-blue-100">
                    Assignments auto-apply when new CDA is created for this agent.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bulk Assign Modal */}
      <Dialog open={bulkModalOpen} onOpenChange={setBulkModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Bulk Assign Defaults</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Select Agents</Label>
              <div className="mt-2 p-3 border rounded-lg max-h-[200px] overflow-y-auto">
                <div className="space-y-2">
                  {agents.map((agent) => (
                    <label key={agent.id} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium">
                          {agent.initials}
                        </div>
                        <span className="text-sm">{agent.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="bulk-plan">Commission Plan</Label>
              <Select defaultValue="80-20">
                <SelectTrigger id="bulk-plan" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="80-20">80/20 Standard</SelectItem>
                  <SelectItem value="70-30">70/30 Standard</SelectItem>
                  <SelectItem value="keystone">Keystone Tiered</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Default Fees</Label>
              <div className="mt-2 space-y-2">
                {["TC Fee", "RM Fee", "E&O Fee", "Compliance Review"].map((fee) => (
                  <label key={fee} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" className="rounded" defaultChecked={fee !== "Compliance Review"} />
                    {fee}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <Switch id="bulk-apply" />
              <div className="flex-1">
                <label htmlFor="bulk-apply" className="text-sm font-medium cursor-pointer">
                  Apply to under contract deals
                </label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Update active transactions for selected agents
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setBulkModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setBulkModalOpen(false)}>Confirm Assignment</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
