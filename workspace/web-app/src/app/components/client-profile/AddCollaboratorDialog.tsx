import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

export type CollabRole = 'T.C.' | 'Vendor' | 'Assistant' | 'Lender' | 'Co-agent' | 'Admin';
export type CollabAccess = 'Default level access' | 'Full access' | 'View only' | 'Custom access';

export interface CollaboratorDraft {
  name: string;
  email: string;
  role: CollabRole;
  access: CollabAccess;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (c: CollaboratorDraft) => void;
}

const ROLES: CollabRole[] = ['T.C.', 'Vendor', 'Assistant', 'Lender', 'Co-agent', 'Admin'];
const ACCESS: CollabAccess[] = ['Default level access', 'Full access', 'View only', 'Custom access'];

export function AddCollaboratorDialog({ open, onClose, onSave }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<CollabRole | ''>('');
  const [access, setAccess] = useState<CollabAccess>('Default level access');
  const [note, setNote] = useState('');

  const reset = () => { setName(''); setEmail(''); setRole(''); setAccess('Default level access'); setNote(''); };
  const handleClose = () => { reset(); onClose(); };
  const handleSave = () => {
    if (!name.trim() || !role) return;
    onSave({ name: name.trim(), email: email.trim(), role: role as CollabRole, access });
    reset(); onClose();
  };

  return (
    <Dialog open={open} onOpenChange={o => !o && handleClose()}>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader><DialogTitle>Add Collaborator</DialogTitle></DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label>Name</Label>
            <Input placeholder="Search or enter name" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Role</Label>
            <Select value={role} onValueChange={v => setRole(v as CollabRole)}>
              <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
              <SelectContent>{ROLES.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Access level</Label>
            <Select value={access} onValueChange={v => setAccess(v as CollabAccess)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{ACCESS.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Note (optional)</Label>
            <Textarea placeholder="Add a note..." value={note} onChange={e => setNote(e.target.value)} className="resize-none min-h-[64px]" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={!name.trim() || !role}>Add collaborator</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
