import { ArrowLeft, MoreVertical, FileText, MessageSquare, Eye, Users, Calendar } from 'lucide-react';

interface ListingDetailProps {
  id: string;
  onBack: () => void;
}

export function ListingDetail({ id, onBack }: ListingDetailProps) {
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
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <button onClick={onBack}>
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 className="text-white font-semibold text-lg">5500 Clemente Dr</h1>
              <p className="text-[#8a8a8a] text-sm">Beverly Hills, CA</p>
            </div>
          </div>
          <button>
            <MoreVertical className="w-5 h-5 text-[#8a8a8a]" />
          </button>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <span className="bg-[#3a2e1e] text-[#f59e0b] px-2 py-1 rounded text-xs font-medium border border-[#4a3e2d]">
            Pending
          </span>
          <span className="text-[#8a8a8a] text-sm">On market 14 days</span>
        </div>

        <div className="text-[#86efac] font-semibold text-xl">$200,000</div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Property Details */}
        <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4 mb-4">
          <h3 className="text-white font-semibold mb-3">Property Details</h3>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <div className="text-[#8a8a8a] text-xs mb-1">Beds</div>
              <div className="text-white font-semibold">3</div>
            </div>
            <div>
              <div className="text-[#8a8a8a] text-xs mb-1">Baths</div>
              <div className="text-white font-semibold">2</div>
            </div>
            <div>
              <div className="text-[#8a8a8a] text-xs mb-1">Sq.ft</div>
              <div className="text-white font-semibold">3,000</div>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[#8a8a8a]">Type</span>
              <span className="text-white">Single Family</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8a8a8a]">Year Built</span>
              <span className="text-white">1995</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8a8a8a]">Lot Size</span>
              <span className="text-white">0.25 acres</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-3 flex flex-col items-center">
            <div className="w-10 h-10 rounded-lg bg-[#252525] flex items-center justify-center mb-2">
              <Eye className="w-5 h-5 text-[#5a5ff2]" />
            </div>
            <span className="text-white font-semibold">142</span>
            <span className="text-[#8a8a8a] text-xs">Views</span>
          </div>

          <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-3 flex flex-col items-center">
            <div className="w-10 h-10 rounded-lg bg-[#252525] flex items-center justify-center mb-2">
              <Users className="w-5 h-5 text-[#5a5ff2]" />
            </div>
            <span className="text-white font-semibold">3</span>
            <span className="text-[#8a8a8a] text-xs">Offers</span>
          </div>

          <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-3 flex flex-col items-center">
            <div className="w-10 h-10 rounded-lg bg-[#252525] flex items-center justify-center mb-2">
              <Calendar className="w-5 h-5 text-[#5a5ff2]" />
            </div>
            <span className="text-white font-semibold">5</span>
            <span className="text-[#8a8a8a] text-xs">Showings</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4 mb-4">
          <h3 className="text-white font-semibold mb-3">Timeline</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#8a8a8a]">Listing Start</span>
              <span className="text-white">Dec 1, 2024</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#8a8a8a]">On Market</span>
              <span className="text-white">Dec 1, 2024</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#8a8a8a]">Expected Close</span>
              <span className="text-white">Dec 31, 2024</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-[#6a6a6a] text-xs font-semibold tracking-wider uppercase mb-3">
            Recent Activity
          </h3>
          
          <div className="space-y-2">
            <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-3">
              <div className="flex items-start justify-between mb-1">
                <span className="text-white text-sm font-medium">New offer received</span>
                <span className="text-[#8a8a8a] text-xs">2h ago</span>
              </div>
              <p className="text-[#8a8a8a] text-xs">Offer #3 from John Smith</p>
            </div>

            <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-3">
              <div className="flex items-start justify-between mb-1">
                <span className="text-white text-sm font-medium">Showing scheduled</span>
                <span className="text-[#8a8a8a] text-xs">1d ago</span>
              </div>
              <p className="text-[#8a8a8a] text-xs">Tomorrow at 3:00 PM</p>
            </div>

            <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-3">
              <div className="flex items-start justify-between mb-1">
                <span className="text-white text-sm font-medium">Photos updated</span>
                <span className="text-[#8a8a8a] text-xs">3d ago</span>
              </div>
              <p className="text-[#8a8a8a] text-xs">12 new professional photos added</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="shrink-0 p-4 border-t border-[#2d2d2d] flex gap-3">
        <button className="flex-1 bg-[#2d2d2d] text-white py-3 rounded-lg font-medium border border-[#404040] flex items-center justify-center gap-2">
          <FileText className="w-4 h-4" />
          Documents
        </button>
        <button className="flex-1 bg-[#5a5ff2] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Messages
        </button>
      </div>
    </div>
  );
}
