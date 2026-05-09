import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';

export interface FamilyMemberDraft {
  name: string;
  relationship: string;
  phones: { value: string; label: string }[];
  emails: { value: string; label: string }[];
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (member: FamilyMemberDraft) => void;
}

const RELATIONSHIPS = ['Spouse', 'Child', 'Parent', 'Sibling', 'Partner', 'Other'];

export function AddFamilyMemberDialog({ open, onClose, onSave }: Props) {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phones, setPhones] = useState([{ value: '', label: 'Mobile' }]);
  const [emails, setEmails] = useState([{ value: '', label: 'Personal' }]);
  const [sendInvite, setSendInvite] = useState(false);

  const reset = () => { setName(''); setRelationship(''); setPhones([{ value: '', label: 'Mobile' }]); setEmails([{ value: '', label: 'Personal' }]); setSendInvite(false); };

  const handleSave = () => {
    if (!name.trim() || !relationship) return;
    onSave({ name: name.trim(), relationship, phones: phones.filter(p => p.value.trim()), emails: emails.filter(e => e.value.trim()) });
    reset(); onClose();
  };

  const handleClose = () => { reset(); onClose(); };

  return (
    <Dialog open={open} onOpenChange={o => !o && handleClose()}>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader><DialogTitle>Add Family Member</DialogTitle></DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label>Full name</Label>
            <Input placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Relationship</Label>
            <Select value={relationship} onValueChange={setRelationship}>
              <SelectTrigger><SelectValue placeholder="Select relationship" /></SelectTrigger>
              <SelectContent>{RELATIONSHIPS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Phone numbers</Label>
            {phones.map((p, i) => (
              <div key={i} className="flex gap-2">
                <Input placeholder="Phone" value={p.value} onChange={e => { const u=[...phones]; u[i]={...u[i],value:e.target.value}; setPhones(u); }} className="flex-1" />
                <Select value={p.label} onValueChange={v => { const u=[...phones]; u[i]={...u[i],label:v}; setPhones(u); }}>
                  <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
                  <SelectContent>{['Mobile','Home','Work','Other'].map(l=><SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
                </Select>
                {phones.length > 1 && <button onClick={() => setPhones(phones.filter((_,idx)=>idx!==i))} className="p-2 rounded hover:bg-muted"><X className="h-4 w-4 text-muted-foreground" /></button>}
              </div>
            ))}
            <button onClick={() => setPhones([...phones,{value:'',label:'Mobile'}])} className="flex items-center gap-1 text-xs text-primary hover:underline"><Plus className="h-3 w-3" /> Add phone</button>
          </div>
          <div className="space-y-1.5">
            <Label>Email addresses</Label>
            {emails.map((e, i) => (
              <div key={i} className="flex gap-2">
                <Input placeholder="Email" type="email" value={e.value} onChange={ev => { const u=[...emails]; u[i]={...u[i],value:ev.target.value}; setEmails(u); }} className="flex-1" />
                <Select value={e.label} onValueChange={v => { const u=[...emails]; u[i]={...u[i],label:v}; setEmails(u); }}>
                  <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
                  <SelectContent>{['Primary','Personal','Work','Other'].map(l=><SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
                </Select>
                {emails.length > 1 && <button onClick={() => setEmails(emails.filter((_,idx)=>idx!==i))} className="p-2 rounded hover:bg-muted"><X className="h-4 w-4 text-muted-foreground" /></button>}
              </div>
            ))}
            <button onClick={() => setEmails([...emails,{value:'',label:'Personal'}])} className="flex items-center gap-1 text-xs text-primary hover:underline"><Plus className="h-3 w-3" /> Add email</button>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="invite" checked={sendInvite} onCheckedChange={v => setSendInvite(!!v)} />
            <Label htmlFor="invite" className="font-normal cursor-pointer">Send app invite</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={!name.trim() || !relationship}>Save family member</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
