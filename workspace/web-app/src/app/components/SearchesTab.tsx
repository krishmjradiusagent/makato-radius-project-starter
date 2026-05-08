import { ChevronRight, Plus, Filter } from 'lucide-react';
import { Screen } from '../App';

interface SearchesTabProps {
  onNavigate: (screen: Screen) => void;
  onFilterClick: () => void;
}

export function SearchesTab({ onNavigate, onFilterClick }: SearchesTabProps) {
  return (
    <div className="px-4 pb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#6a6a6a] text-xs font-semibold tracking-wider uppercase">
          All Searches (2)
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
            New Search
          </button>
        </div>
      </div>

      {/* Search Cards */}
      <div className="space-y-3">
        {/* Search Buy Card */}
        <button 
          onClick={() => onNavigate({ type: 'search-detail', id: 'buy' })}
          className="w-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4 text-left hover:bg-[#1f1f1f] transition-colors"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#86efac]" />
                <span className="text-white font-semibold text-[15px]">Search · Buy</span>
              </div>
              <p className="text-[#8a8a8a] text-sm">
                Looking for family home in suburban area
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#5a5a5a] shrink-0 ml-2" />
          </div>

          {/* Search Criteria */}
          <div className="space-y-2 pb-3 border-b border-[#2d2d2d]">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#8a8a8a]">Price Range</span>
              <span className="text-white">$300K - $500K</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#8a8a8a]">Bedrooms</span>
              <span className="text-white">3-4</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#8a8a8a]">Location</span>
              <span className="text-white">Springfield</span>
            </div>
          </div>

          {/* Meta Info */}
          <div className="mt-3 flex items-center justify-between text-xs text-[#6a6a6a]">
            <span>Created Nov 15, 2024</span>
            <span className="text-[#5a5ff2] font-medium">12 matches</span>
          </div>
        </button>

        {/* Search Rent Card */}
        <button 
          onClick={() => onNavigate({ type: 'search-detail', id: 'rent' })}
          className="w-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4 text-left hover:bg-[#1f1f1f] transition-colors"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#93c5fd]" />
                <span className="text-white font-semibold text-[15px]">Search · Rent</span>
              </div>
              <p className="text-[#8a8a8a] text-sm">
                Temporary housing near downtown
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#5a5a5a] shrink-0 ml-2" />
          </div>

          {/* Search Criteria */}
          <div className="space-y-2 pb-3 border-b border-[#2d2d2d]">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#8a8a8a]">Monthly Rent</span>
              <span className="text-white">$1.5K - $2.5K</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#8a8a8a]">Bedrooms</span>
              <span className="text-white">2</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#8a8a8a]">Location</span>
              <span className="text-white">Downtown</span>
            </div>
          </div>

          {/* Meta Info */}
          <div className="mt-3 flex items-center justify-between text-xs text-[#6a6a6a]">
            <span>Created Nov 20, 2024</span>
            <span className="text-[#5a5ff2] font-medium">8 matches</span>
          </div>
        </button>
      </div>

      {/* Active Matches Section */}
      <div className="mt-6">
        <h3 className="text-[#6a6a6a] text-xs font-semibold tracking-wider uppercase mb-3">
          Recent Matches
        </h3>

        <div className="space-y-3">
          {/* Property Match 1 */}
          <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-blue-900 to-purple-900" />
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-white font-medium text-sm">742 Evergreen Terrace</h4>
                <div className="w-1.5 h-1.5 rounded-full bg-[#86efac] shrink-0 mt-1.5" />
              </div>
              <div className="text-[#86efac] font-semibold text-sm mb-2">$425,000</div>
              <div className="text-[#8a8a8a] text-xs mb-2">3 Beds, 2 Baths, 2000 Sq.ft</div>
              <div className="text-[#6a6a6a] text-xs">Springfield, IL</div>
            </div>
          </div>

          {/* Property Match 2 */}
          <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-green-900 to-blue-900" />
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-white font-medium text-sm">456 Oak Avenue</h4>
                <div className="w-1.5 h-1.5 rounded-full bg-[#86efac] shrink-0 mt-1.5" />
              </div>
              <div className="text-[#86efac] font-semibold text-sm mb-2">$385,000</div>
              <div className="text-[#8a8a8a] text-xs mb-2">4 Beds, 2.5 Baths, 2200 Sq.ft</div>
              <div className="text-[#6a6a6a] text-xs">Springfield, IL</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
