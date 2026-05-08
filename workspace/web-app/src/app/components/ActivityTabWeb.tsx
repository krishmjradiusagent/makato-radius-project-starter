import { Filter } from 'lucide-react';
import { Screen } from '../App';

interface ActivityTabWebProps {
  onFilterClick: () => void;
  onNavigate: (screen: Screen) => void;
}

export function ActivityTabWeb({ onFilterClick, onNavigate }: ActivityTabWebProps) {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[#737373] text-sm font-semibold tracking-wider uppercase">
          All Activity
        </h3>
        <div className="relative">
          <button 
            onClick={onFilterClick}
            className="text-[#5a5ff2] text-sm font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#f5f5f5] transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="space-y-3">
        {/* Activity Item 1 - Offer */}
        <div className="bg-white border border-[#e5e5e5] rounded-xl p-5 hover:border-[#d4d4d4] hover:shadow-sm transition-all">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-[#5a5ff2]/10 flex items-center justify-center shrink-0">
              <span className="text-[#5a5ff2] font-semibold">VC</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="text-[#171717]">
                  <span className="font-semibold">Offer submitted</span> for 742 Evergreen Terrace
                </p>
                <span className="text-[#a3a3a3] text-sm shrink-0">2h</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-[#f5f5f5] text-[#5a5ff2] px-2.5 py-1.5 rounded text-xs font-medium">
                  Offer #3
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Item 2 - Note */}
        <div className="bg-white border border-[#e5e5e5] rounded-xl p-5 hover:border-[#d4d4d4] hover:shadow-sm transition-all">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-[#22c55e]/10 flex items-center justify-center shrink-0">
              <span className="text-[#22c55e] font-semibold">VC</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="text-[#171717]">
                  <span className="font-semibold">Note added</span> to search criteria
                </p>
                <span className="text-[#a3a3a3] text-sm shrink-0">5h</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-[#f5f5f5] text-[#22c55e] px-2.5 py-1.5 rounded text-xs font-medium">
                  Search · Buy
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Item 3 - Property View */}
        <div className="bg-white border border-[#e5e5e5] rounded-xl p-5 hover:border-[#d4d4d4] hover:shadow-sm transition-all">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-[#ec4899]/10 flex items-center justify-center shrink-0">
              <span className="text-[#ec4899] font-semibold">VC</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="text-[#171717]">
                  <span className="font-semibold">Viewed property</span> 123 Main Street
                </p>
                <span className="text-[#a3a3a3] text-sm shrink-0">1d</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-[#f5f5f5] text-[#ec4899] px-2.5 py-1.5 rounded text-xs font-medium">
                  Property Tour
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Item 4 - Email */}
        <div className="bg-white border border-[#e5e5e5] rounded-xl p-5 hover:border-[#d4d4d4] hover:shadow-sm transition-all">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-[#f59e0b]/10 flex items-center justify-center shrink-0">
              <span className="text-[#f59e0b] font-semibold">VC</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="text-[#171717]">
                  <span className="font-semibold">Email sent</span> - Property recommendations
                </p>
                <span className="text-[#a3a3a3] text-sm shrink-0">2d</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-[#f5f5f5] text-[#f59e0b] px-2.5 py-1.5 rounded text-xs font-medium">
                  Communication
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Item 5 - Document */}
        <div className="bg-white border border-[#e5e5e5] rounded-xl p-5 hover:border-[#d4d4d4] hover:shadow-sm transition-all">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-[#8b5cf6]/10 flex items-center justify-center shrink-0">
              <span className="text-[#8b5cf6] font-semibold">VC</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="text-[#171717]">
                  <span className="font-semibold">Document uploaded</span> - Pre-approval letter
                </p>
                <span className="text-[#a3a3a3] text-sm shrink-0">3d</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-[#f5f5f5] text-[#8b5cf6] px-2.5 py-1.5 rounded text-xs font-medium">
                  Document
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}