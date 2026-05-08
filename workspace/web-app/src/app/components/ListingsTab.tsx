import { ChevronRight, Plus, Filter, Bell } from 'lucide-react';
import { Screen } from '../App';

interface ListingsTabProps {
  onNavigate: (screen: Screen) => void;
  onFilterClick: () => void;
}

export function ListingsTab({ onNavigate, onFilterClick }: ListingsTabProps) {
  return (
    <div className="px-4 pb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#6a6a6a] text-xs font-semibold tracking-wider uppercase">
          Active Listings (1)
        </h3>
        <div className="flex items-center gap-2">
          <button 
            onClick={onFilterClick}
            className="text-[#8a8a8a] hover:text-white transition-colors"
          >
            <Filter className="w-5 h-5" />
          </button>
          <button className="text-[#5a5ff2] text-sm font-medium flex items-center gap-1">
            <Plus className="w-4 h-4" />
            New Listing
          </button>
        </div>
      </div>

      {/* Active Listing Card */}
      <button 
        onClick={() => onNavigate({ type: 'listing-detail', id: '1' })}
        className="w-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4 text-left hover:bg-[#1f1f1f] transition-colors mb-4"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="text-white font-medium text-[15px] mb-1">5500 Clemente Dr</h4>
            <div className="text-[#86efac] font-semibold mb-1">$475,000</div>
            <div className="text-[#6a6a6a] text-xs">4 Beds, 3 Baths, 2800 Sq.ft</div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#5a5a5a] shrink-0" />
        </div>

        <div className="space-y-2 py-3 border-y border-[#2d2d2d]">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#8a8a8a]">Status</span>
            <span className="bg-[#3a2e1e] text-[#f59e0b] px-2 py-0.5 rounded text-xs font-medium border border-[#4a3e2d]">
              Pending
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#8a8a8a]">Days on Market</span>
            <span className="text-white">23</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#8a8a8a]">Offers</span>
            <span className="text-[#5a5ff2] font-medium">3 active</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-[#6a6a6a]">
          <span>Listed Dec 1, 2024</span>
          <span className="text-[#5a5ff2] font-medium flex items-center gap-1">
            8 docs
            <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </button>

      {/* Performance Overview */}
      <div className="mb-6">
        <h3 className="text-[#6a6a6a] text-xs font-semibold tracking-wider uppercase mb-3">
          Performance Overview
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
            <div className="text-[#8a8a8a] text-xs mb-1.5">Total Views</div>
            <div className="text-white text-xl font-semibold mb-1">847</div>
            <div className="text-[#86efac] text-xs">↑ 12% this week</div>
          </div>

          <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
            <div className="text-[#8a8a8a] text-xs mb-1.5">Showings</div>
            <div className="text-white text-xl font-semibold mb-1">23</div>
            <div className="text-[#86efac] text-xs">↑ 5% this week</div>
          </div>

          <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
            <div className="text-[#8a8a8a] text-xs mb-1.5">Offers Received</div>
            <div className="text-white text-xl font-semibold mb-1">3</div>
            <div className="text-[#8a8a8a] text-xs">All active</div>
          </div>

          <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
            <div className="text-[#8a8a8a] text-xs mb-1.5">Avg Response</div>
            <div className="text-white text-xl font-semibold mb-1">2.4h</div>
            <div className="text-[#86efac] text-xs">↓ 0.6h faster</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-[#6a6a6a] text-xs font-semibold tracking-wider uppercase mb-3">
          Recent Activity
        </h3>

        <div className="space-y-3">
          {/* Activity Item 1 */}
          <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1e2a3e] flex items-center justify-center shrink-0">
                <span className="text-[#93c5fd] text-xs font-semibold">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-white font-medium text-sm">New offer received</h4>
                  <span className="text-[#6a6a6a] text-xs shrink-0">2h ago</span>
                </div>
                <p className="text-[#8a8a8a] text-sm mb-2">
                  John Doe submitted an offer of $485,000
                </p>
                <div className="flex items-center gap-2">
                  <span className="bg-[#1e3a1e] text-[#86efac] px-2 py-1 rounded text-xs font-medium border border-[#2d4a2d]">
                    New Offer
                  </span>
                  <button className="text-[#5a5ff2] text-xs font-medium">
                    Review Offer
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Item 2 */}
          <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#3a2e1e] flex items-center justify-center shrink-0">
                <Bell className="w-5 h-5 text-[#f59e0b]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-white font-medium text-sm">Showing scheduled</h4>
                  <span className="text-[#6a6a6a] text-xs shrink-0">5h ago</span>
                </div>
                <p className="text-[#8a8a8a] text-sm">
                  Sarah Miller booked a viewing for Dec 24 at 2:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Activity Item 3 */}
          <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1e3a1e] flex items-center justify-center shrink-0">
                <span className="text-[#86efac] text-xs font-semibold">RJ</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-white font-medium text-sm">Price adjustment</h4>
                  <span className="text-[#6a6a6a] text-xs shrink-0">1d ago</span>
                </div>
                <p className="text-[#8a8a8a] text-sm">
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
