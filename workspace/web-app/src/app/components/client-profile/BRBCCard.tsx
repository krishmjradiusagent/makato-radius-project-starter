import { Clock, CheckCircle2, XCircle, FileTextIcon, MoreHorizontal, Send, Eye, Bell, Plus } from 'lucide-react';
import { DSButton, DSBadge } from '../ds';
import { cn } from '../ui/utils';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export type BRBCStatus =
  | 'not_started' | 'draft_ready' | 'sent_for_signature'
  | 'agent_signature_pending' | 'buyer_signature_pending'
  | 'completed' | 'expired' | 'declined';

export interface BRBCRecipient {
  name: string; role: 'Agent' | 'Buyer' | 'Co-buyer';
  email: string; initials: string;
  signingStatus: 'pending' | 'signed' | 'declined' | 'not_sent';
}

export interface BRBCAgreementData {
  status: BRBCStatus;
  recipients: BRBCRecipient[];
  createdDate?: string;
  expiryDate?: string;
}

interface Props {
  agreement: BRBCAgreementData;
  isDark: boolean;
}

const STATUS_META: Record<BRBCStatus, { label: string; badge: string; bg: string; border: string }> = {
  not_started:              { label: 'Not started',             badge: 'bg-stone-100 text-stone-600 border-stone-200',  bg: '', border: '' },
  draft_ready:              { label: 'Draft ready',             badge: 'bg-blue-50 text-blue-700 border-blue-200',       bg: 'bg-blue-50/40',   border: 'border-blue-200' },
  sent_for_signature:       { label: 'Sent for signature',      badge: 'bg-amber-50 text-amber-700 border-amber-200',   bg: 'bg-amber-50/40',  border: 'border-amber-200' },
  agent_signature_pending:  { label: 'Your signature pending',  badge: 'bg-amber-50 text-amber-700 border-amber-200',   bg: 'bg-amber-50/60',  border: 'border-amber-300' },
  buyer_signature_pending:  { label: 'Buyer signature pending', badge: 'bg-amber-50 text-amber-700 border-amber-200',   bg: 'bg-amber-50/60',  border: 'border-amber-300' },
  completed:                { label: 'Completed',               badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', bg: 'bg-emerald-50/40', border: 'border-emerald-200' },
  expired:                  { label: 'Expired',                 badge: 'bg-red-50 text-red-600 border-red-200',         bg: 'bg-red-50/40',    border: 'border-red-200' },
  declined:                 { label: 'Declined',                badge: 'bg-red-50 text-red-600 border-red-200',         bg: 'bg-red-50/40',    border: 'border-red-200' },
};

const SIGN_STATUS: Record<string, { label: string; cls: string; Icon: React.ElementType }> = {
  signed:   { label: 'Signed',    cls: 'text-emerald-600', Icon: CheckCircle2 },
  pending:  { label: 'Pending',   cls: 'text-amber-600',   Icon: Clock },
  declined: { label: 'Declined',  cls: 'text-red-500',     Icon: XCircle },
  not_sent: { label: 'Not sent',  cls: 'text-muted-foreground', Icon: Clock },
};

export function BRBCCard({ agreement, isDark }: Props) {
  const meta = STATUS_META[agreement.status];
  const isPending = agreement.status === 'agent_signature_pending' || agreement.status === 'buyer_signature_pending';
  const isCompleted = agreement.status === 'completed';
  const isDestructive = agreement.status === 'expired' || agreement.status === 'declined';
  const isNotStarted = agreement.status === 'not_started';
  const showMore = !isNotStarted;

  const cardCls = isDark
    ? 'bg-[#1a1a1a] border-[#2d2d2d]'
    : cn('border', meta.border || 'border-gray-200', meta.bg);

  return (
    <div className={cn('rounded-xl p-4 shadow-sm mb-4', cardCls)}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <FileTextIcon className="h-4 w-4 text-muted-foreground shrink-0" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Buyer Broker Agreement
              </span>
              <DSBadge variant="outline" className={`text-[10px] h-4 px-1.5 ${isDark ? 'border-[#3d3d3d] text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                BRBC
              </DSBadge>
            </div>
            {agreement.createdDate && (
              <span className="text-xs text-muted-foreground">Created {agreement.createdDate}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <DSBadge variant="outline" className={cn('text-xs h-5 px-2', meta.badge)}>
            {meta.label}
          </DSBadge>
          {showMore && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`p-1 rounded ${isDark ? 'hover:bg-[#262626]' : 'hover:bg-gray-100'}`}>
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem><Eye className="h-3.5 w-3.5 mr-2" />View Agreement</DropdownMenuItem>
                {isPending && <DropdownMenuItem><Bell className="h-3.5 w-3.5 mr-2" />Resend Reminder</DropdownMenuItem>}
                {!isCompleted && <DropdownMenuItem><Send className="h-3.5 w-3.5 mr-2" />Resend for Signature</DropdownMenuItem>}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Notice banner */}
      {isPending && (
        <div className="flex items-start gap-2 rounded-lg bg-amber-100/80 border border-amber-300 px-3 py-2.5 mb-3">
          <Clock className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-amber-800">
              {agreement.status === 'agent_signature_pending' ? 'Your signature is still pending' : 'Waiting for buyer signature'}
            </p>
            <p className="text-xs text-amber-700 mt-0.5">Complete the signing process to finalise buyer representation.</p>
          </div>
        </div>
      )}
      {isCompleted && (
        <div className="flex items-start gap-2 rounded-lg bg-emerald-100/80 border border-emerald-300 px-3 py-2.5 mb-3">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className="text-xs font-medium text-emerald-800">Agreement fully executed. Buyer representation confirmed.</p>
        </div>
      )}
      {isDestructive && (
        <div className="flex items-start gap-2 rounded-lg bg-red-100/80 border border-red-300 px-3 py-2.5 mb-3">
          <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
          <p className="text-xs font-medium text-red-700">
            {agreement.status === 'expired' ? 'This agreement has expired. Create a new one to continue.' : 'This agreement was declined.'}
          </p>
        </div>
      )}

      {/* Recipients */}
      {!isNotStarted && agreement.recipients.length > 0 && (
        <div className={`rounded-lg border mb-3 overflow-hidden ${isDark ? 'border-[#2d2d2d]' : 'border-gray-200'}`}>
          {agreement.recipients.map((r, i) => {
            const s = SIGN_STATUS[r.signingStatus];
            const SIcon = s.Icon;
            return (
              <div key={i} className={cn('flex items-center gap-3 px-3 py-2', i > 0 && (isDark ? 'border-t border-[#2d2d2d]' : 'border-t border-gray-100'))}>
                <Avatar className="h-7 w-7 shrink-0">
                  <AvatarFallback className={`text-[10px] font-semibold ${isDark ? 'bg-[#3d3d3d] text-white' : 'bg-slate-200 text-slate-700'}`}>{r.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs font-medium leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{r.name}</span>
                    <DSBadge variant="outline" className={`text-[10px] h-4 px-1 ${isDark ? 'border-[#3d3d3d] text-gray-400' : 'border-gray-200 text-gray-500'}`}>{r.role}</DSBadge>
                  </div>
                  <span className="text-[11px] text-muted-foreground truncate">{r.email}</span>
                </div>
                <div className={cn('flex items-center gap-1 text-xs font-medium shrink-0', s.cls)}>
                  <SIcon className="h-3.5 w-3.5" />{s.label}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        {isNotStarted && (
          <DSButton size="sm" className={`flex-1 ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
            <Plus className="h-3.5 w-3.5 mr-1.5" />Create BRBC
          </DSButton>
        )}
        {agreement.status === 'draft_ready' && (
          <>
            <DSButton size="sm" className={`flex-1 ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
              <Send className="h-3.5 w-3.5 mr-1.5" />Send for Signature
            </DSButton>
            <DSButton size="sm" variant="outline" className={isDark ? 'border-[#3d3d3d] text-white' : ''}>
              <Eye className="h-3.5 w-3.5 mr-1.5" />View
            </DSButton>
          </>
        )}
        {(agreement.status === 'sent_for_signature' || agreement.status === 'buyer_signature_pending') && (
          <>
            <DSButton size="sm" variant="outline" className={cn('flex-1', isDark && 'border-[#3d3d3d] text-white')}>
              <Eye className="h-3.5 w-3.5 mr-1.5" />View Agreement
            </DSButton>
            <DSButton size="sm" variant="outline" className={isDark ? 'border-[#3d3d3d] text-white' : ''}>
              <Bell className="h-3.5 w-3.5 mr-1.5" />Remind
            </DSButton>
          </>
        )}
        {agreement.status === 'agent_signature_pending' && (
          <>
            <DSButton size="sm" className={`flex-1 ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
              Review &amp; Sign
            </DSButton>
            <DSButton size="sm" variant="outline" className={isDark ? 'border-[#3d3d3d] text-white' : ''}>
              <Eye className="h-3.5 w-3.5 mr-1.5" />View
            </DSButton>
          </>
        )}
        {isCompleted && (
          <DSButton size="sm" variant="outline" className={cn('flex-1', isDark && 'border-[#3d3d3d] text-white')}>
            <Eye className="h-3.5 w-3.5 mr-1.5" />View Agreement
          </DSButton>
        )}
        {isDestructive && (
          <DSButton size="sm" className={`flex-1 ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
            <Plus className="h-3.5 w-3.5 mr-1.5" />Create New BRBC
          </DSButton>
        )}
      </div>
    </div>
  );
}
