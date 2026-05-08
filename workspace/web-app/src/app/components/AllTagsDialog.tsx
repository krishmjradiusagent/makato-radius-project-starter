import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface AllTagsDialogProps {
  onClose: () => void;
}

export function AllTagsDialog({ onClose }: AllTagsDialogProps) {
  const allTags = [
    'First Time Buyer',
    'VIP',
    'Pre-Approved',
    'Investor',
    'Luxury Segment',
    'Relocation',
    'Downsizing',
    'Future'
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-[#1a1a1a] border-[#2d2d2d] text-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-white">All Tags</DialogTitle>
        </DialogHeader>

        {/* Tags */}
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag, idx) => (
              <span 
                key={idx}
                className="bg-[#252525] text-[#b0b0b0] px-3 py-2 rounded-lg text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
