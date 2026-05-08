import { X, Check } from 'lucide-react';
import { useState } from 'react';

interface ActivityFilterSheetProps {
  onClose: () => void;
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

export function ActivityFilterSheet({ onClose }: ActivityFilterSheetProps) {
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
        className="fixed inset-0 bg-black/70 z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a1a] rounded-t-3xl max-w-[390px] mx-auto animate-slide-up">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-[#3a3a3a] rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-3 border-b border-[#2d2d2d]">
          <h2 className="text-white font-semibold">Activity Filters</h2>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleReset}
              className="text-[#5a5ff2] text-sm font-medium"
            >
              Reset
            </button>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-[#8a8a8a]" />
            </button>
          </div>
        </div>

        {/* Filter Content */}
        <div className="max-h-[500px] overflow-y-auto">
          {/* Transactions Section */}
          <div className="p-4 border-b border-[#2d2d2d]">
            <h3 className="text-[#6a6a6a] text-xs font-semibold mb-3 tracking-wider uppercase">
              Transactions
            </h3>
            <div className="space-y-2">
              {transactionFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => toggleTransaction(filter.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    selectedTransactions.includes(filter.id)
                      ? 'bg-[#252525] border border-[#5a5ff2]'
                      : 'bg-[#151515] border border-transparent hover:bg-[#202020]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {filter.color && (
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: filter.color }}
                      />
                    )}
                    <span className="text-white font-medium text-sm">
                      {filter.label}
                    </span>
                  </div>
                  {selectedTransactions.includes(filter.id) && (
                    <Check className="w-5 h-5 text-[#5a5ff2]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Activity Types Section */}
          <div className="p-4">
            <h3 className="text-[#6a6a6a] text-xs font-semibold mb-3 tracking-wider uppercase">
              Activity Types
            </h3>
            <div className="flex flex-wrap gap-2">
              {activityTypeFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => toggleActivityType(filter.id)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedActivityTypes.includes(filter.id)
                      ? 'border-2'
                      : 'bg-[#151515] text-[#b0b0b0] border border-[#2d2d2d] hover:bg-[#202020]'
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
        <div className="p-4 border-t border-[#2d2d2d] space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#8a8a8a]">Active Filters</span>
            <span className="text-[#5a5ff2] font-semibold">{activeFiltersCount}</span>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-[#5a5ff2] text-white py-3.5 rounded-lg font-semibold hover:bg-[#4a4fd2] transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}
