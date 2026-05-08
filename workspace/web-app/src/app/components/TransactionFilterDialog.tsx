import { X } from 'lucide-react';
import { useState, useMemo } from 'react';

interface TransactionFilterDialogProps {
  onClose: () => void;
}

export function TransactionFilterDialog({ onClose }: TransactionFilterDialogProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['all']);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(['all']);
  const [sortBy, setSortBy] = useState('recent');

  // Define statuses for each transaction type
  const statusesByType = {
    searches: [
      { id: 'all', label: 'All Statuses' },
      { id: 'active', label: 'Active' },
      { id: 'paused', label: 'Paused' },
    ],
    offers: [
      { id: 'all', label: 'All Statuses' },
      { id: 'pending', label: 'Pending' },
      { id: 'new-offer', label: 'New Offer' },
      { id: 'counter-offer', label: 'Counter Offer' },
      { id: 'accepted', label: 'Accepted' },
      { id: 'rejected', label: 'Rejected' },
      { id: 'withdrawn', label: 'Withdrawn' },
    ],
    listings: [
      { id: 'all', label: 'All Statuses' },
      { id: 'active', label: 'Active' },
      { id: 'pending', label: 'Pending' },
      { id: 'sold', label: 'Sold' },
      { id: 'withdrawn', label: 'Withdrawn' },
      { id: 'expired', label: 'Expired' },
    ],
  };

  // Determine which statuses to show based on selected types
  const availableStatuses = useMemo(() => {
    // If "all" is selected or multiple types are selected, show common statuses
    if (selectedTypes.includes('all') || selectedTypes.length === 0 || selectedTypes.length > 1) {
      return [
        { id: 'all', label: 'All Statuses' },
        { id: 'active', label: 'Active' },
        { id: 'pending', label: 'Pending' },
        { id: 'closed', label: 'Closed/Completed' },
      ];
    }

    // If only one specific type is selected, show its specific statuses
    const singleType = selectedTypes[0] as keyof typeof statusesByType;
    return statusesByType[singleType] || [{ id: 'all', label: 'All Statuses' }];
  }, [selectedTypes]);

  const toggleType = (type: string) => {
    if (type === 'all') {
      setSelectedTypes(['all']);
      // Reset statuses when changing to "all types"
      setSelectedStatuses(['all']);
    } else {
      const newTypes = selectedTypes.filter(t => t !== 'all');
      if (newTypes.includes(type)) {
        const filtered = newTypes.filter(t => t !== type);
        const finalTypes = filtered.length === 0 ? ['all'] : filtered;
        setSelectedTypes(finalTypes);
        // Reset statuses when changing types
        if (finalTypes.includes('all')) {
          setSelectedStatuses(['all']);
        }
      } else {
        setSelectedTypes([...newTypes, type]);
        // Reset statuses when changing types
        setSelectedStatuses(['all']);
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

  const handleReset = () => {
    setSelectedTypes(['all']);
    setSelectedStatuses(['all']);
    setSortBy('recent');
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Dropdown Panel */}
      <div className="absolute right-0 top-full mt-2 w-[320px] bg-white border border-[#e5e5e5] rounded-xl shadow-xl z-50 flex flex-col max-h-[600px]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e5e5e5]">
          <h2 className="text-[#171717] font-semibold">Filter Transactions</h2>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleReset}
              className="text-[#5a5ff2] text-sm font-medium hover:text-[#4a4fd2] transition-colors"
            >
              Reset
            </button>
            <button onClick={onClose} className="text-[#737373] hover:text-[#171717] transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {/* Transaction Type */}
          <div className="mb-5">
            <h3 className="text-[#737373] text-xs font-semibold mb-2.5 tracking-wider uppercase">
              Transaction Type
            </h3>
            <div className="space-y-1.5">
              {[
                { id: 'all', label: 'All Types' },
                { id: 'searches', label: 'Searches' },
                { id: 'offers', label: 'Offers' },
                { id: 'listings', label: 'Listings' },
              ].map(type => (
                <button
                  key={type.id}
                  onClick={() => toggleType(type.id)}
                  className={`w-full px-3 py-2 rounded-lg border text-left text-sm transition-colors ${
                    selectedTypes.includes(type.id)
                      ? 'bg-[#f0f0ff] border-[#5a5ff2] text-[#171717] font-medium'
                      : 'bg-[#fafafa] border-[#e5e5e5] text-[#737373] hover:bg-[#f5f5f5]'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="mb-5">
            <h3 className="text-[#737373] text-xs font-semibold mb-2.5 tracking-wider uppercase">
              Status
            </h3>
            <div className="space-y-1.5">
              {availableStatuses.map(status => (
                <button
                  key={status.id}
                  onClick={() => toggleStatus(status.id)}
                  className={`w-full px-3 py-2 rounded-lg border text-left text-sm transition-colors ${
                    selectedStatuses.includes(status.id)
                      ? 'bg-[#f0f0ff] border-[#5a5ff2] text-[#171717] font-medium'
                      : 'bg-[#fafafa] border-[#e5e5e5] text-[#737373] hover:bg-[#f5f5f5]'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div className="mb-4">
            <h3 className="text-[#737373] text-xs font-semibold mb-2.5 tracking-wider uppercase">
              Sort By
            </h3>
            <div className="space-y-1.5">
              {[
                { id: 'recent', label: 'Most Recent' },
                { id: 'oldest', label: 'Oldest First' },
                { id: 'status', label: 'Status' },
                { id: 'type', label: 'Type' },
              ].map(sort => (
                <button
                  key={sort.id}
                  onClick={() => setSortBy(sort.id)}
                  className={`w-full px-3 py-2 rounded-lg border text-left text-sm transition-colors ${
                    sortBy === sort.id
                      ? 'bg-[#f0f0ff] border-[#5a5ff2] text-[#171717] font-medium'
                      : 'bg-[#fafafa] border-[#e5e5e5] text-[#737373] hover:bg-[#f5f5f5]'
                  }`}
                >
                  {sort.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 py-3 border-t border-[#e5e5e5] bg-white">
          <button 
            onClick={onClose}
            className="w-full bg-[#5a5ff2] text-white py-2.5 rounded-lg font-semibold hover:bg-[#4a4fe2] transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}