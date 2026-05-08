import { ArrowLeft, MoreVertical, MapPin, DollarSign, Bed, Home } from 'lucide-react';
import { useState } from 'react';
import { PropertyTagsSheet } from './PropertyTagsSheet';

interface SearchDetailProps {
  id: string;
  onBack: () => void;
}

export function SearchDetail({ id, onBack }: SearchDetailProps) {
  const isBuy = id.includes('buy');
  const [showAllTags, setShowAllTags] = useState(false);
  const [selectedPropertyTags, setSelectedPropertyTags] = useState<string[]>([]);
  
  // Property tags data
  const propertyTags = [
    ['Waterfront', 'Pool', 'Updated Kitchen', 'Garage', 'Fenced Yard'],
    ['Corner Lot', 'New Construction'],
    ['Gated Community', 'Mountain View', 'Fireplace', 'Hardwood Floors']
  ];

  const handleShowAllTags = (tags: string[]) => {
    setSelectedPropertyTags(tags);
    setShowAllTags(true);
  };
  
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
              <h1 className="text-white font-semibold text-lg">
                {isBuy ? 'Downtown Properties' : 'Family Rentals'}
              </h1>
              <p className="text-[#8a8a8a] text-sm">{isBuy ? 'Buy' : 'Rent'} Search</p>
            </div>
          </div>
          <button>
            <MoreVertical className="w-5 h-5 text-[#8a8a8a]" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-[#1e3a1e] text-[#86efac] px-2 py-1 rounded text-xs font-medium border border-[#2d4a2d]">
            Active
          </span>
          <span className="text-[#8a8a8a] text-sm">{isBuy ? '8' : '5'} matches</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Search Criteria */}
        <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4 mb-4">
          <h3 className="text-white font-semibold mb-3">Search Criteria</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#252525] flex items-center justify-center shrink-0">
                <DollarSign className="w-5 h-5 text-[#5a5ff2]" />
              </div>
              <div className="flex-1">
                <div className="text-[#8a8a8a] text-xs">Price Range</div>
                <div className="text-white">{isBuy ? '$250k - $400k' : '$1,500 - $2,500/mo'}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#252525] flex items-center justify-center shrink-0">
                <Bed className="w-5 h-5 text-[#5a5ff2]" />
              </div>
              <div className="flex-1">
                <div className="text-[#8a8a8a] text-xs">Bedrooms</div>
                <div className="text-white">{isBuy ? '3-4' : '2-3'}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#252525] flex items-center justify-center shrink-0">
                <Home className="w-5 h-5 text-[#5a5ff2]" />
              </div>
              <div className="flex-1">
                <div className="text-[#8a8a8a] text-xs">Property Type</div>
                <div className="text-white">{isBuy ? 'House, Townhouse' : 'Apartment, Condo'}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#252525] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#5a5ff2]" />
              </div>
              <div className="flex-1">
                <div className="text-[#8a8a8a] text-xs">Location</div>
                <div className="text-white">{isBuy ? 'Downtown, Midtown' : 'Suburbs, Good Schools'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Matches */}
        <div>
          <h3 className="text-[#6a6a6a] text-xs font-semibold tracking-wider uppercase mb-3">
            Recent Matches ({isBuy ? '8' : '5'})
          </h3>

          <div className="space-y-3">
            {[...Array(isBuy ? 3 : 2)].map((_, i) => {
              const tags = propertyTags[i] || [];
              const visibleTags = tags.slice(0, 2);
              const remainingCount = tags.length - visibleTags.length;

              return (
                <div key={i} className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white font-semibold flex-1">
                      {i === 0 ? '742 Evergreen Terrace' : i === 1 ? '123 Main Street' : '456 Oak Avenue'}
                    </h4>
                    {i === 0 && (
                      <span className="bg-[#1e3a1e] text-[#86efac] px-2 py-1 rounded text-xs font-medium border border-[#2d4a2d] ml-2 shrink-0">
                        Active
                      </span>
                    )}
                    {i === 1 && (
                      <span className="bg-[#3a2e1e] text-[#f59e0b] px-2 py-1 rounded text-xs font-medium border border-[#4a3e2d] ml-2 shrink-0">
                        Active Under Contract
                      </span>
                    )}
                    {i === 2 && (
                      <span className="bg-[#1e3a1e] text-[#86efac] px-2 py-1 rounded text-xs font-medium border border-[#2d4a2d] ml-2 shrink-0">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[#86efac] font-semibold mb-2">
                    {isBuy ? `$${(i + 1) * 275000}` : `$${(i + 1) * 1800}/mo`}
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-xs text-[#b0b0b0] mb-3">
                    <div>
                      <span className="text-[#8a8a8a]">Beds: </span>
                      {isBuy ? '3' : '2'}
                    </div>
                    <div>
                      <span className="text-[#8a8a8a]">Baths: </span>
                      {isBuy ? '2' : '1'}
                    </div>
                    <div>
                      <span className="text-[#8a8a8a]">Sq.ft: </span>
                      {isBuy ? '2,000' : '1,200'}
                    </div>
                  </div>
                  
                  {/* Tags with overflow */}
                  {tags.length > 0 && (
                    <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                      {visibleTags.map((tag, idx) => (
                        <span 
                          key={idx}
                          className="bg-[#252525] text-[#b0b0b0] px-2 py-1 rounded text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {remainingCount > 0 && (
                        <button
                          onClick={() => handleShowAllTags(tags)}
                          className="bg-[#252525] text-[#5a5ff2] px-2 py-1 rounded text-xs font-medium"
                        >
                          +{remainingCount}
                        </button>
                      )}
                    </div>
                  )}
                  
                  <button className="text-[#5a5ff2] text-sm font-medium">View Details</button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="shrink-0 p-4 border-t border-[#2d2d2d] flex gap-3">
        <button className="flex-1 bg-[#2d2d2d] text-white py-3 rounded-lg font-medium border border-[#404040]">
          Edit Search
        </button>
        <button className="flex-1 bg-[#5a5ff2] text-white py-3 rounded-lg font-semibold">
          View All Matches
        </button>
      </div>

      {/* Property Tags Bottom Sheet */}
      {showAllTags && (
        <PropertyTagsSheet 
          tags={selectedPropertyTags}
          onClose={() => setShowAllTags(false)}
        />
      )}
    </div>
  );
}