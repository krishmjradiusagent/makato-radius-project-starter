import { Plus, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface ContactDetailsDialogProps {
  onClose: () => void;
}

export function ContactDetailsDialog({ onClose }: ContactDetailsDialogProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-[#1a1a1a] border-[#2d2d2d] text-white sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">Contact Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Email Addresses */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-medium">Email Addresses</h3>
              <button className="text-[#5a5ff2] text-sm font-medium flex items-center gap-1 hover:text-[#4a4fe2] transition-colors">
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            <div className="space-y-2">
              <div className="bg-[#0a0a0a] border border-[#2d2d2d] rounded-xl p-4 flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-white">violet.cole@email.com</div>
                  <div className="text-[#6a6a6a] text-sm mt-1">Primary</div>
                </div>
                <button className="text-[#ef4444] p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-[#0a0a0a] border border-[#2d2d2d] rounded-xl p-4 flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-white">v.cole@techsolutions.com</div>
                  <div className="text-[#6a6a6a] text-sm mt-1">Work</div>
                </div>
                <button className="text-[#ef4444] p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-[#0a0a0a] border border-[#2d2d2d] rounded-xl p-4 flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-white">violet.cole.backup@email.com</div>
                  <div className="text-[#6a6a6a] text-sm mt-1">Secondary</div>
                </div>
                <button className="text-[#ef4444] p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Phone Numbers */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-medium">Phone Numbers</h3>
              <button className="text-[#5a5ff2] text-sm font-medium flex items-center gap-1 hover:text-[#4a4fe2] transition-colors">
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            <div className="space-y-2">
              <div className="bg-[#0a0a0a] border border-[#2d2d2d] rounded-xl p-4 flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-white">(555) 123-4567</div>
                  <div className="text-[#6a6a6a] text-sm mt-1">Mobile</div>
                </div>
                <button className="text-[#ef4444] p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-[#0a0a0a] border border-[#2d2d2d] rounded-xl p-4 flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-white">(555) 987-6543</div>
                  <div className="text-[#6a6a6a] text-sm mt-1">Work</div>
                </div>
                <button className="text-[#ef4444] p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-medium">Address</h3>
              <button className="text-[#5a5ff2] text-sm font-medium flex items-center gap-1 hover:text-[#4a4fe2] transition-colors">
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            <div className="bg-[#0a0a0a] border border-[#2d2d2d] rounded-xl p-4">
              <div className="text-white">742 Evergreen Terrace</div>
              <div className="text-white">San Francisco, CA 94102</div>
              <div className="text-[#6a6a6a] text-sm mt-2">Home</div>
            </div>
          </div>

          {/* Source */}
          <div>
            <h3 className="text-white font-medium mb-3">Source</h3>
            <div className="bg-[#0a0a0a] border border-[#2d2d2d] rounded-xl p-4">
              <div className="text-white">Referral</div>
              <div className="text-[#6a6a6a] text-sm mt-1">From Sarah Johnson</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
