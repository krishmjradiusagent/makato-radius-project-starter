import { ChevronRight, Plus, Filter } from 'lucide-react';
import { Screen } from '../App';
import { DSCard, DSButton, DSIconButton } from './ds';

interface TransactionsTabProps {
  onNavigate: (screen: Screen) => void;
  onFilterClick: () => void;
}

export function TransactionsTab({ onNavigate, onFilterClick }: TransactionsTabProps) {
  return (
    <div className="px-4 pb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#6a6a6a] text-xs font-semibold tracking-wider uppercase">
          Transactions (3)
        </h3>
        <div className="flex items-center gap-2">
          <DSIconButton
            icon={<Filter className="w-4 h-4" />}
            label="Filter"
            onClick={onFilterClick}
            className="text-[#8a8a8a] hover:text-white"
          />
          <DSButton variant="ghost" className="text-[#5a5ff2] h-auto py-1 px-2">
            <Plus className="w-4 h-4" />
            New Transaction
          </DSButton>
        </div>
      </div>

      {/* Transaction Groups */}
      <div className="space-y-3">
        {/* Searches */}
        <DSCard
          onClick={() => onNavigate({ type: 'searches-list' })}
          className="p-4 cursor-pointer hover:bg-[#1f1f1f] transition-colors bg-[#1a1a1a] border-[#2d2d2d]"
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white font-semibold text-[15px]">Searches</h4>
            <div className="flex items-center gap-2">
              <span className="text-[#5a5ff2] font-semibold text-sm">2</span>
              <ChevronRight className="w-5 h-5 text-[#5a5a5a]" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#8a8a8a]">Buy</span>
              <span className="text-[#b0b0b0]">1</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#8a8a8a]">Rent</span>
              <span className="text-[#b0b0b0]">1</span>
            </div>
          </div>
        </DSCard>

        {/* Offers */}
        <button 
          onClick={() => onNavigate({ type: 'offers-list' })}
          className="w-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4 text-left hover:bg-[#1f1f1f] transition-colors"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-white font-semibold text-[15px]">Offers</h4>
            <div className="flex items-center gap-2">
              <span className="text-[#5a5ff2] font-semibold text-sm">3</span>
              <ChevronRight className="w-5 h-5 text-[#5a5a5a]" />
            </div>
          </div>
          <div className="mt-2 space-y-1.5">
            <div className="text-[#8a8a8a] text-xs">742 Evergreen Terrace</div>
            <div className="text-[#8a8a8a] text-xs">1640 Riverside Drive</div>
            <div className="text-[#8a8a8a] text-xs">221B Baker Street</div>
          </div>
        </button>

        {/* Listings */}
        <button 
          onClick={() => onNavigate({ type: 'listings-list' })}
          className="w-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4 text-left hover:bg-[#1f1f1f] transition-colors"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-white font-semibold text-[15px]">Listings</h4>
            <div className="flex items-center gap-2">
              <span className="text-[#5a5ff2] font-semibold text-sm">1</span>
              <ChevronRight className="w-5 h-5 text-[#5a5a5a]" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-[#8a8a8a] text-xs">5500 Clemente Dr</div>
          </div>
        </button>
      </div>

      {/* Transaction Detail Cards */}
      <div className="mt-6 space-y-3">
        <h3 className="text-[#6a6a6a] text-xs font-semibold tracking-wider uppercase mb-3">
          Recent Activity
        </h3>

        {/* Offer Card 1 */}
        <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
          <h4 className="text-white font-medium text-[15px] mb-2">742 Evergreen Terrace, Springfield</h4>
          <div className="text-[#6a6a6a] text-xs mb-3">
            Created on Nov 28, 2024 • Offer #3
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-[#1e3a1e] text-[#86efac] px-2 py-1 rounded text-xs font-medium border border-[#2d4a2d]">
              New Offer
            </span>
            <div className="flex items-center gap-1 text-xs text-[#8a8a8a]">
              <div className="w-4 h-4 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400" />
              <span>Any Williams</span>
            </div>
            <button className="text-[#5a5ff2] text-xs font-medium flex items-center gap-1">
              12 docs
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Offer Card 2 */}
        <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
          <h4 className="text-white font-medium text-[15px] mb-2">1640 Riverside Drive, Hill Valley</h4>
          <div className="text-[#6a6a6a] text-xs mb-3">
            Created on Nov 15, 2024 • Offer #1
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-[#3a2e1e] text-[#f59e0b] px-2 py-1 rounded text-xs font-medium border border-[#4a3e2d]">
              Pending
            </span>
            <div className="flex items-center gap-1 text-xs text-[#8a8a8a]">
              <div className="w-4 h-4 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400" />
              <span>Any Williams</span>
            </div>
            <button className="text-[#5a5ff2] text-xs font-medium flex items-center gap-1">
              8 docs
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Listing Card */}
        <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="text-white font-medium text-[15px] mb-1">1600 Pennsylvania Avenue, Washington</h4>
              <div className="text-[#86efac] font-semibold text-sm mb-1">$200,000</div>
              <div className="text-[#6a6a6a] text-xs">3 Beds, 2 Baths, 3000 Sq.ft</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-xs text-[#6a6a6a] mb-3 pt-2 border-t border-[#2d2d2d]">
            <div>
              <div className="text-[#8a8a8a]">Listing start</div>
              <div className="text-white text-xs mt-0.5">Dec 1, 2024</div>
            </div>
            <div>
              <div className="text-[#8a8a8a]">On market</div>
              <div className="text-white text-xs mt-0.5">Dec 1, 2024</div>
            </div>
            <div>
              <div className="text-[#8a8a8a]">On Market</div>
              <div className="text-white text-xs mt-0.5">Dec 12, 2025</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-[#3a2e1e] text-[#f59e0b] px-2 py-1 rounded text-xs font-medium border border-[#4a3e2d]">
              Pending
            </span>
            <button className="text-[#5a5ff2] text-xs font-medium">3 offers</button>
            <button className="text-[#5a5ff2] text-xs font-medium flex items-center gap-1">
              8 docs
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}