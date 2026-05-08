import { X } from 'lucide-react';

interface AIProspectingSheetProps {
  onClose: () => void;
}

export function AIProspectingSheet({ onClose }: AIProspectingSheetProps) {
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
          <div className="flex items-center gap-2">
            <h2 className="text-white font-semibold text-lg">AI Prospecting</h2>
            <span className="bg-[#1e3a1e] text-[#86efac] text-xs font-medium px-2 py-0.5 rounded border border-[#2d4a2d]">
              Active
            </span>
          </div>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-[#8a8a8a]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-white text-sm font-semibold mb-2">About AI Prospecting</h3>
            <p className="text-[#8a8a8a] text-sm leading-relaxed">
              AI Prospecting automatically monitors new listings matching this client's preferences and sends personalized property recommendations on a weekly basis.
            </p>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold mb-2">Current Settings</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2">
                <span className="text-[#8a8a8a] text-sm">Frequency</span>
                <span className="text-white text-sm">Weekly</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[#8a8a8a] text-sm">Last Updated</span>
                <span className="text-white text-sm">2 days ago</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[#8a8a8a] text-sm">Properties Found</span>
                <span className="text-[#5a5ff2] text-sm font-medium">12 new</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button className="flex-1 bg-[#5a5ff2] text-white py-3 rounded-full text-sm font-semibold">
              Refresh Now
            </button>
            <button className="px-5 bg-[#2d2d2d] text-white py-3 rounded-full text-sm font-medium border border-[#404040]">
              Settings
            </button>
          </div>
        </div>

        {/* Bottom Padding */}
        <div className="h-6" />
      </div>
    </>
  );
}
