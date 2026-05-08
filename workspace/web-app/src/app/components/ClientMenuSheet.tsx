import { X, Edit2, Eye, Calendar, Search, FileText, Archive } from 'lucide-react';

interface ClientMenuSheetProps {
  onClose: () => void;
  onEditProfile: () => void;
  onViewContactDetails: () => void;
}

export function ClientMenuSheet({ onClose, onEditProfile, onViewContactDetails }: ClientMenuSheetProps) {
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
          <h2 className="text-white font-semibold text-lg">Client Menu</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-[#8a8a8a]" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="p-4 space-y-2">
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

        {/* Bottom Padding */}
        <div className="h-6" />
      </div>
    </>
  );
}