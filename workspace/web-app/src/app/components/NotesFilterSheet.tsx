import { X } from 'lucide-react';
import { useState } from 'react';

interface NotesFilterSheetProps {
  onClose: () => void;
}

export function NotesFilterSheet({ onClose }: NotesFilterSheetProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>(['all']);
  const [sortBy, setSortBy] = useState('recent');

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

  const toggleAuthor = (author: string) => {
    if (author === 'all') {
      setSelectedAuthors(['all']);
    } else {
      const newAuthors = selectedAuthors.filter(a => a !== 'all');
      if (newAuthors.includes(author)) {
        const filtered = newAuthors.filter(a => a !== author);
        setSelectedAuthors(filtered.length === 0 ? ['all'] : filtered);
      } else {
        setSelectedAuthors([...newAuthors, author]);
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
          <h2 className="text-white font-semibold text-lg">Filter Notes</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-[#8a8a8a]" />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 py-4 max-h-[60vh] overflow-y-auto">
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

          {/* Author */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">Created By</h3>
            <div className="space-y-2">
              {[
                { id: 'all', label: 'All Team Members' },
                { id: 'monica', label: 'Monica Miller' },
                { id: 'you', label: 'You' },
              ].map(author => (
                <button
                  key={author.id}
                  onClick={() => toggleAuthor(author.id)}
                  className={`w-full px-4 py-3 rounded-lg border text-left transition-colors ${
                    selectedAuthors.includes(author.id)
                      ? 'bg-[#5a5ff2]/10 border-[#5a5ff2] text-white'
                      : 'bg-[#0a0a0a] border-[#2d2d2d] text-[#8a8a8a]'
                  }`}
                >
                  {author.label}
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
                { id: 'author', label: 'Author' },
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
              setSelectedCategories(['all']);
              setSelectedAuthors(['all']);
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
