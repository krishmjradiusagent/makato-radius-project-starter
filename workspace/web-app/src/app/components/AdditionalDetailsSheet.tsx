import { X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface AdditionalDetailsSheetProps {
  onClose: () => void;
}

export function AdditionalDetailsSheet({ onClose }: AdditionalDetailsSheetProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touchY = e.touches[0].clientY;
    setCurrentY(touchY);

    // If dragging up significantly, expand to full screen
    if (startY - touchY > 100 && !isExpanded) {
      setIsExpanded(true);
      setIsDragging(false);
    }
    // If dragging down significantly while expanded, collapse
    else if (touchY - startY > 100 && isExpanded) {
      setIsExpanded(false);
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setStartY(0);
    setCurrentY(0);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div 
        ref={sheetRef}
        className={`fixed left-0 right-0 bg-[#1a1a1a] z-50 max-w-[390px] mx-auto flex flex-col transition-all duration-300 ${
          isExpanded 
            ? 'top-0 bottom-0 rounded-none' 
            : 'bottom-0 rounded-t-2xl max-h-[80vh] animate-slide-up'
        }`}
      >
        {/* Handle - Only show when not expanded */}
        {!isExpanded && (
          <div 
            className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="w-10 h-1 bg-[#3a3a3a] rounded-full" />
          </div>
        )}

        {/* Header */}
        <div 
          className={`flex items-center justify-between px-4 border-b border-[#2d2d2d] shrink-0 ${
            isExpanded ? 'pt-4 pb-4' : 'pb-4'
          }`}
          onTouchStart={!isExpanded ? undefined : handleTouchStart}
          onTouchMove={!isExpanded ? undefined : handleTouchMove}
          onTouchEnd={!isExpanded ? undefined : handleTouchEnd}
        >
          <h2 className="text-white font-semibold text-lg">Additional Details</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-[#8a8a8a]" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="px-4 py-4 overflow-y-auto flex-1">
          <div className="space-y-4">
            <div>
              <div className="text-[#6a6a6a] text-xs mb-1.5">Location</div>
              <div className="text-white text-base">San Francisco, CA</div>
            </div>
            <div>
              <div className="text-[#6a6a6a] text-xs mb-1.5">Birthday</div>
              <div className="text-white text-base">March 15, 1985</div>
            </div>
            <div>
              <div className="text-[#6a6a6a] text-xs mb-1.5">Spouse Birthday</div>
              <div className="text-white text-base">July 22, 1987</div>
            </div>
            <div>
              <div className="text-[#6a6a6a] text-xs mb-1.5">Home Anniversary</div>
              <div className="text-white text-base">June 10, 2020</div>
            </div>
            <div>
              <div className="text-[#6a6a6a] text-xs mb-1.5">Company Name</div>
              <div className="text-white text-base">Tech Solutions Inc.</div>
            </div>
            <div>
              <div className="text-[#6a6a6a] text-xs mb-1.5">Website</div>
              <div className="text-[#5a5ff2] text-base">techsolutions.com</div>
            </div>
            <div>
              <div className="text-[#6a6a6a] text-xs mb-1.5">Attorney Name</div>
              <div className="text-white text-base">Sarah Johnson</div>
            </div>
            <div>
              <div className="text-[#6a6a6a] text-xs mb-1.5">Commission %</div>
              <div className="text-white text-base">3.0%</div>
            </div>
            <div>
              <div className="text-[#6a6a6a] text-xs mb-1.5">Priority Status</div>
              <div className="text-[#86efac] text-base font-medium">High</div>
            </div>
          </div>
        </div>

        {/* Bottom Padding */}
        <div className="h-6 shrink-0" />
      </div>
    </>
  );
}