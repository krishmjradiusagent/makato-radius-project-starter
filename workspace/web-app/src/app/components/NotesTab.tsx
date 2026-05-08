import { Plus, FileText, Filter } from 'lucide-react';
import { useState } from 'react';

interface NotesTabProps {
  onFilterClick: () => void;
  onAddNoteClick: () => void;
}

export function NotesTab({ onFilterClick, onAddNoteClick }: NotesTabProps) {
  const [hasNotes] = useState(true);

  if (!hasNotes) {
    return (
      <div className="px-4 pb-6 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-[#2d2d2d] flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-[#5a5a5a]" />
        </div>
        <h3 className="text-white font-semibold mb-2">No Notes Yet</h3>
        <p className="text-[#6a6a6a] text-sm text-center mb-6 max-w-[280px]">
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
    <div className="px-4 pb-20">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#6a6a6a] text-xs font-semibold tracking-wider uppercase">
          All Notes (5)
        </h3>
        <button 
          onClick={onFilterClick}
          className="text-[#8a8a8a] hover:text-white transition-colors"
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Notes List */}
      <div className="space-y-3">
        {/* Note 1 */}
        <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-[#b0b0b0] text-xs">Monica Miller</p>
                <span className="text-[#6a6a6a] text-xs shrink-0">2h ago</span>
              </div>
            </div>
          </div>
          
          <p className="text-white text-sm mb-3 leading-relaxed">
            Client is very interested in properties with large backyards. Prefers quiet neighborhoods and good school districts.
          </p>
          
          <div className="flex items-center gap-2">
            <span className="bg-[#252525] text-[#86efac] px-2 py-1 rounded text-xs font-medium">
              Search · Buy
            </span>
          </div>
        </div>

        {/* Note 2 */}
        <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-[#b0b0b0] text-xs">Monica Miller</p>
                <span className="text-[#6a6a6a] text-xs shrink-0">1d ago</span>
              </div>
            </div>
          </div>
          
          <p className="text-white text-sm mb-3 leading-relaxed">
            Follow up needed on 742 Evergreen Terrace. Client wants to schedule a second viewing with their spouse.
          </p>
          
          <div className="flex items-center gap-2">
            <span className="bg-[#252525] text-[#5a5ff2] px-2 py-1 rounded text-xs font-medium">
              Offer #3
            </span>
          </div>
        </div>

        {/* Note 3 - General */}
        <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-[#b0b0b0] text-xs">Monica Miller</p>
                <span className="text-[#6a6a6a] text-xs shrink-0">3d ago</span>
              </div>
            </div>
          </div>
          
          <p className="text-white text-sm leading-relaxed">
            First meeting went well. Client is pre-approved for up to $350k. Timeline is flexible but prefers to move within 6 months.
          </p>
        </div>

        {/* Note 4 */}
        <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-[#b0b0b0] text-xs">Monica Miller</p>
                <span className="text-[#6a6a6a] text-xs shrink-0">5d ago</span>
              </div>
            </div>
          </div>
          
          <p className="text-white text-sm mb-3 leading-relaxed">
            Client mentioned they're also looking at rental options as a backup plan. Added rental search criteria.
          </p>
          
          <div className="flex items-center gap-2">
            <span className="bg-[#252525] text-[#93c5fd] px-2 py-1 rounded text-xs font-medium">
              Search · Rent
            </span>
          </div>
        </div>

        {/* Note 5 */}
        <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-[#b0b0b0] text-xs">Monica Miller</p>
                <span className="text-[#6a6a6a] text-xs shrink-0">1w ago</span>
              </div>
            </div>
          </div>
          
          <p className="text-white text-sm leading-relaxed">
            Initial consultation completed. Client profile created and preferences recorded.
          </p>
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={onAddNoteClick}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#5a5ff2] rounded-full flex items-center justify-center shadow-lg hover:bg-[#4a4fd2] transition-colors"
      >
        <Plus className="w-6 h-6 text-white" strokeWidth={2.5} />
      </button>
    </div>
  );
}