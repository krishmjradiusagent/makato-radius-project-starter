import { Clock, Plus, Bell, Filter } from 'lucide-react';
import { useState } from 'react';

interface RemindersTabWebProps {
  onFilterClick: () => void;
  onAddReminderClick: () => void;
}

export function RemindersTabWeb({ onFilterClick, onAddReminderClick }: RemindersTabWebProps) {
  const [hasReminders] = useState(true);

  if (!hasReminders) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px]">
        <div className="w-20 h-20 rounded-full bg-white border border-[#e5e5e5] flex items-center justify-center mb-6">
          <Clock className="w-10 h-10 text-[#a3a3a3]" />
        </div>
        <h3 className="text-[#171717] text-xl font-semibold mb-3">No Reminders</h3>
        <p className="text-[#737373] text-center mb-8 max-w-md">
          Set reminders to stay on top of important tasks and follow-ups
        </p>
        <button 
          onClick={onAddReminderClick}
          className="bg-[#5a5ff2] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#4a4fd2] transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Reminder
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Overdue Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#ef4444] text-sm font-semibold tracking-wider uppercase">
            Overdue (1)
          </h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button 
                onClick={onFilterClick}
                className="text-[#737373] hover:text-[#171717] transition-colors p-2 hover:bg-[#f5f5f5] rounded-lg"
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
            <button className="bg-[#5a5ff2] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#4a4fd2] transition-colors">
              <Plus className="w-4 h-4" />
              New Reminder
            </button>
          </div>
        </div>
        
        <div className="bg-white border-2 border-[#ef4444]/30 rounded-xl p-5 shadow-sm">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-[#ef4444]/10 flex items-center justify-center shrink-0">
              <Bell className="w-6 h-6 text-[#ef4444]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="text-[#171717] font-semibold">Follow up on offer response</h4>
                <span className="text-[#ef4444] text-sm shrink-0 font-medium">2 days ago</span>
              </div>
              <p className="text-[#525252] mb-4 leading-relaxed">
                Check with seller's agent about the counter-offer status
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-[#f5f5f5] text-[#ec4899] px-2.5 py-1.5 rounded text-xs font-medium">
                  Offer #1
                </span>
                <button className="bg-[#5a5ff2] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#4a4fd2] transition-colors">
                  Mark Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Section */}
      <div>
        <h3 className="text-[#737373] text-sm font-semibold tracking-wider uppercase mb-4">
          Upcoming (3)
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {/* Reminder 1 */}
          <div className="bg-white border border-[#e5e5e5] rounded-xl p-5 hover:border-[#d4d4d4] hover:shadow-sm transition-all">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#f59e0b]/10 flex items-center justify-center shrink-0">
                <Bell className="w-6 h-6 text-[#f59e0b]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-[#171717] font-semibold text-sm">Property viewing</h4>
                  <span className="text-[#f59e0b] text-sm shrink-0 font-medium">Tomorrow</span>
                </div>
                <p className="text-[#525252] text-sm mb-3 leading-relaxed">
                  742 Evergreen Terrace at 2:00 PM
                </p>
                <span className="bg-[#f5f5f5] text-[#525252] px-2.5 py-1.5 rounded text-xs font-medium">
                  Appointment
                </span>
              </div>
            </div>
          </div>

          {/* Reminder 2 */}
          <div className="bg-white border border-[#e5e5e5] rounded-xl p-5 hover:border-[#d4d4d4] hover:shadow-sm transition-all">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#22c55e]/10 flex items-center justify-center shrink-0">
                <Bell className="w-6 h-6 text-[#22c55e]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-[#171717] font-semibold text-sm">Send market update</h4>
                  <span className="text-[#22c55e] text-sm shrink-0 font-medium">In 3 days</span>
                </div>
                <p className="text-[#525252] text-sm mb-3 leading-relaxed">
                  Weekly property recommendations
                </p>
                <span className="bg-[#f5f5f5] text-[#525252] px-2.5 py-1.5 rounded text-xs font-medium">
                  Follow-up
                </span>
              </div>
            </div>
          </div>

          {/* Reminder 3 */}
          <div className="bg-white border border-[#e5e5e5] rounded-xl p-5 hover:border-[#d4d4d4] hover:shadow-sm transition-all col-span-2">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#5a5ff2]/10 flex items-center justify-center shrink-0">
                <Bell className="w-6 h-6 text-[#5a5ff2]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-[#171717] font-semibold text-sm">Review financing documents</h4>
                  <span className="text-[#5a5ff2] text-sm shrink-0 font-medium">Next week</span>
                </div>
                <p className="text-[#525252] text-sm mb-3 leading-relaxed">
                  Schedule call with mortgage lender to finalize pre-approval details and discuss loan options
                </p>
                <div className="flex items-center gap-2">
                  <span className="bg-[#f5f5f5] text-[#525252] px-2.5 py-1.5 rounded text-xs font-medium">
                    Financing
                  </span>
                  <span className="bg-[#f5f5f5] text-[#5a5ff2] px-2.5 py-1.5 rounded text-xs font-medium">
                    Important
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}