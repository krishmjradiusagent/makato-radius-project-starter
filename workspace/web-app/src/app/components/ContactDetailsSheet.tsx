import { X, Plus, Trash2 } from 'lucide-react';

interface ContactDetailsSheetProps {
  onClose: () => void;
}

export function ContactDetailsSheet({ onClose }: ContactDetailsSheetProps) {
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />
      
      {/* Full Screen Sheet */}
      <div className="fixed inset-0 bg-[#0a0a0a] z-50 max-w-[390px] mx-auto flex flex-col">
        {/* Header */}
        <div className="shrink-0 px-4 py-4 border-b border-[#2d2d2d] flex items-center justify-between">
          <h2 className="text-white font-semibold text-lg">Contact Details</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-[#8a8a8a]" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {/* Email Addresses */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-medium">Email Addresses</h3>
              <button className="text-[#5a5ff2] text-sm font-medium flex items-center gap-1">
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            <div className="space-y-2">
              <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-3 flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-white text-sm">violet.cole@email.com</div>
                  <div className="text-[#6a6a6a] text-xs mt-0.5">Primary</div>
                </div>
                <button className="text-[#ef4444] p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-3 flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-white text-sm">v.cole@work.com</div>
                  <div className="text-[#6a6a6a] text-xs mt-0.5">Work</div>
                </div>
                <button className="text-[#ef4444] p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Phone Numbers */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-medium">Phone Numbers</h3>
              <button className="text-[#5a5ff2] text-sm font-medium flex items-center gap-1">
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            <div className="space-y-2">
              <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-3 flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-white text-sm">(555) 123-4567</div>
                  <div className="text-[#6a6a6a] text-xs mt-0.5">Mobile</div>
                </div>
                <button className="text-[#ef4444] p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-3 flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-white text-sm">(555) 987-6543</div>
                  <div className="text-[#6a6a6a] text-xs mt-0.5">Home</div>
                </div>
                <button className="text-[#ef4444] p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-3 flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-white text-sm">(555) 246-8135</div>
                  <div className="text-[#6a6a6a] text-xs mt-0.5">Work</div>
                </div>
                <button className="text-[#ef4444] p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">Address</h3>
            <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-3">
              <div className="text-white text-sm mb-1">1234 Main Street</div>
              <div className="text-white text-sm mb-1">Apt 5B</div>
              <div className="text-[#8a8a8a] text-sm">San Francisco, CA 94102</div>
            </div>
          </div>

          {/* Client Source */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">Client Source</h3>
            <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-3">
              <div className="text-white text-sm">Referral - John Smith</div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="shrink-0 px-4 py-4 border-t border-[#2d2d2d]">
          <button 
            onClick={onClose}
            className="w-full bg-[#5a5ff2] text-white py-3 rounded-lg font-semibold"
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
}
