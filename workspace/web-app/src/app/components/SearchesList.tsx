import { ArrowLeft, Plus, ChevronRight } from 'lucide-react';
import { Screen } from '../App';

interface SearchesListProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

export function SearchesList({ onBack, onNavigate }: SearchesListProps) {
  return (
    <div className="w-full max-w-[390px] mx-auto h-screen flex flex-col bg-[#0a0a0a]">
      {/* Status Bar */}
      <div className="h-[54px] flex items-center justify-between px-4 text-white shrink-0">
        <span className="font-semibold">9:41</span>
        <div className="flex gap-1.5 items-center">
          <svg className="w-[17px] h-[11px]" viewBox="0 0 18 13" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.5713 2.46628C11.0584 2.46639 13.4504 3.38847 15.2529 5.04195C15.3887 5.1696 15.6056 5.16799 15.7393 5.03834L17.0368 3.77487C17.1045 3.70911 17.1422 3.62004 17.1417 3.52735C17.1411 3.43467 17.1023 3.34603 17.0338 3.28104C12.3028 -1.09368 4.83907 -1.09368 0.108056 3.28104C0.039524 3.34598 0.000639766 3.4346 7.82398e-06 3.52728C-0.000624118 3.61996 0.0370483 3.70906 0.104689 3.77487L1.40255 5.03834C1.53615 5.16819 1.75327 5.1698 1.88893 5.04195C3.69167 3.38836 6.08395 2.46628 8.5713 2.46628Z" fill="currentColor"/>
          </svg>
          <div className="w-[25px] h-[11.5px] border border-white/35 rounded-[4px] relative">
            <div className="absolute inset-[2px] bg-white rounded-[2px]" />
            <div className="absolute -right-[2px] top-1/2 -translate-y-1/2 w-[1.3px] h-[4px] bg-white/40 rounded-r" />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="shrink-0 px-4 pb-4 border-b border-[#2d2d2d]">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div>
            <h1 className="text-white font-semibold text-lg">Searches</h1>
            <p className="text-[#8a8a8a] text-sm">Violet Cole</p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Buy Searches Section */}
        <div className="mb-6">
          <h3 className="text-[#6a6a6a] text-xs font-semibold tracking-wider uppercase mb-3">
            Buy Searches (1)
          </h3>
          
          <button
            onClick={() => onNavigate({ type: 'search-detail', id: 'search-buy-1' })}
            className="w-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4 text-left hover:bg-[#1f1f1f] transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="text-white font-semibold text-[15px] mb-1">Downtown Properties</h4>
                <p className="text-[#8a8a8a] text-sm">Buy • Created Dec 1, 2024</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#5a5a5a] shrink-0 mt-1" />
            </div>

            <div className="flex items-center gap-2 flex-wrap mb-3">
              <span className="bg-[#1e3a1e] text-[#86efac] px-2 py-1 rounded text-xs font-medium border border-[#2d4a2d]">
                Active
              </span>
              <span className="text-[#8a8a8a] text-xs">8 matches</span>
            </div>

            <div className="space-y-1.5 text-sm text-[#b0b0b0]">
              <div className="flex items-center justify-between">
                <span className="text-[#8a8a8a]">Price Range</span>
                <span>$250k - $400k</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8a8a8a]">Bedrooms</span>
                <span>3-4</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8a8a8a]">Location</span>
                <span>Downtown, Midtown</span>
              </div>
            </div>
          </button>
        </div>

        {/* Rent Searches Section */}
        <div>
          <h3 className="text-[#6a6a6a] text-xs font-semibold tracking-wider uppercase mb-3">
            Rent Searches (1)
          </h3>
          
          <button
            onClick={() => onNavigate({ type: 'search-detail', id: 'search-rent-1' })}
            className="w-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4 text-left hover:bg-[#1f1f1f] transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="text-white font-semibold text-[15px] mb-1">Family Rentals</h4>
                <p className="text-[#8a8a8a] text-sm">Rent • Created Nov 20, 2024</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#5a5a5a] shrink-0 mt-1" />
            </div>

            <div className="flex items-center gap-2 flex-wrap mb-3">
              <span className="bg-[#1e3a1e] text-[#86efac] px-2 py-1 rounded text-xs font-medium border border-[#2d4a2d]">
                Active
              </span>
              <span className="text-[#8a8a8a] text-xs">5 matches</span>
            </div>

            <div className="space-y-1.5 text-sm text-[#b0b0b0]">
              <div className="flex items-center justify-between">
                <span className="text-[#8a8a8a]">Price Range</span>
                <span>$1,500 - $2,500/mo</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8a8a8a]">Bedrooms</span>
                <span>2-3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8a8a8a]">Location</span>
                <span>Suburbs, Good Schools</span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="shrink-0 p-4 border-t border-[#2d2d2d]">
        <button className="w-full bg-[#5a5ff2] text-white py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#4a4fd2] transition-colors">
          <Plus className="w-5 h-5" />
          Add Search
        </button>
      </div>
    </div>
  );
}
