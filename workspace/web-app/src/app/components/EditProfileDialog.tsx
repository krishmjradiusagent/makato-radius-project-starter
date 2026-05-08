import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface EditProfileDialogProps {
  onClose: () => void;
}

export function EditProfileDialog({ onClose }: EditProfileDialogProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-[#1a1a1a] border-[#2d2d2d] text-white sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Client Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Name */}
          <div>
            <label className="text-[#b0b0b0] text-sm mb-2 block">Full Name</label>
            <input 
              type="text" 
              defaultValue="Violet Cole"
              className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg px-4 py-3 text-white focus:border-[#5a5ff2] focus:outline-none"
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-[#b0b0b0] text-sm mb-2 block">Status</label>
            <select className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg px-4 py-3 text-white focus:border-[#5a5ff2] focus:outline-none">
              <option>New Client</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Closed</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="text-[#b0b0b0] text-sm mb-2 block">Location</label>
            <input 
              type="text" 
              defaultValue="San Francisco, CA"
              className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg px-4 py-3 text-white focus:border-[#5a5ff2] focus:outline-none"
            />
          </div>

          {/* Company */}
          <div>
            <label className="text-[#b0b0b0] text-sm mb-2 block">Company Name</label>
            <input 
              type="text" 
              defaultValue="Tech Solutions Inc."
              className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg px-4 py-3 text-white focus:border-[#5a5ff2] focus:outline-none"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="text-[#b0b0b0] text-sm mb-2 block">Priority Status</label>
            <select className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg px-4 py-3 text-white focus:border-[#5a5ff2] focus:outline-none">
              <option>Low</option>
              <option>Medium</option>
              <option selected>High</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button 
              onClick={onClose}
              className="flex-1 bg-[#2d2d2d] text-white py-3 rounded-lg font-medium hover:bg-[#353535] transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={onClose}
              className="flex-1 bg-[#5a5ff2] text-white py-3 rounded-lg font-medium hover:bg-[#4a4fe2] transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
