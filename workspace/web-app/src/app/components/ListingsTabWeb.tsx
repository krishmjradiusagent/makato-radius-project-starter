import { ChevronRight, Plus, Filter } from 'lucide-react';
import { Screen } from '../App';

interface ListingsTabWebProps {
  onNavigate: (screen: Screen) => void;
  onFilterClick: () => void;
}

export function ListingsTabWeb({ onNavigate, onFilterClick }: ListingsTabWebProps) {
  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[#737373] text-sm font-semibold tracking-wider uppercase">
          Active Listings (1)
        </h3>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={onFilterClick}
              className="text-[#737373] hover:text-[#171717] transition-colors p-2 hover:bg-[#f5f5f5] rounded-lg"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
          <button className="bg-[#5a5ff2] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#4a4fe2] transition-colors">
            <Plus className="w-4 h-4" />
            New Listing
          </button>
        </div>
      </div>

      {/* Listing Cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Active Listing */}
        <button 
          onClick={() => onNavigate({ type: 'listing-detail', id: '1' })}
          className="bg-white border border-[#e5e5e5] rounded-xl p-5 text-left hover:border-[#d4d4d4] hover:shadow-sm transition-all"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h4 className="text-[#171717] font-medium mb-1">5500 Clemente Dr</h4>
              <div className="text-[#22c55e] font-semibold mb-1">$475,000</div>
              <div className="text-[#a3a3a3] text-xs">4 Beds, 3 Baths, 2800 Sq.ft</div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#a3a3a3] shrink-0" />
          </div>

          <div className="space-y-2 py-3 border-y border-[#e5e5e5]">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#737373]">Status</span>
              <span className="bg-[#fef3c7] text-[#92400e] px-2 py-0.5 rounded text-xs font-medium border border-[#fbbf24]">
                Pending
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#737373]">Days on Market</span>
              <span className="text-[#171717] font-medium">23</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#737373]">Offers</span>
              <span className="text-[#5a5ff2] font-medium">3 active</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-[#a3a3a3]">
            <span>Listed Dec 1, 2024</span>
            <span className="text-[#5a5ff2] font-medium flex items-center gap-1">
              8 docs
              <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </button>

        {/* Add Listing Placeholder */}
        <div className="bg-white border-2 border-dashed border-[#e5e5e5] rounded-xl p-5 flex flex-col items-center justify-center min-h-[280px] hover:border-[#d4d4d4] transition-colors">
          <div className="w-12 h-12 rounded-full bg-[#f5f5f5] flex items-center justify-center mb-3">
            <Plus className="w-6 h-6 text-[#737373]" />
          </div>
          <h4 className="text-[#171717] font-medium mb-1">Add New Listing</h4>
          <p className="text-[#737373] text-xs text-center">
            Create a new property listing
          </p>
        </div>
      </div>

      {/* Listing Performance */}
      <div>
        <h3 className="text-[#737373] text-sm font-semibold tracking-wider uppercase mb-4">
          Performance Overview
        </h3>

        <div className="grid grid-cols-4 gap-4">
          {/* Total Views */}
          <div className="bg-white border border-[#e5e5e5] rounded-xl p-5">
            <div className="text-[#737373] text-xs mb-2">Total Views</div>
            <div className="text-[#171717] text-2xl font-semibold mb-1">847</div>
            <div className="text-[#22c55e] text-xs font-medium">↑ 12% this week</div>
          </div>

          {/* Showings */}
          <div className="bg-white border border-[#e5e5e5] rounded-xl p-5">
            <div className="text-[#737373] text-xs mb-2">Showings</div>
            <div className="text-[#171717] text-2xl font-semibold mb-1">23</div>
            <div className="text-[#22c55e] text-xs font-medium">↑ 5% this week</div>
          </div>

          {/* Offers Received */}
          <div className="bg-white border border-[#e5e5e5] rounded-xl p-5">
            <div className="text-[#737373] text-xs mb-2">Offers Received</div>
            <div className="text-[#171717] text-2xl font-semibold mb-1">3</div>
            <div className="text-[#737373] text-xs">All active</div>
          </div>

          {/* Avg Response Time */}
          <div className="bg-white border border-[#e5e5e5] rounded-xl p-5">
            <div className="text-[#737373] text-xs mb-2">Avg Response Time</div>
            <div className="text-[#171717] text-2xl font-semibold mb-1">2.4h</div>
            <div className="text-[#22c55e] text-xs font-medium">↓ 0.6h faster</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-[#737373] text-sm font-semibold tracking-wider uppercase mb-4">
          Recent Activity
        </h3>

        <div className="space-y-3">
          {/* Activity Item 1 */}
          <div className="bg-white border border-[#e5e5e5] rounded-xl p-4 hover:border-[#d4d4d4] hover:shadow-sm transition-all">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f0f0ff] flex items-center justify-center shrink-0">
                <span className="text-[#5a5ff2] text-sm font-semibold">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-[#171717] font-medium text-sm">New offer received</h4>
                  <span className="text-[#a3a3a3] text-xs shrink-0">2 hours ago</span>
                </div>
                <p className="text-[#737373] text-sm mb-2">
                  John Doe submitted an offer of $485,000
                </p>
                <div className="flex items-center gap-2">
                  <span className="bg-[#dcfce7] text-[#166534] px-2 py-1 rounded text-xs font-medium border border-[#86efac]">
                    New Offer
                  </span>
                  <button className="text-[#5a5ff2] text-xs font-medium hover:underline">
                    Review Offer
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Item 2 */}
          <div className="bg-white border border-[#e5e5e5] rounded-xl p-4 hover:border-[#d4d4d4] hover:shadow-sm transition-all">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#fef3c7] flex items-center justify-center shrink-0">
                <span className="text-[#92400e] text-sm font-semibold">SM</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-[#171717] font-medium text-sm">Showing scheduled</h4>
                  <span className="text-[#a3a3a3] text-xs shrink-0">5 hours ago</span>
                </div>
                <p className="text-[#737373] text-sm mb-2">
                  Sarah Miller booked a viewing for Dec 24 at 2:00 PM
                </p>
                <button className="text-[#5a5ff2] text-xs font-medium hover:underline">
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* Activity Item 3 */}
          <div className="bg-white border border-[#e5e5e5] rounded-xl p-4 hover:border-[#d4d4d4] hover:shadow-sm transition-all">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f0fdf4] flex items-center justify-center shrink-0">
                <span className="text-[#166534] text-sm font-semibold">RJ</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-[#171717] font-medium text-sm">Price adjustment</h4>
                  <span className="text-[#a3a3a3] text-xs shrink-0">1 day ago</span>
                </div>
                <p className="text-[#737373] text-sm">
                  Price reduced from $495,000 to $475,000
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}