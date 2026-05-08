import { Edit2, Eye, Calendar, Search, FileText, Archive } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface ClientMenuDialogProps {
  onClose: () => void;
  onEditProfile: () => void;
  onViewContactDetails: () => void;
}

export function ClientMenuDialog({ onClose, onEditProfile, onViewContactDetails }: ClientMenuDialogProps) {
  const handleAddSearchCriteria = () => {
    onClose();
    // Navigate to add search criteria
  };

  const handleAddTransaction = () => {
    onClose();
    // Navigate to add transaction
  };

  const handleArchiveClient = () => {
    onClose();
    // Archive client action
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-[#1a1a1a] border-[#2d2d2d] text-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-white">Client Menu</DialogTitle>
        </DialogHeader>

        {/* Menu Items */}
        <div className="space-y-2 mt-4">
          {/* Edit Client Profile */}
          <button 
            onClick={onEditProfile}
            className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-xl p-4 flex items-center gap-3 hover:bg-[#1f1f1f] transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#5a5ff2]/20 flex items-center justify-center">
              <Edit2 className="w-5 h-5 text-[#5a5ff2]" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-white font-medium">Edit Client Profile</div>
              <div className="text-[#6a6a6a] text-xs">Update client information</div>
            </div>
          </button>

          {/* Add Search Criteria */}
          <button 
            onClick={handleAddSearchCriteria}
            className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-xl p-4 flex items-center gap-3 hover:bg-[#1f1f1f] transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#5a5ff2]/20 flex items-center justify-center">
              <Search className="w-5 h-5 text-[#5a5ff2]" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-white font-medium">Add Search Criteria</div>
              <div className="text-[#6a6a6a] text-xs">Define search parameters</div>
            </div>
          </button>

          {/* Add Transaction */}
          <button 
            onClick={handleAddTransaction}
            className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-xl p-4 flex items-center gap-3 hover:bg-[#1f1f1f] transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#5a5ff2]/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#5a5ff2]" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-white font-medium">Add Transaction</div>
              <div className="text-[#6a6a6a] text-xs">Record a new transaction</div>
            </div>
          </button>

          {/* View All Contact Details */}
          <button 
            onClick={onViewContactDetails}
            className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-xl p-4 flex items-center gap-3 hover:bg-[#1f1f1f] transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#5a5ff2]/20 flex items-center justify-center">
              <Eye className="w-5 h-5 text-[#5a5ff2]" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-white font-medium">View All Contact Details</div>
              <div className="text-[#6a6a6a] text-xs">Phones, emails, address & source</div>
            </div>
          </button>

          {/* Added On Date */}
          <div className="bg-[#0a0a0a] border border-[#2d2d2d] rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3a3a3a] flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#8a8a8a]" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-[#8a8a8a] text-xs">Added On</div>
              <div className="text-white font-medium">November 15, 2024</div>
            </div>
          </div>

          {/* Archive Client */}
          <button 
            onClick={handleArchiveClient}
            className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-xl p-4 flex items-center gap-3 hover:bg-[#1f1f1f] transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#5a5ff2]/20 flex items-center justify-center">
              <Archive className="w-5 h-5 text-[#5a5ff2]" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-white font-medium">Archive Client</div>
              <div className="text-[#6a6a6a] text-xs">Move client to archive</div>
            </div>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
