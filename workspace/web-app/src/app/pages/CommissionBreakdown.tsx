import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import {
  Building2,
  CheckCircle2,
  ChevronLeft,
  Circle,
  Clock,
  DollarSign,
  Download,
  Edit,
  FileText,
  Info,
  MessageSquare,
  Plus,
  Send,
  Users,
  MoreHorizontal,
  Trash2,
  Calculator,
  UserPlus,
  Percent,
  RotateCcw,
  Lock,
  CheckCheck,
  Printer,
  RefreshCw,
  Flag,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  BarChart3,
  ShieldCheck,
  User2,
} from "lucide-react";
import { CDAFlowSwitcher } from "../components/finance/cda-flow-switcher";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
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
  SelectValue,
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../components/ui/sheet";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/collapsible";
import { Textarea } from "../components/ui/textarea";
import { CDASectionHeader } from "../components/finance/cda-section-header";

// ─── Types ────────────────────────────────────────────────────────────────────

type Status =
  | "draft"
  | "pending_tl"
  | "revision_requested"
  | "pending_agent_confirmation"
  | "finalized";
type Role = "agent" | "team_lead" | "radius";
type DeductionType = "credit" | "referral" | "pre_split" | "agent_pre_split" | "post_split" | "radius_fee";

interface Deduction {
  id: string;
  label: string;
  amount: number;
  type: DeductionType;
  ownerId?: string;
}

interface AgentAllocation {
  id: string;
  name: string;
  avatar?: string;
  allocationPct: number;
  planName: string;
  planSplit: number;
  deductions: Deduction[];
}

interface SideAllocation {
  id: string;
  type: "listing" | "buyer";
  percentage: number;
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

interface AuditEvent {
  id: string;
  actor: string;
  actorRole: string;
  initials: string;
  event: string;
  description?: string;
  time: string;
  type: "action" | "approval" | "rejection" | "system";
}

interface Note {
  id: string;
  author: string;
  authorRole: string;
  initials: string;
  text: string;
  time: string;
  type: "general" | "change_request" | "approval" | "correction";
  resolved?: boolean;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

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
    { id: "d3", label: "Radius Platform Fee", amount: 500, type: "radius_fee" },
  ],
  sides: [
    {
      id: "s1",
      type: "buyer",
      percentage: 50,
      agents: [
        {
          id: "a1",
          name: "Ila Corcoran",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
          allocationPct: 70,
          planName: "80/20 Standard",
          planSplit: 0.8,
          deductions: [
            { id: "ad0", label: "Referral Fee", amount: 60, type: "referral" },
            { id: "ad1", label: "Marketing Fee", amount: 125, type: "post_split" },
          ],
        },
        {
          id: "a2",
          name: "Michael Tran",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
          allocationPct: 30,
          planName: "70/30 Standard",
          planSplit: 0.7,
          deductions: [],
        },
      ],
    },
    {
      id: "s2",
      type: "listing",
      percentage: 50,
      agents: [
        {
          id: "a3",
          name: "Sarah Chen",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
          allocationPct: 100,
          planName: "75/25 Standard",
          planSplit: 0.75,
          deductions: [],
        },
      ],
    },
  ],
};

const INITIAL_AUDIT: AuditEvent[] = [
  {
    id: "e1",
    actor: "Ila Corcoran",
    actorRole: "Agent",
    initials: "IC",
    event: "CDA created",
    description: "Agent submitted initial commission breakdown",
    time: "Today, 9:15 AM",
    type: "action",
  },
  {
    id: "e2",
    actor: "Rod Watson",
    actorRole: "Team Lead",
    initials: "RW",
    event: "TL review started",
    description: "Team lead opened breakdown for review",
    time: "Today, 10:22 AM",
    type: "action",
  },
];

const INITIAL_NOTES: Note[] = [
  {
    id: "n1",
    author: "Rod Watson",
    authorRole: "Team Lead",
    initials: "RW",
    text: "Marketing fee looks correct. Please double-check the commission rate aligns with the contract addendum.",
    time: "Today, 10:30 AM",
    type: "general",
  },
  {
    id: "n2",
    author: "Ila Corcoran",
    authorRole: "Agent",
    initials: "IC",
    text: "Confirmed — rate is 2.5% per signed addendum dated April 3rd.",
    time: "Today, 11:05 AM",
    type: "general",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

interface AgentCalcs {
  agentBasis: number; // Gross after shared deductions * allocation %
  agentPreSplitDeds: Deduction[]; // [TL/Admin ONLY] Internal adjustments
  agentPreSplitTotal: number;
  splitBasis: number; // agentBasis - agentPreSplitTotal
  postSplitCommission: number; // splitBasis * planSplit
  postSplitDeds: Deduction[]; // [AGENT EDITABLE] TC, Admin, etc.
  postSplitTotal: number;
  netAgentCommission: number;
  companyDollar: number;
}

function calcAgentFinancials(agent: AgentAllocation, sideAmount: number): AgentCalcs {
  const agentBasis = sideAmount * (agent.allocationPct / 100);
  const deductions = agent.deductions || [];
  
  // 1. Agent Pre-split (Internal)
  const agentPreSplitDeds = deductions.filter(d => d.type === "agent_pre_split");
  const agentPreSplitTotal = agentPreSplitDeds.reduce((s, d) => s + d.amount, 0);
  const splitBasis = Math.max(0, agentBasis - agentPreSplitTotal);
  
  // 2. Post-split commission calculation
  const postSplitCommission = splitBasis * agent.planSplit;
  
  // 3. Post-split deductions (Agent editable)
  const postSplitDeds = deductions.filter(
    (d) => d.type === "post_split" || d.type === "radius_fee"
  );
  const postSplitTotal = postSplitDeds.reduce((s, d) => s + d.amount, 0);
  
  const netAgentCommission = Math.max(0, postSplitCommission - postSplitTotal);
  const companyDollar = splitBasis - postSplitCommission;

  return {
    agentBasis,
    agentPreSplitDeds,
    agentPreSplitTotal,
    splitBasis,
    postSplitCommission,
    postSplitDeds,
    postSplitTotal,
    netAgentCommission,
    companyDollar,
  };
}

// Compact financial row for accordion / summary tables
function FinRow({
  label,
  value,
  indent = false,
  variant = "default",
  tooltip,
}: {
  label: string;
  value?: number;
  indent?: boolean;
  variant?: "default" | "subtotal" | "muted" | "total";
  tooltip?: string;
}) {
  const isNeg = value !== undefined && value < 0;
  const row = (
    <div
      className={cn(
        "flex items-center justify-between py-1.5",
        indent ? "pl-8 pr-4" : "px-4",
        variant === "subtotal" && "bg-muted/30",
        variant === "total" && "bg-muted/50"
      )}
    >
      <span
        className={cn(
          "text-[12px]",
          (variant === "subtotal" || variant === "total") && "font-semibold",
          variant === "muted" && "text-muted-foreground"
        )}
      >
        {label}
        {tooltip && (
          <Info className="inline size-3 ml-1 text-muted-foreground/40 align-[-1px]" />
        )}
      </span>
      {value !== undefined && (
        <span
          className={cn(
            "text-[12px] tabular-nums font-medium",
            (variant === "subtotal" || variant === "total") && "font-semibold",
            isNeg && "text-destructive/80"
          )}
        >
          {isNeg
            ? `-$${Math.abs(value).toLocaleString()}`
            : `$${value.toLocaleString()}`}
        </span>
      )}
    </div>
  );

  if (tooltip) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>{row}</TooltipTrigger>
          <TooltipContent side="left">
            <p className="text-[11px]">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  return row;
}

function SpreadsheetRow({
  label,
  value,
  formula,
  variant = "default",
  onClick,
  isSelected,
  className,
  changed,
}: {
  label: string;
  value: number | string;
  formula?: string;
  variant?: "default" | "header" | "total" | "subtle" | "danger";
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
  changed?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group flex items-center justify-between py-2 px-4 cursor-pointer transition-colors border-l-2 border-transparent",
        isSelected ? "bg-[#5A5FF2]/5 border-[#5A5FF2]" : "hover:bg-muted/30",
        variant === "header" && "bg-muted/20 py-1.5",
        variant === "total" &&
          "bg-[#5A5FF2]/[0.02] border-t border-b border-border/50 font-semibold",
        variant === "danger" && "text-destructive/80",
        changed && "bg-accent/40 border-l-2 border-[#5A5FF2]",
        className
      )}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span
          className={cn(
            "text-[13px] truncate",
            variant === "header" &&
              "font-medium text-muted-foreground uppercase tracking-wider text-[10px]"
          )}
        >
          {label}
        </span>
        {changed && (
          <Badge
            variant="secondary"
            className="h-3.5 text-[9px] px-1 bg-[#5A5FF2]/10 text-[#5A5FF2] font-medium"
          >
            updated
          </Badge>
        )}
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
      <div
        className={cn(
          "text-[13px] font-medium tabular-nums",
          variant === "subtle" && "text-muted-foreground"
        )}
      >
        {typeof value === "number"
          ? value < 0
            ? `-$${Math.abs(value).toLocaleString()}`
            : `$${value.toLocaleString()}`
          : value}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const configs: Record<Status, { label: string; className: string; icon: React.ReactNode }> = {
    draft: {
      label: "Draft",
      className: "bg-slate-100 text-slate-700",
      icon: <Edit className="size-3" />,
    },
    pending_tl: {
      label: "Pending TL Review",
      className: "bg-amber-100 text-amber-700",
      icon: <Clock className="size-3" />,
    },
    revision_requested: {
      label: "Revision Requested",
      className: "bg-orange-100 text-orange-700",
      icon: <Flag className="size-3" />,
    },
    pending_agent_confirmation: {
      label: "Pending Agent Confirmation",
      className: "bg-blue-100 text-blue-700",
      icon: <CheckCheck className="size-3" />,
    },
    finalized: {
      label: "Finalized",
      className: "bg-emerald-100 text-emerald-700",
      icon: <Lock className="size-3" />,
    },
  };
  const c = configs[status];
  return (
    <Badge
      variant="secondary"
      className={cn("h-5 text-[10px] font-medium gap-1 px-2", c.className)}
    >
      {c.icon}
      {c.label}
    </Badge>
  );
}

function NoteTypeBadge({ type }: { type: Note["type"] }) {
  if (type === "general") return null;
  const map: Record<string, string> = {
    change_request: "bg-orange-50 text-orange-700 border-orange-200",
    approval: "bg-emerald-50 text-emerald-700 border-emerald-200",
    correction: "bg-red-50 text-red-700 border-red-200",
  };
  const label: Record<string, string> = {
    change_request: "Change Request",
    approval: "Approval Note",
    correction: "Correction",
  };
  return (
    <span
      className={cn(
        "inline-flex text-[9px] font-semibold uppercase tracking-wider border rounded px-1.5 py-0.5",
        map[type]
      )}
    >
      {label[type]}
    </span>
  );
}

function AuditTimeline({ events }: { events: AuditEvent[] }) {
  const typeBadge: Record<AuditEvent["type"], React.ReactNode | null> = {
    action: null,
    approval: (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-700">
        <CheckCircle2 className="size-2.5" /> Approved
      </span>
    ),
    rejection: (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-orange-100 text-orange-700">
        <Flag className="size-2.5" /> Changes requested
      </span>
    ),
    system: (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-600">
        <Info className="size-2.5" /> System
      </span>
    ),
  };

  return (
    <div className="space-y-0 -mx-2">
      <div className="px-2 pb-1.5">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
          Today
        </p>
      </div>
      {events.map((event) => (
        <div
          key={event.id}
          className="flex items-start gap-2.5 px-2 py-2 rounded-md hover:bg-muted/40 transition-colors"
        >
          <div className="size-6 rounded-full bg-muted flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5 border border-border/50">
            {event.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <p className="text-[11px] leading-snug flex-1">
                <span className="font-semibold">{event.actor}</span>
                <span className="text-muted-foreground"> · </span>
                <span className="text-muted-foreground">{event.actorRole}</span>
                <span className="text-muted-foreground"> · </span>
                <span>{event.event}</span>
                {typeBadge[event.type] && (
                  <span className="ml-1.5 inline-flex">{typeBadge[event.type]}</span>
                )}
              </p>
              <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0">
                {event.time}
              </span>
            </div>
            {event.description && (
              <p className="text-[10px] text-muted-foreground mt-1 leading-snug bg-muted/50 rounded px-2 py-1">
                {event.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function CommissionBreakdown() {
  const navigate = useNavigate();
  const [data, setData] = useState<TransactionData>(INITIAL_DATA);
  const [status, setStatus] = useState<Status>("draft");
  const [role, setRole] = useState<Role>("radius");
  const [selectedNode, setSelectedNode] = useState<string>("root");
  const [showBackDialog, setShowBackDialog] = useState(false);
  const [showAuditLog, setShowAuditLog] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>(INITIAL_AUDIT);
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
  const [newNoteText, setNewNoteText] = useState("");
  const [changeRequestText, setChangeRequestText] = useState("");
  const [showChangeRequestDialog, setShowChangeRequestDialog] = useState(false);
  const [isDeductionOpen, setIsDeductionOpen] = useState(false);
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [isAllocationOpen, setIsAllocationOpen] = useState(false);

  const isLocked = status === "finalized";
  const isEditable =
    !isLocked &&
    ((status === "draft" && role === "agent") ||
      (status === "revision_requested" && role === "agent") ||
      (status === "pending_tl" && (role === "team_lead" || role === "radius")) ||
      role === "radius");

  // ─── Calculations ────────────────────────────────────────────────────────────
  const gciTotal = data.purchasePrice * (data.commissionRate / 100);

  // Shared deductions: Brokerage, Compliance, Credits, Referral (Global pre-split)
  const sharedDeductions = data.globalDeductions.filter((d) => 
    d.type === "pre_split" || d.type === "referral" || d.type === "credit"
  );
  const radiusDeductions = data.globalDeductions.filter((d) => d.type === "radius_fee");
  
  const sharedDeductionTotal = sharedDeductions.reduce((s, d) => s + d.amount, 0);
  const radiusDeductionTotal = radiusDeductions.reduce((s, d) => s + d.amount, 0);

  // Basis for side allocation calculation
  const grossAfterShared = gciTotal - sharedDeductionTotal;
  const grossAfterDeductions = grossAfterShared; // Alias for backward compatibility if used elsewhere

  // Flat list of all agents with their side context and calcs
  const allAgentCalcs = data.sides.flatMap((side) => {
    const sideAmount = grossAfterDeductions * (side.percentage / 100);
    return side.agents.map((agent) => ({
      agent,
      side,
      sideAmount,
      calcs: calcAgentFinancials(agent, sideAmount),
    }));
  });

  const netPayable = allAgentCalcs.reduce((s, { calcs }) => s + calcs.netAgentCommission, 0);
  const totalCompanyDollar = allAgentCalcs.reduce((s, { calcs }) => s + calcs.companyDollar, 0);
  const companyNet = totalCompanyDollar - radiusDeductionTotal;

  // ─── Workflow Actions ─────────────────────────────────────────────────────────

  const addAuditEvent = (event: Omit<AuditEvent, "id">) => {
    setAuditEvents((prev) => [...prev, { ...event, id: `e${Date.now()}` }]);
  };

  const handleSendForTLReview = () => {
    setStatus("pending_tl");
    addAuditEvent({
      actor: "Ila Corcoran",
      actorRole: "Agent",
      initials: "IC",
      event: "Sent for TL review",
      description: "Agent submitted breakdown for Team Lead review",
      time: "Just now",
      type: "action",
    });
  };

  const handleResubmit = () => {
    setStatus("pending_tl");
    addAuditEvent({
      actor: "Ila Corcoran",
      actorRole: "Agent",
      initials: "IC",
      event: "Resubmitted after revision",
      description: "Agent addressed change requests and resubmitted",
      time: "Just now",
      type: "action",
    });
  };

  const handleTLApprove = () => {
    setStatus("pending_agent_confirmation");
    addAuditEvent({
      actor: "Rod Watson",
      actorRole: "Team Lead",
      initials: "RW",
      event: "TL approved breakdown",
      description: "Team Lead approved — sent to agent for final confirmation",
      time: "Just now",
      type: "approval",
    });
  };

  const handleTLRequestChanges = () => {
    if (!changeRequestText.trim()) return;
    setStatus("revision_requested");
    setNotes((prev) => [
      ...prev,
      {
        id: `n${Date.now()}`,
        author: "Rod Watson",
        authorRole: "Team Lead",
        initials: "RW",
        text: changeRequestText,
        time: "Just now",
        type: "change_request",
      },
    ]);
    addAuditEvent({
      actor: "Rod Watson",
      actorRole: "Team Lead",
      initials: "RW",
      event: "Changes requested",
      description: changeRequestText,
      time: "Just now",
      type: "rejection",
    });
    setChangeRequestText("");
    setShowChangeRequestDialog(false);
  };

  const handleAgentConfirm = () => {
    setStatus("finalized");
    addAuditEvent({
      actor: "Ila Corcoran",
      actorRole: "Agent",
      initials: "IC",
      event: "Agent confirmed breakdown",
      description: "Agent confirmed net commission — CDA finalized",
      time: "Just now",
      type: "approval",
    });
    addAuditEvent({
      actor: "System",
      actorRole: "System",
      initials: "SY",
      event: "CDA PDF generated",
      description: "Commission Disbursement Authorization document created",
      time: "Just now",
      type: "system",
    });
  };

  const handleAgentRequestCorrection = () => {
    setStatus("pending_tl");
    addAuditEvent({
      actor: "Ila Corcoran",
      actorRole: "Agent",
      initials: "IC",
      event: "Agent requested correction",
      description: "Agent flagged issue — returned to TL for review",
      time: "Just now",
      type: "rejection",
    });
  };

  const handleReopenCDA = () => {
    setStatus("draft");
    addAuditEvent({
      actor: "Admin",
      actorRole: "Radius",
      initials: "RA",
      event: "CDA reopened",
      description: "Radius admin reopened finalized CDA for revision",
      time: "Just now",
      type: "action",
    });
  };

  const handleAddNote = () => {
    if (!newNoteText.trim()) return;
    const roleLabels: Record<Role, string> = {
      agent: "Agent",
      team_lead: "Team Lead",
      radius: "Radius Admin",
    };
    setNotes((prev) => [
      ...prev,
      {
        id: `n${Date.now()}`,
        author:
          role === "agent" ? "Ila Corcoran" : role === "team_lead" ? "Rod Watson" : "Admin",
        authorRole: roleLabels[role],
        initials: role === "agent" ? "IC" : role === "team_lead" ? "RW" : "RA",
        text: newNoteText,
        time: "Just now",
        type: "general",
      },
    ]);
    setNewNoteText("");
  };

  const handleAddAgent = (sideType: "buyer" | "listing") => {
    const isBuyer = sideType === "buyer";
    const newId = `new_agent_${Date.now()}`;
    const agentName = isBuyer ? "David Lee" : "Mike Ross";
    
    setData(prev => {
      const newSides = prev.sides.map(side => {
        if (side.type === sideType) {
          const newAgent: AgentAllocation = isBuyer ? {
            id: newId,
            name: agentName,
            allocationPct: 10,
            planName: "80/20 Standard",
            planSplit: 0.8,
            deductions: [],
          } : {
            id: newId,
            name: agentName,
            allocationPct: 50,
            planName: "75/25 Standard",
            planSplit: 0.75,
            deductions: [],
          };
          
          return {
            ...side,
            agents: [...side.agents, newAgent]
          };
        }
        return side;
      });
      return { ...prev, sides: newSides };
    });
  };

  // ─── Workflow Banner ──────────────────────────────────────────────────────────

  const renderWorkflowBanner = () => {
    if (status === "draft") return null;
    const configs: Partial<
      Record<Status, { bg: string; icon: React.ReactNode; title: string; desc: string }>
    > = {
      pending_tl: {
        bg: "bg-amber-50 border-amber-200",
        icon: <Clock className="size-4 text-amber-600 shrink-0" />,
        title: "Awaiting Team Lead Review",
        desc: "No edits allowed while under TL review.",
      },
      revision_requested: {
        bg: "bg-orange-50 border-orange-200",
        icon: <Flag className="size-4 text-orange-600 shrink-0" />,
        title: "Changes Requested by Team Lead",
        desc: "Review TL notes, make corrections, then resubmit.",
      },
      pending_agent_confirmation: {
        bg: "bg-blue-50 border-blue-200",
        icon: <CheckCheck className="size-4 text-blue-600 shrink-0" />,
        title: "TL Approved — Awaiting Your Confirmation",
        desc: "Review your net payout carefully before confirming.",
      },
      finalized: {
        bg: "bg-emerald-50 border-emerald-200",
        icon: <Lock className="size-4 text-emerald-600 shrink-0" />,
        title: "CDA Finalized",
        desc: "All calculations are locked. PDF is ready for download and DocuSign.",
      },
    };
    const c = configs[status];
    if (!c) return null;
    return (
      <div className={cn("border-b px-6 py-2.5 flex items-center gap-3 shrink-0", c.bg)}>
        {c.icon}
        <div>
          <p className="text-[12px] font-semibold text-foreground">{c.title}</p>
          <p className="text-[11px] text-muted-foreground">{c.desc}</p>
        </div>
        {status === "revision_requested" && (
          <Button
            size="sm"
            variant="ghost"
            className="ml-auto text-[11px] h-7"
            onClick={() => setShowNotes(true)}
          >
            <MessageSquare className="size-3 mr-1.5" /> View TL Notes
          </Button>
        )}
      </div>
    );
  };

  // ─── Footer CTA ───────────────────────────────────────────────────────────────

  const renderFooterCTA = () => {
    switch (status) {
      case "draft":
        if (role !== "agent") {
          return (
            <span className="text-[11px] text-muted-foreground">
              Viewing as {role === "team_lead" ? "Team Lead" : "Radius Admin"}. Agent must submit.
            </span>
          );
        }
        return (
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="h-9 px-4 text-xs hover:bg-red-50 hover:text-red-600 transition-colors">
              Discard
            </Button>
            <Button variant="outline" size="sm" className="h-9 px-4 text-xs border-[#5A5FF2] text-[#5A5FF2] hover:bg-[#5A5FF2]/5">
              Save Draft
            </Button>
            <Button
              size="sm"
              className="h-9 px-6 text-xs gap-2 bg-[#5A5FF2] hover:bg-[#5A5FF2]/90 text-white font-bold shadow-sm"
              onClick={handleSendForTLReview}
            >
              <Send className="size-3.5" /> Submit for Approval
            </Button>
          </div>
        );

      case "revision_requested":
        if (role !== "agent") {
          return (
            <span className="text-[11px] text-muted-foreground">Awaiting agent revision.</span>
          );
        }
        return (
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="h-9 px-4 text-xs">
              Save Draft
            </Button>
            <Button size="sm" className="h-9 px-6 text-xs gap-2" onClick={handleResubmit}>
              <RotateCcw className="size-3.5" /> Resubmit for Review
            </Button>
          </div>
        );

      case "pending_tl":
        if (role === "agent") {
          return (
            <span className="text-[11px] text-muted-foreground italic">
              Submitted — awaiting Team Lead review.
            </span>
          );
        }
        return (
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-4 text-xs border-orange-200 text-orange-700 hover:bg-orange-50"
              onClick={() => setShowChangeRequestDialog(true)}
            >
              <Flag className="size-3.5 mr-1.5" /> Request Changes
            </Button>
            <Button
              size="sm"
              className="h-9 px-6 text-xs gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={handleTLApprove}
            >
              <CheckCircle2 className="size-3.5" /> Approve Breakdown
            </Button>
          </div>
        );

      case "pending_agent_confirmation":
        if (role !== "agent") {
          return (
            <span className="text-[11px] text-muted-foreground italic">
              Awaiting agent confirmation.
            </span>
          );
        }
        return (
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-4 text-xs border-orange-200 text-orange-700 hover:bg-orange-50"
              onClick={handleAgentRequestCorrection}
            >
              <RotateCcw className="size-3.5 mr-1.5" /> Request Correction
            </Button>
            <Button size="sm" className="h-9 px-6 text-xs gap-2" onClick={handleAgentConfirm}>
              <CheckCheck className="size-3.5" /> Confirm Breakdown
            </Button>
          </div>
        );

      case "finalized":
        return (
          <div className="flex items-center gap-3">
            {role === "radius" && (
              <Button
                variant="ghost"
                size="sm"
                className="h-9 px-4 text-xs text-muted-foreground"
                onClick={handleReopenCDA}
              >
                <RotateCcw className="size-3.5 mr-1.5" /> Reopen CDA
              </Button>
            )}
            <Button variant="outline" size="sm" className="h-9 px-4 text-xs gap-2">
              <Download className="size-3.5" /> Download PDF
            </Button>
            <Button size="sm" className="h-9 px-6 text-xs gap-2">
              <Send className="size-3.5" /> Send via DocuSign
            </Button>
          </div>
        );
    }
  };

  // ─── Agent Row (compact, in Allocation Sides section) ─────────────────────────

  const renderAgentRow = (agent: AgentAllocation, sideAmount: number) => {
    const calcs = calcAgentFinancials(agent, sideAmount);
    const isSelected = selectedNode === `agent-${agent.id}`;
    return (
      <div
        key={agent.id}
        onClick={() => setSelectedNode(`agent-${agent.id}`)}
        className={cn(
          "group flex items-center justify-between py-3.5 px-4 cursor-pointer transition-all border-l-2 border-transparent",
          isSelected ? "bg-[#5A5FF2]/[0.03] border-[#5A5FF2]" : "hover:bg-muted/40"
        )}
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="relative">
            <Avatar className="size-9 shrink-0 ring-2 ring-background border shadow-sm">
              <AvatarImage src={agent.avatar} />
              <AvatarFallback className="text-[10px] font-bold bg-muted text-muted-foreground">
                {agent.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 size-4 rounded-full bg-white flex items-center justify-center shadow-sm border border-border/50">
              <User2 className="size-2.5 text-muted-foreground" />
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-bold leading-tight tracking-tight text-foreground/90">
              {agent.name}
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <Badge variant="outline" className="h-4 px-1.5 text-[9px] font-semibold bg-blue-50/50 border-blue-200/50 text-blue-700 uppercase tracking-wider">
                {agent.allocationPct}% Split
              </Badge>
              <span className="text-[9px] text-muted-foreground/60 font-semibold uppercase tracking-widest">
                {agent.planName}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[14px] font-extrabold tabular-nums tracking-tight text-foreground">
              ${calcs.netAgentCommission.toLocaleString()}
            </p>
            <p className="text-[9px] text-muted-foreground/70 font-bold uppercase tracking-wider">
              Net Payout
            </p>
          </div>
          <div className="flex items-center gap-1">
            {!isLocked && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal className="size-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setSelectedNode(`agent-${agent.id}`)}>
                    <Calculator className="size-4 mr-2" /> View Inspector
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setIsDeductionOpen(true)}
                    disabled={!isEditable}
                  >
                    <Plus className="size-4 mr-2" /> Add Deduction
                  </DropdownMenuItem>
                  {role !== "agent" && (
                    <>
                      <DropdownMenuItem
                        onClick={() => setIsAgentOpen(true)}
                        disabled={!isEditable}
                      >
                        <Edit className="size-4 mr-2" /> Change Plan
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" disabled={!isEditable}>
                        <Trash2 className="size-4 mr-2" /> Remove Agent
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <ChevronRight className={cn(
              "size-4 text-muted-foreground/30 transition-transform group-hover:translate-x-0.5",
              isSelected && "text-[#5A5FF2]/50"
            )} />
          </div>
        </div>
      </div>
    );
  };

  // ─── Post-Split Deductions Section ────────────────────────────────────────

  const renderPostSplitDeductions = () => {
    if (allAgentCalcs.length === 0) return null;
    return (
      <Card className="overflow-hidden border-border/60 shadow-sm">
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-border/50 bg-background">
          <h3 className="text-[13px] font-bold text-foreground">04. Post-Split Deductions</h3>
          {isEditable && (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-6 text-[10px] gap-1.5 px-2 bg-background border-[#5A5FF2] text-[#5A5FF2] hover:bg-[#5A5FF2]/5 font-bold"
              onClick={() => setIsDeductionOpen(true)}
            >
              <Plus className="size-3" /> Add Post-Split Deduction
            </Button>
          )}
        </div>
        <div className="divide-y divide-border/50">
          {allAgentCalcs.map(({ agent, side, sideAmount, calcs }) => (
            <div key={agent.id} className="px-5 py-3 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[12px] font-bold text-foreground">{agent.name}</p>
                  <p className="text-[11px] font-medium text-muted-foreground">Post-split commission: ${calcs.postSplitCommission.toLocaleString()}</p>
                </div>
              </div>
              
              {calcs.postSplitDeds.length > 0 ? (
                <div className="space-y-1">
                  {calcs.postSplitDeds.map(d => (
                    <div key={d.id} className="flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground">- {d.label}</span>
                      <span className="text-muted-foreground tabular-nums">-${d.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-1">
                  <span className="text-[11px] italic text-muted-foreground/50">No post-split deductions</span>
                </div>
              )}
              
              <div className="flex items-center justify-between pt-2 mt-1 border-t border-border/40">
                <span className="text-[11px] font-bold text-foreground">Net commission</span>
                <span className="text-[12px] font-bold tabular-nums text-foreground">${calcs.netAgentCommission.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  // ─── Agent Breakdown Accordion Section ────────────────────────────────────────

  const renderAgentBreakdown = () => {
    if (allAgentCalcs.length === 0) return null;
    return (
      <div className="border rounded-lg bg-background overflow-hidden border-border/60">
        <CDASectionHeader title="05. Agent Breakdown" className="bg-muted/20" />
        <Accordion type="multiple" className="divide-y divide-border/50">
          {allAgentCalcs.map(({ agent, side, sideAmount, calcs }) => (
            <AccordionItem key={agent.id} value={agent.id} className="border-none">
              <AccordionTrigger className="px-3.5 py-0 hover:no-underline hover:bg-muted/20 data-[state=open]:bg-muted/10 [&>svg]:shrink-0 [&>svg]:text-muted-foreground [&>svg]:size-4">
                <div className="flex items-center gap-2.5 flex-1 py-2.5 min-w-0 text-left">
                  <Avatar className="size-6 shrink-0">
                    <AvatarImage src={agent.avatar} />
                    <AvatarFallback className="text-[8px] font-bold">
                      {agent.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold leading-tight">{agent.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                         {side.type} side · {agent.allocationPct}% · {agent.planName}
                      </p>
                    </div>
                  </div>
                  <div className="text-right mr-2 shrink-0">
                    <p className="text-[12px] font-bold tabular-nums">
                      ${calcs.netAgentCommission.toLocaleString()}
                    </p>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60">Net Payout</p>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-0">
                <div className="border-t border-border/40 bg-muted/[0.02]">
                  {/* 1. Gross after shared deductions */}
                  <FinRow
                    label="Allocation Basis"
                    value={calcs.agentBasis}
                    tooltip={`${agent.allocationPct}% of side distributable ($${sideAmount.toLocaleString()})`}
                    variant="muted"
                  />

                  {/* 2. Agent Pre-split deductions (Internal) */}
                  {(role !== "agent" || calcs.agentPreSplitDeds.length > 0) && (
                    <Collapsible defaultOpen={role !== "agent"} className="group/coll">
                      <CollapsibleTrigger asChild>
                        <div className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-muted/30">
                          <div className="flex items-center gap-2">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                              Agent pre-split deductions
                            </p>
                            {role !== "agent" && (
                              <Badge variant="outline" className="h-3.5 text-[8px] border-amber-200 text-amber-700 bg-amber-50 uppercase tracking-tighter px-1">Internal only</Badge>
                            )}
                          </div>
                          <ChevronDown className="size-3 text-muted-foreground transition-transform group-data-[state=open]/coll:rotate-180" />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        {calcs.agentPreSplitDeds.length > 0 ? (
                          calcs.agentPreSplitDeds.map((d) => (
                            <FinRow
                              key={d.id}
                              label={d.label}
                              value={-d.amount}
                              indent
                              variant="muted"
                            />
                          ))
                        ) : (
                          <p className="px-8 py-1.5 text-[10px] text-muted-foreground/50 italic">No internal adjustments</p>
                        )}
                        {isEditable && role !== "agent" && (
                          <div className="px-8 py-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 text-[9px] gap-1 px-1.5 text-amber-700 hover:bg-amber-50"
                              onClick={() => setIsDeductionOpen(true)}
                            >
                              <Plus className="size-2.5" /> Add Adjustment
                            </Button>
                          </div>
                        )}
                      </CollapsibleContent>
                    </Collapsible>
                  )}

                  <Separator className="my-1 opacity-50" />

                  <FinRow
                    label="Split Basis (Basis - Adjustments)"
                    value={calcs.splitBasis}
                    variant="subtotal"
                  />

                  {/* 3. Post split commission */}
                  <FinRow
                    label={`Post-Split Commission (${Math.round(agent.planSplit * 100)}% Plan)`}
                    value={calcs.postSplitCommission}
                    tooltip={`${Math.round(agent.planSplit * 100)}% × $${calcs.splitBasis.toLocaleString()} split basis`}
                  />

                  {/* 4. Post split deductions (Agent editable) */}
                  <Collapsible defaultOpen className="group/coll">
                    <CollapsibleTrigger asChild>
                      <div className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-muted/30">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                          Post-split deductions
                        </p>
                        <ChevronDown className="size-3 text-muted-foreground transition-transform group-data-[state=open]/coll:rotate-180" />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {calcs.postSplitDeds.length > 0 ? (
                        calcs.postSplitDeds.map((d) => (
                          <FinRow
                            key={d.id}
                            label={d.label}
                            value={-d.amount}
                            indent
                            variant="muted"
                          />
                        ))
                      ) : (
                        <p className="px-8 py-1.5 text-[10px] text-muted-foreground/50 italic">No post-split deductions</p>
                      )}
                      {isEditable && (
                        <div className="px-8 py-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-6 text-[9px] gap-1 px-2 border-[#5A5FF2] text-[#5A5FF2] hover:bg-[#5A5FF2]/5"
                            onClick={() => setIsDeductionOpen(true)}
                          >
                            <Plus className="size-2.5" /> Add Deduction
                          </Button>
                        </div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>

                  <Separator className="my-1" />

                  {/* 5. Net agent commission */}
                  <FinRow
                    label="Net Commission Payout"
                    value={calcs.netAgentCommission}
                    variant="total"
                  />

                  {role !== "agent" && (
                    <div className="bg-muted/10 border-t border-border/40 mt-1">
                      <FinRow
                        label="Company Share (Company Dollar)"
                        value={calcs.companyDollar}
                        variant="muted"
                        tooltip={`${Math.round((1 - agent.planSplit) * 100)}% × $${calcs.splitBasis.toLocaleString()} company share`}
                      />
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  };

  // ─── Company / Radius Breakdown (hidden from agent) ───────────────────────────

  const renderCompanyBreakdown = () => {
    if (role === "agent") return null;
    return (
      <div className="border rounded-lg bg-background overflow-hidden border-border/60">
        <CDASectionHeader
          title="06. Company & Radius"
          className="bg-muted/20"
          status={
            <Badge variant="secondary" className="h-4 text-[9px] px-1.5 bg-slate-100 text-slate-600">
              Not visible to agents
            </Badge>
          }
        />
        <div className="divide-y divide-border/50">
          <FinRow
            label={`Gross company dollar (${allAgentCalcs.length} agent${allAgentCalcs.length !== 1 ? "s" : ""})`}
            value={totalCompanyDollar}
            tooltip="Sum of all company dollar contributions across agents"
          />
          {radiusDeductions.map((d) => (
            <FinRow key={d.id} label={d.label} value={-d.amount} variant="muted" />
          ))}
          <Separator />
          <FinRow label="Net company dollar" value={companyNet} variant="total" />
        </div>
      </div>
    );
  };

  // ─── Finalized View (left panel) ──────────────────────────────────────────────

  const renderFinalizedView = () => (
    <div className="space-y-6">
      {/* PDF Preview */}
      <div className="border rounded-lg bg-background overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-muted-foreground" />
            <span className="text-[13px] font-medium">PDF Preview</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-7 text-[10px] gap-1.5">
              <Download className="size-3" /> Download
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-[10px] gap-1.5">
              <Printer className="size-3" /> Print
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-[10px] gap-1.5">
              <RefreshCw className="size-3" /> Regenerate
            </Button>
          </div>
        </div>
        <div className="p-6 bg-slate-50">
          <div className="max-w-lg mx-auto bg-white border shadow-sm rounded p-8 space-y-6">
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="size-7 rounded-md bg-[#5A5FF2] flex items-center justify-center">
                    <Building2 className="size-4 text-white" />
                  </div>
                  <span className="font-bold text-sm">Radius Agent</span>
                </div>
                <h2 className="text-lg font-bold uppercase tracking-wide">
                  Commission Disbursement
                </h2>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                  Authorization
                </p>
              </div>
              <div className="text-right text-[10px] text-muted-foreground space-y-1">
                <p>Transaction ID: TXN-ABC123</p>
                <p>Escrow #: ESC-00234</p>
                <p>Prepared: {data.closeDate}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-[11px]">
              <div>
                <p className="text-muted-foreground font-medium mb-0.5">Property</p>
                <p className="font-semibold">{data.title}</p>
              </div>
              <div>
                <p className="text-muted-foreground font-medium mb-0.5">Client</p>
                <p className="font-semibold">{data.client}</p>
              </div>
              <div>
                <p className="text-muted-foreground font-medium mb-0.5">Gross Commission</p>
                <p className="font-semibold">${gciTotal.toLocaleString()}.00</p>
              </div>
              <div>
                <p className="text-muted-foreground font-medium mb-0.5">Agent Net Total</p>
                <p className="font-semibold">${netPayable.toLocaleString()}.00</p>
              </div>
            </div>
            <div className="border-t pt-4 space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gross Commission</span>
                <span className="font-semibold">${gciTotal.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pre-Split Deductions</span>
                <span className="font-medium">-${sharedDeductionTotal.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between border-t pt-1 mt-1">
                <span className="font-medium">Split Basis</span>
                <span className="font-semibold">${grossAfterDeductions.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Agent Net Total</span>
                <span className="font-semibold">${netPayable.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Company Dollar</span>
                <span className="font-medium">${totalCompanyDollar.toLocaleString()}.00</span>
              </div>
            </div>
            <p className="text-center text-[9px] text-muted-foreground border-t pt-3">
              Prepared by Radius Agent, Inc. · California Licensed Real Estate Brokerage
              <br />
              555 Market St, Suite 1200, San Francisco, CA 94104 · CA DRE #01234567
            </p>
          </div>
        </div>
      </div>

      {/* DocuSign Routing */}
      <div className="border rounded-lg bg-background overflow-hidden">
        <div className="px-4 py-3 bg-muted/30 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Send className="size-4 text-muted-foreground" />
            <span className="text-[13px] font-medium">Signer Routing</span>
          </div>
          <Button variant="ghost" size="sm" className="h-7 text-[10px]">
            Edit Recipients
          </Button>
        </div>
        <div className="divide-y">
          {[
            { name: "Ila Corcoran", role: "Agent", initials: "IC", status: "pending" },
            { name: "Rod Watson", role: "Team Lead", initials: "RW", status: "pending" },
            { name: "Accounting", role: "Copy only", initials: "AC", status: "copy" },
          ].map((signer) => (
            <div key={signer.name} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-3">
                <div className="size-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                  {signer.initials}
                </div>
                <div>
                  <p className="text-[12px] font-medium">{signer.name}</p>
                  <p className="text-[10px] text-muted-foreground">{signer.role}</p>
                </div>
              </div>
              {signer.status === "copy" ? (
                <span className="text-[10px] text-muted-foreground">Copy only</span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] text-amber-600">
                  <Clock className="size-3" /> Pending signature
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="px-4 py-3 border-t">
          <Button className="w-full h-9 text-xs gap-2">
            <Send className="size-3.5" /> Send Envelope via DocuSign
          </Button>
        </div>
      </div>

      {/* Approval Timeline */}
      <div className="border rounded-lg bg-background overflow-hidden">
        <div className="px-4 py-3 bg-muted/30 border-b">
          <span className="text-[13px] font-medium">Final Approval Timeline</span>
        </div>
        <div className="p-4 space-y-2">
          {[
            "Agent entry complete",
            "Team Lead review complete",
            "Agent confirmation complete",
            "CDA PDF generated",
          ].map((step) => (
            <div key={step} className="flex items-center gap-2.5">
              <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
              <span className="text-[12px]">{step}</span>
            </div>
          ))}
          <div className="flex items-center gap-2.5">
            <Clock className="size-4 text-amber-500 shrink-0" />
            <span className="text-[12px] text-muted-foreground">DocuSign pending</span>
          </div>
        </div>
      </div>
    </div>
  );

  // ─── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-screen bg-background font-inter">
      {/* Top Header */}
      <header className="h-14 border-b flex items-center justify-between px-6 shrink-0 bg-background/50 backdrop-blur">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 gap-1.5 text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/transaction-detail")}
          >
            <ChevronLeft className="size-4" />
            Back to transaction
          </Button>
          <Separator orientation="vertical" className="h-5" />
          <div className="size-8 rounded-lg bg-[#5A5FF2]/10 flex items-center justify-center text-[#5A5FF2] shrink-0">
            <Building2 className="size-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-semibold">{data.title}</h1>
              <StatusBadge status={status} />
            </div>
            <p className="text-[10px] text-muted-foreground">
              {data.client} · {data.closeDate}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 border rounded-md bg-muted/20">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              Role
            </span>
            <Select value={role} onValueChange={(v) => setRole(v as Role)}>
              <SelectTrigger className="h-5 border-none shadow-none bg-transparent text-[11px] p-0 focus:ring-0 w-28">
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
          <div className="flex items-center gap-2">
            <Button
              className="h-8 text-[11px] gap-1.5 bg-[#5A5FF2] hover:bg-[#5A5FF2]/90 text-white font-bold"
              onClick={handleSendForTLReview}
            >
              <Send className="size-3.5" /> Submit for Approval
            </Button>
          </div>
        </div>
      </header>

      {/* Workflow Banner */}
      {renderWorkflowBanner()}

      {/* Financial Strip */}
      <div className="h-18 border-b bg-white dark:bg-zinc-950 flex items-center px-8 shrink-0 overflow-x-auto relative group overflow-hidden">
        {/* MagicUI Shiny Animation Effect */}
        <motion.div
          initial={{ "--x": "100%", scale: 1 }}
          animate={{ "--x": "-100%" }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 3,
            ease: "linear",
          }}
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: "linear-gradient(110deg, transparent, 45%, rgba(0,0,0,0.03), 50%, rgba(0,0,0,0.06), 55%, transparent)",
            backgroundSize: "200% 100%",
            backgroundPosition: "var(--x) 0",
          } as any}
        />
        
        <div className="flex items-center shrink-0 relative z-10 h-full w-full justify-start gap-4">
          {/* Total GCI */}
          <div className="flex items-center gap-4 px-4 py-2 rounded-xl transition-all hover:bg-blue-50/50 group/item">
            <div className="size-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 transition-all group-hover/item:scale-105 group-hover/item:rotate-3 shadow-sm border border-blue-100/50">
              <BarChart3 className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-blue-600/70 leading-none mb-1.5">Total GCI</span>
              <span className="text-[16px] font-extrabold tabular-nums text-blue-950 dark:text-blue-50 leading-none tracking-tight">
                ${gciTotal.toLocaleString()}
              </span>
            </div>
          </div>

          <Separator orientation="vertical" className="h-10 w-px bg-slate-200/60" />

          {/* After Deductions */}
          <div className="flex items-center gap-4 px-4 py-2 rounded-xl transition-all hover:bg-orange-50/50 group/item">
            <div className="size-10 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 transition-all group-hover/item:scale-105 group-hover/item:-rotate-3 shadow-sm border border-orange-100/50">
              <Calculator className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-orange-600/70 leading-none mb-1.5">After Deductions</span>
              <span className="text-[16px] font-extrabold tabular-nums text-orange-950 dark:text-orange-50 leading-none tracking-tight">
                ${grossAfterDeductions.toLocaleString()}
              </span>
            </div>
          </div>

          <Separator orientation="vertical" className="h-10 w-px bg-slate-200/60" />

          {/* Net to Agents */}
          <div className="flex items-center gap-4 px-4 py-2 rounded-xl transition-all hover:bg-emerald-50/50 group/item">
            <div className="size-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 transition-all group-hover/item:scale-105 group-hover/item:rotate-3 shadow-sm border border-emerald-100/50">
              <Users className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-600/70 leading-none mb-1.5">Net to Agents</span>
              <span className="text-[16px] font-extrabold tabular-nums text-emerald-950 dark:text-emerald-50 leading-none tracking-tight">
                ${netPayable.toLocaleString()}
              </span>
            </div>
          </div>

          {role !== "agent" && (
            <>
              <Separator orientation="vertical" className="h-10 w-px bg-slate-200/60" />
              <div className="flex items-center gap-4 px-4 py-2 rounded-xl transition-all hover:bg-indigo-50/50 group/item">
                <div className="size-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 transition-all group-hover/item:scale-105 group-hover/item:-rotate-3 shadow-sm border border-indigo-100/50">
                  <Building2 className="size-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-indigo-600/70 leading-none mb-1.5">Company Dollar</span>
                  <span className="text-[16px] font-extrabold tabular-nums text-indigo-950 dark:text-indigo-50 leading-none tracking-tight">
                    ${totalCompanyDollar.toLocaleString()}
                  </span>
                </div>
              </div>

              {radiusDeductionTotal > 0 && (
                <>
                  <Separator orientation="vertical" className="h-10 w-px bg-slate-200/60" />
                  <div className="flex items-center gap-4 px-4 py-2 rounded-xl transition-all hover:bg-slate-50/50 group/item">
                    <div className="size-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 transition-all group-hover/item:scale-105 group-hover/item:rotate-3 shadow-sm border border-slate-200/50">
                      <ShieldCheck className="size-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-600/70 leading-none mb-1.5">Radius Fee</span>
                      <span className="text-[16px] font-extrabold tabular-nums text-slate-950 dark:text-slate-50 leading-none tracking-tight">
                        ${radiusDeductionTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>


      {/* Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <div className="flex-[0.72] overflow-y-auto border-r bg-muted/[0.02]">
          <div className="py-6 px-6 md:px-8 space-y-5">
            {isLocked ? (
              renderFinalizedView()
            ) : (
              <>
                <div className="border rounded-lg bg-background overflow-hidden border-border/60">
                  <CDASectionHeader title="01. Gross Commission Income" className="bg-muted/20" />
                  <div className="divide-y divide-border/50">
                    <SpreadsheetRow
                      label="Purchase Price"
                      value={data.purchasePrice}
                      isSelected={selectedNode === "root"}
                      onClick={() => setSelectedNode("root")}
                      className="px-4 py-2"
                    />
                    <SpreadsheetRow
                      label={`Commission Rate (${data.commissionRate}%)`}
                      value={`${data.commissionRate}%`}
                      formula="price × (rate / 100)"
                      isSelected={selectedNode === "root"}
                      onClick={() => setSelectedNode("root")}
                      className="px-4 py-2"
                    />
                    <SpreadsheetRow
                      label="Gross Commission Total"
                      value={gciTotal}
                      variant="total"
                      formula={`$${data.purchasePrice.toLocaleString()} × ${data.commissionRate}%`}
                      isSelected={selectedNode === "root"}
                      onClick={() => setSelectedNode("root")}
                      className="bg-muted/5 px-4 py-2.5"
                    />
                  </div>
                </div>

                {/* Section 02: Pre-Split Deductions */}
                <div className="border rounded-lg bg-background overflow-hidden border-border/60">
                  <div className="flex items-center justify-between bg-muted/20 pr-3">
                    <CDASectionHeader
                      title="02. Shared Pre-Split Deductions"
                      className="bg-transparent border-none"
                    />
                    {isEditable && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 text-[10px] gap-1.5 px-2 bg-background border-[#5A5FF2] text-[#5A5FF2] hover:bg-[#5A5FF2]/5"
                          >
                            <Plus className="size-3" /> Add Shared
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => setIsDeductionOpen(true)}>
                            Add Credit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setIsDeductionOpen(true)}>
                            Add Referral Fee
                          </DropdownMenuItem>
                          {role !== "agent" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => setIsDeductionOpen(true)}>
                                Add Brokerage Fee
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setIsDeductionOpen(true)}>
                                Add Compliance Review
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                  <div className="divide-y divide-border/50">
                    {sharedDeductions.length > 0 ? (
                      sharedDeductions.map((d) => (
                        <SpreadsheetRow
                          key={d.id}
                          label={d.label}
                          value={-d.amount}
                          variant="danger"
                          isSelected={selectedNode === `deduction-${d.id}`}
                          onClick={() => setSelectedNode(`deduction-${d.id}`)}
                          className="px-4 py-2"
                        />
                      ))
                    ) : (
                       <div className="px-4 py-3 text-[11px] text-muted-foreground italic">No shared deductions</div>
                    )}
                    {/* Radius fee: visible to TL/radius only */}
                    {role !== "agent" &&
                      radiusDeductions.map((d) => (
                        <SpreadsheetRow
                          key={d.id}
                          label={`${d.label} ·`}
                          value={-d.amount}
                          variant="subtle"
                          isSelected={selectedNode === `deduction-${d.id}`}
                          onClick={() => setSelectedNode(`deduction-${d.id}`)}
                          className="px-4 py-2"
                        />
                      ))}
                    <SpreadsheetRow
                      label="Gross After Deductions"
                      value={grossAfterDeductions}
                      variant="total"
                      formula="GCI − SUM(shared deductions)"
                      className="bg-muted/5 px-4 py-2.5"
                    />
                  </div>
                </div>

                {/* Section 03: Allocation Sides (Vertical Stack) */}
                <Card className="border-border/60 shadow-sm gap-0">
                  <CardHeader className="h-14 px-6 py-0 flex flex-row items-center justify-between border-b border-border/50 bg-background">
                    <CardTitle className="text-[13px] font-bold text-foreground">03 Allocation Sides</CardTitle>
                    {isEditable && role !== "agent" && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-7 text-[10px] gap-1.5 px-3 bg-background border-[#5A5FF2] text-[#5A5FF2] hover:bg-[#5A5FF2]/5 font-bold"
                        onClick={() => setIsAllocationOpen(true)}
                      >
                        Change Allocation
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="px-6 pt-4 pb-4 space-y-0">
                    {data.sides.map((side, sideIdx) => {
                      const sideAmount = grossAfterDeductions * (side.percentage / 100);
                      const hasAgents = side.agents.length > 0;

                      if (side.percentage === 0 && side.agents.length === 0 && role === "agent")
                        return null;

                      return (
                        <div key={side.id}>
                          <section>
                            {/* Side Sub-header */}
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex flex-col">
                                <span className="text-[12px] font-bold text-foreground capitalize">{side.type} Side</span>
                                <span className="text-[11px] font-medium text-muted-foreground">
                                  {side.percentage}% · ${sideAmount.toLocaleString()}
                                </span>
                              </div>
                              {isEditable && role !== "agent" && (
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-7 text-[11px] text-[#5A5FF2] hover:bg-[#5A5FF2]/5 px-2 gap-1.5 font-bold -mr-2"
                                  onClick={() => handleAddAgent(side.type)}
                                >
                                  <Plus className="size-3" /> Add Agent
                                </Button>
                              )}
                            </div>

                            {/* Agent List or Empty State */}
                            <div className="flex flex-col gap-3">
                              {hasAgents ? (
                                side.agents.map((agent) => {
                                  const calcs = calcAgentFinancials(agent, sideAmount);
                                  const isSelected = selectedNode === `agent-${agent.id}`;
                                  return (
                                    <div
                                      key={agent.id}
                                      onClick={() => setSelectedNode(`agent-${agent.id}`)}
                                      className={cn(
                                        "group flex items-center gap-3 cursor-pointer transition-colors border-l-2 pl-3 -ml-3",
                                        isSelected ? "border-[#5A5FF2]" : "border-transparent hover:border-border/30"
                                      )}
                                    >
                                      <Avatar className="size-8 border-border/50">
                                        <AvatarImage src={agent.avatar} />
                                        <AvatarFallback className="text-[10px] font-bold bg-muted text-muted-foreground">{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-[12px] font-bold text-foreground">{agent.name}</p>
                                        <p className="text-[11px] text-muted-foreground font-medium mt-0.5 flex items-center gap-1.5">
                                          <Badge variant="outline" className="h-[16px] px-1.5 text-[9px] font-semibold bg-blue-50/50 border-blue-200/50 text-blue-700 uppercase tracking-wider">
                                            {agent.allocationPct}% split
                                          </Badge>
                                          <span className="uppercase tracking-widest text-[9px] font-bold">{agent.planName}</span>
                                        </p>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <div className="text-right">
                                          <p className="text-[13px] font-bold tabular-nums text-foreground">
                                            ${calcs.netAgentCommission.toLocaleString()}
                                          </p>
                                          <p className="text-[9px] font-bold text-muted-foreground mt-0.5 uppercase tracking-wider">net payout</p>
                                        </div>
                                        <ChevronRight className={cn(
                                          "size-4 text-muted-foreground/40 transition-colors",
                                          isSelected && "text-[#5A5FF2]"
                                        )} />
                                      </div>
                                    </div>
                                  );
                                })
                              ) : (
                                <div className="flex items-center justify-center py-4">
                                  <span className="text-[12px] font-medium text-muted-foreground/60">No agents assigned</span>
                                </div>
                              )}
                            </div>
                          </section>
                          <Separator className="my-4" />
                        </div>
                      );
                    })}
                    
                    {/* Allocation Bar */}
                    <div className="pt-3 pb-2">
                      <div className="w-full">
                        <div className="h-[6px] w-full bg-muted rounded-full flex overflow-hidden">
                          {data.sides.map((side, idx) => (
                            <div
                              key={side.id}
                              style={{ width: `${side.percentage}%` }}
                              className={cn(
                                "h-full transition-all duration-500",
                                side.type === "buyer" ? "bg-[#5A5FF2]" : "bg-[#5A5FF2]/30"
                              )}
                            />
                          ))}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-4">
                            {data.sides.map((side) => (
                              <div key={side.id} className="flex items-center gap-1.5">
                                <div className={cn(
                                  "size-1.5 rounded-full",
                                  side.type === "buyer" ? "bg-[#5A5FF2]" : "bg-[#5A5FF2]/30"
                                )} />
                                <span className={cn(
                                  "text-[11px] font-bold uppercase tracking-tight",
                                  side.percentage === 0 ? "text-muted-foreground/40" : "text-muted-foreground"
                                )}>
                                  {side.type}: {side.percentage}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Section 04: Post-Split Deductions */}
                {renderPostSplitDeductions()}

                {/* Section 05: Agent Breakdown */}
                {renderAgentBreakdown()}

                {/* Section 06: Company / Radius Breakdown */}
                {renderCompanyBreakdown()}
              </>
            )}

            {/* Removed inline Activity Log to use Sheet instead */}
          </div>
        </div>

        {/* Right Panel */}
        <aside className="flex-[0.28] min-w-[340px] bg-background flex flex-col shrink-0 overflow-hidden">
          <ScrollArea className="flex-1">
            <div className="p-5 space-y-5">
              {/* Notes (compact) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-[12px] font-semibold">Notes</p>
                    {notes.filter(n => !n.resolved).length > 0 && (
                      <span className="flex items-center justify-center size-4 bg-red-500 text-white rounded-full text-[9px] font-bold">
                        {notes.filter(n => !n.resolved).length}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-[10px] px-2"
                      onClick={() => setShowNotes(true)}
                    >
                      <Plus className="size-3 mr-1" /> Add
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 text-[10px] px-2"
                      onClick={() => setShowNotes(true)}
                    >
                      View all
                    </Button>
                  </div>
                </div>
                <div className="space-y-1">
                  {notes.slice(0, 2).map((note) => (
                    <div key={note.id} className="flex items-start gap-2">
                      <div className="size-1.5 rounded-full bg-muted-foreground/30 mt-1.5 shrink-0" />
                      <p className="text-[11px] text-muted-foreground line-clamp-2 leading-tight">
                        {note.text}
                      </p>
                    </div>
                  ))}
                  {notes.length === 0 && (
                    <p className="text-[11px] text-muted-foreground/50 italic">No notes yet.</p>
                  )}
                </div>
              </div>

              <Separator />

              {/* Activity Log (compact) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[12px] font-semibold">Activity</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 text-[10px] px-2"
                      onClick={() => setShowAuditLog(true)}
                    >
                      View all
                    </Button>
                  </div>
                </div>
                <div className="space-y-1">
                  {auditEvents.slice(-2).map((event) => (
                    <div key={event.id} className="flex items-start gap-2">
                      <div className="size-1.5 rounded-full bg-muted-foreground/30 mt-1.5 shrink-0" />
                      <p className="text-[11px] text-muted-foreground line-clamp-2 leading-tight">
                        <span className="font-medium text-foreground">{event.actor}</span> {event.event}
                      </p>
                    </div>
                  ))}
                  {auditEvents.length === 0 && (
                    <p className="text-[11px] text-muted-foreground/50 italic">No activity yet.</p>
                  )}
                </div>
              </div>

              <Separator />

              {/* Inspector: Transaction root */}
              {selectedNode === "root" && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-[13px] font-semibold">Transaction Details</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Contract-level commission breakdown.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        Purchase Price
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                        <Input
                          disabled={!isEditable || role === "agent"}
                          value={data.purchasePrice.toLocaleString()}
                          className="pl-9 h-9 text-sm"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        Commission Rate (%)
                      </Label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                        <Input
                          disabled={!isEditable || role === "agent"}
                          value={data.commissionRate}
                          className="pl-9 h-9 text-sm"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  {isEditable && (
                    <div className="space-y-1.5">
                      <Button
                        className="w-full h-8 text-[11px] justify-start"
                        variant="outline"
                        onClick={() => setIsDeductionOpen(true)}
                      >
                        <Plus className="size-3.5 mr-2" /> Add Credit
                      </Button>
                      <Button
                        className="w-full h-8 text-[11px] justify-start"
                        variant="outline"
                        onClick={() => setIsDeductionOpen(true)}
                      >
                        <Plus className="size-3.5 mr-2" /> Add Referral Fee
                      </Button>
                      {role !== "agent" && (
                        <Button
                          className="w-full h-8 text-[11px] justify-start"
                          variant="outline"
                          onClick={() => setIsDeductionOpen(true)}
                        >
                          <Plus className="size-3.5 mr-2" /> Add Pre-Split Deduction
                        </Button>
                      )}
                    </div>
                  )}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="calc" className="border-none">
                      <AccordionTrigger className="hover:no-underline py-2 text-[11px] font-medium bg-muted/20 px-3 rounded-md">
                        View Calculation Path
                      </AccordionTrigger>
                      <AccordionContent className="pt-3 px-3 space-y-1.5">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-muted-foreground">Sales Price</span>
                          <span>${data.purchasePrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-muted-foreground">
                            × {data.commissionRate}% rate
                          </span>
                          <span className="text-muted-foreground">
                            = ${gciTotal.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-muted-foreground">− Shared deductions</span>
                          <span className="text-muted-foreground">
                            −${sharedDeductionTotal.toLocaleString()}
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-[11px] font-bold pt-0.5">
                          <span>Split Basis</span>
                          <span>${grossAfterDeductions.toLocaleString()}</span>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}

              {/* Inspector: Side */}
              {selectedNode.startsWith("side-") && (
                <div className="space-y-4">
                  {(() => {
                    const sideId = selectedNode.replace("side-", "");
                    const side = data.sides.find((s) => s.id === sideId);
                    if (!side) return null;
                    const sideAmount = grossAfterDeductions * (side.percentage / 100);
                    const agentNet = allAgentCalcs
                      .filter(({ side: s }) => s.id === sideId)
                      .reduce((sum, { calcs }) => sum + calcs.netAgentCommission, 0);
                    const sideCompany = sideAmount - agentNet;
                    return (
                      <>
                        <div>
                          <h3 className="text-[13px] font-semibold capitalize">
                            {side.type} Side Allocation
                          </h3>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            {side.percentage}% of split basis.
                          </p>
                        </div>
                        <div className="divide-y divide-border/50 border rounded-lg bg-muted/5 overflow-hidden">
                          <div className="flex justify-between p-3 text-[12px]">
                            <span className="text-muted-foreground">Side gross</span>
                            <span className="font-medium">${sideAmount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between p-3 text-[12px]">
                            <span className="text-muted-foreground">Agent net total</span>
                            <span className="font-medium">${agentNet.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between p-3 text-[12px] font-semibold bg-muted/20">
                            <span>Company dollar</span>
                            <span>${sideCompany.toLocaleString()}</span>
                          </div>
                        </div>
                        {isEditable && (
                          <div className="space-y-1.5">
                            <Button
                              className="w-full h-8 text-[11px] justify-start"
                              variant="outline"
                              disabled={role === "agent"}
                              onClick={() => setIsAgentOpen(true)}
                            >
                              <UserPlus className="size-3.5 mr-2" /> Add Agent
                            </Button>
                            <Button
                              className="w-full h-8 text-[11px] justify-start"
                              variant="outline"
                              disabled={role === "agent"}
                              onClick={() => setIsAllocationOpen(true)}
                            >
                              <Percent className="size-3.5 mr-2" /> Change Allocation
                            </Button>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              )}

              {/* Inspector: Agent */}
              {selectedNode.startsWith("agent-") && (
                <div className="space-y-4">
                  {(() => {
                    const agentId = selectedNode.replace("agent-", "");
                    const entry = allAgentCalcs.find(({ agent }) => agent.id === agentId);
                    if (!entry) return null;
                    const { agent, calcs } = entry;
                    return (
                      <>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-10 border-2 border-[#5A5FF2]/10">
                            <AvatarImage src={agent.avatar} />
                            <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-[13px] font-semibold">{agent.name}</h3>
                            <p className="text-[11px] text-muted-foreground">{agent.planName}</p>
                          </div>
                        </div>

                        <div className="px-4 py-3 border rounded-lg bg-muted/30 text-center">
                          <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest mb-1">
                            Net Commission
                          </p>
                          <p className="text-2xl font-bold tabular-nums">
                            ${calcs.netAgentCommission.toLocaleString()}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                            Summary
                          </h4>
                          <div className="divide-y divide-border/50 border rounded-lg bg-muted/5 overflow-hidden text-[12px]">
                            <div className="flex justify-between p-2.5">
                              <span className="text-muted-foreground">Allocation Basis</span>
                              <span className="font-medium">${calcs.agentBasis.toLocaleString()}</span>
                            </div>
                            {calcs.agentPreSplitTotal > 0 && (
                              <div className="flex justify-between p-2.5">
                                <span className="text-muted-foreground">Internal Adjustments</span>
                                <span className="font-medium text-amber-600">
                                  −${calcs.agentPreSplitTotal.toLocaleString()}
                                </span>
                              </div>
                            )}
                            <div className="flex justify-between p-2.5 bg-muted/[0.03]">
                              <span className="text-muted-foreground font-medium">Split Basis</span>
                              <span className="font-bold">${calcs.splitBasis.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between p-2.5">
                              <span className="text-muted-foreground">
                                Split ({Math.round(agent.planSplit * 100)}%)
                              </span>
                              <span className="font-medium">
                                ${calcs.postSplitCommission.toLocaleString()}
                              </span>
                            </div>
                            {calcs.postSplitTotal > 0 && (
                              <div className="flex justify-between p-2.5">
                                <span className="text-muted-foreground">Post-split deductions</span>
                                <span className="font-medium text-red-600">
                                  −${calcs.postSplitTotal.toLocaleString()}
                                </span>
                              </div>
                            )}
                            <div className="flex justify-between p-2.5 bg-[#5A5FF2]/5 font-bold text-[#5A5FF2]">
                              <span>Net commission</span>
                              <span>${calcs.netAgentCommission.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        {isEditable && (
                          <div className="space-y-1.5">
                            {role !== "agent" && (
                              <Button
                                className="w-full h-8 text-[11px] border-[#5A5FF2] text-[#5A5FF2] hover:bg-[#5A5FF2]/5"
                                variant="outline"
                              >
                                Change Plan
                              </Button>
                            )}
                            <Button
                              className="w-full h-8 text-[11px] border-[#5A5FF2] text-[#5A5FF2] hover:bg-[#5A5FF2]/5"
                              variant="outline"
                              onClick={() => setIsDeductionOpen(true)}
                            >
                              Add Deduction
                            </Button>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              )}

              {/* Inspector: Deduction */}
              {selectedNode.startsWith("deduction-") && (
                <div className="space-y-4">
                  {(() => {
                    const dedId = selectedNode.replace("deduction-", "");
                    const ded = data.globalDeductions.find((d) => d.id === dedId);
                    if (!ded) return null;
                    return (
                      <>
                        <div>
                          <h3 className="text-[13px] font-semibold">{ded.label}</h3>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            {ded.type === "radius_fee"
                              ? "Radius platform fee — not visible to agents."
                              : "Pre-split transaction deduction."}
                          </p>
                        </div>
                        <div className="border rounded-lg p-4 bg-muted/10 space-y-3">
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase font-semibold">
                              Amount
                            </p>
                            <p className="text-xl font-bold tabular-nums">
                              ${ded.amount.toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="text-[10px] text-muted-foreground uppercase font-semibold">
                                Type
                              </p>
                              <Badge variant="secondary" className="h-5 text-[10px] mt-1">
                                {ded.type.replace("_", " ")}
                              </Badge>
                            </div>
                            <div>
                              <p className="text-[10px] text-muted-foreground uppercase font-semibold">
                                Editable By
                              </p>
                              <p className="text-[11px] font-medium mt-1">
                                {ded.type === "radius_fee" ? "Radius only" : "TL, Radius"}
                              </p>
                            </div>
                          </div>
                        </div>
                        {isEditable && role !== "agent" && (
                          <div className="space-y-1.5">
                            <Button className="w-full h-8 text-[11px]" variant="outline">
                              Edit Deduction
                            </Button>
                            <Button
                              className="w-full h-8 text-[11px] text-destructive"
                              variant="ghost"
                            >
                              Delete Deduction
                            </Button>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Inspector footer */}
          <div className="p-4 border-t bg-muted/10 shrink-0">
            <div className="flex items-start gap-2 p-2.5 bg-muted/40 rounded-lg">
              <Info className="size-3.5 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                {isLocked
                  ? "CDA finalized. All figures locked."
                  : role === "agent"
                  ? "Review carefully. Use 'Request Correction' if figures look wrong."
                  : "Finalizing locks all calculations and generates the disbursement PDF."}
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer Action Bar */}
      <footer className="h-14 border-t flex items-center justify-between px-6 bg-background shrink-0 z-10">
        <div className="flex items-center gap-2">
          {isLocked ? (
            <div className="flex items-center gap-1.5">
              <Lock className="size-3 text-emerald-600" />
              <span className="text-[11px] text-emerald-700 font-medium">CDA Finalized</span>
            </div>
          ) : (
            <>
              <div className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[11px] text-muted-foreground italic">Unsaved changes</span>
            </>
          )}
          <StatusBadge status={status} />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="h-8 text-[11px] text-muted-foreground relative px-3" onClick={() => setShowNotes(true)}>
            <MessageSquare className="size-3.5 mr-2" />
            Notes
            {notes.filter(n => !n.resolved).length > 0 && (
              <span className="absolute top-1 right-1 size-3 bg-red-500 text-white rounded-full flex items-center justify-center text-[8px] font-bold">
                {notes.filter(n => !n.resolved).length}
              </span>
            )}
          </Button>
          <Button variant="ghost" size="sm" className="h-8 text-[11px] text-muted-foreground px-3" onClick={() => setShowAuditLog(true)}>
            <FileText className="size-3.5 mr-2" />
            Activity
          </Button>
        </div>
      </footer>

      <CDAFlowSwitcher />

      {/* Notes Sheet */}
      <Sheet open={showNotes} onOpenChange={setShowNotes}>
        <SheetContent className="w-[400px] sm:w-[480px] flex flex-col p-0">
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle className="text-[14px] font-semibold flex items-center gap-2">
              <MessageSquare className="size-4" /> Internal Notes
            </SheetTitle>
            <p className="text-[11px] text-muted-foreground">
              Internal CDA communication — not client-facing.
            </p>
          </SheetHeader>
          <ScrollArea className="flex-1">
            <div className="px-6 py-4 space-y-4">
              {notes.map((note) => (
                <div key={note.id} className="space-y-1.5">
                  <div className="flex items-start gap-3">
                    <div className="size-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {note.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[12px] font-semibold">{note.author}</span>
                        <span className="text-[10px] text-muted-foreground">{note.authorRole}</span>
                        <NoteTypeBadge type={note.type} />
                        <span className="text-[10px] text-muted-foreground ml-auto">
                          {note.time}
                        </span>
                      </div>
                      <p className="text-[12px] text-foreground leading-relaxed">{note.text}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <button className="text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                          Reply
                        </button>
                        {!note.resolved && (
                          <button className="text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                            Resolve
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <Separator className="ml-10" />
                </div>
              ))}
              {notes.length === 0 && (
                <p className="text-[12px] text-muted-foreground text-center py-8 italic">
                  No notes yet.
                </p>
              )}
            </div>
          </ScrollArea>
          <div className="px-6 py-4 border-t space-y-3">
            <Textarea
              placeholder="Add an internal note..."
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              className="text-[12px] min-h-[80px] resize-none"
            />
            <Button
              className="w-full h-9 text-xs"
              onClick={handleAddNote}
              disabled={!newNoteText.trim()}
            >
              Add Note
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* TL Request Changes Dialog */}
      <Dialog open={showChangeRequestDialog} onOpenChange={setShowChangeRequestDialog}>
        <DialogContent className="sm:max-w-[440px]">
          <DialogHeader>
            <DialogTitle>Request Changes</DialogTitle>
            <DialogDescription>
              Describe what needs to be corrected. This will be sent to the agent as a note.
            </DialogDescription>
          </DialogHeader>
          <div className="py-3">
            <Textarea
              placeholder="e.g. The marketing fee amount doesn't match the signed addendum..."
              value={changeRequestText}
              onChange={(e) => setChangeRequestText(e.target.value)}
              className="min-h-[100px] text-sm"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowChangeRequestDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleTLRequestChanges}
              disabled={!changeRequestText.trim()}
            >
              <Flag className="size-3.5 mr-1.5" /> Send Change Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Activity Sheet */}
      <Sheet open={showAuditLog} onOpenChange={setShowAuditLog}>
        <SheetContent className="w-[400px] sm:w-[480px] flex flex-col p-0">
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle className="text-[14px] font-semibold flex items-center gap-2">
              <FileText className="size-4" /> Activity Log
            </SheetTitle>
            <p className="text-[11px] text-muted-foreground">
              History of all changes to this CDA.
            </p>
          </SheetHeader>
          <ScrollArea className="flex-1">
            <div className="px-6 py-4">
              <AuditTimeline events={auditEvents} />
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Add Deduction Dialog */}
      <Dialog open={isDeductionOpen} onOpenChange={setIsDeductionOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Deduction</DialogTitle>
            <DialogDescription>
              Add a new credit or fee to the commission breakdown.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ded-name" className="text-right text-sm">
                Name
              </Label>
              <Input id="ded-name" placeholder="Referral Fee" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ded-amount" className="text-right text-sm">
                Amount
              </Label>
              <div className="col-span-3 relative">
                <DollarSign className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <Input id="ded-amount" placeholder="0.00" className="pl-9" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-sm">Type</Label>
              <Select defaultValue="referral">
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="referral">Referral (pre-split)</SelectItem>
                  <SelectItem value="post_split">Post-split fee</SelectItem>
                  <SelectItem value="credit">Credit</SelectItem>
                  {role !== "agent" && (
                    <SelectItem value="pre_split">Shared pre-split</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeductionOpen(false)} className="border-[#5A5FF2]/20 text-[#5A5FF2] hover:bg-[#5A5FF2]/5">
              Cancel
            </Button>
            <Button onClick={() => setIsDeductionOpen(false)} className="bg-[#5A5FF2] hover:bg-[#5A5FF2]/90 text-white font-bold">Add Deduction</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Agent Dialog */}
      <Dialog open={isAgentOpen} onOpenChange={setIsAgentOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Agent Allocation</DialogTitle>
            <DialogDescription>
              Assign an agent to a side and set their allocation.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="agent-search" className="text-right text-sm">
                Search
              </Label>
              <Input id="agent-search" placeholder="Name or email..." className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="agent-alloc" className="text-right text-sm">
                Allocation
              </Label>
              <div className="col-span-3 relative">
                <Percent className="absolute right-3 top-2.5 size-4 text-muted-foreground" />
                <Input id="agent-alloc" placeholder="0" className="pr-9" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-sm">Plan</Label>
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
            <Button variant="outline" onClick={() => setIsAgentOpen(false)} className="border-[#5A5FF2]/20 text-[#5A5FF2] hover:bg-[#5A5FF2]/5">
              Cancel
            </Button>
            <Button onClick={() => setIsAgentOpen(false)} className="bg-[#5A5FF2] hover:bg-[#5A5FF2]/90 text-white font-bold shadow-sm px-6">Assign Agent</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Back Navigation Dialog */}
      <AlertDialog open={showBackDialog} onOpenChange={setShowBackDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard unsaved changes?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved commission changes. Save draft or discard before leaving.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/transaction-detail")}
            >
              Save draft
            </Button>
            <AlertDialogAction onClick={() => navigate("/transaction-detail")}>
              Discard changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
