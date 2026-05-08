import { ArrowLeft, Plus, ChevronRight } from 'lucide-react';
import { Screen } from '../App';

interface SearchesListWebProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

export function SearchesListWeb({ onBack, onNavigate }: SearchesListWebProps) {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <div className="bg-white border-b border-[#e5e5e5]">
        <div className="max-w-[1200px] mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-2">
            <button 
              onClick={onBack}
              className="text-[#737373] hover:text-[#171717] transition-colors p-2 hover:bg-[#f5f5f5] rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-[#171717] font-semibold text-2xl">Searches</h1>
              <p className="text-[#737373] text-sm">Violet Cole</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Buy Searches Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#737373] text-sm font-semibold tracking-wider uppercase">
              Buy Searches (1)
            </h3>
            <button className="bg-[#5a5ff2] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#4a4fe2] transition-colors">
              <Plus className="w-4 h-4" />
              Add Buy Search
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onNavigate({ type: 'search-detail', id: 'search-buy-1' })}
              className="bg-white border border-[#e5e5e5] rounded-xl p-6 text-left hover:border-[#d4d4d4] hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-[#171717] font-semibold text-lg mb-1">Downtown Properties</h4>
                  <p className="text-[#737373] text-sm">Buy • Created Dec 1, 2024</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#a3a3a3] shrink-0 mt-1" />
              </div>

              <div className="flex items-center gap-2 flex-wrap mb-4">
                <span className="bg-[#dcfce7] text-[#166534] px-2.5 py-1.5 rounded text-xs font-medium border border-[#86efac]">
                  Active
                </span>
                <span className="text-[#737373] text-sm">8 matches</span>
              </div>

              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#737373]">Price Range</span>
                  <span className="text-[#171717] font-medium">$250k - $400k</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#737373]">Bedrooms</span>
                  <span className="text-[#171717] font-medium">3-4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#737373]">Location</span>
                  <span className="text-[#171717] font-medium">Downtown, Midtown</span>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Rent Searches Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#737373] text-sm font-semibold tracking-wider uppercase">
              Rent Searches (1)
            </h3>
            <button className="bg-[#5a5ff2] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#4a4fe2] transition-colors">
              <Plus className="w-4 h-4" />
              Add Rent Search
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onNavigate({ type: 'search-detail', id: 'search-rent-1' })}
              className="bg-white border border-[#e5e5e5] rounded-xl p-6 text-left hover:border-[#d4d4d4] hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-[#171717] font-semibold text-lg mb-1">Family Rentals</h4>
                  <p className="text-[#737373] text-sm">Rent • Created Nov 20, 2024</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#a3a3a3] shrink-0 mt-1" />
              </div>

              <div className="flex items-center gap-2 flex-wrap mb-4">
                <span className="bg-[#dcfce7] text-[#166534] px-2.5 py-1.5 rounded text-xs font-medium border border-[#86efac]">
                  Active
                </span>
                <span className="text-[#737373] text-sm">5 matches</span>
              </div>

              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#737373]">Price Range</span>
                  <span className="text-[#171717] font-medium">$1,500 - $2,500/mo</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#737373]">Bedrooms</span>
                  <span className="text-[#171717] font-medium">2-3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#737373]">Location</span>
                  <span className="text-[#171717] font-medium">Suburbs, Good Schools</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
