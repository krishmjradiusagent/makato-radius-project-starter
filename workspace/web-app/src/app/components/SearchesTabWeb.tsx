import { ChevronRight, Plus, Filter } from 'lucide-react';
import { Screen } from '../App';

interface SearchesTabWebProps {
  onNavigate: (screen: Screen) => void;
  onFilterClick: () => void;
}

export function SearchesTabWeb({ onNavigate, onFilterClick }: SearchesTabWebProps) {
  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[#737373] text-sm font-semibold tracking-wider uppercase">
          All Searches (2)
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
            New Search
          </button>
        </div>
      </div>

      {/* Search Cards Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Search Buy Card */}
        <button 
          onClick={() => onNavigate({ type: 'search-detail', id: 'buy' })}
          className="bg-white border border-[#e5e5e5] rounded-xl p-5 text-left hover:border-[#d4d4d4] hover:shadow-sm transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#86efac]" />
                <span className="text-[#171717] font-semibold">Search · Buy</span>
              </div>
              <p className="text-[#737373] text-sm">
                Looking for family home in suburban area
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#a3a3a3] shrink-0 ml-2" />
          </div>

          {/* Search Criteria */}
          <div className="space-y-2 pb-4 border-b border-[#e5e5e5]">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#737373]">Price Range</span>
              <span className="text-[#171717] font-medium">$300K - $500K</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#737373]">Bedrooms</span>
              <span className="text-[#171717] font-medium">3-4</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#737373]">Location</span>
              <span className="text-[#171717] font-medium">Springfield</span>
            </div>
          </div>

          {/* Meta Info */}
          <div className="mt-4 flex items-center justify-between text-xs text-[#a3a3a3]">
            <span>Created Nov 15, 2024</span>
            <span className="text-[#5a5ff2] font-medium">12 matches</span>
          </div>
        </button>

        {/* Search Rent Card */}
        <button 
          onClick={() => onNavigate({ type: 'search-detail', id: 'rent' })}
          className="bg-white border border-[#e5e5e5] rounded-xl p-5 text-left hover:border-[#d4d4d4] hover:shadow-sm transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#93c5fd]" />
                <span className="text-[#171717] font-semibold">Search · Rent</span>
              </div>
              <p className="text-[#737373] text-sm">
                Temporary housing near downtown
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#a3a3a3] shrink-0 ml-2" />
          </div>

          {/* Search Criteria */}
          <div className="space-y-2 pb-4 border-b border-[#e5e5e5]">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#737373]">Monthly Rent</span>
              <span className="text-[#171717] font-medium">$1.5K - $2.5K</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#737373]">Bedrooms</span>
              <span className="text-[#171717] font-medium">2</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#737373]">Location</span>
              <span className="text-[#171717] font-medium">Downtown</span>
            </div>
          </div>

          {/* Meta Info */}
          <div className="mt-4 flex items-center justify-between text-xs text-[#a3a3a3]">
            <span>Created Nov 20, 2024</span>
            <span className="text-[#5a5ff2] font-medium">8 matches</span>
          </div>
        </button>
      </div>

      {/* Active Matches Section */}
      <div>
        <h3 className="text-[#737373] text-sm font-semibold tracking-wider uppercase mb-4">
          Recent Matches
        </h3>

        <div className="grid grid-cols-3 gap-4">
          {/* Property Match 1 */}
          <div className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden hover:border-[#d4d4d4] hover:shadow-sm transition-all">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100" />
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-[#171717] font-medium text-sm">742 Evergreen Terrace</h4>
                <div className="w-1.5 h-1.5 rounded-full bg-[#86efac] shrink-0 mt-1.5" />
              </div>
              <div className="text-[#22c55e] font-semibold text-sm mb-2">$425,000</div>
              <div className="text-[#737373] text-xs mb-3">3 Beds, 2 Baths, 2000 Sq.ft</div>
              <div className="text-[#a3a3a3] text-xs">Springfield, IL</div>
            </div>
          </div>

          {/* Property Match 2 */}
          <div className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden hover:border-[#d4d4d4] hover:shadow-sm transition-all">
            <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100" />
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-[#171717] font-medium text-sm">456 Oak Avenue</h4>
                <div className="w-1.5 h-1.5 rounded-full bg-[#86efac] shrink-0 mt-1.5" />
              </div>
              <div className="text-[#22c55e] font-semibold text-sm mb-2">$385,000</div>
              <div className="text-[#737373] text-xs mb-3">4 Beds, 2.5 Baths, 2200 Sq.ft</div>
              <div className="text-[#a3a3a3] text-xs">Springfield, IL</div>
            </div>
          </div>

          {/* Property Match 3 */}
          <div className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden hover:border-[#d4d4d4] hover:shadow-sm transition-all">
            <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100" />
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-[#171717] font-medium text-sm">789 Maple Street</h4>
                <div className="w-1.5 h-1.5 rounded-full bg-[#86efac] shrink-0 mt-1.5" />
              </div>
              <div className="text-[#22c55e] font-semibold text-sm mb-2">$460,000</div>
              <div className="text-[#737373] text-xs mb-3">3 Beds, 2 Baths, 1900 Sq.ft</div>
              <div className="text-[#a3a3a3] text-xs">Springfield, IL</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}