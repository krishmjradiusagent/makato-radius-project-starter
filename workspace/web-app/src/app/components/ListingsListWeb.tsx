import { ArrowLeft, Plus, ChevronRight } from 'lucide-react';
import { Screen } from '../App';

interface ListingsListWebProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

export function ListingsListWeb({ onBack, onNavigate }: ListingsListWebProps) {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <div className="bg-white border-b border-[#e5e5e5]">
        <div className="max-w-[1200px] mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="text-[#737373] hover:text-[#171717] transition-colors p-2 hover:bg-[#f5f5f5] rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-[#171717] font-semibold text-2xl">Listings</h1>
                <p className="text-[#737373] text-sm">Violet Cole</p>
              </div>
            </div>
            <button className="bg-[#5a5ff2] text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#4a4fe2] transition-colors">
              <Plus className="w-4 h-4" />
              Create Listing
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="grid grid-cols-2 gap-4">
          {/* Listing 1 */}
          <button
            onClick={() => onNavigate({ type: 'listing-detail', id: 'listing-1' })}
            className="bg-white border border-[#e5e5e5] rounded-xl p-6 text-left hover:border-[#d4d4d4] hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-[#171717] font-semibold text-lg mb-1">
                  5500 Clemente Dr, Beverly Hills
                </h4>
                <p className="text-[#737373] text-sm mb-3">Created Dec 1, 2024</p>
                <div className="text-[#22c55e] font-semibold text-lg">$200,000</div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#a3a3a3] shrink-0 mt-1" />
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm mb-4 pb-4 border-b border-[#e5e5e5]">
              <div>
                <div className="text-[#737373]">Beds</div>
                <div className="text-[#171717] font-medium">3</div>
              </div>
              <div>
                <div className="text-[#737373]">Baths</div>
                <div className="text-[#171717] font-medium">2</div>
              </div>
              <div>
                <div className="text-[#737373]">Sq.ft</div>
                <div className="text-[#171717] font-medium">3,000</div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#fef3c7] text-[#92400e] px-2.5 py-1.5 rounded text-xs font-medium border border-[#fbbf24]">
                Pending
              </span>
              <span className="text-[#737373] text-sm">3 offers</span>
              <span className="text-[#d4d4d4]">•</span>
              <span className="text-[#737373] text-sm">8 docs</span>
              <span className="text-[#d4d4d4]">•</span>
              <span className="text-[#737373] text-sm">On market 14 days</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
