import { X, ChevronRight } from 'lucide-react';

interface CollaboratorsSheetProps {
  onClose: () => void;
}

export function CollaboratorsSheet({ onClose }: CollaboratorsSheetProps) {
  const collaborators = [
    { name: 'Monica Miller', role: 'Primary Agent', avatar: null, isPrimary: true },
    { name: 'David Chen', role: 'Team Member', avatar: null, isPrimary: false },
    { name: 'Sarah Wilson', role: 'Transaction Coordinator', avatar: null, isPrimary: false },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] rounded-t-2xl z-50 max-w-[390px] mx-auto animate-slide-up max-h-[80vh] flex flex-col">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-[#3a3a3a] rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-4 border-b border-[#2d2d2d] shrink-0">
          <h2 className="text-white font-semibold text-lg">Collaborators</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-[#8a8a8a]" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {collaborators.map((person, idx) => (
            <button
              key={idx}
              className="w-full px-4 py-4 flex items-center gap-3 border-b border-[#2d2d2d] last:border-b-0 hover:bg-[#1f1f1f] transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shrink-0 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {person.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-medium">{person.name}</span>
                  {person.isPrimary && (
                    <span className="bg-[#5a5ff2]/20 text-[#8a9ff2] text-[10px] font-medium px-1.5 py-0.5 rounded">
                      PRIMARY
                    </span>
                  )}
                </div>
                <div className="text-[#8a8a8a] text-xs mt-0.5">{person.role}</div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#5a5a5a] shrink-0" />
            </button>
          ))}
        </div>

        {/* Add Button */}
        <div className="px-4 py-4 border-t border-[#2d2d2d] shrink-0">
          <button className="w-full bg-[#5a5ff2] text-white py-3 rounded-full font-semibold text-sm">
            Add Collaborator
          </button>
        </div>
      </div>
    </>
  );
}
