import { X } from 'lucide-react';
import { useState } from 'react';

interface TransactionFilterSheetProps {
  onClose: () => void;
}

export function TransactionFilterSheet({ onClose }: TransactionFilterSheetProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['all']);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(['all']);
  const [sortBy, setSortBy] = useState('recent');

  const toggleType = (type: string) => {
    if (type === 'all') {
      setSelectedTypes(['all']);
    } else {
      const newTypes = selectedTypes.filter(t => t !== 'all');
      if (newTypes.includes(type)) {
        const filtered = newTypes.filter(t => t !== type);
        setSelectedTypes(filtered.length === 0 ? ['all'] : filtered);
      } else {
        setSelectedTypes([...newTypes, type]);
      }
    }
  };

  const toggleStatus = (status: string) => {
    if (status === 'all') {
      setSelectedStatuses(['all']);
    } else {
      const newStatuses = selectedStatuses.filter(s => s !== 'all');
      if (newStatuses.includes(status)) {
        const filtered = newStatuses.filter(s => s !== status);
        setSelectedStatuses(filtered.length === 0 ? ['all'] : filtered);
      } else {
        setSelectedStatuses([...newStatuses, status]);
      }
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] rounded-t-2xl z-50 max-w-[390px] mx-auto animate-slide-up">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-[#3a3a3a] rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-4 border-b border-[#2d2d2d]">
          <h2 className="text-white font-semibold text-lg">Filter Transactions</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-[#8a8a8a]" />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 py-4 max-h-[60vh] overflow-y-auto">
          {/* Transaction Type */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">Transaction Type</h3>
            <div className="space-y-2">
              {[
                { id: 'all', label: 'All Types' },
                { id: 'searches', label: 'Searches' },
                { id: 'offers', label: 'Offers' },
                { id: 'listings', label: 'Listings' },
              ].map(type => (
                <button
                  key={type.id}
                  onClick={() => toggleType(type.id)}
                  className={`w-full px-4 py-3 rounded-lg border text-left transition-colors ${
                    selectedTypes.includes(type.id)
                      ? 'bg-[#5a5ff2]/10 border-[#5a5ff2] text-white'
                      : 'bg-[#0a0a0a] border-[#2d2d2d] text-[#8a8a8a]'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">Status</h3>
            <div className="space-y-2">
              {[
                { id: 'all', label: 'All Statuses' },
                { id: 'active', label: 'Active' },
                { id: 'pending', label: 'Pending' },
                { id: 'new-offer', label: 'New Offer' },
                { id: 'counter-offer', label: 'Counter Offer' },
                { id: 'closed', label: 'Closed' },
              ].map(status => (
                <button
                  key={status.id}
                  onClick={() => toggleStatus(status.id)}
                  className={`w-full px-4 py-3 rounded-lg border text-left transition-colors ${
                    selectedStatuses.includes(status.id)
                      ? 'bg-[#5a5ff2]/10 border-[#5a5ff2] text-white'
                      : 'bg-[#0a0a0a] border-[#2d2d2d] text-[#8a8a8a]'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">Sort By</h3>
            <div className="space-y-2">
              {[
                { id: 'recent', label: 'Most Recent' },
                { id: 'oldest', label: 'Oldest First' },
                { id: 'status', label: 'Status' },
                { id: 'type', label: 'Type' },
              ].map(sort => (
                <button
                  key={sort.id}
                  onClick={() => setSortBy(sort.id)}
                  className={`w-full px-4 py-3 rounded-lg border text-left transition-colors ${
                    sortBy === sort.id
                      ? 'bg-[#5a5ff2]/10 border-[#5a5ff2] text-white'
                      : 'bg-[#0a0a0a] border-[#2d2d2d] text-[#8a8a8a]'
                  }`}
                >
                  {sort.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-4 py-4 border-t border-[#2d2d2d] flex gap-3">
          <button 
            onClick={() => {
              setSelectedTypes(['all']);
              setSelectedStatuses(['all']);
              setSortBy('recent');
            }}
            className="flex-1 bg-[#2d2d2d] text-white py-3 rounded-lg font-medium border border-[#404040]"
          >
            Reset
          </button>
          <button 
            onClick={onClose}
            className="flex-1 bg-[#5a5ff2] text-white py-3 rounded-lg font-semibold"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}
