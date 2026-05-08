import { X } from 'lucide-react';

interface EditProfileSheetProps {
  onClose: () => void;
}

export function EditProfileSheet({ onClose }: EditProfileSheetProps) {
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
          <h2 className="text-white font-semibold text-lg">Edit Client Profile</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-[#8a8a8a]" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-4">
            {/* First Name */}
            <div>
              <label className="text-[#8a8a8a] text-xs mb-1.5 block">First Name</label>
              <input 
                type="text"
                defaultValue="Violet"
                className="w-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#5a5ff2]"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="text-[#8a8a8a] text-xs mb-1.5 block">Last Name</label>
              <input 
                type="text"
                defaultValue="Cole"
                className="w-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#5a5ff2]"
              />
            </div>

            {/* Status */}
            <div>
              <label className="text-[#8a8a8a] text-xs mb-1.5 block">Status</label>
              <select className="w-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#5a5ff2]">
                <option>New Client</option>
                <option>Active</option>
                <option>Past Client</option>
                <option>Lead</option>
              </select>
            </div>

            {/* Agent */}
            <div>
              <label className="text-[#8a8a8a] text-xs mb-1.5 block">Agent</label>
              <select className="w-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#5a5ff2]">
                <option>Monica Miller</option>
                <option>John Smith</option>
                <option>Sarah Johnson</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="text-[#8a8a8a] text-xs mb-1.5 block">Notes</label>
              <textarea 
                rows={4}
                placeholder="Add notes about this client..."
                className="w-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#5a5ff2] resize-none"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="shrink-0 px-4 py-4 border-t border-[#2d2d2d] flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 bg-[#2d2d2d] text-white py-3 rounded-lg font-medium border border-[#404040]"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="flex-1 bg-[#5a5ff2] text-white py-3 rounded-lg font-semibold"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}
