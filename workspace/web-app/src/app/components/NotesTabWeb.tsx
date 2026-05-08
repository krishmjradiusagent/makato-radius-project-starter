import { Plus, FileText, Filter } from 'lucide-react';
import { useState } from 'react';

interface NotesTabWebProps {
  onFilterClick: () => void;
  onAddNoteClick: () => void;
}

export function NotesTabWeb({ onFilterClick, onAddNoteClick }: NotesTabWebProps) {
  const [hasNotes] = useState(true);

  if (!hasNotes) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px]">
        <div className="w-20 h-20 rounded-full bg-white border border-[#e5e5e5] flex items-center justify-center mb-6">
          <FileText className="w-10 h-10 text-[#a3a3a3]" />
        </div>
        <h3 className="text-[#171717] text-xl font-semibold mb-3">No Notes Yet</h3>
        <p className="text-[#737373] text-center mb-8 max-w-md">
          Create notes to track important information about this client
        </p>
        <button 
          onClick={onAddNoteClick}
          className="bg-[#5a5ff2] text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-[#4a4fd2] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add First Note
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[#737373] text-sm font-semibold tracking-wider uppercase">
          All Notes (5)
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
            New Note
          </button>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Note 1 */}
        <div className="bg-white border border-[#e5e5e5] rounded-xl p-5 hover:border-[#d4d4d4] hover:shadow-sm transition-all">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-[#525252] text-sm">Monica Miller</p>
                <span className="text-[#a3a3a3] text-xs shrink-0">2h ago</span>
              </div>
            </div>
          </div>
          
          <p className="text-[#171717] text-sm mb-4 leading-relaxed">
            Client is very interested in properties with large backyards. Prefers quiet neighborhoods and good school districts.
          </p>
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-[#f5f5f5] text-[#525252] px-2.5 py-1.5 rounded text-xs font-medium">
              Preferences
            </span>
            <span className="bg-[#f5f5f5] text-[#5a5ff2] px-2.5 py-1.5 rounded text-xs font-medium">
              Important
            </span>
          </div>
        </div>

        {/* Note 2 */}
        <div className="bg-white border border-[#e5e5e5] rounded-xl p-5 hover:border-[#d4d4d4] hover:shadow-sm transition-all">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-[#525252] text-sm">Monica Miller</p>
                <span className="text-[#a3a3a3] text-xs shrink-0">1d ago</span>
              </div>
            </div>
          </div>
          
          <p className="text-[#171717] text-sm mb-4 leading-relaxed">
            Follow up needed on 742 Evergreen Terrace offer. Client wants to schedule another viewing this weekend.
          </p>
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-[#f5f5f5] text-[#525252] px-2.5 py-1.5 rounded text-xs font-medium">
              Follow-up
            </span>
          </div>
        </div>

        {/* Note 3 */}
        <div className="bg-white border border-[#e5e5e5] rounded-xl p-5 hover:border-[#d4d4d4] hover:shadow-sm transition-all">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-[#525252] text-sm">Monica Miller</p>
                <span className="text-[#a3a3a3] text-xs shrink-0">2d ago</span>
              </div>
            </div>
          </div>
          
          <p className="text-[#171717] text-sm mb-4 leading-relaxed">
            Client mentioned they're working with First National Bank for financing. Pre-approval letter received and uploaded to documents.
          </p>
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-[#f5f5f5] text-[#525252] px-2.5 py-1.5 rounded text-xs font-medium">
              Financing
            </span>
          </div>
        </div>

        {/* Note 4 */}
        <div className="bg-white border border-[#e5e5e5] rounded-xl p-5 hover:border-[#d4d4d4] hover:shadow-sm transition-all">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-[#525252] text-sm">Monica Miller</p>
                <span className="text-[#a3a3a3] text-xs shrink-0">3d ago</span>
              </div>
            </div>
          </div>
          
          <p className="text-[#171717] text-sm mb-4 leading-relaxed">
            Initial consultation completed. Budget range confirmed at $800K-$950K. Looking to move within 3 months.
          </p>
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-[#f5f5f5] text-[#525252] px-2.5 py-1.5 rounded text-xs font-medium">
              Consultation
            </span>
            <span className="bg-[#f5f5f5] text-[#22c55e] px-2.5 py-1.5 rounded text-xs font-medium">
              Budget
            </span>
          </div>
        </div>

        {/* Note 5 */}
        <div className="bg-white border border-[#e5e5e5] rounded-xl p-5 hover:border-[#d4d4d4] hover:shadow-sm transition-all col-span-2">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-[#525252] text-sm">Monica Miller</p>
                <span className="text-[#a3a3a3] text-xs shrink-0">1w ago</span>
              </div>
            </div>
          </div>
          
          <p className="text-[#171717] text-sm mb-4 leading-relaxed">
            First meeting with Violet and her spouse. They're relocating from Chicago for work. Looking for a 3-4 bedroom home in San Francisco, preferably in neighborhoods with good access to downtown. They have two children (ages 5 and 8) so school quality is a top priority. Also mentioned they'd like a home office space as both work remotely part-time.
          </p>
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-[#f5f5f5] text-[#525252] px-2.5 py-1.5 rounded text-xs font-medium">
              Initial Meeting
            </span>
            <span className="bg-[#f5f5f5] text-[#525252] px-2.5 py-1.5 rounded text-xs font-medium">
              Requirements
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}