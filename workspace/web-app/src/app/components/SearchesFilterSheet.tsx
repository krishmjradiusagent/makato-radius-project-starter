import { X } from 'lucide-react';
import { useState } from 'react';

interface SearchesFilterSheetProps {
  onClose: () => void;
}

export function SearchesFilterSheet({ onClose }: SearchesFilterSheetProps) {
  const [selectedType, setSelectedType] = useState<string[]>(['all']);
  const [selectedStatus, setSelectedStatus] = useState<string[]>(['all']);
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

  const toggleStatus = (status: string) => {
    if (status === 'all') {
      setSelectedStatus(['all']);
    } else {
      const newStatuses = selectedStatus.filter(s => s !== 'all');
      if (newStatuses.includes(status)) {
        const filtered = newStatuses.filter(s => s !== status);
        setSelectedStatus(filtered.length === 0 ? ['all'] : filtered);
      } else {
        setSelectedStatus([...newStatuses, status]);
      }
    }
  };

  const handleReset = () => {
    setSelectedType(['all']);
    setSelectedStatus(['all']);
    setSortBy('recent');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-50 animate-fadeIn"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-[#1a1a1a] rounded-t-3xl max-h-[90vh] flex flex-col animate-slideUp">
        {/* Handle */}
        <div className="flex justify-center pt-2 pb-3">
          <div className="w-10 h-1 bg-[#3a3a3a] rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-4">
          <h3 className="text-white text-lg font-semibold">Filters</h3>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleReset}
              className="text-[#5a5ff2] text-sm font-medium"
            >
              Reset
            </button>
            <button onClick={onClose} className="text-[#8a8a8a]">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-6">
          {/* Search Type */}
          <div>
            <h4 className="text-[#6a6a6a] text-xs font-semibold mb-3 tracking-wider uppercase">
              Search Type
            </h4>
            <div className="space-y-2">
              {[
                { id: 'all', label: 'All Types' },
                { id: 'buy', label: 'Buy' },
                { id: 'rent', label: 'Rent' },
              ].map(type => (
                <button
                  key={type.id}
                  onClick={() => toggleType(type.id)}
                  className={`w-full px-4 py-3 rounded-xl text-left transition-colors ${
                    selectedType.includes(type.id)
                      ? 'bg-[#5a5ff2] text-white'
                      : 'bg-[#252525] text-[#b0b0b0] border border-[#2d2d2d]'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <h4 className="text-[#6a6a6a] text-xs font-semibold mb-3 tracking-wider uppercase">
              Status
            </h4>
            <div className="space-y-2">
              {[
                { id: 'all', label: 'All Statuses' },
                { id: 'active', label: 'Active' },
                { id: 'paused', label: 'Paused' },
              ].map(status => (
                <button
                  key={status.id}
                  onClick={() => toggleStatus(status.id)}
                  className={`w-full px-4 py-3 rounded-xl text-left transition-colors ${
                    selectedStatus.includes(status.id)
                      ? 'bg-[#5a5ff2] text-white'
                      : 'bg-[#252525] text-[#b0b0b0] border border-[#2d2d2d]'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h4 className="text-[#6a6a6a] text-xs font-semibold mb-3 tracking-wider uppercase">
              Sort By
            </h4>
            <div className="space-y-2">
              {[
                { id: 'recent', label: 'Most Recent' },
                { id: 'oldest', label: 'Oldest First' },
                { id: 'matches', label: 'Most Matches' },
              ].map(sort => (
                <button
                  key={sort.id}
                  onClick={() => setSortBy(sort.id)}
                  className={`w-full px-4 py-3 rounded-xl text-left transition-colors ${
                    sortBy === sort.id
                      ? 'bg-[#5a5ff2] text-white'
                      : 'bg-[#252525] text-[#b0b0b0] border border-[#2d2d2d]'
                  }`}
                >
                  {sort.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="p-5 border-t border-[#2d2d2d]">
          <button 
            onClick={onClose}
            className="w-full bg-[#5a5ff2] text-white py-3.5 rounded-xl font-semibold"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}
