import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
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
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Lock,
  CheckCheck,
  Printer,
  RefreshCw,
  Flag,
} from "lucide-react";
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
import { Textarea } from "../components/ui/textarea";

import { CDASectionHeader } from "../components/finance/cda-section-header";

// --- Types ---
type Status =
  | "draft"
  | "pending_tl"
  | "revision_requested"
  | "pending_agent_confirmation"
  | "finalized";
type Role = "agent" | "team_lead" | "radius";
type DeductionType = "credit" | "referral" | "pre_split" | "post_split" | "radius_fee";

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

// --- Mock Data ---
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
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
          allocationPct: 70,
          planName: "80/20 Standard",
          planSplit: 0.8,
          deductions: [
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
      percentage: 0,
      agents: [],
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

// --- Helpers ---
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
        isSelected ? "bg-primary/5 border-primary" : "hover:bg-muted/30",
        variant === "header" && "bg-muted/20 py-1.5",
        variant === "total" &&
          "bg-primary/[0.02] border-t border-b border-border/50 font-semibold",
        variant === "danger" && "text-red-600",
        changed && "bg-accent/40 border-l-2 border-primary",
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
            className="h-3.5 text-[9px] px-1 bg-primary/10 text-primary font-medium"
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

function AuditTimeline({ events }: { events: AuditEvent[] }) {
  const typeLabel: Record<AuditEvent["type"], string> = {
    action: "performed",
    approval: "approved",
    rejection: "requested changes on",
    system: "system:",
  };

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
      <div className="px-2 pb-2">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Today</p>
      </div>
      {events.map((event) => (
        <div
          key={event.id}
          className="flex items-start gap-3 px-2 py-2.5 rounded-md hover:bg-muted/40 transition-colors group"
        >
          {/* Avatar */}
          <div className="size-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 border border-border/50">
            {event.initials}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-[12px] leading-snug">
                  <span className="font-semibold">{event.actor}</span>
                  <span className="text-muted-foreground"> · {event.actorRole} · </span>
                  <span>{event.event}</span>
                  {typeBadge[event.type] && (
                    <span className="ml-1.5 inline-flex">{typeBadge[event.type]}</span>
                  )}
                </p>
                {event.description && (
                  <p className="text-[11px] text-muted-foreground mt-1 leading-snug bg-muted/50 rounded px-2 py-1.5">
                    {event.description}
                  </p>
                )}
              </div>
              <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0 mt-0.5">
                {event.time}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
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

// --- Main Component ---
export function CommissionBreakdown() {
  const navigate = useNavigate();
  const [data, setData] = useState<TransactionData>(INITIAL_DATA);
  const [status, setStatus] = useState<Status>("draft");
  const [role, setRole] = useState<Role>("agent");
  const [selectedNode, setSelectedNode] = useState<string>("root");
  const [showBackDialog, setShowBackDialog] = useState(false);
  const [showAuditLog, setShowAuditLog] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>(INITIAL_AUDIT);
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
  const [newNoteText, setNewNoteText] = useState("");
  const [changeRequestText, setChangeRequestText] = useState("");
  const [showChangeRequestDialog, setShowChangeRequestDialog] = useState(false);

  // Dialog States
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

  // --- Calculations ---
  const gciTotal = data.purchasePrice * (data.commissionRate / 100);
  const globalDeductionTotal = data.globalDeductions.reduce((sum, d) => sum + d.amount, 0);
  const grossAfterDeductions = gciTotal - globalDeductionTotal;

  const netPayable = data.sides.reduce((sideSum, side) => {
    const sideAmount = grossAfterDeductions * (side.percentage / 100);
    return (
      sideSum +
      side.agents.reduce((agentSum, agent) => {
        const agentBasis = sideAmount * (agent.allocationPct / 100);
        const afterSplit = agentBasis * agent.planSplit;
        const agentDeds = agent.deductions.reduce((s, d) => s + d.amount, 0);
        return agentSum + (afterSplit - agentDeds);
      }, 0)
    );
  }, 0);

  const teamPortionTotal = data.sides.reduce((sideSum, side) => {
    const sideAmount = grossAfterDeductions * (side.percentage / 100);
    return (
      sideSum +
      side.agents.reduce((agentSum, agent) => {
        const agentBasis = sideAmount * (agent.allocationPct / 100);
        return agentSum + agentBasis * (1 - agent.planSplit);
      }, 0)
    );
  }, 0);

  // --- Workflow Actions ---
  const addAuditEvent = (event: Omit<AuditEvent, "id">) => {
    setAuditEvents((prev) => [
      ...prev,
      { ...event, id: `e${Date.now()}` },
    ]);
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
    const noteId = `n${Date.now()}`;
    setNotes((prev) => [
      ...prev,
      {
        id: noteId,
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
        author: role === "agent" ? "Ila Corcoran" : role === "team_lead" ? "Rod Watson" : "Admin",
        authorRole: roleLabels[role],
        initials: role === "agent" ? "IC" : role === "team_lead" ? "RW" : "RA",
        text: newNoteText,
        time: "Just now",
        type: "general",
      },
    ]);
    setNewNoteText("");
  };

  // --- Approval Progress ---
  const approvalSteps: {
    label: string;
    status: "complete" | "active" | "pending";
    time?: string;
  }[] = [
    {
      label: "Agent Entry",
      status:
        status === "draft" || status === "revision_requested" ? "active" : "complete",
      time:
        status !== "draft" || status === "revision_requested" ? "Today, 9:15 AM" : undefined,
    },
    {
      label: "TL Review",
      status:
        status === "pending_tl"
          ? "active"
          : status === "draft" || status === "revision_requested"
          ? "pending"
          : "complete",
      time: status === "pending_agent_confirmation" || status === "finalized" ? "Today, 11:35 AM" : undefined,
    },
    {
      label: "Agent Confirmation",
      status:
        status === "pending_agent_confirmation"
          ? "active"
          : status === "finalized"
          ? "complete"
          : "pending",
    },
    {
      label: "Finalized",
      status: status === "finalized" ? "complete" : "pending",
    },
  ];

  // --- Render Agent Row ---
  const renderAgentRow = (agent: AgentAllocation, sideAmount: number) => {
    const agentBasis = sideAmount * (agent.allocationPct / 100);
    const agentNet =
      agentBasis * agent.planSplit -
      agent.deductions.reduce((s, d) => s + d.amount, 0);
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
              <span className="text-[10px] text-muted-foreground">
                {agent.allocationPct}% Allocation
              </span>
              <Badge
                variant="secondary"
                className="h-4 text-[9px] px-1 font-normal bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
              >
                {agent.planName}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[13px] font-bold tabular-nums">${agentNet.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground">Net Payout</p>
          </div>
          {!isLocked && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7 opacity-0 group-hover:opacity-100"
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setSelectedNode(`agent-${agent.id}`)}>
                  <Calculator className="size-4 mr-2" /> View Breakdown
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setIsDeductionOpen(true)}
                  disabled={!isEditable}
                >
                  <Plus className="size-4 mr-2" /> Add Post-Split Deduction
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
                    <DropdownMenuItem className="text-red-600" disabled={!isEditable}>
                      <Trash2 className="size-4 mr-2" /> Remove Agent
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    );
  };

  // --- Workflow Banner ---
  const renderWorkflowBanner = () => {
    if (status === "draft") return null;
    const configs: Partial<
      Record<
        Status,
        { bg: string; icon: React.ReactNode; title: string; desc: string }
      >
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
      <div className={cn("border-b px-6 py-3 flex items-center gap-3 shrink-0", c.bg)}>
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

  // --- Footer CTA ---
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
            <Button variant="ghost" size="sm" className="h-9 px-4 text-xs">
              Discard
            </Button>
            <Button variant="outline" size="sm" className="h-9 px-4 text-xs">
              Save Draft
            </Button>
            <Button
              size="sm"
              className="h-9 px-6 text-xs gap-2"
              onClick={handleSendForTLReview}
            >
              <Send className="size-3.5" /> Send for TL Review
            </Button>
          </div>
        );

      case "revision_requested":
        if (role !== "agent") {
          return (
            <span className="text-[11px] text-muted-foreground">
              Awaiting agent revision.
            </span>
          );
        }
        return (
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="h-9 px-4 text-xs">
              Save Draft
            </Button>
            <Button
              size="sm"
              className="h-9 px-6 text-xs gap-2"
              onClick={handleResubmit}
            >
              <RotateCcw className="size-3.5" /> Resubmit for TL Review
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
              <CheckCircle2 className="size-3.5" /> Approve & Send to Agent
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
            <Button
              size="sm"
              className="h-9 px-6 text-xs gap-2"
              onClick={handleAgentConfirm}
            >
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

  // --- Finalized Left Panel ---
  const renderFinalizedView = () => (
    <div className="space-y-6">
      {/* PDF Preview */}
      <div className="border rounded-lg bg-background overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-muted-foreground" />
            <span className="text-[13px] font-medium">PDF Preview</span>
          </div>
          <div className="flex items-center gap-2">
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

        {/* PDF Document Preview */}
        <div className="p-6 bg-slate-50">
          <div className="max-w-lg mx-auto bg-white border shadow-sm rounded p-8 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                {/* Radius Logo */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="size-7 rounded-md bg-primary flex items-center justify-center">
                    <Building2 className="size-4 text-primary-foreground" />
                  </div>
                  <span className="font-bold text-sm text-foreground">Radius Agent</span>
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

            {/* Property & Parties */}
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
              <div>
                <p className="text-muted-foreground font-medium mb-0.5">Company Dollar</p>
                <p className="font-semibold">${teamPortionTotal.toLocaleString()}.00</p>
              </div>
              <div>
                <p className="text-muted-foreground font-medium mb-0.5">Finalized By</p>
                <p className="font-semibold">Ila Corcoran (Agent)</p>
              </div>
            </div>

            <div className="border-t pt-4 space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gross Commission</span>
                <span className="font-semibold text-emerald-700">${gciTotal.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pre-Split Deductions</span>
                <span className="font-medium text-red-600">-${globalDeductionTotal.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between border-t pt-1 mt-1">
                <span className="font-medium">Split Basis</span>
                <span className="font-semibold">${grossAfterDeductions.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Agent Net Total</span>
                <span className="font-semibold text-emerald-700">${netPayable.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Team Portion</span>
                <span className="font-medium">${teamPortionTotal.toLocaleString()}.00</span>
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
      <div className="border rounded-lg bg-background overflow-hidden shadow-sm">
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
            <div key={signer.name} className="flex items-center justify-between px-4 py-3">
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
      <div className="border rounded-lg bg-background overflow-hidden shadow-sm">
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

  return (
    <div className="flex flex-col h-screen bg-background font-inter">
      {/* --- Top Header --- */}
      <header className="h-14 border-b flex items-center justify-between px-6 shrink-0 bg-background/50 backdrop-blur">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowBackDialog(true)}
            className="gap-1.5 text-xs shrink-0"
          >
            <ChevronLeft className="size-4" />
            Back to transaction
          </Button>
          <Separator orientation="vertical" className="h-5" />
          <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
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

        <div className="flex items-center gap-2">
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
          <Button variant="outline" size="sm" className="h-8 px-3 text-xs gap-1.5">
            <Download className="size-3.5" /> Export
          </Button>
        </div>
      </header>

      {/* --- Workflow Banner --- */}
      {renderWorkflowBanner()}

      {/* --- Financial Strip + Workflow Rail --- */}
      <div className="h-11 border-b bg-muted/5 flex items-center px-6 shrink-0 overflow-x-auto">
        {/* KPIs */}
        <div className="flex items-center gap-5 shrink-0">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-[10px] text-muted-foreground">Total GCI</span>
            <span className="text-[12px] font-bold tabular-nums">${gciTotal.toLocaleString()}</span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-[10px] text-muted-foreground">After Deductions</span>
            <span className="text-[12px] font-bold tabular-nums">${grossAfterDeductions.toLocaleString()}</span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-[10px] text-muted-foreground">Net to Agents</span>
            <span className="text-[12px] font-bold tabular-nums text-emerald-600">${netPayable.toLocaleString()}</span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-[10px] text-muted-foreground">Team Portion</span>
            <span className="text-[12px] font-bold tabular-nums">${teamPortionTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* Horizontal Workflow Rail */}
        <div className="ml-auto flex items-center gap-1 shrink-0">
          {approvalSteps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-1">
              {i > 0 && (
                <ChevronRight className="size-3 text-muted-foreground/30 shrink-0" />
              )}
              <div
                className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap transition-colors",
                  step.status === "complete" && "bg-primary/10 text-primary",
                  step.status === "active" && "bg-primary text-primary-foreground",
                  step.status === "pending" && "text-muted-foreground/50"
                )}
              >
                {step.status === "complete" && <CheckCircle2 className="size-3 shrink-0" />}
                {step.status === "active" && <div className="size-1.5 rounded-full bg-current shrink-0" />}
                {step.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Body --- */}
      <div className="flex-1 flex overflow-hidden">
        {/* --- Left Panel (72%) --- */}
        <div className="flex-[0.72] overflow-y-auto border-r bg-muted/[0.02]">
          <div className="py-6 px-6 md:px-8 space-y-5">
            {isLocked ? (
              renderFinalizedView()
            ) : (
              <>
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
                    <CDASectionHeader
                      title="02. Pre-Split Deductions"
                      className="bg-transparent"
                    />
                    {isEditable && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-[10px] gap-1.5 px-2"
                          >
                            <Plus className="size-3" /> Add
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
                            <DropdownMenuItem onClick={() => setIsDeductionOpen(true)}>
                              Add Pre-Split Deduction
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                  <div className="divide-y divide-border/50">
                    {data.globalDeductions.map((d) => (
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
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-1">
                      03. Allocation Sides
                    </h3>
                    {isEditable && role !== "agent" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-[10px] gap-1.5"
                        onClick={() => setIsAllocationOpen(true)}
                      >
                        <Percent className="size-3" /> Change Allocation
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    {data.sides.map((side) => {
                      const sideAmount = grossAfterDeductions * (side.percentage / 100);
                      if (side.percentage === 0 && side.agents.length === 0 && role === "agent")
                        return null;
                      return (
                        <div
                          key={side.id}
                          className="border rounded-lg bg-background overflow-hidden shadow-sm border-border/60"
                        >
                          <div
                            className="flex items-center justify-between p-3.5 bg-muted/10 cursor-pointer hover:bg-muted/20 transition-colors"
                            onClick={() => setSelectedNode(`side-${side.id}`)}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={cn(
                                  "size-7 rounded-md flex items-center justify-center",
                                  side.type === "buyer"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-purple-100 text-purple-700"
                                )}
                              >
                                <Users className="size-3.5" />
                              </div>
                              <div>
                                <p className="text-[12px] font-semibold capitalize">
                                  {side.type} Side ({side.percentage}%)
                                </p>
                                <p className="text-[10px] text-muted-foreground tabular-nums">
                                  ${sideAmount.toLocaleString()} distributable
                                </p>
                              </div>
                            </div>
                            {isEditable && role !== "agent" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 text-[10px] px-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsAgentOpen(true);
                                }}
                              >
                                <UserPlus className="size-3 mr-1" /> Add Agent
                              </Button>
                            )}
                          </div>
                          <div className="divide-y divide-border/40">
                            {side.agents.map((agent) => renderAgentRow(agent, sideAmount))}
                            {side.agents.length === 0 && (
                              <div className="p-6 text-center">
                                <p className="text-[11px] text-muted-foreground italic">
                                  No agents assigned to this side
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Allocation Bar */}
                <div className="space-y-2 pt-2">
                  <div className="flex h-2 w-full rounded-full overflow-hidden bg-muted">
                    {data.sides
                      .flatMap((s) => s.agents)
                      .map((a, i) => (
                        <div
                          key={a.id}
                          className={cn(
                            "h-full transition-all",
                            i % 2 === 0 ? "bg-indigo-500" : "bg-emerald-500"
                          )}
                          style={{
                            width: `${(a.allocationPct / 100) * (data.sides.find((s) => s.agents.includes(a))?.percentage || 0)}%`,
                          }}
                        />
                      ))}
                  </div>
                  <div className="flex items-center justify-center flex-wrap gap-x-5 gap-y-1">
                    {data.sides
                      .flatMap((s) => s.agents)
                      .map((a, i) => (
                        <div key={a.id} className="flex items-center gap-1.5">
                          <div
                            className={cn(
                              "size-2 rounded-full",
                              i % 2 === 0 ? "bg-indigo-500" : "bg-emerald-500"
                            )}
                          />
                          <span className="text-[10px] text-muted-foreground">
                            {a.name} ({a.allocationPct}%)
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}

            {/* Audit Log Section */}
            <div className="border rounded-lg bg-background overflow-hidden shadow-sm border-border/60">
              <button
                onClick={() => setShowAuditLog(!showAuditLog)}
                className="w-full flex items-center justify-between px-4 py-3 bg-muted/20 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText className="size-3.5 text-muted-foreground" />
                  <span className="text-[12px] font-medium">Activity Log</span>
                  <span className="text-[10px] text-muted-foreground">
                    {auditEvents.length} events
                  </span>
                </div>
                {showAuditLog ? (
                  <ChevronUp className="size-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="size-4 text-muted-foreground" />
                )}
              </button>
              {showAuditLog && (
                <div className="px-6 py-4">
                  <AuditTimeline events={auditEvents} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- Right Panel (28%) --- */}
        <aside className="flex-[0.28] min-w-[340px] bg-background flex flex-col shrink-0 overflow-hidden">
          <ScrollArea className="flex-1">
            <div className="p-5 space-y-5">
              {/* Notes Preview */}
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[12px] font-semibold">Notes</p>
                    <p className="text-[10px] text-muted-foreground">
                      {notes.filter((n) => !n.resolved).length} unresolved
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-[10px] px-2"
                    onClick={() => setShowNotes(true)}
                  >
                    View all
                  </Button>
                </div>
                <div className="space-y-1.5">
                  {notes.slice(0, 2).map((note) => (
                    <div key={note.id} className="flex items-start gap-2">
                      <div className="size-1.5 rounded-full bg-muted-foreground/40 mt-1.5 shrink-0" />
                      <p className="text-[11px] text-muted-foreground truncate leading-tight">
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

              {/* Dynamic Inspector */}
              {selectedNode === "root" && (
                <div className="space-y-5">
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
                        />
                      </div>
                    </div>
                  </div>

                  {isEditable && (
                    <div className="space-y-1.5">
                      <Button
                        className="w-full h-9 text-[11px] justify-start"
                        variant="outline"
                        onClick={() => setIsDeductionOpen(true)}
                      >
                        <Plus className="size-3.5 mr-2" /> Add Credit
                      </Button>
                      <Button
                        className="w-full h-9 text-[11px] justify-start"
                        variant="outline"
                        onClick={() => setIsDeductionOpen(true)}
                      >
                        <Plus className="size-3.5 mr-2" /> Add Referral Fee
                      </Button>
                      {role !== "agent" && (
                        <Button
                          className="w-full h-9 text-[11px] justify-start"
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
                          <span>Sales Price</span>
                          <span>${data.purchasePrice.toLocaleString()}.00</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span>Rate ({data.commissionRate}%)</span>
                          <span className="text-muted-foreground">
                            × {data.commissionRate / 100}
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-[11px] font-bold pt-0.5">
                          <span>GCI Result</span>
                          <span className="text-primary">${gciTotal.toLocaleString()}.00</span>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}

              {selectedNode.startsWith("side-") && (
                <div className="space-y-5">
                  {(() => {
                    const sideId = selectedNode.split("-")[1];
                    const side = data.sides.find((s) => s.id === sideId);
                    if (!side) return null;
                    const sideAmount = grossAfterDeductions * (side.percentage / 100);
                    const agentCommissions = side.agents.reduce((sum, a) => {
                      const basis = sideAmount * (a.allocationPct / 100);
                      return sum + basis * a.planSplit;
                    }, 0);
                    const companyDollar = sideAmount - agentCommissions;
                    return (
                      <>
                        <div>
                          <h3 className="text-[13px] font-semibold capitalize">
                            {side.type} Side Allocation
                          </h3>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            {side.percentage}% of gross commission.
                          </p>
                        </div>
                        <div className="border rounded-lg overflow-hidden divide-y divide-border/50 bg-muted/5">
                          <SpreadsheetRow label="Side Gross" value={sideAmount} variant="header" />
                          <SpreadsheetRow
                            label="Agent Commissions"
                            value={-agentCommissions}
                            variant="danger"
                          />
                          <SpreadsheetRow label="Company Dollar" value={companyDollar} variant="total" />
                        </div>
                        {isEditable && (
                          <div className="space-y-1.5">
                            <Button
                              className="w-full h-9 text-[11px] justify-start"
                              variant="outline"
                              disabled={role === "agent"}
                              onClick={() => setIsAgentOpen(true)}
                            >
                              <UserPlus className="size-3.5 mr-2" /> Add Agent
                            </Button>
                            <Button
                              className="w-full h-9 text-[11px] justify-start"
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

              {selectedNode.startsWith("agent-") && (
                <div className="space-y-5">
                  {(() => {
                    const agentId = selectedNode.split("-")[1];
                    const agent = data.sides.flatMap((s) => s.agents).find((a) => a.id === agentId);
                    if (!agent) return null;
                    const side = data.sides.find((s) => s.agents.some((a) => a.id === agentId));
                    const sideAmount = grossAfterDeductions * ((side?.percentage || 0) / 100);
                    const agentBasis = sideAmount * (agent.allocationPct / 100);
                    const afterSplit = agentBasis * agent.planSplit;
                    const dedTotal = agent.deductions.reduce((s, d) => s + d.amount, 0);
                    const net = afterSplit - dedTotal;
                    return (
                      <>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-10 border-2 border-primary/10">
                            <AvatarImage src={agent.avatar} />
                            <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-[13px] font-semibold">{agent.name}</h3>
                            <p className="text-[11px] text-muted-foreground">{agent.planName}</p>
                          </div>
                        </div>

                        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 rounded-lg text-center">
                          <p className="text-[10px] text-emerald-600 font-semibold uppercase tracking-widest mb-1">
                            Estimated Net Payout
                          </p>
                          <p className="text-2xl font-bold text-emerald-700 tabular-nums">
                            ${net.toLocaleString()}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                            Worksheet
                          </h4>
                          <div className="divide-y divide-border/50 border rounded-lg bg-muted/5">
                            <div className="flex justify-between p-3 text-[12px]">
                              <span className="text-muted-foreground">Allocation Basis</span>
                              <span className="font-medium">${agentBasis.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between p-3 text-[12px]">
                              <span className="text-muted-foreground">
                                Split ({agent.planSplit * 100}%)
                              </span>
                              <span className="font-medium">
                                -${(agentBasis * (1 - agent.planSplit)).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between p-3 text-[12px]">
                              <span className="text-muted-foreground">Deductions</span>
                              <span className="font-medium text-red-600">
                                -${dedTotal.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        {isEditable && (
                          <div className="space-y-1.5">
                            <Button
                              className="w-full h-9 text-[11px]"
                              disabled={role === "agent"}
                              variant="secondary"
                            >
                              Apply Plan
                            </Button>
                            <Button
                              className="w-full h-9 text-[11px]"
                              variant="outline"
                              onClick={() => setIsDeductionOpen(true)}
                            >
                              Add Post-Split Deduction
                            </Button>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              )}

              {selectedNode.startsWith("deduction-") && (
                <div className="space-y-5">
                  {(() => {
                    const dedId = selectedNode.split("-")[1];
                    const ded = data.globalDeductions.find((d) => d.id === dedId);
                    if (!ded) return null;
                    return (
                      <>
                        <div>
                          <h3 className="text-[13px] font-semibold">{ded.label}</h3>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            Pre-split transaction deduction.
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
                              <p className="text-[11px] font-medium mt-1">TL, Radius</p>
                            </div>
                          </div>
                        </div>
                        {isEditable && role !== "agent" && (
                          <div className="space-y-1.5">
                            <Button className="w-full h-9 text-[11px]" variant="outline">
                              Edit Deduction
                            </Button>
                            <Button
                              className="w-full h-9 text-[11px] text-red-600"
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

          {/* Inspector Footer Info */}
          <div className="p-4 border-t bg-muted/10 shrink-0">
            <div className="flex items-start gap-2.5 p-3 bg-muted/40 rounded-lg">
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

      {/* --- Footer Action Bar --- */}
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
        <div className="flex items-center gap-3">{renderFooterCTA()}</div>
      </footer>

      {/* --- Notes Sheet --- */}
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

      {/* --- TL Request Changes Dialog --- */}
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

      {/* --- Add Deduction Dialog --- */}
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
              <Label htmlFor="name" className="text-right text-sm">
                Name
              </Label>
              <Input id="name" placeholder="Referral Fee" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right text-sm">
                Amount
              </Label>
              <div className="col-span-3 relative">
                <DollarSign className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <Input id="amount" placeholder="0.00" className="pl-9" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right text-sm">
                Type
              </Label>
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
            <Button variant="outline" onClick={() => setIsDeductionOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsDeductionOpen(false)}>Add Deduction</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- Add Agent Dialog --- */}
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
              <Label htmlFor="agent" className="text-right text-sm">
                Search
              </Label>
              <Input id="agent" placeholder="Name or email..." className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="alloc" className="text-right text-sm">
                Allocation
              </Label>
              <div className="col-span-3 relative">
                <Percent className="absolute right-3 top-2.5 size-4 text-muted-foreground" />
                <Input id="alloc" placeholder="0" className="pr-9" />
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
            <Button variant="outline" onClick={() => setIsAgentOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAgentOpen(false)}>Assign Agent</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- Back Navigation Dialog --- */}
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
            <Button variant="outline" size="sm" onClick={() => navigate("/transaction-detail")}>
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
