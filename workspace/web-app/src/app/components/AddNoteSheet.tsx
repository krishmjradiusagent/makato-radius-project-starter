import { X, Link2 } from 'lucide-react';
import { useState } from 'react';

interface AddNoteSheetProps {
  onClose: () => void;
}

export function AddNoteSheet({ onClose }: AddNoteSheetProps) {
  const [noteText, setNoteText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [linkedTransaction, setLinkedTransaction] = useState<string>('');

  const categories = [
    { id: 'general', label: 'General', color: '#525252' },
    { id: 'preferences', label: 'Preferences', color: '#525252' },
    { id: 'follow-up', label: 'Follow-up', color: '#525252' },
    { id: 'financing', label: 'Financing', color: '#22c55e' },
    { id: 'important', label: 'Important', color: '#5a5ff2' },
  ];

  const transactions = [
    { id: '', label: 'None (General Note)' },
    { id: 'search-buy', label: 'Search · Buy' },
    { id: 'search-rent', label: 'Search · Rent' },
    { id: 'offer-1', label: 'Offer #1 · 1640 Riverside Drive' },
    { id: 'offer-3', label: 'Offer #3 · 742 Evergreen Terrace' },
    { id: 'listing-1', label: 'Listing · 5500 Clemente Dr' },
  ];

  const handleSave = () => {
    // Save note logic here
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />
      
      {/* Full Screen Sheet */}
      <div className="fixed inset-0 bg-[#0a0a0a] z-50 max-w-[390px] mx-auto flex flex-col">
        {/* Header */}
        <div className="shrink-0 px-4 py-4 border-b border-[#2d2d2d] flex items-center justify-between">
          <h2 className="text-white font-semibold text-lg">New Note</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-[#8a8a8a]" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-5">
            {/* Note Content */}
            <div>
              <label className="text-[#8a8a8a] text-xs mb-2 block">Note</label>
              <textarea 
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={8}
                placeholder="Type your note here..."
                className="w-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#5a5ff2] resize-none placeholder:text-[#5a5a5a]"
              />
              <p className="text-[#6a6a6a] text-xs mt-1.5">
                {noteText.length} characters
              </p>
            </div>

            {/* Category */}
            <div>
              <label className="text-[#8a8a8a] text-xs mb-2 block">Category (Optional)</label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-2.5 rounded-lg border text-sm transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-[#5a5ff2] border-[#5a5ff2] text-white font-medium'
                        : 'bg-[#1a1a1a] border-[#2d2d2d] text-[#8a8a8a]'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Link to Transaction */}
            <div>
              <label className="text-[#8a8a8a] text-xs mb-2 flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5" />
                Link to Transaction (Optional)
              </label>
              <select 
                value={linkedTransaction}
                onChange={(e) => setLinkedTransaction(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#5a5ff2]"
              >
                {transactions.map((transaction) => (
                  <option key={transaction.id} value={transaction.id}>
                    {transaction.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Info Text */}
            <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
              <p className="text-[#8a8a8a] text-xs leading-relaxed">
                Notes are visible to all team members working with this client. Use categories and transaction links to keep notes organized.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="shrink-0 px-4 py-4 border-t border-[#2d2d2d] flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 bg-[#2d2d2d] text-white py-3 rounded-lg font-medium border border-[#404040]"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={!noteText.trim()}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
              noteText.trim()
                ? 'bg-[#5a5ff2] text-white'
                : 'bg-[#2d2d2d] text-[#5a5a5a] cursor-not-allowed'
            }`}
          >
            Save Note
          </button>
        </div>
      </div>
    </>
  );
}
