import { ChevronRight, Plus, Filter } from 'lucide-react';
import { Screen } from '../App';

interface TransactionsTabWebProps {
  onNavigate: (screen: Screen) => void;
  onFilterClick: () => void;
}

export function TransactionsTabWeb({ onNavigate, onFilterClick }: TransactionsTabWebProps) {
  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[#737373] text-sm font-semibold tracking-wider uppercase">
          Transactions (3)
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
            New Transaction
          </button>
        </div>
      </div>

      {/* Transaction Groups - Grid Layout */}
      <div className="grid grid-cols-3 gap-4">
        {/* Searches */}
        <button 
          onClick={() => onNavigate({ type: 'searches-list' })}
          className="bg-white border border-[#e5e5e5] rounded-xl p-5 text-left hover:border-[#d4d4d4] hover:shadow-sm transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-[#171717] font-semibold">Searches</h4>
            <div className="flex items-center gap-2">
              <span className="text-[#5a5ff2] font-semibold">2</span>
              <ChevronRight className="w-5 h-5 text-[#a3a3a3]" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#737373]">Buy</span>
              <span className="text-[#525252]">1</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#737373]">Rent</span>
              <span className="text-[#525252]">1</span>
            </div>
          </div>
        </button>

        {/* Offers */}
        <button 
          onClick={() => onNavigate({ type: 'offers-list' })}
          className="bg-white border border-[#e5e5e5] rounded-xl p-5 text-left hover:border-[#d4d4d4] hover:shadow-sm transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-[#171717] font-semibold">Offers</h4>
            <div className="flex items-center gap-2">
              <span className="text-[#5a5ff2] font-semibold">3</span>
              <ChevronRight className="w-5 h-5 text-[#a3a3a3]" />
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="text-[#737373] text-xs">742 Evergreen Terrace</div>
            <div className="text-[#737373] text-xs">1640 Riverside Drive</div>
            <div className="text-[#737373] text-xs">221B Baker Street</div>
          </div>
        </button>

        {/* Listings */}
        <button 
          onClick={() => onNavigate({ type: 'listings-list' })}
          className="bg-white border border-[#e5e5e5] rounded-xl p-5 text-left hover:border-[#d4d4d4] hover:shadow-sm transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-[#171717] font-semibold">Listings</h4>
            <div className="flex items-center gap-2">
              <span className="text-[#5a5ff2] font-semibold">1</span>
              <ChevronRight className="w-5 h-5 text-[#a3a3a3]" />
            </div>
          </div>
          <div>
            <div className="text-[#737373] text-xs">5500 Clemente Dr</div>
          </div>
        </button>
      </div>

      {/* Transaction Detail Cards */}
      <div>
        <h3 className="text-[#737373] text-sm font-semibold tracking-wider uppercase mb-4">
          Recent Activity
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {/* Offer Card 1 */}
          <div className="bg-white border border-[#e5e5e5] rounded-xl p-5 hover:border-[#d4d4d4] hover:shadow-sm transition-all">
            <h4 className="text-[#171717] font-medium mb-2">742 Evergreen Terrace, Springfield</h4>
            <div className="text-[#a3a3a3] text-xs mb-4">
              Created on Nov 28, 2024 • Offer #3
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#dcfce7] text-[#166534] px-2.5 py-1.5 rounded text-xs font-medium border border-[#86efac]">
                New Offer
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#737373]">
                <div className="w-4 h-4 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400" />
                <span>Any Williams</span>
              </div>
              <button className="text-[#5a5ff2] text-xs font-medium flex items-center gap-1 hover:underline">
                12 docs
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Offer Card 2 */}
          <div className="bg-white border border-[#e5e5e5] rounded-xl p-5 hover:border-[#d4d4d4] hover:shadow-sm transition-all">
            <h4 className="text-[#171717] font-medium mb-2">1640 Riverside Drive, Hill Valley</h4>
            <div className="text-[#a3a3a3] text-xs mb-4">
              Created on Nov 15, 2024 • Offer #1
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#fef3c7] text-[#92400e] px-2.5 py-1.5 rounded text-xs font-medium border border-[#fbbf24]">
                Pending
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#737373]">
                <div className="w-4 h-4 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400" />
                <span>Any Williams</span>
              </div>
              <button className="text-[#5a5ff2] text-xs font-medium flex items-center gap-1 hover:underline">
                8 docs
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Listing Card */}
          <div className="bg-white border border-[#e5e5e5] rounded-xl p-5 hover:border-[#d4d4d4] hover:shadow-sm transition-all col-span-2">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-[#171717] font-medium mb-1">1600 Pennsylvania Avenue, Washington</h4>
                <div className="text-[#22c55e] font-semibold mb-1">$200,000</div>
                <div className="text-[#a3a3a3] text-xs">3 Beds, 2 Baths, 3000 Sq.ft</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-xs text-[#a3a3a3] mb-4 pt-3 border-t border-[#e5e5e5]">
              <div>
                <div className="text-[#737373]">Listing start</div>
                <div className="text-[#171717] text-xs mt-1">Dec 1, 2024</div>
              </div>
              <div>
                <div className="text-[#737373]">On market</div>
                <div className="text-[#171717] text-xs mt-1">Dec 1, 2024</div>
              </div>
              <div>
                <div className="text-[#737373]">On Market</div>
                <div className="text-[#171717] text-xs mt-1">Dec 12, 2025</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 flex-wrap">
              <span className="bg-[#fef3c7] text-[#92400e] px-2.5 py-1.5 rounded text-xs font-medium border border-[#fbbf24]">
                Pending
              </span>
              <button className="text-[#5a5ff2] text-xs font-medium hover:underline">3 offers</button>
              <button className="text-[#5a5ff2] text-xs font-medium flex items-center gap-1 hover:underline">
                8 docs
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}