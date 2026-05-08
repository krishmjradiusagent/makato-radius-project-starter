import { X } from 'lucide-react';
import { useState } from 'react';

interface RemindersFilterSheetProps {
  onClose: () => void;
}

export function RemindersFilterSheet({ onClose }: RemindersFilterSheetProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string[]>(['all']);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [sortBy, setSortBy] = useState('date');

  const toggleTimeframe = (timeframe: string) => {
    if (timeframe === 'all') {
      setSelectedTimeframe(['all']);
    } else {
      const newTimeframes = selectedTimeframe.filter(t => t !== 'all');
      if (newTimeframes.includes(timeframe)) {
        const filtered = newTimeframes.filter(t => t !== timeframe);
        setSelectedTimeframe(filtered.length === 0 ? ['all'] : filtered);
      } else {
        setSelectedTimeframe([...newTimeframes, timeframe]);
      }
    }
  };

  const toggleCategory = (category: string) => {
    if (category === 'all') {
      setSelectedCategories(['all']);
    } else {
      const newCategories = selectedCategories.filter(c => c !== 'all');
      if (newCategories.includes(category)) {
        const filtered = newCategories.filter(c => c !== category);
        setSelectedCategories(filtered.length === 0 ? ['all'] : filtered);
      } else {
        setSelectedCategories([...newCategories, category]);
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
          <h2 className="text-white font-semibold text-lg">Filter Reminders</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-[#8a8a8a]" />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 py-4 max-h-[60vh] overflow-y-auto">
          {/* Timeframe */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">Timeframe</h3>
            <div className="space-y-2">
              {[
                { id: 'all', label: 'All Reminders' },
                { id: 'overdue', label: 'Overdue' },
                { id: 'today', label: 'Today' },
                { id: 'this-week', label: 'This Week' },
                { id: 'this-month', label: 'This Month' },
                { id: 'upcoming', label: 'Upcoming' },
              ].map(timeframe => (
                <button
                  key={timeframe.id}
                  onClick={() => toggleTimeframe(timeframe.id)}
                  className={`w-full px-4 py-3 rounded-lg border text-left transition-colors ${
                    selectedTimeframe.includes(timeframe.id)
                      ? 'bg-[#5a5ff2]/10 border-[#5a5ff2] text-white'
                      : 'bg-[#0a0a0a] border-[#2d2d2d] text-[#8a8a8a]'
                  }`}
                >
                  {timeframe.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">Category</h3>
            <div className="space-y-2">
              {[
                { id: 'all', label: 'All Categories' },
                { id: 'general', label: 'General' },
                { id: 'searches', label: 'Searches' },
                { id: 'offers', label: 'Offers' },
                { id: 'listings', label: 'Listings' },
              ].map(category => (
                <button
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={`w-full px-4 py-3 rounded-lg border text-left transition-colors ${
                    selectedCategories.includes(category.id)
                      ? 'bg-[#5a5ff2]/10 border-[#5a5ff2] text-white'
                      : 'bg-[#0a0a0a] border-[#2d2d2d] text-[#8a8a8a]'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">Sort By</h3>
            <div className="space-y-2">
              {[
                { id: 'date', label: 'Date & Time' },
                { id: 'priority', label: 'Priority (Overdue First)' },
                { id: 'category', label: 'Category' },
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
              setSelectedTimeframe(['all']);
              setSelectedCategories(['all']);
              setSortBy('date');
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
