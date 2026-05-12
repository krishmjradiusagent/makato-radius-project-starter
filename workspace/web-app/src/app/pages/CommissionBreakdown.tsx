import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Download,
  Edit,
  ExternalLink,
  FileText,
  Info,
  Plus,
  Send,
  User,
  Users,
  AlertCircle,
  Layout,
  Settings,
  MoreHorizontal,
  Trash2,
  ArrowRight,
  Calculator,
  UserPlus,
  Percent,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { ScrollArea } from "../components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/ui/avatar";
import { cn } from "../components/ui/utils";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
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
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

import { CDAFlowSwitcher } from "../components/finance/cda-flow-switcher";
import { CDASectionHeader } from "../components/finance/cda-section-header";

// --- Types ---
type Status = "draft" | "pending_tl" | "pending_agent" | "revision" | "approved" | "finalized";
type Role = "agent" | "team_lead" | "radius";
type DeductionType = "credit" | "referral" | "pre_split" | "post_split" | "radius_fee";

interface Deduction {
  id: string;
  label: string;
  amount: number;
  type: DeductionType;
  ownerId?: string; // If agent-specific
}

interface AgentAllocation {
  id: string;
  name: string;
  avatar?: string;
  allocationPct: number; // % of the side
  planName: string;
  planSplit: number; // e.g., 0.8 for 80/20
  deductions: Deduction[];
}

interface SideAllocation {
  id: string;
  type: "listing" | "buyer";
  percentage: number; // % of total GCI
  agents: AgentAllocation[];
}

interface TransactionData {
  title: string;
  client: string;
  closeDate: string;
  purchasePrice: number;
  commissionRate: number;
  status: Status;
  globalDeductions: Deduction[];
  sides: SideAllocation[];
}

// --- Mocks ---
const INITIAL_DATA: TransactionData = {
  title: "123 Serenity Lane",
  client: "John & Sarah Miller",
  closeDate: "May 24, 2026",
  purchasePrice: 1000000,
  commissionRate: 2.5,
  status: "draft",
  globalDeductions: [
    { id: "d1", label: "Brokerage Fee", amount: 250, type: "pre_split" },
    { id: "d2", label: "Compliance Review", amount: 150, type: "pre_split" },
  ],
  sides: [
    {
      id: "s1",
      type: "buyer",
      percentage: 100,
      agents: [
        {
          id: "a1",
          name: "Ila Corcoran",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
          allocationPct: 70,
          planName: "80/20 Standard",
          planSplit: 0.8,
          deductions: [
            { id: "ad1", label: "Marketing Fee", amount: 125, type: "post_split" }
          ]
        },
        {
          id: "a2",
          name: "Michael Tran",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
          allocationPct: 30,
          planName: "70/30 Standard",
          planSplit: 0.7,
          deductions: []
        }
      ]
    },
    {
      id: "s2",
      type: "listing",
      percentage: 0,
      agents: []
    }
  ]
};

// --- Components ---

function SpreadsheetRow({ 
  label, 
  value, 
  formula, 
  variant = "default", 
  onClick,
  isSelected,
  className
}: { 
  label: string; 
  value: number | string; 
  formula?: string; 
  variant?: "default" | "header" | "total" | "subtle" | "danger";
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
}) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "group flex items-center justify-between py-2 px-4 cursor-pointer transition-colors border-l-2 border-transparent",
        isSelected ? "bg-primary/5 border-primary" : "hover:bg-muted/30",
        variant === "header" && "bg-muted/20 py-1.5",
        variant === "total" && "bg-primary/[0.02] border-t border-b border-border/50 font-semibold",
        variant === "danger" && "text-red-600",
        className
      )}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span className={cn("text-[13px] truncate", variant === "header" && "font-medium text-muted-foreground uppercase tracking-wider text-[10px]")}>
          {label}
        </span>
        {formula && (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="size-3 text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              </TooltipTrigger>
              <TooltipContent side="right">
                <code className="text-[10px] font-mono">{formula}</code>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className={cn("text-[13px] font-medium tabular-nums", variant === "subtle" && "text-muted-foreground")}>
        {typeof value === "number" ? (value < 0 ? `-$${Math.abs(value).toLocaleString()}` : `$${value.toLocaleString()}`) : value}
      </div>
    </div>
  );
}

export function CommissionBreakdown() {
  const navigate = useNavigate();
  const [data, setData] = useState<TransactionData>(INITIAL_DATA);
  const [role, setRole] = useState<Role>("radius");
  const [selectedNode, setSelectedNode] = useState<string>("root");
  const [showBackDialog, setShowBackDialog] = useState(false);

  // Dialog States
  const [isDeductionOpen, setIsDeductionOpen] = useState(false);
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [isAllocationOpen, setIsAllocationOpen] = useState(false);

  const handleBack = () => {
    setShowBackDialog(true);
  };

  const handleDiscard = () => {
    setShowBackDialog(false);
    navigate("/transaction-detail");
  };

  const handleSaveDraft = () => {
    setShowBackDialog(false);
    navigate("/transaction-detail");
  };

  // --- Calculations ---
  const gciTotal = data.purchasePrice * (data.commissionRate / 100);
  const globalDeductionTotal = data.globalDeductions.reduce((sum, d) => sum + d.amount, 0);
  const grossAfterDeductions = gciTotal - globalDeductionTotal;
  
  // Flatten agents for Net Payable calculation
  const netPayable = data.sides.reduce((sideSum, side) => {
    const sideAmount = grossAfterDeductions * (side.percentage / 100);
    return sideSum + side.agents.reduce((agentSum, agent) => {
      const agentBasis = sideAmount * (agent.allocationPct / 100);
      const afterSplit = agentBasis * agent.planSplit;
      const agentDeds = agent.deductions.reduce((s, d) => s + d.amount, 0);
      return agentSum + (afterSplit - agentDeds);
    }, 0);
  }, 0);

  const getStatusColor = (s: Status) => {
    switch (s) {
      case "draft": return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
      case "pending_tl": return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "approved": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "finalized": return "bg-primary/10 text-primary";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const getStatusLabel = (s: Status) => s.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  // --- Render Helpers ---
  const renderAgentRow = (agent: AgentAllocation, sideAmount: number) => {
    const agentBasis = sideAmount * (agent.allocationPct / 100);
    const agentNet = (agentBasis * agent.planSplit) - agent.deductions.reduce((s, d) => s + d.amount, 0);
    const isSelected = selectedNode === `agent-${agent.id}`;

    return (
      <div 
        key={agent.id}
        onClick={() => setSelectedNode(`agent-${agent.id}`)}
        className={cn(
          "group flex items-center justify-between py-2.5 px-3 cursor-pointer transition-colors border-l-2 border-transparent",
          isSelected ? "bg-primary/5 border-primary" : "hover:bg-muted/30"
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          <Avatar className="size-8">
            <AvatarImage src={agent.avatar} />
            <AvatarFallback className="text-[10px]">{agent.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-[13px] font-medium truncate">{agent.name}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] text-muted-foreground">{agent.allocationPct}% Allocation</span>
              <Badge variant="secondary" className="h-4 text-[9px] px-1 font-normal bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">{agent.planName}</Badge>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[13px] font-bold tabular-nums">${agentNet.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground">Net Payout</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-7 opacity-0 group-hover:opacity-100">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setSelectedNode(`agent-${agent.id}`)}>
                <Calculator className="size-4 mr-2" /> View Breakdown
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsDeductionOpen(true)}>
                <Plus className="size-4 mr-2" /> Add Post-Split Deduction
              </DropdownMenuItem>
              {role !== "agent" && (
                <>
                  <DropdownMenuItem onClick={() => setIsAgentOpen(true)}>
                    <Edit className="size-4 mr-2" /> Change Plan
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="size-4 mr-2" /> Remove Agent
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-background font-inter">
      {/* --- Top Header --- */}
      <header className="h-16 border-b flex items-center justify-between px-6 shrink-0 bg-background/50 backdrop-blur">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={handleBack} className="gap-1.5 text-xs shrink-0">
            <ChevronLeft className="size-4" />
            Back to transaction
          </Button>
          <Separator orientation="vertical" className="h-5" />
          <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Building2 className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-semibold">{data.title}</h1>
              <Badge variant="secondary" className={cn("h-5 text-[10px] font-medium", getStatusColor(data.status))}>
                {getStatusLabel(data.status)}
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground">{data.client} • {data.closeDate}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 border rounded-md bg-muted/20">
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Role</span>
            <Select value={role} onValueChange={(v) => setRole(v as Role)}>
              <SelectTrigger className="h-6 border-none shadow-none bg-transparent text-xs p-0 focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="agent">Agent</SelectItem>
                <SelectItem value="team_lead">Team Lead</SelectItem>
                <SelectItem value="radius">Radius Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Separator orientation="vertical" className="h-6 mx-1" />
          
          <Button variant="outline" size="sm" className="h-9 px-3 text-xs gap-2">
            <Download className="size-3.5" /> Export
          </Button>
          
          <Button size="sm" className="h-9 px-4 text-xs gap-2">
            <Send className="size-3.5" /> 
            {role === "radius" ? "Finalize CDA" : "Send for Approval"}
          </Button>
        </div>
      </header>

      {/* --- Financial Strip --- */}
      <div className="h-12 border-b bg-muted/5 flex items-center px-6 gap-8 shrink-0 overflow-x-auto">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-[11px] text-muted-foreground">Total GCI</span>
          <span className="text-[13px] font-bold tabular-nums">${gciTotal.toLocaleString()}</span>
        </div>
        <Separator orientation="vertical" className="h-4" />
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-[11px] text-muted-foreground">Gross After Deductions</span>
          <span className="text-[13px] font-bold tabular-nums">${grossAfterDeductions.toLocaleString()}</span>
        </div>
        <Separator orientation="vertical" className="h-4" />
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-[11px] text-muted-foreground">Net Payable to Agents</span>
          <span className="text-[13px] font-bold tabular-nums text-emerald-600">${netPayable.toLocaleString()}</span>
        </div>
      </div>      <div className="flex-1 flex flex-col md:flex-row overflow-hidden gap-6">
        {/* --- Left Panel: Allocation Workspace (72%) --- */}
        <div className="flex-[0.72] overflow-y-auto border-r bg-muted/[0.02] pr-6">
          <div className="w-full py-6 px-6 md:px-10 space-y-6">
            
            {/* Section 1: GCI */}
            <div className="border rounded-lg bg-background overflow-hidden shadow-sm border-border/60">
              <CDASectionHeader title="01. Gross Commission Income" className="bg-muted/30" />
              <div className="divide-y divide-border/50">
                <SpreadsheetRow 
                  label="Purchase Price" 
                  value={data.purchasePrice} 
                  isSelected={selectedNode === "root"}
                  onClick={() => setSelectedNode("root")}
                />
                <SpreadsheetRow 
                  label={`Commission Rate (${data.commissionRate}%)`} 
                  value={`${data.commissionRate}%`}
                  formula="price * (rate / 100)"
                  isSelected={selectedNode === "root"}
                  onClick={() => setSelectedNode("root")}
                />
                <SpreadsheetRow 
                  label="Gross Commission Total" 
                  value={gciTotal} 
                  variant="total"
                  isSelected={selectedNode === "root"}
                  onClick={() => setSelectedNode("root")}
                />
              </div>
            </div>

            {/* Section 2: Pre-Split Deductions */}
            <div className="border rounded-lg bg-background overflow-hidden shadow-sm border-border/60">
              <div className="flex items-center justify-between bg-muted/30 pr-3">
                <CDASectionHeader title="02. Pre-Split Deductions" className="bg-transparent" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-7 text-[10px] gap-1.5 px-2">
                      <Plus className="size-3" /> Add
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => setIsDeductionOpen(true)}>Add Credit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsDeductionOpen(true)}>Add Referral Fee</DropdownMenuItem>
                    {role !== "agent" && (
                      <DropdownMenuItem onClick={() => setIsDeductionOpen(true)}>Add Pre-Split Deduction</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="divide-y divide-border/50">
                {data.globalDeductions.map(d => (
                  <SpreadsheetRow 
                    key={d.id}
                    label={d.label}
                    value={-d.amount}
                    variant="danger"
                    isSelected={selectedNode === `deduction-${d.id}`}
                    onClick={() => setSelectedNode(`deduction-${d.id}`)}
                  />
                ))}
                <SpreadsheetRow 
                  label="Gross After Deductions" 
                  value={grossAfterDeductions} 
                  variant="total"
                  formula="GCI - SUM(Pre-split)"
                />
              </div>
            </div>

            {/* Section 3: Allocation Sides */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">03. Allocation Sides</h3>
                {role !== "agent" && (
                  <Button variant="ghost" size="sm" className="h-7 text-[10px] gap-1.5" onClick={() => setIsAllocationOpen(true)}>
                    <Percent className="size-3" /> Change Allocation
                  </Button>
                )}
              </div>
              
              <div className="space-y-6">
                {data.sides.map(side => {
                  const sideAmount = grossAfterDeductions * (side.percentage / 100);
                  if (side.percentage === 0 && side.agents.length === 0 && role === "agent") return null;

                  return (
                    <div key={side.id} className="border rounded-lg bg-background overflow-hidden shadow-sm border-border/60">
                      <div 
                        className="flex items-center justify-between p-4 bg-muted/10 cursor-pointer hover:bg-muted/20 transition-colors"
                        onClick={() => setSelectedNode(`side-${side.id}`)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "size-8 rounded-md flex items-center justify-center",
                            side.type === "buyer" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                          )}>
                            <Users className="size-4" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold capitalize">{side.type} Side ({side.percentage}%)</p>
                            <p className="text-[10px] text-muted-foreground tabular-nums">${sideAmount.toLocaleString()} Distributable</p>
                          </div>
                        </div>
                        {role !== "agent" && (
                          <Button variant="outline" size="sm" className="h-7 text-[10px] px-2.5" onClick={() => setIsAgentOpen(true)}>
                            <UserPlus className="size-3 mr-1.5" /> Add Agent
                          </Button>
                        )}
                      </div>
                      
                      <div className="divide-y divide-border/40">
                        {side.agents.map(agent => renderAgentRow(agent, sideAmount))}
                        {side.agents.length === 0 && (
                          <div className="p-8 text-center bg-muted/[0.01]">
                            <p className="text-[11px] text-muted-foreground italic">No agents assigned to this side</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Allocation Bar */}
            <div className="space-y-3 pt-4">
              <div className="flex h-2.5 w-full rounded-full overflow-hidden bg-muted">
                {data.sides.flatMap(s => s.agents).map((a, i) => (
                  <div 
                    key={a.id} 
                    className={cn(
                      "h-full transition-all",
                      i % 2 === 0 ? "bg-indigo-500" : "bg-emerald-500"
                    )} 
                    style={{ width: `${(a.allocationPct / 100) * (data.sides.find(s => s.agents.includes(a))?.percentage || 0)}%` }} 
                  />
                ))}
              </div>
              <div className="flex items-center justify-center flex-wrap gap-x-6 gap-y-2">
                {data.sides.flatMap(s => s.agents).map((a, i) => (
                  <div key={a.id} className="flex items-center gap-2">
                    <div className={cn("size-2 rounded-full", i % 2 === 0 ? "bg-indigo-500" : "bg-emerald-500")} />
                    <span className="text-[10px] text-muted-foreground font-medium">{a.name} ({a.allocationPct}%)</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* --- Right Panel: Contextual Inspector (28%) --- */}
        <aside className="flex-[0.28] min-w-[400px] border-l bg-background flex flex-col shrink-0 sticky top-0 md:h-full max-h-[50vh] md:max-h-full border-t md:border-t-0 overflow-hidden">
          <ScrollArea className="flex-1">
            <div className="p-6 space-y-6">
              
              {/* Workflow Actions */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="h-20 flex-col gap-2 border-border/60 hover:bg-muted/30">
                    <FileText className="size-5 text-muted-foreground" />
                    <span className="text-[11px]">Audit Logs</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 border-border/60 hover:bg-muted/30">
                    <Edit className="size-5 text-muted-foreground" />
                    <span className="text-[11px]">Notes (3)</span>
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Dynamic Content */}
              {selectedNode === "root" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold">Transaction Details</h3>
                    <p className="text-xs text-muted-foreground mt-1">Full breakdown of the contract level commission.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">Purchase Price</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                        <Input disabled={role === "agent"} value={data.purchasePrice.toLocaleString()} className="pl-9 h-9" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">Commission Rate (%)</Label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                        <Input disabled={role === "agent"} value={data.commissionRate} className="pl-9 h-9" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button 
                      className="w-full h-10 text-xs justify-start" 
                      variant="outline"
                      onClick={() => setIsDeductionOpen(true)}
                    >
                      <Plus className="size-3.5 mr-2" /> Add Credit
                    </Button>
                    <Button 
                      className="w-full h-10 text-xs justify-start" 
                      variant="outline"
                      onClick={() => setIsDeductionOpen(true)}
                    >
                      <Plus className="size-3.5 mr-2" /> Add Referral Fee
                    </Button>
                    {role !== "agent" && (
                      <Button 
                        className="w-full h-10 text-xs justify-start" 
                        variant="outline"
                        onClick={() => setIsDeductionOpen(true)}
                      >
                        <Plus className="size-3.5 mr-2" /> Add Pre-Split Deduction
                      </Button>
                    )}
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="calc" className="border-none">
                      <AccordionTrigger className="hover:no-underline py-2 text-xs font-medium bg-muted/20 px-3 rounded-md">
                        View Calculation Path
                      </AccordionTrigger>
                      <AccordionContent className="pt-4 px-3 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Sales Price</span>
                          <span>$1,000,000.00</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Rate (2.5%)</span>
                          <span className="text-muted-foreground">× 0.025</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-xs font-bold pt-1">
                          <span>GCI Result</span>
                          <span className="text-primary">$25,000.00</span>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}

              {selectedNode.startsWith("side-") && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
                  {(() => {
                    const sideId = selectedNode.split("-")[1];
                    const side = data.sides.find(s => s.id === sideId);
                    if (!side) return null;
                    const sideAmount = grossAfterDeductions * (side.percentage / 100);
                    const agentCommissions = side.agents.reduce((sum, a) => {
                      const basis = sideAmount * (a.allocationPct / 100);
                      return sum + (basis * a.planSplit);
                    }, 0);
                    const companyDollar = sideAmount - agentCommissions;

                    return (
                      <>
                        <div>
                          <h3 className="text-sm font-semibold capitalize">{side.type} Side Allocation</h3>
                          <p className="text-xs text-muted-foreground mt-1">Managing {side.percentage}% of the gross commission.</p>
                        </div>

                        <div className="border rounded-lg overflow-hidden divide-y divide-border/50 bg-muted/5">
                          <SpreadsheetRow label="Side Gross" value={sideAmount} variant="header" />
                          <SpreadsheetRow label="Agent Commissions" value={-agentCommissions} variant="danger" />
                          <SpreadsheetRow label="Company Dollar" value={companyDollar} variant="total" />
                        </div>

                        <div className="space-y-2">
                          <Button className="w-full h-10 text-xs justify-start" variant="outline" disabled={role === "agent"} onClick={() => setIsAgentOpen(true)}>
                            <UserPlus className="size-3.5 mr-2" /> Add Agent
                          </Button>
                          <Button className="w-full h-10 text-xs justify-start" variant="outline" disabled={role === "agent"} onClick={() => setIsAllocationOpen(true)}>
                            <Percent className="size-3.5 mr-2" /> Change Allocation
                          </Button>
                          <Button className="w-full h-10 text-xs justify-start" variant="outline" onClick={() => setIsDeductionOpen(true)}>
                            <Plus className="size-3.5 mr-2" /> Add Side Deduction
                          </Button>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}

              {selectedNode.startsWith("agent-") && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
                  {(() => {
                    const agentId = selectedNode.split("-")[1];
                    const agent = data.sides.flatMap(s => s.agents).find(a => a.id === agentId);
                    if (!agent) return null;
                    
                    const side = data.sides.find(s => s.agents.some(a => a.id === agentId));
                    const sideAmount = grossAfterDeductions * ((side?.percentage || 0) / 100);
                    const agentBasis = sideAmount * (agent.allocationPct / 100);
                    const afterSplit = agentBasis * agent.planSplit;
                    const dedTotal = agent.deductions.reduce((s, d) => s + d.amount, 0);
                    const net = afterSplit - dedTotal;

                    return (
                      <>
                        <div className="flex items-center gap-4">
                          <Avatar className="size-12 border-2 border-primary/10">
                            <AvatarImage src={agent.avatar} />
                            <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-sm font-semibold">{agent.name}</h3>
                            <p className="text-xs text-muted-foreground">{agent.planName}</p>
                          </div>
                        </div>

                        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl text-center">
                          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-widest mb-1">Estimated Net Payout</p>
                          <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 tabular-nums">${net.toLocaleString()}</p>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Worksheet</h4>
                          <div className="divide-y divide-border/50 border rounded-lg bg-muted/5">
                            <div className="flex justify-between p-3 text-[13px]">
                              <span className="text-muted-foreground">Allocation Basis</span>
                              <span className="font-medium">${agentBasis.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between p-3 text-[13px]">
                              <span className="text-muted-foreground">Split ({agent.planSplit * 100}%)</span>
                              <span className="font-medium">-${(agentBasis * (1 - agent.planSplit)).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between p-3 text-[13px]">
                              <span className="text-muted-foreground">Deductions</span>
                              <span className="font-medium text-red-600">-${dedTotal.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Button 
                            className="w-full h-10 text-xs" 
                            disabled={role === "agent"}
                            variant="secondary"
                          >
                            Apply Plan
                          </Button>
                          <Button 
                            className="w-full h-10 text-xs" 
                            variant="outline"
                            onClick={() => setIsDeductionOpen(true)}
                          >
                            Add Agent Pre-Split Deduction
                          </Button>
                          <Button 
                            className="w-full h-10 text-xs" 
                            variant="outline"
                            onClick={() => setIsDeductionOpen(true)}
                          >
                            Add Post-Split Deduction
                          </Button>
                          <Button variant="ghost" className="w-full h-9 text-xs text-red-600">
                            Request Correction
                          </Button>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}

              {selectedNode.startsWith("deduction-") && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
                  {(() => {
                    const dedId = selectedNode.split("-")[1];
                    const ded = data.globalDeductions.find(d => d.id === dedId);
                    if (!ded) return null;

                    return (
                      <>
                        <div>
                          <h3 className="text-sm font-semibold">{ded.label}</h3>
                          <p className="text-xs text-muted-foreground mt-1">Pre-split transaction level deduction.</p>
                        </div>

                        <div className="border rounded-lg p-4 bg-muted/10 space-y-4">
                          <div className="space-y-1">
                            <p className="text-[10px] text-muted-foreground uppercase font-semibold">Amount</p>
                            <p className="text-xl font-bold tabular-nums">${ded.amount.toLocaleString()}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <p className="text-[10px] text-muted-foreground uppercase font-semibold">Type</p>
                              <Badge variant="secondary" className="h-5 text-[10px]">{ded.type.replace('_', ' ')}</Badge>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] text-muted-foreground uppercase font-semibold">Editable By</p>
                              <p className="text-xs font-medium">TL, Radius</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Button className="w-full h-10 text-xs" variant="outline" disabled={role === "agent"}>
                            Edit Deduction
                          </Button>
                          <Button className="w-full h-10 text-xs text-red-600" variant="ghost" disabled={role === "agent"}>
                            Delete Deduction
                          </Button>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}

              {(selectedNode === "root" || selectedNode.startsWith("agent-") || selectedNode.startsWith("deduction-")) ? null : (
                 <div className="flex flex-col items-center justify-center h-48 text-center text-muted-foreground p-6">
                    <Info className="size-8 mb-2 opacity-20" />
                    <p className="text-xs italic">Select a financial item to view detailed calculations and audit trail.</p>
                 </div>
              )}

            </div>
          </ScrollArea>
          
          <div className="p-4 border-t bg-muted/10 shrink-0">
             <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg flex gap-3">
                <AlertCircle className="size-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-800 dark:text-amber-200 leading-relaxed">
                  {role === "agent" ? "Review your breakdown carefully. If you see discrepancies, click 'Request Correction'." : "Finalizing this CDA will lock all calculations and generate a disbursement authorization PDF."}
                </p>
             </div>
          </div>
        </aside>
      </div>

      {/* --- Footer Action Bar --- */}
      <footer className="h-16 border-t flex items-center justify-between px-6 bg-background shrink-0 z-10">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[11px] text-muted-foreground italic font-medium">Unsaved changes detected...</span>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="h-9 px-4 text-xs">Discard Changes</Button>
          <Button variant="outline" size="sm" className="h-9 px-4 text-xs">Save Draft</Button>
          <Button size="sm" className="h-9 px-6 text-xs bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all active:scale-[0.98]">
            {role === "radius" ? "Confirm Breakdown" : "Submit for Review"}
          </Button>
        </div>
      </footer>

      {/* --- Dialogs --- */}
      
      {/* Add Deduction Dialog */}
      <Dialog open={isDeductionOpen} onOpenChange={setIsDeductionOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Deduction</DialogTitle>
            <DialogDescription>Add a new credit or fee to the commission breakdown.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" placeholder="Referral Fee" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">Amount</Label>
              <div className="col-span-3 relative">
                <DollarSign className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <Input id="amount" placeholder="0.00" className="pl-9" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">Type</Label>
              <Select defaultValue="pre">
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pre">Pre-Split</SelectItem>
                  <SelectItem value="post">Post-Split</SelectItem>
                  <SelectItem value="credit">Credit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeductionOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsDeductionOpen(false)}>Add Deduction</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Agent Dialog */}
      <Dialog open={isAgentOpen} onOpenChange={setIsAgentOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Agent Allocation</DialogTitle>
            <DialogDescription>Assign an agent to a side and set their allocation percentage.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="agent" className="text-right">Search</Label>
              <Input id="agent" placeholder="Search by name or email..." className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="alloc" className="text-right">Allocation</Label>
              <div className="col-span-3 relative">
                <Percent className="absolute right-3 top-2.5 size-4 text-muted-foreground" />
                <Input id="alloc" placeholder="0" className="pr-9" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="plan" className="text-right">Plan</Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="s80">80/20 Standard</SelectItem>
                  <SelectItem value="s70">70/30 Standard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAgentOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAgentOpen(false)}>Assign Agent</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CDAFlowSwitcher />

      {/* --- Back Navigation Dialog --- */}
      <AlertDialog open={showBackDialog} onOpenChange={setShowBackDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard unsaved changes?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved commission changes. Save draft or discard changes before leaving.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant="outline" size="sm" onClick={handleSaveDraft}>Save draft</Button>
            <AlertDialogAction onClick={handleDiscard}>Discard changes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
