import { X } from 'lucide-react';
import { useState } from 'react';

interface RecommendedPropertiesFilterSheetProps {
  onClose: () => void;
}

export function RecommendedPropertiesFilterSheet({ onClose }: RecommendedPropertiesFilterSheetProps) {
  const [propertyStatus, setPropertyStatus] = useState('all-statuses');
  const [sortBy, setSortBy] = useState('most-recent');
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('456-oak-buy');

  const handleApply = () => {
    // Apply filters logic here
    onClose();
  };

  const handleReset = () => {
    setPropertyStatus('all-statuses');
    setSortBy('most-recent');
    setStatus('all');
    setSearch('456-oak-buy');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />
      
      {/* Sheet */}
      <div className="fixed inset-x-0 bottom-0 bg-[#121212] rounded-t-2xl z-50 max-w-[390px] mx-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="shrink-0 px-4 py-4 border-b border-[#2d2d2d] flex items-center justify-between">
          <h2 className="text-white font-semibold text-lg">Filter Recommendations</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-[#8a8a8a]" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-6">
            {/* Property Status */}
            <div>
              <h3 className="text-white text-lg font-medium mb-3">Property Status</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setPropertyStatus('all-statuses')}
                  className={`w-full px-4 py-3 rounded-lg text-left text-base ${
                    propertyStatus === 'all-statuses'
                      ? 'bg-[rgba(90,95,242,0.1)] border border-[#5a5ff2] text-white'
                      : 'bg-[#1a1a1a] border border-[#404040] text-[#8a8a8a]'
                  }`}
                >
                  All Statuses
                </button>
                <button
                  onClick={() => setPropertyStatus('active')}
                  className={`w-full px-4 py-3 rounded-lg text-left text-base ${
                    propertyStatus === 'active'
                      ? 'bg-[rgba(90,95,242,0.1)] border border-[#5a5ff2] text-white'
                      : 'bg-[#1a1a1a] border border-[#404040] text-[#8a8a8a]'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setPropertyStatus('pending')}
                  className={`w-full px-4 py-3 rounded-lg text-left text-base ${
                    propertyStatus === 'pending'
                      ? 'bg-[rgba(90,95,242,0.1)] border border-[#5a5ff2] text-white'
                      : 'bg-[#1a1a1a] border border-[#404040] text-[#8a8a8a]'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setPropertyStatus('new-offer')}
                  className={`w-full px-4 py-3 rounded-lg text-left text-base ${
                    propertyStatus === 'new-offer'
                      ? 'bg-[rgba(90,95,242,0.1)] border border-[#5a5ff2] text-white'
                      : 'bg-[#1a1a1a] border border-[#2d2d2d] text-[#8a8a8a]'
                  }`}
                >
                  New Offer
                </button>
                <button
                  onClick={() => setPropertyStatus('closed')}
                  className={`w-full px-4 py-3 rounded-lg text-left text-base ${
                    propertyStatus === 'closed'
                      ? 'bg-[rgba(90,95,242,0.1)] border border-[#5a5ff2] text-white'
                      : 'bg-[#1a1a1a] border border-[#2d2d2d] text-[#8a8a8a]'
                  }`}
                >
                  Closed
                </button>
                <button
                  onClick={() => setPropertyStatus('in-contract')}
                  className={`w-full px-4 py-3 rounded-lg text-left text-base ${
                    propertyStatus === 'in-contract'
                      ? 'bg-[rgba(90,95,242,0.1)] border border-[#5a5ff2] text-white'
                      : 'bg-[#1a1a1a] border border-[#2d2d2d] text-[#8a8a8a]'
                  }`}
                >
                  In Contract
                </button>
              </div>
            </div>

            {/* Sort By */}
            <div>
              <h3 className="text-white text-lg font-medium mb-3">Sort By</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSortBy('most-recent')}
                  className={`w-full px-4 py-3 rounded-lg text-left text-base ${
                    sortBy === 'most-recent'
                      ? 'bg-[rgba(90,95,242,0.1)] border border-[#5a5ff2] text-white'
                      : 'bg-[#1a1a1a] border border-[#2d2d2d] text-[#8a8a8a]'
                  }`}
                >
                  Most Recent
                </button>
                <button
                  onClick={() => setSortBy('oldest-first')}
                  className={`w-full px-4 py-3 rounded-lg text-left text-base ${
                    sortBy === 'oldest-first'
                      ? 'bg-[rgba(90,95,242,0.1)] border border-[#5a5ff2] text-white'
                      : 'bg-[#1a1a1a] border border-[#2d2d2d] text-[#8a8a8a]'
                  }`}
                >
                  Oldest First
                </button>
              </div>
            </div>

            {/* Status */}
            <div>
              <h3 className="text-white text-lg font-medium mb-3">Status</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setStatus('all')}
                  className={`w-full px-4 py-3 rounded-lg text-left text-base ${
                    status === 'all'
                      ? 'bg-[rgba(90,95,242,0.1)] border border-[#5a5ff2] text-white'
                      : 'bg-[#1a1a1a] border border-[#2d2d2d] text-[#8a8a8a]'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setStatus('shortlisted')}
                  className={`w-full px-4 py-3 rounded-lg text-left text-base ${
                    status === 'shortlisted'
                      ? 'bg-[rgba(90,95,242,0.1)] border border-[#5a5ff2] text-white'
                      : 'bg-[#1a1a1a] border border-[#404040] text-[#8a8a8a]'
                  }`}
                >
                  Shortlisted
                </button>
                <button
                  onClick={() => setStatus('rejected')}
                  className={`w-full px-4 py-3 rounded-lg text-left text-base ${
                    status === 'rejected'
                      ? 'bg-[rgba(90,95,242,0.1)] border border-[#5a5ff2] text-white'
                      : 'bg-[#1a1a1a] border border-[#404040] text-[#8a8a8a]'
                  }`}
                >
                  Rejected
                </button>
              </div>
            </div>

            {/* Searches */}
            <div>
              <h3 className="text-white text-lg font-medium mb-3">Searches</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSearch('456-oak-buy')}
                  className={`w-full px-4 py-3 rounded-lg text-left text-base ${
                    search === '456-oak-buy'
                      ? 'bg-[rgba(90,95,242,0.1)] border border-[#5a5ff2] text-[#8a8a8a]'
                      : 'bg-[#1a1a1a] border border-[#404040] text-[#8a8a8a]'
                  }`}
                >
                  456 Oak Avenue - Buy
                </button>
                <button
                  onClick={() => setSearch('456-oak-buy-2')}
                  className={`w-full px-4 py-3 rounded-lg text-left text-base ${
                    search === '456-oak-buy-2'
                      ? 'bg-[rgba(90,95,242,0.1)] border border-[#5a5ff2] text-[#8a8a8a]'
                      : 'bg-[#1a1a1a] border border-[#404040] text-[#8a8a8a]'
                  }`}
                >
                  456 Oak Avenue· Buy
                </button>
                <button
                  onClick={() => setSearch('456-oak-rent')}
                  className={`w-full px-4 py-3 rounded-lg text-left text-base ${
                    search === '456-oak-rent'
                      ? 'bg-[rgba(90,95,242,0.1)] border border-[#5a5ff2] text-[#8a8a8a]'
                      : 'bg-[#1a1a1a] border border-[#404040] text-[#8a8a8a]'
                  }`}
                >
                  456 Oak Avenue · Rent
                </button>
                <button
                  onClick={() => setSearch('456-oak-buy-3')}
                  className={`w-full px-4 py-3 rounded-lg text-left text-base ${
                    search === '456-oak-buy-3'
                      ? 'bg-[rgba(90,95,242,0.1)] border border-[#5a5ff2] text-[#8a8a8a]'
                      : 'bg-[#1a1a1a] border border-[#404040] text-[#8a8a8a]'
                  }`}
                >
                  456 Oak Avenue - Buy
                </button>
                <button
                  onClick={() => setSearch('456-oak-rent-2')}
                  className={`w-full px-4 py-3 rounded-lg text-left text-base ${
                    search === '456-oak-rent-2'
                      ? 'bg-[rgba(90,95,242,0.1)] border border-[#5a5ff2] text-[#8a8a8a]'
                      : 'bg-[#1a1a1a] border border-[#404040] text-[#8a8a8a]'
                  }`}
                >
                  456 Oak Avenue - Rent
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="shrink-0 px-4 py-4 border-t border-[#2d2d2d] flex gap-3">
          <button 
            onClick={handleReset}
            className="flex-1 bg-[#2d2d2d] text-white py-3 rounded-full font-medium border border-[#404040]"
          >
            Reset
          </button>
          <button 
            onClick={handleApply}
            className="flex-1 bg-[#5a5ff2] text-white py-3 rounded-full font-semibold"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}
