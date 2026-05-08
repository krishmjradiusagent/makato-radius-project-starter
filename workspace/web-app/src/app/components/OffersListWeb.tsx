import { ArrowLeft, Plus, ChevronRight } from 'lucide-react';
import { Screen } from '../App';

interface OffersListWebProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

export function OffersListWeb({ onBack, onNavigate }: OffersListWebProps) {
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
                <h1 className="text-[#171717] font-semibold text-2xl">Offers</h1>
                <p className="text-[#737373] text-sm">Violet Cole</p>
              </div>
            </div>
            <button className="bg-[#5a5ff2] text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#4a4fe2] transition-colors">
              <Plus className="w-4 h-4" />
              Create Offer
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="grid grid-cols-2 gap-4">
          {/* Offer 1 */}
          <button
            onClick={() => onNavigate({ type: 'offer-detail', id: 'offer-3' })}
            className="bg-white border border-[#e5e5e5] rounded-xl p-6 text-left hover:border-[#d4d4d4] hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-[#171717] font-semibold text-lg mb-1">
                  742 Evergreen Terrace, Springfield
                </h4>
                <p className="text-[#737373] text-sm mb-3">Offer #3 • Created Nov 28, 2024</p>
                <div className="text-[#22c55e] font-semibold text-lg">$325,000</div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#a3a3a3] shrink-0 mt-1" />
            </div>

            <div className="flex items-center gap-2 flex-wrap pt-4 border-t border-[#e5e5e5]">
              <span className="bg-[#dcfce7] text-[#166534] px-2.5 py-1.5 rounded text-xs font-medium border border-[#86efac]">
                New Offer
              </span>
              <span className="text-[#737373] text-sm">12 docs</span>
              <span className="text-[#d4d4d4]">•</span>
              <span className="text-[#737373] text-sm">2 messages</span>
            </div>
          </button>

          {/* Offer 2 */}
          <button
            onClick={() => onNavigate({ type: 'offer-detail', id: 'offer-2' })}
            className="bg-white border border-[#e5e5e5] rounded-xl p-6 text-left hover:border-[#d4d4d4] hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-[#171717] font-semibold text-lg mb-1">
                  221B Baker Street, London
                </h4>
                <p className="text-[#737373] text-sm mb-3">Offer #2 • Created Nov 18, 2024</p>
                <div className="text-[#f59e0b] font-semibold text-lg">$280,000</div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#a3a3a3] shrink-0 mt-1" />
            </div>

            <div className="flex items-center gap-2 flex-wrap pt-4 border-t border-[#e5e5e5]">
              <span className="bg-[#fef3c7] text-[#92400e] px-2.5 py-1.5 rounded text-xs font-medium border border-[#fbbf24]">
                Counter Offer
              </span>
              <span className="text-[#737373] text-sm">6 docs</span>
              <span className="text-[#d4d4d4]">•</span>
              <span className="text-[#737373] text-sm">5 messages</span>
            </div>
          </button>

          {/* Offer 3 */}
          <button
            onClick={() => onNavigate({ type: 'offer-detail', id: 'offer-1' })}
            className="bg-white border border-[#e5e5e5] rounded-xl p-6 text-left hover:border-[#d4d4d4] hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-[#171717] font-semibold text-lg mb-1">
                  1640 Riverside Drive, Hill Valley
                </h4>
                <p className="text-[#737373] text-sm mb-3">Offer #1 • Created Nov 15, 2024</p>
                <div className="text-[#ec4899] font-semibold text-lg">$350,000</div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#a3a3a3] shrink-0 mt-1" />
            </div>

            <div className="flex items-center gap-2 flex-wrap pt-4 border-t border-[#e5e5e5]">
              <span className="bg-[#fef3c7] text-[#92400e] px-2.5 py-1.5 rounded text-xs font-medium border border-[#fbbf24]">
                Pending
              </span>
              <span className="text-[#737373] text-sm">8 docs</span>
              <span className="text-[#d4d4d4]">•</span>
              <span className="text-[#737373] text-sm">3 messages</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
