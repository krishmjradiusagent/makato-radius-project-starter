import { X } from 'lucide-react';
import { useState } from 'react';

interface SearchesFilterDialogProps {
  onClose: () => void;
}

export function SearchesFilterDialog({ onClose }: SearchesFilterDialogProps) {
  const [selectedType, setSelectedType] = useState<string[]>(['all']);
  const [sortBy, setSortBy] = useState('recent');

  const toggleType = (type: string) => {
    if (type === 'all') {
      setSelectedType(['all']);
    } else {
      const newTypes = selectedType.filter(t => t !== 'all');
      if (newTypes.includes(type)) {
        const filtered = newTypes.filter(t => t !== type);
        setSelectedType(filtered.length === 0 ? ['all'] : filtered);
      } else {
        setSelectedType([...newTypes, type]);
      }
    }
  };

  const handleReset = () => {
    setSelectedType(['all']);
    setSortBy('recent');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Dropdown Menu */}
      <div className="absolute right-0 top-full mt-2 w-[300px] bg-white border border-[#e5e5e5] rounded-xl shadow-xl z-50 max-h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e5e5e5]">
          <h3 className="text-[#171717] font-semibold">Filters</h3>
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
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Search Type */}
          <div>
            <h4 className="text-[#737373] text-xs font-semibold mb-2.5 tracking-wider uppercase">
              Search Type
            </h4>
            <div className="space-y-1.5">
              {[
                { id: 'all', label: 'All Types' },
                { id: 'buy', label: 'Buy' },
                { id: 'rent', label: 'Rent' },
              ].map(type => (
                <button
                  key={type.id}
                  onClick={() => toggleType(type.id)}
                  className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                    selectedType.includes(type.id)
                      ? 'bg-[#f0f0ff] text-[#5a5ff2] font-medium'
                      : 'text-[#171717] hover:bg-[#fafafa]'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h4 className="text-[#737373] text-xs font-semibold mb-2.5 tracking-wider uppercase">
              Sort By
            </h4>
            <div className="space-y-1.5">
              {[
                { id: 'recent', label: 'Most Recent' },
                { id: 'oldest', label: 'Oldest First' },
                { id: 'matches', label: 'Most Matches' },
              ].map(sort => (
                <button
                  key={sort.id}
                  onClick={() => setSortBy(sort.id)}
                  className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                    sortBy === sort.id
                      ? 'bg-[#f0f0ff] text-[#5a5ff2] font-medium'
                      : 'text-[#171717] hover:bg-[#fafafa]'
                  }`}
                >
                  {sort.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#e5e5e5] bg-white">
          <button 
            onClick={onClose}
            className="w-full bg-[#5a5ff2] text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-[#4a4fe2] transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}