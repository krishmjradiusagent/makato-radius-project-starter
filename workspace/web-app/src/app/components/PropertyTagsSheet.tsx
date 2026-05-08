import { X } from 'lucide-react';

interface PropertyTagsSheetProps {
  tags: string[];
  onClose: () => void;
}

export function PropertyTagsSheet({ tags, onClose }: PropertyTagsSheetProps) {
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] rounded-t-2xl z-50 max-w-[390px] mx-auto animate-slide-up">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-[#3a3a3a] rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-4 border-b border-[#2d2d2d]">
          <h2 className="text-white font-semibold text-lg">All Tags</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-[#8a8a8a]" />
          </button>
        </div>

        {/* Tags */}
        <div className="p-4 max-h-[50vh] overflow-y-auto">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span 
                key={idx}
                className="bg-[#252525] text-[#b0b0b0] px-3 py-2 rounded-lg text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Padding */}
        <div className="h-6" />
      </div>
    </>
  );
}
