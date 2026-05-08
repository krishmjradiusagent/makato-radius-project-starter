import { X, Link2 } from 'lucide-react';
import { useState } from 'react';

interface AddNoteDialogProps {
  onClose: () => void;
}

export function AddNoteDialog({ onClose }: AddNoteDialogProps) {
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
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="shrink-0 px-6 py-5 border-b border-[#e5e5e5] flex items-center justify-between">
          <h2 className="text-[#171717] font-semibold text-xl">New Note</h2>
          <button 
            onClick={onClose}
            className="text-[#737373] hover:text-[#171717] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-5">
            {/* Note Content */}
            <div>
              <label className="text-[#525252] text-sm font-medium mb-2 block">Note</label>
              <textarea 
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={8}
                placeholder="Type your note here..."
                className="w-full bg-white border border-[#e5e5e5] rounded-xl px-4 py-3 text-[#171717] text-sm focus:outline-none focus:border-[#5a5ff2] focus:ring-2 focus:ring-[#5a5ff2]/20 resize-none placeholder:text-[#a3a3a3]"
              />
              <p className="text-[#737373] text-xs mt-1.5">
                {noteText.length} characters
              </p>
            </div>

            {/* Category */}
            <div>
              <label className="text-[#525252] text-sm font-medium mb-2 block">
                Category <span className="text-[#a3a3a3] font-normal">(Optional)</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-[#f0f0ff] border-[#5a5ff2] text-[#5a5ff2]'
                        : 'bg-white border-[#e5e5e5] text-[#525252] hover:border-[#d4d4d4]'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Link to Transaction */}
            <div>
              <label className="text-[#525252] text-sm font-medium mb-2 flex items-center gap-1.5">
                <Link2 className="w-4 h-4" />
                Link to Transaction <span className="text-[#a3a3a3] font-normal">(Optional)</span>
              </label>
              <select 
                value={linkedTransaction}
                onChange={(e) => setLinkedTransaction(e.target.value)}
                className="w-full bg-white border border-[#e5e5e5] rounded-xl px-4 py-2.5 text-[#171717] text-sm focus:outline-none focus:border-[#5a5ff2] focus:ring-2 focus:ring-[#5a5ff2]/20"
              >
                {transactions.map((transaction) => (
                  <option key={transaction.id} value={transaction.id}>
                    {transaction.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Info Box */}
            <div className="bg-[#f5f5f5] border border-[#e5e5e5] rounded-xl p-4">
              <p className="text-[#525252] text-xs leading-relaxed">
                Notes are visible to all team members working with this client. Use categories and transaction links to keep notes organized and easily searchable.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="shrink-0 px-6 py-4 border-t border-[#e5e5e5] flex gap-3 justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 bg-white border border-[#e5e5e5] text-[#525252] rounded-lg font-medium text-sm hover:bg-[#f5f5f5] transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={!noteText.trim()}
            className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
              noteText.trim()
                ? 'bg-[#5a5ff2] text-white hover:bg-[#4a4fe2]'
                : 'bg-[#e5e5e5] text-[#a3a3a3] cursor-not-allowed'
            }`}
          >
            Save Note
          </button>
        </div>
      </div>
    </>
  );
}
