import { ArrowLeft, Plus, ChevronRight } from 'lucide-react';
import { Screen } from '../App';

interface OffersListProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

export function OffersList({ onBack, onNavigate }: OffersListProps) {
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
            <h1 className="text-white font-semibold text-lg">Offers</h1>
            <p className="text-[#8a8a8a] text-sm">Violet Cole</p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-3">
          {/* Offer 1 */}
          <button
            onClick={() => onNavigate({ type: 'offer-detail', id: 'offer-3' })}
            className="w-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4 text-left hover:bg-[#1f1f1f] transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="text-white font-semibold text-[15px] mb-1">
                  742 Evergreen Terrace, Springfield
                </h4>
                <p className="text-[#8a8a8a] text-sm mb-2">Offer #3 • Created Nov 28, 2024</p>
                <div className="text-[#86efac] font-semibold text-sm">$325,000</div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#5a5a5a] shrink-0 mt-1" />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#1e3a1e] text-[#86efac] px-2 py-1 rounded text-xs font-medium border border-[#2d4a2d]">
                New Offer
              </span>
              <span className="text-[#8a8a8a] text-xs">12 docs</span>
              <span className="text-[#8a8a8a] text-xs">•</span>
              <span className="text-[#8a8a8a] text-xs">2 messages</span>
            </div>
          </button>

          {/* Offer 2 */}
          <button
            onClick={() => onNavigate({ type: 'offer-detail', id: 'offer-2' })}
            className="w-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4 text-left hover:bg-[#1f1f1f] transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="text-white font-semibold text-[15px] mb-1">
                  221B Baker Street, London
                </h4>
                <p className="text-[#8a8a8a] text-sm mb-2">Offer #2 • Created Nov 18, 2024</p>
                <div className="text-[#f59e0b] font-semibold text-sm">$280,000</div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#5a5a5a] shrink-0 mt-1" />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#3a2e1e] text-[#f59e0b] px-2 py-1 rounded text-xs font-medium border border-[#4a3e2d]">
                Counter Offer
              </span>
              <span className="text-[#8a8a8a] text-xs">6 docs</span>
              <span className="text-[#8a8a8a] text-xs">•</span>
              <span className="text-[#8a8a8a] text-xs">5 messages</span>
            </div>
          </button>

          {/* Offer 3 */}
          <button
            onClick={() => onNavigate({ type: 'offer-detail', id: 'offer-1' })}
            className="w-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4 text-left hover:bg-[#1f1f1f] transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="text-white font-semibold text-[15px] mb-1">
                  1640 Riverside Drive, Hill Valley
                </h4>
                <p className="text-[#8a8a8a] text-sm mb-2">Offer #1 • Created Nov 15, 2024</p>
                <div className="text-[#ec4899] font-semibold text-sm">$350,000</div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#5a5a5a] shrink-0 mt-1" />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#3a2e1e] text-[#f59e0b] px-2 py-1 rounded text-xs font-medium border border-[#4a3e2d]">
                Pending
              </span>
              <span className="text-[#8a8a8a] text-xs">8 docs</span>
              <span className="text-[#8a8a8a] text-xs">•</span>
              <span className="text-[#8a8a8a] text-xs">3 messages</span>
            </div>
          </button>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="shrink-0 p-4 border-t border-[#2d2d2d]">
        <button className="w-full bg-[#5a5ff2] text-white py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#4a4fd2] transition-colors">
          <Plus className="w-5 h-5" />
          Create Offer
        </button>
      </div>
    </div>
  );
}
