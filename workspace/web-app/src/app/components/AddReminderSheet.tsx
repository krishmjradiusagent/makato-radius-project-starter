import { X, Calendar, Clock, Link2 } from 'lucide-react';
import { useState } from 'react';

interface AddReminderSheetProps {
  onClose: () => void;
}

export function AddReminderSheet({ onClose }: AddReminderSheetProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [priority, setPriority] = useState('normal');
  const [linkedTransaction, setLinkedTransaction] = useState<string>('');

  const priorities = [
    { id: 'low', label: 'Low', color: '#93c5fd' },
    { id: 'normal', label: 'Normal', color: '#5a5ff2' },
    { id: 'high', label: 'High', color: '#f59e0b' },
    { id: 'urgent', label: 'Urgent', color: '#ef4444' },
  ];

  const transactions = [
    { id: '', label: 'None (General Reminder)' },
    { id: 'search-buy', label: 'Search · Buy' },
    { id: 'search-rent', label: 'Search · Rent' },
    { id: 'offer-1', label: 'Offer #1 · 1640 Riverside Drive' },
    { id: 'offer-3', label: 'Offer #3 · 742 Evergreen Terrace' },
    { id: 'listing-1', label: 'Listing · 5500 Clemente Dr' },
  ];

  const handleSave = () => {
    // Save reminder logic here
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
          <h2 className="text-white font-semibold text-lg">New Reminder</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-[#8a8a8a]" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className="text-[#8a8a8a] text-xs mb-2 block">Title</label>
              <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Property inspection"
                className="w-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#5a5ff2] placeholder:text-[#5a5a5a]"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-[#8a8a8a] text-xs mb-2 block">Description (Optional)</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Add details about this reminder..."
                className="w-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#5a5ff2] resize-none placeholder:text-[#5a5a5a]"
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[#8a8a8a] text-xs mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Date
                </label>
                <input 
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#5a5ff2]"
                />
              </div>
              <div>
                <label className="text-[#8a8a8a] text-xs mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Time
                </label>
                <input 
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#5a5ff2]"
                />
              </div>
            </div>

            {/* Priority */}
            <div>
              <label className="text-[#8a8a8a] text-xs mb-2 block">Priority</label>
              <div className="grid grid-cols-2 gap-2">
                {priorities.map((priorityOption) => (
                  <button
                    key={priorityOption.id}
                    onClick={() => setPriority(priorityOption.id)}
                    className={`px-3 py-2.5 rounded-lg border text-sm transition-colors ${
                      priority === priorityOption.id
                        ? 'bg-[#5a5ff2] border-[#5a5ff2] text-white font-medium'
                        : 'bg-[#1a1a1a] border-[#2d2d2d] text-[#8a8a8a]'
                    }`}
                  >
                    {priorityOption.label}
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
                You'll receive a notification at the scheduled time. Reminders are visible to all team members working with this client.
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
            disabled={!title.trim() || !date}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
              title.trim() && date
                ? 'bg-[#5a5ff2] text-white'
                : 'bg-[#2d2d2d] text-[#5a5a5a] cursor-not-allowed'
            }`}
          >
            Save Reminder
          </button>
        </div>
      </div>
    </>
  );
}
