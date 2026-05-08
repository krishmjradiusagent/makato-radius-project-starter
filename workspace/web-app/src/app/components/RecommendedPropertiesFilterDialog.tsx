import { X } from 'lucide-react';
import { useState } from 'react';

interface RecommendedPropertiesFilterDialogProps {
  onClose: () => void;
}

export function RecommendedPropertiesFilterDialog({ onClose }: RecommendedPropertiesFilterDialogProps) {
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
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="shrink-0 px-6 py-5 border-b border-[#e5e5e5] flex items-center justify-between">
          <h2 className="text-[#171717] font-semibold text-xl">Filter Recommendations</h2>
          <button 
            onClick={onClose}
            className="text-[#737373] hover:text-[#171717] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-6">
            {/* Property Status */}
            <div>
              <h3 className="text-[#171717] text-base font-semibold mb-3">Property Status</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setPropertyStatus('all-statuses')}
                  className={`px-4 py-2.5 rounded-lg text-left text-sm font-medium transition-all ${
                    propertyStatus === 'all-statuses'
                      ? 'bg-[#f0f0ff] border border-[#5a5ff2] text-[#5a5ff2]'
                      : 'bg-white border border-[#e5e5e5] text-[#525252] hover:border-[#d4d4d4]'
                  }`}
                >
                  All Statuses
                </button>
                <button
                  onClick={() => setPropertyStatus('active')}
                  className={`px-4 py-2.5 rounded-lg text-left text-sm font-medium transition-all ${
                    propertyStatus === 'active'
                      ? 'bg-[#f0f0ff] border border-[#5a5ff2] text-[#5a5ff2]'
                      : 'bg-white border border-[#e5e5e5] text-[#525252] hover:border-[#d4d4d4]'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setPropertyStatus('pending')}
                  className={`px-4 py-2.5 rounded-lg text-left text-sm font-medium transition-all ${
                    propertyStatus === 'pending'
                      ? 'bg-[#f0f0ff] border border-[#5a5ff2] text-[#5a5ff2]'
                      : 'bg-white border border-[#e5e5e5] text-[#525252] hover:border-[#d4d4d4]'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setPropertyStatus('new-offer')}
                  className={`px-4 py-2.5 rounded-lg text-left text-sm font-medium transition-all ${
                    propertyStatus === 'new-offer'
                      ? 'bg-[#f0f0ff] border border-[#5a5ff2] text-[#5a5ff2]'
                      : 'bg-white border border-[#e5e5e5] text-[#525252] hover:border-[#d4d4d4]'
                  }`}
                >
                  New Offer
                </button>
                <button
                  onClick={() => setPropertyStatus('closed')}
                  className={`px-4 py-2.5 rounded-lg text-left text-sm font-medium transition-all ${
                    propertyStatus === 'closed'
                      ? 'bg-[#f0f0ff] border border-[#5a5ff2] text-[#5a5ff2]'
                      : 'bg-white border border-[#e5e5e5] text-[#525252] hover:border-[#d4d4d4]'
                  }`}
                >
                  Closed
                </button>
                <button
                  onClick={() => setPropertyStatus('in-contract')}
                  className={`px-4 py-2.5 rounded-lg text-left text-sm font-medium transition-all ${
                    propertyStatus === 'in-contract'
                      ? 'bg-[#f0f0ff] border border-[#5a5ff2] text-[#5a5ff2]'
                      : 'bg-white border border-[#e5e5e5] text-[#525252] hover:border-[#d4d4d4]'
                  }`}
                >
                  In Contract
                </button>
              </div>
            </div>

            {/* Sort By */}
            <div>
              <h3 className="text-[#171717] text-base font-semibold mb-3">Sort By</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSortBy('most-recent')}
                  className={`px-4 py-2.5 rounded-lg text-left text-sm font-medium transition-all ${
                    sortBy === 'most-recent'
                      ? 'bg-[#f0f0ff] border border-[#5a5ff2] text-[#5a5ff2]'
                      : 'bg-white border border-[#e5e5e5] text-[#525252] hover:border-[#d4d4d4]'
                  }`}
                >
                  Most Recent
                </button>
                <button
                  onClick={() => setSortBy('oldest-first')}
                  className={`px-4 py-2.5 rounded-lg text-left text-sm font-medium transition-all ${
                    sortBy === 'oldest-first'
                      ? 'bg-[#f0f0ff] border border-[#5a5ff2] text-[#5a5ff2]'
                      : 'bg-white border border-[#e5e5e5] text-[#525252] hover:border-[#d4d4d4]'
                  }`}
                >
                  Oldest First
                </button>
              </div>
            </div>

            {/* Status */}
            <div>
              <h3 className="text-[#171717] text-base font-semibold mb-3">Status</h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setStatus('all')}
                  className={`px-4 py-2.5 rounded-lg text-left text-sm font-medium transition-all ${
                    status === 'all'
                      ? 'bg-[#f0f0ff] border border-[#5a5ff2] text-[#5a5ff2]'
                      : 'bg-white border border-[#e5e5e5] text-[#525252] hover:border-[#d4d4d4]'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setStatus('shortlisted')}
                  className={`px-4 py-2.5 rounded-lg text-left text-sm font-medium transition-all ${
                    status === 'shortlisted'
                      ? 'bg-[#f0f0ff] border border-[#5a5ff2] text-[#5a5ff2]'
                      : 'bg-white border border-[#e5e5e5] text-[#525252] hover:border-[#d4d4d4]'
                  }`}
                >
                  Shortlisted
                </button>
                <button
                  onClick={() => setStatus('rejected')}
                  className={`px-4 py-2.5 rounded-lg text-left text-sm font-medium transition-all ${
                    status === 'rejected'
                      ? 'bg-[#f0f0ff] border border-[#5a5ff2] text-[#5a5ff2]'
                      : 'bg-white border border-[#e5e5e5] text-[#525252] hover:border-[#d4d4d4]'
                  }`}
                >
                  Rejected
                </button>
              </div>
            </div>

            {/* Searches */}
            <div>
              <h3 className="text-[#171717] text-base font-semibold mb-3">Searches</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSearch('456-oak-buy')}
                  className={`w-full px-4 py-2.5 rounded-lg text-left text-sm font-medium transition-all ${
                    search === '456-oak-buy'
                      ? 'bg-[#f0f0ff] border border-[#5a5ff2] text-[#5a5ff2]'
                      : 'bg-white border border-[#e5e5e5] text-[#525252] hover:border-[#d4d4d4]'
                  }`}
                >
                  456 Oak Avenue - Buy
                </button>
                <button
                  onClick={() => setSearch('456-oak-buy-2')}
                  className={`w-full px-4 py-2.5 rounded-lg text-left text-sm font-medium transition-all ${
                    search === '456-oak-buy-2'
                      ? 'bg-[#f0f0ff] border border-[#5a5ff2] text-[#5a5ff2]'
                      : 'bg-white border border-[#e5e5e5] text-[#525252] hover:border-[#d4d4d4]'
                  }`}
                >
                  456 Oak Avenue· Buy
                </button>
                <button
                  onClick={() => setSearch('456-oak-rent')}
                  className={`w-full px-4 py-2.5 rounded-lg text-left text-sm font-medium transition-all ${
                    search === '456-oak-rent'
                      ? 'bg-[#f0f0ff] border border-[#5a5ff2] text-[#5a5ff2]'
                      : 'bg-white border border-[#e5e5e5] text-[#525252] hover:border-[#d4d4d4]'
                  }`}
                >
                  456 Oak Avenue · Rent
                </button>
                <button
                  onClick={() => setSearch('456-oak-buy-3')}
                  className={`w-full px-4 py-2.5 rounded-lg text-left text-sm font-medium transition-all ${
                    search === '456-oak-buy-3'
                      ? 'bg-[#f0f0ff] border border-[#5a5ff2] text-[#5a5ff2]'
                      : 'bg-white border border-[#e5e5e5] text-[#525252] hover:border-[#d4d4d4]'
                  }`}
                >
                  456 Oak Avenue - Buy
                </button>
                <button
                  onClick={() => setSearch('456-oak-rent-2')}
                  className={`w-full px-4 py-2.5 rounded-lg text-left text-sm font-medium transition-all ${
                    search === '456-oak-rent-2'
                      ? 'bg-[#f0f0ff] border border-[#5a5ff2] text-[#5a5ff2]'
                      : 'bg-white border border-[#e5e5e5] text-[#525252] hover:border-[#d4d4d4]'
                  }`}
                >
                  456 Oak Avenue - Rent
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="shrink-0 px-6 py-4 border-t border-[#e5e5e5] flex gap-3 justify-end">
          <button 
            onClick={handleReset}
            className="px-5 py-2.5 bg-white border border-[#e5e5e5] text-[#525252] rounded-lg font-medium text-sm hover:bg-[#f5f5f5] transition-colors"
          >
            Reset
          </button>
          <button 
            onClick={handleApply}
            className="px-5 py-2.5 bg-[#5a5ff2] text-white rounded-lg font-semibold text-sm hover:bg-[#4a4fe2] transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}
