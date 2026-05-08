import { Clock, Plus, Bell, Filter } from 'lucide-react';
import { useState } from 'react';

interface RemindersTabProps {
  onFilterClick: () => void;
  onAddReminderClick: () => void;
}

export function RemindersTab({ onFilterClick, onAddReminderClick }: RemindersTabProps) {
  const [hasReminders] = useState(true);

  if (!hasReminders) {
    return (
      <div className="px-4 pb-6 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-[#2d2d2d] flex items-center justify-center mb-4">
          <Clock className="w-8 h-8 text-[#5a5a5a]" />
        </div>
        <h3 className="text-white font-semibold mb-2">No Reminders</h3>
        <p className="text-[#6a6a6a] text-sm text-center mb-6 max-w-[280px]">
          Set reminders to stay on top of important tasks and follow-ups
        </p>
        <button 
          onClick={onAddReminderClick}
          className="bg-[#5a5ff2] text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-[#4a4fd2] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Reminder
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 pb-20">
      {/* Overdue Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[#ef4444] text-xs font-semibold tracking-wider uppercase">
            Overdue (1)
          </h3>
          <button 
            onClick={onFilterClick}
            className="text-[#8a8a8a] hover:text-white transition-colors"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>
        
        <div className="bg-[#1a1a1a] border-2 border-[#ef4444]/30 rounded-xl p-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ef4444]/20 flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5 text-[#ef4444]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="text-white font-semibold text-sm">Follow up on offer response</h4>
                <span className="text-[#ef4444] text-xs shrink-0 font-medium">2 days ago</span>
              </div>
              <p className="text-[#b0b0b0] text-sm mb-3 leading-relaxed">
                Check with seller's agent about the counter-offer status
              </p>
              <div className="flex items-center gap-2">
                <span className="bg-[#252525] text-[#ec4899] px-2 py-1 rounded text-xs font-medium">
                  Offer #1
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Section */}
      <div className="mb-6">
        <h3 className="text-[#6a6a6a] text-xs font-semibold tracking-wider uppercase mb-3">
          Today (2)
        </h3>

        <div className="space-y-3">
          {/* Reminder 1 */}
          <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-[#5a5ff2]/20 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-[#5a5ff2]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-white font-semibold text-sm">Property inspection</h4>
                  <span className="text-[#6a6a6a] text-xs shrink-0">3:00 PM</span>
                </div>
                <p className="text-[#b0b0b0] text-sm mb-3 leading-relaxed">
                  742 Evergreen Terrace walkthrough with inspector
                </p>
                <div className="flex items-center gap-2">
                  <span className="bg-[#252525] text-[#5a5ff2] px-2 py-1 rounded text-xs font-medium">
                    Offer #3
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Reminder 2 */}
          <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-[#86efac]/20 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-[#86efac]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-white font-semibold text-sm">Send new property listings</h4>
                  <span className="text-[#6a6a6a] text-xs shrink-0">5:00 PM</span>
                </div>
                <p className="text-[#b0b0b0] text-sm mb-3 leading-relaxed">
                  Share 5 new properties matching search criteria
                </p>
                <div className="flex items-center gap-2">
                  <span className="bg-[#252525] text-[#86efac] px-2 py-1 rounded text-xs font-medium">
                    Search · Buy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* This Week Section */}
      <div>
        <h3 className="text-[#6a6a6a] text-xs font-semibold tracking-wider uppercase mb-3">
          This Week (3)
        </h3>

        <div className="space-y-3">
          {/* Reminder 3 */}
          <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f59e0b]/20 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-[#f59e0b]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-white font-semibold text-sm">Contract review deadline</h4>
                  <span className="text-[#6a6a6a] text-xs shrink-0">Dec 17</span>
                </div>
                <p className="text-[#b0b0b0] text-sm mb-3 leading-relaxed">
                  Client needs to sign purchase agreement
                </p>
                <div className="flex items-center gap-2">
                  <span className="bg-[#252525] text-[#f59e0b] px-2 py-1 rounded text-xs font-medium">
                    Offer #2
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Reminder 4 */}
          <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-[#93c5fd]/20 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-[#93c5fd]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-white font-semibold text-sm">Monthly check-in call</h4>
                  <span className="text-[#6a6a6a] text-xs shrink-0">Dec 18</span>
                </div>
                <p className="text-[#b0b0b0] text-sm leading-relaxed">
                  Review rental search progress and update criteria
                </p>
              </div>
            </div>
          </div>

          {/* Reminder 5 */}
          <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-[#fbbf24]/20 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-[#fbbf24]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-white font-semibold text-sm">Open house preparation</h4>
                  <span className="text-[#6a6a6a] text-xs shrink-0">Dec 19</span>
                </div>
                <p className="text-[#b0b0b0] text-sm mb-3 leading-relaxed">
                  Prepare listing materials for weekend open house
                </p>
                <div className="flex items-center gap-2">
                  <span className="bg-[#252525] text-[#fbbf24] px-2 py-1 rounded text-xs font-medium">
                    Listing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={onAddReminderClick}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#5a5ff2] rounded-full flex items-center justify-center shadow-lg hover:bg-[#4a4fd2] transition-colors"
      >
        <Plus className="w-6 h-6 text-white" strokeWidth={2.5} />
      </button>
    </div>
  );
}