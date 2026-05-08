import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface ClientTypesDialogProps {
  types: string[];
  onClose: () => void;
}

export function ClientTypesDialog({ types, onClose }: ClientTypesDialogProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-white border-[#e5e5e5] text-[#171717] sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-[#171717]">Client Types</DialogTitle>
        </DialogHeader>

        {/* Types */}
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {types.map((type, idx) => (
              <span 
                key={idx}
                className="bg-[#f5f5f5] text-[#525252] px-3 py-2 rounded-lg text-sm font-medium border border-[#e5e5e5]"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}