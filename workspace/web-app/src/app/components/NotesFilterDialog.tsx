import { X } from 'lucide-react';
import { useState } from 'react';

interface NotesFilterDialogProps {
  onClose: () => void;
}

export function NotesFilterDialog({ onClose }: NotesFilterDialogProps) {
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

  const handleReset = () => {
    setSelectedCategories(['all']);
    setSelectedAuthors(['all']);
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
          <h2 className="text-[#171717] font-semibold">Filter Notes</h2>
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
          {/* Category */}
          <div className="mb-5">
            <h3 className="text-[#737373] text-xs font-semibold mb-2.5 tracking-wider uppercase">
              Category
            </h3>
            <div className="space-y-1.5">
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
                  className={`w-full px-3 py-2 rounded-lg border text-left text-sm transition-colors ${
                    selectedCategories.includes(category.id)
                      ? 'bg-[#f0f0ff] border-[#5a5ff2] text-[#171717] font-medium'
                      : 'bg-[#fafafa] border-[#e5e5e5] text-[#737373] hover:bg-[#f5f5f5]'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Author */}
          <div className="mb-5">
            <h3 className="text-[#737373] text-xs font-semibold mb-2.5 tracking-wider uppercase">
              Created By
            </h3>
            <div className="space-y-1.5">
              {[
                { id: 'all', label: 'All Team Members' },
                { id: 'monica', label: 'Monica Miller' },
                { id: 'you', label: 'You' },
              ].map(author => (
                <button
                  key={author.id}
                  onClick={() => toggleAuthor(author.id)}
                  className={`w-full px-3 py-2 rounded-lg border text-left text-sm transition-colors ${
                    selectedAuthors.includes(author.id)
                      ? 'bg-[#f0f0ff] border-[#5a5ff2] text-[#171717] font-medium'
                      : 'bg-[#fafafa] border-[#e5e5e5] text-[#737373] hover:bg-[#f5f5f5]'
                  }`}
                >
                  {author.label}
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
                { id: 'author', label: 'Author' },
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