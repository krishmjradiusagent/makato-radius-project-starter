import { Filter } from 'lucide-react';
import { Screen } from '../App';

interface ActivityTabProps {
  onFilterClick: () => void;
  onNavigate: (screen: Screen) => void;
}

export function ActivityTab({ onFilterClick, onNavigate }: ActivityTabProps) {
  return (
    <div className="px-4 pb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#6a6a6a] text-xs font-semibold tracking-wider uppercase">
          All Activity
        </h3>
        <button 
          onClick={onFilterClick}
          className="text-[#5a5ff2] text-sm font-medium flex items-center gap-1.5"
        >
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Activity Feed */}
      <div className="space-y-3">
        {/* Activity Item 1 - Offer */}
        <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-[#5a5ff2]/20 flex items-center justify-center shrink-0">
              <span className="text-[#5a5ff2] font-semibold text-sm">VC</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-white text-sm">
                  <span className="font-semibold">Offer submitted</span> for 742 Evergreen Terrace
                </p>
                <span className="text-[#6a6a6a] text-xs shrink-0">2h</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-[#252525] text-[#5a5ff2] px-2 py-1 rounded text-xs font-medium">
                  Offer #3
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Item 2 - Note */}
        <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-[#86efac]/20 flex items-center justify-center shrink-0">
              <span className="text-[#86efac] font-semibold text-sm">VC</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-white text-sm">
                  <span className="font-semibold">Note added</span> to search criteria
                </p>
                <span className="text-[#6a6a6a] text-xs shrink-0">5h</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-[#252525] text-[#86efac] px-2 py-1 rounded text-xs font-medium">
                  Search · Buy
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Item 3 - Property View */}
        <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ec4899]/20 flex items-center justify-center shrink-0">
              <span className="text-[#ec4899] font-semibold text-sm">VC</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-white text-sm">
                  <span className="font-semibold">Property viewed</span> at 1640 Riverside Drive
                </p>
                <span className="text-[#6a6a6a] text-xs shrink-0">1d</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-[#252525] text-[#ec4899] px-2 py-1 rounded text-xs font-medium">
                  Offer #1
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Item 4 - Search Created */}
        <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-[#93c5fd]/20 flex items-center justify-center shrink-0">
              <span className="text-[#93c5fd] font-semibold text-sm">VC</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-white text-sm">
                  <span className="font-semibold">Search created</span> for rental properties
                </p>
                <span className="text-[#6a6a6a] text-xs shrink-0">2d</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-[#252525] text-[#93c5fd] px-2 py-1 rounded text-xs font-medium">
                  Search · Rent
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Item 5 - Listing */}
        <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-[#fbbf24]/20 flex items-center justify-center shrink-0">
              <span className="text-[#fbbf24] font-semibold text-sm">VC</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-white text-sm">
                  <span className="font-semibold">Listing created</span> for 5500 Clemente Dr
                </p>
                <span className="text-[#6a6a6a] text-xs shrink-0">3d</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-[#252525] text-[#fbbf24] px-2 py-1 rounded text-xs font-medium">
                  Listing
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Item 6 - Document Upload */}
        <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-[#5a5ff2]/20 flex items-center justify-center shrink-0">
              <span className="text-[#5a5ff2] font-semibold text-sm">VC</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-white text-sm">
                  <span className="font-semibold">Documents uploaded</span> (3 files)
                </p>
                <span className="text-[#6a6a6a] text-xs shrink-0">4d</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-[#252525] text-[#5a5ff2] px-2 py-1 rounded text-xs font-medium">
                  Offer #3
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Item 7 - Reminder */}
        <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f59e0b]/20 flex items-center justify-center shrink-0">
              <span className="text-[#f59e0b] font-semibold text-sm">VC</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-white text-sm">
                  <span className="font-semibold">Reminder set</span> for property inspection
                </p>
                <span className="text-[#6a6a6a] text-xs shrink-0">5d</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-[#252525] text-[#f59e0b] px-2 py-1 rounded text-xs font-medium">
                  Offer #2
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Item 8 - Client Created */}
        <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-[#86efac]/20 flex items-center justify-center shrink-0">
              <span className="text-[#86efac] font-semibold text-sm">VC</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-white text-sm">
                  <span className="font-semibold">Client profile created</span>
                </p>
                <span className="text-[#6a6a6a] text-xs shrink-0">1w</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}