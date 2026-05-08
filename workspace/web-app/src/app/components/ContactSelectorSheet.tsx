import { X } from 'lucide-react';

export type ContactType = 'phone' | 'email';

interface Contact {
  value: string;
  label?: string;
  isPrimary: boolean;
}

interface ContactSelectorSheetProps {
  type: ContactType;
  contacts: Contact[];
  onClose: () => void;
  onSelect: (value: string) => void;
}

export function ContactSelectorSheet({ type, contacts, onClose, onSelect }: ContactSelectorSheetProps) {
  const title = type === 'phone' ? 'Phone Numbers' : 'Email Addresses';

  const handleSelect = (value: string) => {
    onSelect(value);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] rounded-t-2xl z-50 max-w-[390px] mx-auto animate-slide-up">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-[#3a3a3a] rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-4 border-b border-[#2d2d2d]">
          <h2 className="text-white font-semibold text-lg">{title}</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-[#8a8a8a]" />
          </button>
        </div>

        {/* Contact List */}
        <div className="p-4 space-y-2 max-h-[50vh] overflow-y-auto">
          {contacts.map((contact, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(contact.value)}
              className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-xl p-4 flex items-center justify-between hover:bg-[#1f1f1f] transition-colors"
            >
              <div className="flex-1 text-left">
                <div className="text-white font-medium text-sm">{contact.value}</div>
                {contact.label && (
                  <div className="text-[#6a6a6a] text-xs mt-0.5">{contact.label}</div>
                )}
              </div>
              {contact.isPrimary && (
                <span className="text-[#5a5ff2] text-xs font-medium">Primary</span>
              )}
            </button>
          ))}
        </div>

        {/* Bottom Padding */}
        <div className="h-6" />
      </div>
    </>
  );
}
