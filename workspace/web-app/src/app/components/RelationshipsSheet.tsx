import { X, ChevronRight } from 'lucide-react';

interface RelationshipsSheetProps {
  onClose: () => void;
}

export function RelationshipsSheet({ onClose }: RelationshipsSheetProps) {
  const relationships = [
    { name: 'John Cole', relationship: 'Spouse', avatar: null },
    { name: 'Emma Cole', relationship: 'Daughter', avatar: null },
    { name: 'Michael Brown', relationship: 'Business Partner', avatar: null },
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
          <h2 className="text-white font-semibold text-lg">Relationships</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-[#8a8a8a]" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {relationships.map((person, idx) => (
            <button
              key={idx}
              className="w-full px-4 py-4 flex items-center gap-3 border-b border-[#2d2d2d] last:border-b-0 hover:bg-[#1f1f1f] transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-[#2d2d2d] shrink-0 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {person.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 text-left">
                <div className="text-white text-sm font-medium">{person.name}</div>
                <div className="text-[#8a8a8a] text-xs mt-0.5">{person.relationship}</div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#5a5a5a] shrink-0" />
            </button>
          ))}
        </div>

        {/* Add Button */}
        <div className="px-4 py-4 border-t border-[#2d2d2d] shrink-0">
          <button className="w-full bg-[#5a5ff2] text-white py-3 rounded-full font-semibold text-sm">
            Add Relationship
          </button>
        </div>
      </div>
    </>
  );
}
