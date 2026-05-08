import { ArrowLeft, MoreVertical, FileText, MessageSquare, Clock, Download } from 'lucide-react';

interface OfferDetailProps {
  id: string;
  onBack: () => void;
}

export function OfferDetail({ id, onBack }: OfferDetailProps) {
  const offerData: Record<string, { address: string; price: string; status: string; statusColor: string; statusBg: string; created: string; docs: number; messages: number }> = {
    'offer-1': {
      address: '1640 Riverside Drive, Hill Valley',
      price: '$350,000',
      status: 'Pending',
      statusColor: '#f59e0b',
      statusBg: '#3a2e1e',
      created: 'Nov 15, 2024',
      docs: 8,
      messages: 3,
    },
    'offer-2': {
      address: '221B Baker Street, London',
      price: '$280,000',
      status: 'Counter Offer',
      statusColor: '#f59e0b',
      statusBg: '#3a2e1e',
      created: 'Nov 18, 2024',
      docs: 6,
      messages: 5,
    },
    'offer-3': {
      address: '742 Evergreen Terrace, Springfield',
      price: '$325,000',
      status: 'New Offer',
      statusColor: '#86efac',
      statusBg: '#1e3a1e',
      created: 'Nov 28, 2024',
      docs: 12,
      messages: 2,
    },
  };

  const offer = offerData[id] || offerData['offer-3'];

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
              <h1 className="text-white font-semibold text-lg">{offer.address}</h1>
              <p className="text-[#8a8a8a] text-sm">Offer #{id.split('-')[1]}</p>
            </div>
          </div>
          <button>
            <MoreVertical className="w-5 h-5 text-[#8a8a8a]" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span 
            className="px-2 py-1 rounded text-xs font-medium border"
            style={{
              backgroundColor: offer.statusBg,
              color: offer.statusColor,
              borderColor: offer.statusColor + '40',
            }}
          >
            {offer.status}
          </span>
          <span className="text-[#8a8a8a] text-sm">Created {offer.created}</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Offer Details */}
        <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4 mb-4">
          <h3 className="text-white font-semibold mb-3">Offer Details</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#8a8a8a] text-sm">Offer Amount</span>
              <span className="text-[#86efac] font-semibold">{offer.price}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8a8a8a] text-sm">Earnest Money</span>
              <span className="text-white">$5,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8a8a8a] text-sm">Contingency</span>
              <span className="text-white">Inspection, Financing</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8a8a8a] text-sm">Closing Date</span>
              <span className="text-white">30 days</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <button className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-[#1f1f1f] transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#252525] flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#5a5ff2]" />
            </div>
            <span className="text-white text-xs font-medium">{offer.docs} Docs</span>
          </button>

          <button className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-[#1f1f1f] transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#252525] flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-[#5a5ff2]" />
            </div>
            <span className="text-white text-xs font-medium">{offer.messages} Messages</span>
          </button>

          <button className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-[#1f1f1f] transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#252525] flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#5a5ff2]" />
            </div>
            <span className="text-white text-xs font-medium">Timeline</span>
          </button>
        </div>

        {/* Recent Documents */}
        <div>
          <h3 className="text-[#6a6a6a] text-xs font-semibold tracking-wider uppercase mb-3">
            Recent Documents
          </h3>
          
          <div className="space-y-2">
            {['Purchase Agreement', 'Pre-approval Letter', 'Inspection Report'].map((doc, i) => (
              <div key={i} className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#252525] flex items-center justify-center">
                    <FileText className="w-4 h-4 text-[#5a5ff2]" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{doc}</div>
                    <div className="text-[#8a8a8a] text-xs">{i + 1}d ago</div>
                  </div>
                </div>
                <button>
                  <Download className="w-4 h-4 text-[#5a5a5a]" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="shrink-0 p-4 border-t border-[#2d2d2d] flex gap-3">
        <button className="flex-1 bg-[#2d2d2d] text-white py-3 rounded-lg font-medium border border-[#404040]">
          Add Note
        </button>
        <button className="flex-1 bg-[#5a5ff2] text-white py-3 rounded-lg font-semibold">
          Message Agent
        </button>
      </div>
    </div>
  );
}
