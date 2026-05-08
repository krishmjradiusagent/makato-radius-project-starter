import { X, Check } from 'lucide-react';
import { useState } from 'react';

interface ActivityFilterDialogProps {
  onClose: () => void;
  anchorEl?: HTMLElement;
}

const transactionFilters = [
  { id: 'all', label: 'All Transactions' },
  { id: 'search-buy', label: 'Search · Buy', color: '#86efac' },
  { id: 'search-rent', label: 'Search · Rent', color: '#93c5fd' },
  { id: 'offer-1', label: 'Offer #1', color: '#ec4899' },
  { id: 'offer-2', label: 'Offer #2', color: '#f59e0b' },
  { id: 'offer-3', label: 'Offer #3', color: '#5a5ff2' },
  { id: 'listing-1', label: 'Listing', color: '#fbbf24' },
];

const activityTypeFilters = [
  { id: 'offers', label: 'Offers', color: '#5a5ff2' },
  { id: 'notes', label: 'Notes', color: '#86efac' },
  { id: 'views', label: 'Property Views', color: '#ec4899' },
  { id: 'searches', label: 'Searches', color: '#93c5fd' },
  { id: 'listings', label: 'Listings', color: '#fbbf24' },
  { id: 'documents', label: 'Documents', color: '#f59e0b' },
];

export function ActivityFilterDialog({ onClose }: ActivityFilterDialogProps) {
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>(['all']);
  const [selectedActivityTypes, setSelectedActivityTypes] = useState<string[]>([]);

  const toggleTransaction = (id: string) => {
    if (id === 'all') {
      setSelectedTransactions(['all']);
    } else {
      setSelectedTransactions((prev) => {
        const filtered = prev.filter((t) => t !== 'all');
        if (filtered.includes(id)) {
          const updated = filtered.filter((t) => t !== id);
          return updated.length === 0 ? ['all'] : updated;
        }
        return [...filtered, id];
      });
    }
  };

  const toggleActivityType = (id: string) => {
    setSelectedActivityTypes((prev) => {
      if (prev.includes(id)) {
        return prev.filter((t) => t !== id);
      }
      return [...prev, id];
    });
  };

  const handleReset = () => {
    setSelectedTransactions(['all']);
    setSelectedActivityTypes([]);
  };

  const activeFiltersCount = 
    selectedTransactions.filter((t) => t !== 'all').length + selectedActivityTypes.length;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Dropdown Panel */}
      <div className="absolute right-0 top-full mt-2 w-[380px] bg-white border border-[#e5e5e5] rounded-xl shadow-xl z-50 flex flex-col max-h-[600px]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e5e5e5]">
          <h2 className="text-[#171717] font-semibold">Activity Filters</h2>
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

        {/* Filter Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Transactions Section */}
          <div className="px-5 py-4 border-b border-[#e5e5e5]">
            <h3 className="text-[#737373] text-xs font-semibold mb-3 tracking-wider uppercase">
              Transactions
            </h3>
            <div className="space-y-1.5">
              {transactionFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => toggleTransaction(filter.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                    selectedTransactions.includes(filter.id)
                      ? 'bg-[#f0f0ff] border border-[#5a5ff2]'
                      : 'hover:bg-[#fafafa]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {filter.color && (
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: filter.color }}
                      />
                    )}
                    <span className="text-[#171717] font-medium text-sm">
                      {filter.label}
                    </span>
                  </div>
                  {selectedTransactions.includes(filter.id) && (
                    <Check className="w-4 h-4 text-[#5a5ff2]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Activity Types Section */}
          <div className="px-5 py-4">
            <h3 className="text-[#737373] text-xs font-semibold mb-3 tracking-wider uppercase">
              Activity Types
            </h3>
            <div className="flex flex-wrap gap-2">
              {activityTypeFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => toggleActivityType(filter.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedActivityTypes.includes(filter.id)
                      ? 'border-2'
                      : 'bg-[#fafafa] text-[#737373] border border-[#e5e5e5] hover:bg-[#f5f5f5]'
                  }`}
                  style={
                    selectedActivityTypes.includes(filter.id)
                      ? {
                          backgroundColor: `${filter.color}15`,
                          borderColor: filter.color,
                          color: filter.color,
                        }
                      : {}
                  }
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#e5e5e5] space-y-2.5 bg-white">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#737373]">Active Filters</span>
            <span className="text-[#5a5ff2] font-semibold">{activeFiltersCount}</span>
          </div>
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