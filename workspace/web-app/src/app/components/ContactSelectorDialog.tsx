import { Mail, Phone, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface Contact {
  value: string;
  label: string;
  isPrimary: boolean;
}

interface ContactSelectorDialogProps {
  type: 'email' | 'phone';
  contacts: Contact[];
  onClose: () => void;
  onSelect: (value: string) => void;
}

export function ContactSelectorDialog({ type, contacts, onClose, onSelect }: ContactSelectorDialogProps) {
  const handleSelect = (value: string) => {
    onSelect(value);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-[#1a1a1a] border-[#2d2d2d] text-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-white">
            {type === 'email' ? 'Select Email' : 'Select Phone Number'}
          </DialogTitle>
        </DialogHeader>

        {/* Contacts List */}
        <div className="mt-4 space-y-2">
          {contacts.map((contact, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(contact.value)}
              className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-xl p-4 flex items-center gap-3 hover:bg-[#1f1f1f] hover:border-[#5a5ff2] transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-full bg-[#5a5ff2]/20 flex items-center justify-center shrink-0">
                {type === 'email' ? (
                  <Mail className="w-5 h-5 text-[#5a5ff2]" />
                ) : (
                  <Phone className="w-5 h-5 text-[#5a5ff2]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium">{contact.value}</div>
                <div className="text-[#6a6a6a] text-sm mt-0.5">{contact.label}</div>
              </div>
              {contact.isPrimary && (
                <div className="flex items-center gap-1 text-[#86efac] text-xs font-medium shrink-0">
                  <Check className="w-4 h-4" />
                  Primary
                </div>
              )}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
