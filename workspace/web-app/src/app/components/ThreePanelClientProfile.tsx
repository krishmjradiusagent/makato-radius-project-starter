import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { ChevronRight, ChevronDown, ChevronLeft, Plus, MessageSquare, Bell, Activity as ActivityIcon, StickyNote, Building2, Briefcase, Mail, Phone, MapPin, Archive, FileTextIcon, Sparkles, Sun, Moon, PhoneCall, MessageCircle, Smartphone, RefreshCw, Clock, Ban, X, Pencil, Trash2, MoreVertical, Send } from 'lucide-react';
import { DSButton, DSBadge } from './ds';
import { cn } from './ui/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Switch } from './ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from './ui/sidebar';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './ui/collapsible';
import { Separator } from './ui/separator';
import { FlipButton } from './ui/flip-button';
import { AuroraBars } from './ui/aurora-bars';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { AddFamilyMemberDialog } from './client-profile/AddFamilyMemberDialog';
import { AddCollaboratorDialog } from './client-profile/AddCollaboratorDialog';
import { BRBCCard } from './client-profile/BRBCCard';
import type { FamilyMemberDraft } from './client-profile/AddFamilyMemberDialog';
import type { CollaboratorDraft } from './client-profile/AddCollaboratorDialog';
import type { BRBCAgreementData } from './client-profile/BRBCCard';
import imgAvatar from "figma:asset/425014815828544c6be381aa86661be1b4dad5c3.png";

function InfIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8" />
    </svg>
  );
}

function SidebarMetadataRow({ label, value, variant = 'default' }: {
  label: string;
  value: string;
  variant?: 'default' | 'accent';
}) {
  return (
    <div className={cn(
      'flex min-h-12 w-full items-center justify-between border-b border-border px-4 py-0 text-sm',
      variant === 'accent'
        ? 'bg-sky-50 dark:bg-sky-950/40'
        : 'bg-emerald-50 dark:bg-emerald-950/40'
    )}>
      <span className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-none">{label}</span>
      <span className={cn('text-sm font-semibold leading-none',
        variant === 'accent'
          ? 'text-sky-900 dark:text-sky-300'
          : 'text-emerald-900 dark:text-emerald-300'
      )}>{value}</span>
    </div>
  );
}

function SidebarRow({ icon: Icon, label, right }: {
  icon?: React.ElementType;
  label: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 min-h-12 px-4 py-0 border-b border-border">
      {Icon && <Icon className="h-4 w-4 text-muted-foreground shrink-0" />}
      <span className="flex-1 text-sm font-medium text-muted-foreground leading-none">{label}</span>
      {right}
    </div>
  );
}

export function ThreePanelClientProfile() {
  const [activeTab, setActiveTab] = useState('activity');
  const [noteText, setNoteText] = useState('');
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  const [melSummaryExists, setMelSummaryExists] = useState(true);
  const [melGenerating, setMelGenerating] = useState(false);
  const [expandedPast, setExpandedPast] = useState<number | null>(null);
  const [melOpen, setMelOpen] = useState(true);

  // Contact data
  const contactEmails = [
    { id: 'e1', value: 'violet.cole@email.com', label: 'Primary' },
    { id: 'e2', value: 'v.cole@techsolutions.com', label: 'Work' },
    { id: 'e3', value: 'violet.cole.backup@email.com', label: 'Personal' },
  ];
  const contactPhones = [
    { id: 'p1', value: '(555) 123-4567', label: 'Mobile' },
    { id: 'p2', value: '(555) 987-6543', label: 'Work' },
  ];

  // Family members state
  const [familyMembers, setFamilyMembers] = useState([
    { id: 'fm1', name: 'Smith Zeglaya', relationship: 'Spouse', phone: '(818) 888-1234', email: 'smith.z@email.com', initials: 'SZ', color: 'from-pink-400 to-violet-400' },
    { id: 'fm2', name: 'Emma Cole', relationship: 'Child', phone: '', email: 'emma.cole@email.com', initials: 'EC', color: 'from-sky-400 to-blue-500' },
  ]);
  const [showAddFamily, setShowAddFamily] = useState(false);
  const [deleteFamilyTarget, setDeleteFamilyTarget] = useState<{ id: string; name: string } | null>(null);

  // Collaborators state
  const [collaborators, setCollaborators] = useState([
    { id: 'c1', name: 'Monica Miller', role: 'Co-agent', access: 'Full access', initials: 'MM', color: 'from-pink-400 to-violet-400', isInvited: false },
    { id: 'c2', name: 'David Chen', role: 'T.C.', access: 'Default level access', initials: 'DC', color: 'from-sky-400 to-blue-500', isInvited: false },
    { id: 'c3', name: 'Sarah Wilson', role: 'Lender', access: 'View only', initials: 'SW', color: 'from-emerald-400 to-teal-500', isInvited: true },
  ]);
  const [showAddCollaborator, setShowAddCollaborator] = useState(false);
  const [removeCollabTarget, setRemoveCollabTarget] = useState<{ id: string; name: string } | null>(null);

  // BRBC
  const [brbcAgreement] = useState<BRBCAgreementData>({
    status: 'agent_signature_pending',
    createdDate: 'May 1, 2026',
    recipients: [
      { name: 'You (Agent)', role: 'Agent', email: 'agent@radius.com', initials: 'AG', signingStatus: 'pending' },
      { name: 'Violet Cole', role: 'Buyer', email: 'violet.cole@email.com', initials: 'VC', signingStatus: 'signed' },
    ],
  });

  const pastSummaries = [
    { date: 'Oct 12, 2025', preview: 'Client app activity reviewed. No new transaction movement.', full: 'Violet\'s client app showed last activity on Oct 12, 2025. No new transaction movement detected. Relationship and contact details remain unchanged.' },
    { date: 'Jun 3, 2024',  preview: 'Client added from Radius Marketplace and assigned to Monica Miller.', full: 'Violet Cole was added via Radius Marketplace on Jun 3, 2024. Assigned to Monica Miller as primary agent. Initial client type set to New Client.' },
  ];

  const handleGenerateMel = () => {
    setMelGenerating(true);
    setTimeout(() => { setMelGenerating(false); setMelSummaryExists(true); }, 1800);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className={`h-screen flex overflow-hidden ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#fafafa]'}`}>
          {/* LEFT PANEL - always dark sidebar */}
          <Sidebar
            collapsible="none"
            className={`w-[320px] border-r ${isDark ? 'border-[#2d2d2d]' : 'border-gray-200'}`}
            style={isDark ? {
              '--sidebar': '#1a1a1a',
              '--sidebar-foreground': '#e5e5e5',
              '--sidebar-border': '#2d2d2d',
              '--sidebar-accent': '#262626',
              '--sidebar-accent-foreground': '#ffffff',
            } as React.CSSProperties : {
              '--sidebar': '#ffffff',
              '--sidebar-foreground': '#171717',
              '--sidebar-border': '#e5e5e5',
              '--sidebar-accent': '#f5f5f5',
              '--sidebar-accent-foreground': '#171717',
            } as React.CSSProperties}
          >
          <SidebarHeader className={`px-4 pt-3 pb-4 border-b ${isDark ? 'border-[#2d2d2d]' : 'border-[#e5e5e5]'}`}>
            {/* Back nav */}
            <button className={`flex items-center gap-1.5 text-xs mb-4 -ml-0.5 transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
              <ChevronRight className="h-3.5 w-3.5 rotate-180" />
              <span>Back to active clients</span>
            </button>

          {/* Profile Card */}
          <div className={`rounded-xl border overflow-hidden mb-3 ${isDark ? 'bg-[#262626] border-[#3d3d3d]' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center gap-3 p-3">
              <Avatar className={`h-11 w-11 shrink-0 ring-2 ${isDark ? 'ring-[#3d3d3d]' : 'ring-slate-200'}`}>
                <AvatarImage src={imgAvatar} alt="Violet Cole" className="object-cover object-top" />
                <AvatarFallback className={`text-sm ${isDark ? 'bg-[#3d3d3d] text-white' : 'bg-slate-100 text-slate-700'}`}>VC</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h2 className={`text-sm font-bold leading-tight truncate ${isDark ? 'text-white' : 'text-slate-950'}`}>Violet Cole</h2>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Palo Alto, CA</p>
              </div>
            </div>
            <div className={`h-px ${isDark ? 'bg-[#3d3d3d]' : 'bg-slate-200'}`} />
            <div className="flex gap-3 flex-wrap px-3 py-2">
              <span className={`text-[11px] font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Buyer</span>
              <span className={`text-[11px] font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Seller</span>
              <span className={`text-[11px] font-medium ${isDark ? 'text-teal-400' : 'text-teal-600'}`}>Landlord</span>
              <span className={`text-[11px] font-medium ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>Tenant</span>
            </div>
            <div className={`h-px ${isDark ? 'bg-[#3d3d3d]' : 'bg-slate-200'}`} />
            <div className="grid grid-cols-3">
              <button className="flex items-center justify-center py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white transition-colors">
                <PhoneCall className="h-4 w-4" />
              </button>
              <button className="flex items-center justify-center py-2.5 border-x border-blue-400 bg-blue-500 hover:bg-blue-600 text-white transition-colors">
                <MessageSquare className="h-4 w-4" />
              </button>
              <button className="flex items-center justify-center py-2.5 bg-violet-500 hover:bg-violet-600 text-white transition-colors">
                <MessageCircle className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Status and Owner */}
          <div className="space-y-2">
            <Select defaultValue="new-client">
              <SelectTrigger className={`w-full text-xs h-8 ${isDark ? 'bg-emerald-900/20 border-emerald-800 text-emerald-300' : 'bg-emerald-50 border-emerald-300 text-emerald-700'}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new-client">New Client</SelectItem>
                <SelectItem value="active">Active</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="monica">
              <SelectTrigger className={`w-full text-xs h-8 ${isDark ? 'bg-[#262626] border-[#3d3d3d] text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
                <div className="flex items-center gap-2">
                  <Avatar className="h-4 w-4">
                    <AvatarFallback className="text-[10px] bg-pink-500 text-white">MM</AvatarFallback>
                  </Avatar>
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monica">Monica Miller</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-0 gap-0">
          {/* Mel Summary — premium AI card */}
          <Collapsible open={melOpen} onOpenChange={setMelOpen}>
            <div className="relative overflow-hidden border-b border-border bg-background">
              {/* Header row */}
              <CollapsibleTrigger asChild>
                <button onClick={() => setMelOpen(o => !o)} className="relative flex w-full items-center justify-between px-4 pt-3 pb-2 text-left">
                  <span className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">Mel Summary</span>
                    {melSummaryExists && (
                      <span className="text-[11px] text-muted-foreground font-normal">· Updated today</span>
                    )}
                  </span>
                  <ChevronDown className={cn('h-4 w-4 text-muted-foreground transition-transform duration-200', melOpen ? 'rotate-180' : '')} />
                </button>
              </CollapsibleTrigger>

              {/* CTA — always visible */}
              <div className="relative px-4 pb-3">
                <motion.button
                  onClick={handleGenerateMel}
                  disabled={melGenerating}
                  whileHover="hover"
                  initial="initial"
                  className="relative w-full overflow-hidden rounded-md text-white disabled:opacity-50 h-9 flex items-center justify-between px-3 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 hover:from-slate-800 hover:via-indigo-900 hover:to-slate-800 border border-violet-500/35 transition-all"
                >
                  <AuroraBars
                    barCount={60}
                    speed={2.1}
                    blur={12}
                    background="transparent"
                    colors={["#3730a3", "#4c1d95", "#1e40af", "#4338ca", "#2d1b69", "#5b21b6"]}
                  />
                  {/* Shine sweep */}
                  <motion.div
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)" }}
                    variants={{ initial: { x: "-100%" }, hover: { x: "100%" } }}
                    transition={{ duration: 0.55, ease: "easeInOut" }}
                  />
                  <span className="relative flex items-center gap-2 text-sm font-semibold">
                    <InfIcon className="h-4 w-4 text-violet-300" />
                    {melGenerating ? 'Generating…' : 'Summarise Violet'}
                  </span>
                  <span className="relative flex items-center gap-0.5 rounded-full bg-white/10 border border-white/20 px-2 py-0.5 text-[10px] font-semibold text-white/70">
                    <span>⌘</span><span>S</span>
                  </span>
                </motion.button>
              </div>

              {/* Collapsible body */}
              <CollapsibleContent>
                <div className="relative px-4 pb-4 flex flex-col gap-3">
                  <Separator className="bg-border/60" />

                  {melSummaryExists ? (
                    <div className="rounded-lg border border-violet-100 bg-white/60 p-3 flex flex-col gap-2 dark:border-violet-900/30 dark:bg-violet-950/20">
                      <p className="text-xs text-foreground leading-relaxed line-clamp-3">
                        Violet is a multi-role client connected to buyer, seller, landlord, and tenant workflows. She was added from Radius Marketplace and is currently marked as New Client. Monica Miller owns the relationship. She has one spouse relationship on file and client app activity was last seen Oct 12, 2025.
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] text-muted-foreground">Generated by Mel · Today</p>
                        <button className="text-[11px] font-medium text-violet-600 dark:text-violet-400 hover:underline">
                          View all
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Generate a quick client summary using profile details, relationships, source, status, and recent activity.
                    </p>
                  )}

                  {pastSummaries.length > 0 && (
                    <div className="flex flex-col">
                      <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-1.5">Past summaries</p>
                      {pastSummaries.map((s, i) => (
                        <div key={i} className="border-t border-border/60 first:border-0">
                          <button
                            className="w-full flex items-center justify-between py-2 text-left group hover:bg-muted/40 -mx-1 px-1 rounded transition-colors"
                          >
                            <div className="flex flex-col gap-0.5 min-w-0 flex-1 pr-2">
                              <span className="text-[11px] font-medium text-muted-foreground">{s.date}</span>
                              <span className="text-xs text-muted-foreground truncate">{s.preview}</span>
                            </div>
                            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-muted-foreground shrink-0 transition-colors" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CollapsibleContent>

            </div>
          </Collapsible>

          {/* Tags */}
          <Accordion type="single" collapsible defaultValue="tags">
            <AccordionItem value="tags" className="border-none">
              <AccordionTrigger className="px-4 py-0 min-h-12 text-sm font-medium text-muted-foreground hover:no-underline hover:text-foreground border-b border-border">
                Tags
              </AccordionTrigger>
              <AccordionContent className="border-b border-border pb-0">
                <div className="px-4 py-3 flex flex-wrap gap-2">
                  {[
                    { tag: '901',          cls: 'bg-stone-100 text-stone-700 border-stone-200 dark:bg-stone-800/50 dark:text-stone-300 dark:border-transparent' },
                    { tag: 'First Client', cls: 'bg-sky-50 text-sky-700 border-sky-100 dark:bg-sky-950/50 dark:text-sky-300 dark:border-transparent' },
                    { tag: 'Buyer',        cls: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-transparent' },
                    { tag: 'Lease',        cls: 'bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-transparent' },
                    { tag: 'FSBO',         cls: 'bg-amber-50 text-amber-800 border-amber-100 dark:bg-amber-950/50 dark:text-amber-300 dark:border-transparent' },
                    { tag: 'Investor',     cls: 'bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-950/50 dark:text-purple-300 dark:border-transparent' },
                    { tag: 'Future',       cls: 'bg-teal-50 text-teal-700 border-teal-100 dark:bg-teal-950/50 dark:text-teal-300 dark:border-transparent' },
                  ].map(({ tag, cls }) => (
                    <span key={tag} className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium', cls)}>{tag}</span>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Co-agent */}
          <Accordion type="single" collapsible defaultValue="coagent">
            <AccordionItem value="coagent" className="border-none">
              <AccordionTrigger className="px-4 py-0 min-h-12 text-sm font-medium text-muted-foreground hover:no-underline hover:text-foreground border-b border-border">
                Co-agent
              </AccordionTrigger>
              <AccordionContent className="border-b border-border pb-0">
                <div className="px-4 py-2.5">
                  <p className="text-xs font-medium text-foreground leading-tight">Sarah Johnson</p>
                  <p className="text-[11px] mt-0.5 text-muted-foreground">sarah.johnson@realty.com</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Contact */}
          <Accordion type="single" collapsible defaultValue="contact">
            <AccordionItem value="contact" className="border-none">
              <AccordionTrigger className="px-4 py-0 min-h-12 text-sm font-medium text-muted-foreground hover:no-underline hover:text-foreground border-b border-border">
                <span className="flex items-center gap-2">
                  Contact
                  <DSBadge variant="secondary" className="h-4 px-1.5 rounded-full text-[10px]">{contactEmails.length + contactPhones.length + 1}</DSBadge>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                {/* Emails */}
                {contactEmails.map((email, i) => (
                  <div key={email.id}>
                    <div className="group flex items-center gap-3 min-h-10 px-4 py-1.5">
                      <Mail className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                      <p className="text-xs leading-tight text-foreground flex-1 truncate">{email.value}</p>
                      <DSBadge variant="outline" className="text-[10px] h-4 px-1 border-border text-muted-foreground shrink-0">{email.label}</DSBadge>
                      <div className="flex opacity-0 group-hover:opacity-100 transition-opacity gap-0.5 ml-1">
                        <button className={`p-1 rounded ${isDark ? 'hover:bg-[#3d3d3d]' : 'hover:bg-gray-100'}`}><Pencil className="h-3 w-3 text-muted-foreground" /></button>
                        <button className={`p-1 rounded ${isDark ? 'hover:bg-[#3d3d3d]' : 'hover:bg-gray-100'}`}><Trash2 className="h-3 w-3 text-muted-foreground" /></button>
                      </div>
                      <div className="sm:hidden">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><button className="p-1 rounded"><MoreVertical className="h-3.5 w-3.5 text-muted-foreground" /></button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-28">
                            <DropdownMenuItem><Pencil className="h-3.5 w-3.5 mr-2" />Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive"><Trash2 className="h-3.5 w-3.5 mr-2" />Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    {i < contactEmails.length - 1 && <div className="h-px border-b border-border mx-4" />}
                  </div>
                ))}
                <div className="h-px border-b border-border" />
                {/* Phones */}
                {contactPhones.map((phone, i) => (
                  <div key={phone.id}>
                    <div className="group flex items-center gap-3 min-h-10 px-4 py-1.5">
                      <Phone className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                      <p className="text-xs leading-tight text-foreground flex-1 truncate">{phone.value}</p>
                      <DSBadge variant="outline" className="text-[10px] h-4 px-1 border-border text-muted-foreground shrink-0">{phone.label}</DSBadge>
                      <div className="flex opacity-0 group-hover:opacity-100 transition-opacity gap-0.5 ml-1">
                        <button className={`p-1 rounded ${isDark ? 'hover:bg-[#3d3d3d]' : 'hover:bg-gray-100'}`}><Pencil className="h-3 w-3 text-muted-foreground" /></button>
                        <button className={`p-1 rounded ${isDark ? 'hover:bg-[#3d3d3d]' : 'hover:bg-gray-100'}`}><Trash2 className="h-3 w-3 text-muted-foreground" /></button>
                      </div>
                      <div className="sm:hidden">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><button className="p-1 rounded"><MoreVertical className="h-3.5 w-3.5 text-muted-foreground" /></button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-28">
                            <DropdownMenuItem><Pencil className="h-3.5 w-3.5 mr-2" />Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive"><Trash2 className="h-3.5 w-3.5 mr-2" />Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    {i < contactPhones.length - 1 && <div className="h-px border-b border-border mx-4" />}
                  </div>
                ))}
                <div className="h-px border-b border-border" />
                {/* Address */}
                <div className="group flex items-start gap-3 min-h-10 px-4 py-2">
                  <MapPin className="h-4 w-4 flex-shrink-0 text-muted-foreground mt-0.5" />
                  <p className="text-xs leading-tight text-foreground flex-1">123 Mission Street, Palo Alto, CA 54323</p>
                  <div className="flex opacity-0 group-hover:opacity-100 transition-opacity gap-0.5 mt-0.5">
                    <button className={`p-1 rounded ${isDark ? 'hover:bg-[#3d3d3d]' : 'hover:bg-gray-100'}`}><Pencil className="h-3 w-3 text-muted-foreground" /></button>
                  </div>
                </div>
                {/* Add link */}
                <div className="px-4 py-2 border-b border-border">
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <Plus className="h-3 w-3" /> Add contact detail
                  </button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Added on / Source */}
          <SidebarMetadataRow label="Added on" value="JUN 3 2024" variant="accent" />
          <SidebarMetadataRow label="Source" value="Radius Marketplace" variant="default" />

          {/* Archived */}
          <SidebarRow icon={Archive} label="Archived" />

          {/* AI Prospecting */}
          <div className="flex items-center gap-3 min-h-12 px-4 py-0 border-b border-border">
            <Sparkles className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="flex-1 text-sm font-medium text-muted-foreground leading-none">AI Prospecting</span>
            <Switch defaultChecked className="scale-75 origin-right" />
          </div>

          {/* Buyer/Tenant Representation */}
          <SidebarRow icon={Briefcase} label="Buyer/Tenant Representation" />

          {/* Relationships */}
          <Accordion type="single" collapsible defaultValue="relationships">
            <AccordionItem value="relationships" className="border-none">
              <AccordionTrigger className="px-4 py-0 min-h-12 text-sm font-medium text-muted-foreground hover:no-underline hover:text-foreground border-b border-border">
                <span className="flex items-center gap-2">
                  Relationships
                  <DSBadge variant="secondary" className="h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px]">1</DSBadge>
                </span>
              </AccordionTrigger>
              <AccordionContent className="border-b border-border pb-0">
                <div className="flex items-center gap-3 min-h-12 px-4 py-0">
                  <Avatar className="h-7 w-7 shrink-0">
                    <AvatarFallback className="text-[10px] bg-pink-500 text-white">SZ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-medium text-foreground">Smith Zeglaya</p>
                      <DSBadge variant="outline" className="text-[10px] h-4 px-1 border-border text-muted-foreground">Spouse</DSBadge>
                    </div>
                    <p className="text-[11px] text-muted-foreground">818-888-1234</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Family Members */}
          <Accordion type="single" collapsible>
            <AccordionItem value="family" className="border-none">
              <AccordionTrigger className="px-4 py-0 min-h-12 text-sm font-medium text-muted-foreground hover:no-underline hover:text-foreground border-b border-border">
                <span className="flex items-center gap-2 flex-1">
                  Family Members
                  {familyMembers.length > 0 && <DSBadge variant="secondary" className="h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px]">{familyMembers.length}</DSBadge>}
                  <span className="ml-auto flex items-center gap-1 mr-1">
                    <span role="button" tabIndex={0} onClick={e => { e.stopPropagation(); }} onKeyDown={e => e.key==='Enter'&&e.stopPropagation()} className={`p-1 rounded cursor-pointer ${isDark ? 'hover:bg-[#3d3d3d]' : 'hover:bg-gray-100'}`} title="Send app invite"><Send className="h-3.5 w-3.5 text-muted-foreground" /></span>
                    <span role="button" tabIndex={0} onClick={e => { e.stopPropagation(); setShowAddFamily(true); }} onKeyDown={e => e.key==='Enter'&&(e.stopPropagation(),setShowAddFamily(true))} className={`p-1 rounded cursor-pointer ${isDark ? 'hover:bg-[#3d3d3d]' : 'hover:bg-gray-100'}`}><Plus className="h-3.5 w-3.5 text-muted-foreground" /></span>
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="border-b border-border pb-0">
                {familyMembers.length === 0 ? (
                  <p className="text-xs px-4 py-2.5 text-muted-foreground">No family members added.</p>
                ) : familyMembers.map((m, i) => (
                  <div key={m.id}>
                    <div className="group flex items-center gap-3 min-h-12 px-4 py-1.5">
                      <Avatar className="h-7 w-7 shrink-0">
                        <AvatarFallback className={`text-[10px] font-semibold bg-gradient-to-br ${m.color} text-white`}>{m.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-medium text-foreground">{m.name}</p>
                          <DSBadge variant="outline" className="text-[10px] h-4 px-1 border-border text-muted-foreground">{m.relationship}</DSBadge>
                        </div>
                        <p className="text-[11px] text-muted-foreground">{m.phone || m.email}</p>
                      </div>
                      <div className="hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity gap-0.5">
                        <button className={`p-1 rounded ${isDark ? 'hover:bg-[#3d3d3d]' : 'hover:bg-gray-100'}`}><Pencil className="h-3 w-3 text-muted-foreground" /></button>
                        <button onClick={() => setDeleteFamilyTarget({ id: m.id, name: m.name })} className={`p-1 rounded ${isDark ? 'hover:bg-[#3d3d3d]' : 'hover:bg-gray-100'}`}><Trash2 className="h-3 w-3 text-muted-foreground" /></button>
                      </div>
                      <div className="sm:hidden">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><button className="p-1 rounded"><MoreVertical className="h-3.5 w-3.5 text-muted-foreground" /></button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-28">
                            <DropdownMenuItem><Pencil className="h-3.5 w-3.5 mr-2" />Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setDeleteFamilyTarget({ id: m.id, name: m.name })} className="text-destructive focus:text-destructive"><Trash2 className="h-3.5 w-3.5 mr-2" />Remove</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    {i < familyMembers.length - 1 && <div className="h-px border-b border-border mx-4" />}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Collaborators */}
          <Accordion type="single" collapsible>
            <AccordionItem value="collaborators" className="border-none">
              <AccordionTrigger className="px-4 py-0 min-h-12 text-sm font-medium text-muted-foreground hover:no-underline hover:text-foreground border-b border-border">
                <span className="flex items-center gap-2 flex-1">
                  Collaborators
                  {collaborators.length > 0 && <DSBadge variant="secondary" className="h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px]">{collaborators.length}</DSBadge>}
                  <span role="button" tabIndex={0} onClick={e => { e.stopPropagation(); setShowAddCollaborator(true); }} onKeyDown={e => e.key==='Enter'&&(e.stopPropagation(),setShowAddCollaborator(true))} className={`ml-auto mr-1 p-1 rounded cursor-pointer ${isDark ? 'hover:bg-[#3d3d3d]' : 'hover:bg-gray-100'}`}><Plus className="h-3.5 w-3.5 text-muted-foreground" /></span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="border-b border-border pb-0">
                {collaborators.length === 0 ? (
                  <p className="text-xs px-4 py-2.5 text-muted-foreground">No collaborators added.</p>
                ) : collaborators.map((c, i) => (
                  <div key={c.id}>
                    <div className="group flex items-center gap-3 min-h-12 px-4 py-1.5">
                      <Avatar className="h-7 w-7 shrink-0">
                        <AvatarFallback className={`text-[10px] font-semibold bg-gradient-to-br ${c.color} text-white`}>{c.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <p className="text-xs font-medium text-foreground">{c.name}</p>
                          <DSBadge variant="outline" className="text-[10px] h-4 px-1 border-border text-muted-foreground">{c.role}</DSBadge>
                          {c.isInvited && <DSBadge variant="outline" className="text-[10px] h-4 px-1 bg-amber-50 text-amber-700 border-amber-200">Invited</DSBadge>}
                        </div>
                        <p className="text-[11px] text-muted-foreground">{c.access}</p>
                      </div>
                      <div className="hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity gap-0.5">
                        <button className={`p-1 rounded ${isDark ? 'hover:bg-[#3d3d3d]' : 'hover:bg-gray-100'}`}><Pencil className="h-3 w-3 text-muted-foreground" /></button>
                        <button onClick={() => setRemoveCollabTarget({ id: c.id, name: c.name })} className={`p-1 rounded ${isDark ? 'hover:bg-[#3d3d3d]' : 'hover:bg-gray-100'}`}><Trash2 className="h-3 w-3 text-muted-foreground" /></button>
                      </div>
                      <div className="sm:hidden">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><button className="p-1 rounded"><MoreVertical className="h-3.5 w-3.5 text-muted-foreground" /></button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-28">
                            <DropdownMenuItem><Pencil className="h-3.5 w-3.5 mr-2" />Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setRemoveCollabTarget({ id: c.id, name: c.name })} className="text-destructive focus:text-destructive"><Trash2 className="h-3.5 w-3.5 mr-2" />Remove</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    {i < collaborators.length - 1 && <div className="h-px border-b border-border mx-4" />}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Details / Background / Custom fields / Additional Details */}
          <Accordion type="multiple" className="w-full">
            {[
              { value: 'details', label: 'Details', rows: [['Agent','Blaize Zeglaya'],['Timeline','0-3 Months']] },
              { value: 'background', label: 'Background', rows: [] },
              { value: 'custom', label: 'Custom fields', rows: [] },
              { value: 'additional', label: 'Additional Details', rows: [
                ['Gender','Female'],
                ['Location','Palo Alto, CA'],
                ['Birthday','Mar 15, 1985'],
                ['Spouse Birthday','Jul 22, 1983'],
                ['Home Anniversary','Jun 10, 2015'],
                ['Company','TechSolutions Inc.'],
                ['Website','violet.techsolutions.com'],
                ['Facebook','—'],
                ['Twitter','—'],
                ['LinkedIn','—'],
                ['Attorney','James Parker'],
                ['First Call Date','JUN 3 2024'],
                ['Close Date','—'],
                ['Commission %','3%'],
                ['Priority Status','High'],
                ['Last Visit','Jan 12, 2025'],
                ['Listings Viewed','24'],
                ['Showing Requests','6'],
                ['Favorites','8'],
              ]},
            ].map(({ value, label, rows }) => (
              <AccordionItem key={value} value={value} className="border-none">
                <AccordionTrigger className="px-4 py-0 min-h-12 text-sm font-medium text-muted-foreground hover:no-underline hover:text-foreground border-b border-border">
                  {label}
                </AccordionTrigger>
                <AccordionContent className="border-b border-border pb-0">
                  {rows.length === 0
                    ? <p className="text-xs px-4 py-2.5 text-muted-foreground">None</p>
                    : <div className="px-4 py-1">
                        {rows.map(([k, v]) => (
                          <div key={k} className="flex justify-between items-center py-1.5 border-b border-border last:border-0">
                            <span className="text-[11px] text-muted-foreground">{k}</span>
                            <span className="text-[11px] font-medium text-foreground">{v}</span>
                          </div>
                        ))}
                      </div>
                  }
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Client App */}
          <div className="flex items-center gap-3 min-h-12 px-4 py-0 border-b border-border">
            <Smartphone className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="flex-1 text-xs font-medium text-muted-foreground">Client App</span>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-[10px] text-muted-foreground">Last active Oct 12, 2025</span>
              <DSBadge variant="outline" className="text-[10px] h-5 px-1.5 border-border text-muted-foreground cursor-pointer hover:text-foreground">Invite</DSBadge>
            </div>
          </div>
        </SidebarContent>

        <SidebarFooter className="px-4 py-3 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {isDark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
              <span>{isDark ? 'Dark mode' : 'Light mode'}</span>
            </div>
            <Switch checked={isDark} onCheckedChange={(v) => setTheme(v ? 'dark' : 'light')} className="scale-75 origin-right" />
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* MIDDLE PANEL - Content */}
      <div className={`flex-1 overflow-y-auto ${isDark ? 'bg-[#111111]' : 'bg-white'}`}>
        <div className="p-6 space-y-6">
          {/* Header with Tabs */}
          <div className={`flex items-center gap-1 border-b ${isDark ? 'border-[#2d2d2d]' : 'border-gray-200'}`}>
            {[
              { id: 'activity', icon: ActivityIcon, label: 'Activity' },
              { id: 'notes', icon: StickyNote, label: 'Notes' },
              { id: 'properties', icon: Building2, label: 'Properties' },
              { id: 'offers', icon: Briefcase, label: 'Offers' },
              { id: 'reminders', icon: Bell, label: 'Reminders' },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 -mb-px transition-colors ${
                  activeTab === id
                    ? isDark ? 'border-white text-white' : 'border-black text-black'
                    : isDark ? 'border-transparent text-gray-500 hover:text-gray-300' : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>

          {/* BRBC */}
          <BRBCCard agreement={brbcAgreement} isDark={isDark} />

          {/* Note Composer */}
          <Card className={`p-4 shadow-sm ${isDark ? 'bg-[#1a1a1a] border-[#2d2d2d]' : 'bg-gradient-to-br from-background via-blue-50/60 to-violet-50/40 border-blue-200/60'}`}>
            <Textarea
              placeholder="Add notes..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className={`min-h-[80px] resize-none ${isDark ? 'bg-[#262626] border-[#3d3d3d] text-white placeholder:text-gray-500' : 'border-gray-200'}`}
            />
            <div className="flex items-center justify-end gap-2 mt-3">
              <Select defaultValue="general">
                <SelectTrigger className={`w-[140px] ${isDark ? 'bg-[#262626] border-[#3d3d3d] text-white' : 'border-gray-200'}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="transaction">Transaction</SelectItem>
                  <SelectItem value="search">Search</SelectItem>
                </SelectContent>
              </Select>
              <DSButton size="sm" className={isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}>Add Note</DSButton>
            </div>
          </Card>

          {/* Tab Content */}
          {activeTab === 'activity' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Select defaultValue="all">
                  <SelectTrigger className={`w-[180px] ${isDark ? 'bg-[#1a1a1a] border-[#2d2d2d] text-white' : 'border-gray-200'}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Activity</SelectItem>
                  </SelectContent>
                </Select>
                <DSButton variant="ghost" size="sm" className={isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}>
                  Export Activity
                </DSButton>
              </div>
              <div className="space-y-4">
                <div className={`text-xs font-medium uppercase tracking-wide ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Today 15 Jan 2025</div>
                {[
                  { text: 'Mortgage status pre-approved.' },
                  { text: '{Client_name} started a search for "2-bed condos under $800K in San Francisco."' },
                  { text: '{Agent_name} started a search for default "New Market for the client in Palo Alto."' },
                ].map((item, i) => (
                  <Card key={i} className={`p-4 shadow-sm ${isDark ? 'bg-[#1a1a1a] border-[#2d2d2d]' : 'bg-gradient-to-br from-background via-blue-50/60 to-violet-50/40 border-blue-200/60'}`}>
                    <p className={`text-sm ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{item.text}</p>
                    <p className="text-xs text-gray-500 mt-1">less than a minute ago</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {['notes', 'properties', 'offers', 'reminders'].includes(activeTab) && (
            <Card className={`p-8 shadow-sm text-center ${isDark ? 'bg-[#1a1a1a] border-[#2d2d2d]' : 'bg-gradient-to-br from-background via-blue-50/60 to-violet-50/40 border-blue-200/60'}`}>
              <p className="text-sm text-gray-500">No {activeTab} yet</p>
            </Card>
          )}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className={`w-[320px] shrink-0 border-l overflow-y-auto ${isDark ? 'border-[#2d2d2d] bg-[#111111]' : 'border-gray-200 bg-white'}`}>
        <div className="p-5 space-y-5">
          {/* Transactions and Listings */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Transactions and listings</h3>
              <div className="flex items-center gap-1">
                <button className={`h-7 w-7 flex items-center justify-center rounded ${isDark ? 'hover:bg-[#262626]' : 'hover:bg-gray-100'}`}>
                  <Plus className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-blue-600'}`} />
                </button>
                <button className={`h-7 w-7 flex items-center justify-center rounded ${isDark ? 'hover:bg-[#262626]' : 'hover:bg-gray-100'}`}>
                  <ChevronRight className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-blue-600'}`} />
                </button>
              </div>
            </div>
            <Card className={`p-3 shadow-sm hover:shadow-md transition-shadow ${isDark ? 'bg-[#1a1a1a] border-[#2d2d2d]' : 'bg-gradient-to-br from-background via-blue-50/60 to-violet-50/40 border-blue-200/60'}`}>
              <div className="space-y-2">
                <p className={`text-sm font-medium leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>456 Sunset Boulevard, Los Angeles, CA 90028</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>3 beds · 3 baths · 2,500 sqft</p>
                <p className="text-xs text-gray-500">Acceptance Date: 01/12/2025<br />Close of escrow: 06/12/2025</p>
                <DSBadge variant="secondary" className="mt-2 text-xs bg-emerald-50 text-emerald-700 border-emerald-200">In new client ✓</DSBadge>
              </div>
            </Card>
            <Card className={`p-3 shadow-sm hover:shadow-md transition-shadow ${isDark ? 'bg-[#1a1a1a] border-[#2d2d2d]' : 'bg-gradient-to-br from-background via-blue-50/60 to-violet-50/40 border-blue-200/60'}`}>
              <div className="space-y-2">
                <p className={`text-sm font-medium leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>1234 Market Street, Suite 567, San Francisco, CA 94103, USA</p>
                <p className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>$730,000.00</p>
                <p className="text-xs text-gray-500">Acceptance Date: 01/12/2025<br />Close of escrow: 06/12/2025</p>
                <DSBadge variant="secondary" className="mt-2 text-xs bg-emerald-50 text-emerald-700 border-emerald-200">In incomplete contract ✓</DSBadge>
              </div>
            </Card>
          </div>

          <div className={`h-px ${isDark ? 'bg-[#2d2d2d]' : 'bg-gray-200'}`}></div>

          {/* Searches */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Searches</h3>
              <div className="flex items-center gap-1">
                <button className={`h-7 w-7 flex items-center justify-center rounded ${isDark ? 'hover:bg-[#262626]' : 'hover:bg-gray-100'}`}>
                  <Plus className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-blue-600'}`} />
                </button>
                <button className={`h-7 w-7 flex items-center justify-center rounded ${isDark ? 'hover:bg-[#262626]' : 'hover:bg-gray-100'}`}>
                  <ChevronRight className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-blue-600'}`} />
                </button>
              </div>
            </div>
            <Card className={`p-3 shadow-sm hover:shadow-md transition-shadow ${isDark ? 'bg-[#1a1a1a] border-[#2d2d2d]' : 'bg-gradient-to-br from-background via-blue-50/60 to-violet-50/40 border-blue-200/60'}`}>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>San-Francisco-Area-Apartments</p>
                  <DSBadge variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">Active</DSBadge>
                </div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>$1,490,000 - $2,495,000<br />3beds, Atlanta, San Francisco, N... · 4 offers</p>
                <p className="text-xs text-gray-500">Last updated on: 08/12/2025</p>
              </div>
            </Card>
          </div>

          <div className={`h-px ${isDark ? 'bg-[#2d2d2d]' : 'bg-gray-200'}`}></div>

          {/* Financing */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Financing</h3>
              <button className={`h-7 w-7 flex items-center justify-center rounded ${isDark ? 'hover:bg-[#262626]' : 'hover:bg-gray-100'}`}>
                <ChevronRight className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Dialogs */}
      <AddFamilyMemberDialog
        open={showAddFamily}
        onClose={() => setShowAddFamily(false)}
        onSave={(draft: FamilyMemberDraft) => {
          const initials = draft.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
          const colors = ['from-pink-400 to-violet-400', 'from-sky-400 to-blue-500', 'from-emerald-400 to-teal-500', 'from-amber-400 to-orange-500'];
          const color = colors[familyMembers.length % colors.length];
          setFamilyMembers(prev => [...prev, {
            id: `fm${Date.now()}`, name: draft.name, relationship: draft.relationship,
            phone: draft.phones[0]?.value ?? '', email: draft.emails[0]?.value ?? '',
            initials, color,
          }]);
        }}
      />
      <AddCollaboratorDialog
        open={showAddCollaborator}
        onClose={() => setShowAddCollaborator(false)}
        onSave={(draft: CollaboratorDraft) => {
          const initials = draft.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
          const colors = ['from-violet-400 to-purple-500', 'from-sky-400 to-blue-500', 'from-emerald-400 to-teal-500'];
          const color = colors[collaborators.length % colors.length];
          setCollaborators(prev => [...prev, { id: `c${Date.now()}`, name: draft.name, role: draft.role, access: draft.access, initials, color, isInvited: false }]);
        }}
      />

      {/* Delete family member */}
      <AlertDialog open={!!deleteFamilyTarget} onOpenChange={o => !o && setDeleteFamilyTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove family member?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently remove <strong>{deleteFamilyTarget?.name}</strong>.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteFamilyTarget(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => { setFamilyMembers(prev => prev.filter(m => m.id !== deleteFamilyTarget?.id)); setDeleteFamilyTarget(null); }} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Remove</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Remove collaborator */}
      <AlertDialog open={!!removeCollabTarget} onOpenChange={o => !o && setRemoveCollabTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove collaborator?</AlertDialogTitle>
            <AlertDialogDescription>This will remove <strong>{removeCollabTarget?.name}</strong> from Violet's collaborators.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setRemoveCollabTarget(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => { setCollaborators(prev => prev.filter(c => c.id !== removeCollabTarget?.id)); setRemoveCollabTarget(null); }} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Remove</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  );
}
