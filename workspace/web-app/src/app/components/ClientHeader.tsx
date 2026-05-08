import { ArrowLeft, Mail, Phone, MessageCircle, MoreVertical, ChevronDown, ChevronRight } from 'lucide-react';
import imgAvatar from "figma:asset/425014815828544c6be381aa86661be1b4dad5c3.png";
import { useState } from 'react';
import { ClientTypesSheet } from './ClientTypesSheet';
import { ContactSelectorSheet } from './ContactSelectorSheet';
import { DSBadge } from './ds';

interface ClientHeaderProps {
  onOpenMenu: () => void;
  onOpenTags: () => void;
  onOpenContactDetails: () => void;
  onOpenAdditionalDetails: () => void;
  onOpenRelationships: () => void;
  onOpenCollaborators: () => void;
  onOpenAIProspecting: () => void;
}

export function ClientHeader({ 
  onOpenMenu, 
  onOpenTags, 
  onOpenContactDetails,
  onOpenAdditionalDetails,
  onOpenRelationships,
  onOpenCollaborators,
  onOpenAIProspecting
}: ClientHeaderProps) {
  const [showAllClientTypes, setShowAllClientTypes] = useState(false);
  const [showPhoneSelector, setShowPhoneSelector] = useState(false);
  const [showEmailSelector, setShowEmailSelector] = useState(false);

  const visibleTags = ['First Time Buyer', 'VIP', 'Pre-Approved', 'Future'];
  const selectedTagsCount = visibleTags.length;

  // Client types data
  const allClientTypes = ['Buyer', 'Seller', 'Landlord'];
  const visibleClientTypes = allClientTypes.slice(0, 2);
  const remainingTypesCount = allClientTypes.length - visibleClientTypes.length;

  // Contact data
  const emails = [
    { value: 'violet.cole@email.com', label: 'Personal', isPrimary: true },
    { value: 'v.cole@techsolutions.com', label: 'Work', isPrimary: false },
    { value: 'violet.cole.backup@email.com', label: 'Secondary', isPrimary: false }
  ];
  
  const phones = [
    { value: '(555) 123-4567', label: 'Mobile', isPrimary: true },
    { value: '(555) 987-6543', label: 'Work', isPrimary: false }
  ];

  const primaryEmail = emails.find(e => e.isPrimary) || emails[0];
  const primaryPhone = phones.find(p => p.isPrimary) || phones[0];
  const additionalEmailCount = emails.length - 1;
  const additionalPhoneCount = phones.length - 1;

  const handleEmailSelect = (email: string) => {
    // Trigger email action
    console.log('Email selected:', email);
  };

  const handlePhoneSelect = (phone: string) => {
    // Trigger call action
    console.log('Phone selected:', phone);
  };

  return (
    <div className="shrink-0 px-4 pb-3">
      <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-2xl overflow-hidden">
        {/* Main Header Content */}
        <div className="p-3">
          {/* Top Row: Back + Avatar + Contact Actions */}
          <div className="flex items-center gap-2.5 mb-3">
            <button className="p-0">
              <ArrowLeft className="w-[18px] h-[18px] text-white" />
            </button>
            
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-[#2d2d2d] shrink-0">
                <img src={imgAvatar} alt="Violet Cole" className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h2 className="text-white font-semibold text-[15px] tracking-[0.3px]">Violet Cole</h2>
                <button className="bg-[#252525] inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md mt-0.5">
                  <div className="w-3 h-3 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400" />
                  </div>
                  <span className="text-[#b0b0b0] text-[11px] font-medium">Monica Miller</span>
                  <ChevronDown className="w-3 h-3 text-[#b0b0b0]" />
                </button>
              </div>
            </div>

            <div className="flex gap-2 shrink-0">
              <button 
                onClick={onOpenContactDetails}
                className="w-9 h-9 rounded-full bg-[#4a4fd2]/20 border border-[#5a5ff2] flex items-center justify-center"
              >
                <Mail className="w-[17px] h-[17px] text-[#5a5ff2]" />
              </button>
              <button 
                onClick={onOpenContactDetails}
                className="w-9 h-9 rounded-full bg-[#4a4fd2]/20 border border-[#5a5ff2] flex items-center justify-center"
              >
                <Phone className="w-[17px] h-[17px] text-[#5a5ff2]" />
              </button>
              <button className="w-9 h-9 rounded-full bg-[#4a4fd2]/20 border border-[#5a5ff2] flex items-center justify-center">
                <MessageCircle className="w-[17px] h-[17px] text-[#5a5ff2]" />
              </button>
            </div>
          </div>

          {/* Contact Info - Primary Only */}
          <div className="mb-3 space-y-1">
            <button 
              onClick={() => setShowEmailSelector(true)}
              className="text-[#8a8a8a] text-xs text-left hover:text-[#5a5ff2] transition-colors"
            >
              {primaryEmail?.value}
              {additionalEmailCount > 0 && (
                <span className="ml-1.5 text-[#6a6a6a]">
                  +{additionalEmailCount} {additionalEmailCount === 1 ? 'email' : 'emails'}
                </span>
              )}
            </button>
            <button 
              onClick={() => setShowPhoneSelector(true)}
              className="text-[#8a8a8a] text-xs text-left hover:text-[#5a5ff2] transition-colors"
            >
              {primaryPhone?.value}
              {additionalPhoneCount > 0 && (
                <span className="ml-1.5 text-[#6a6a6a]">
                  +{additionalPhoneCount} {additionalPhoneCount === 1 ? 'phone' : 'phones'}
                </span>
              )}
            </button>
          </div>

          {/* Client Types */}
          {allClientTypes.length > 0 && (
            <div className="flex items-center gap-1.5 mb-3 flex-wrap">
              <DSBadge variant="outline" className="bg-[#1a1a1a] text-[#8a8a8a] border-[#2d2d2d]">
                {visibleClientTypes[0]}
              </DSBadge>
              {visibleClientTypes.slice(1).map((type, idx) => (
                <span
                  key={idx}
                  className="bg-[#1a1a1a] text-[#8a8a8a] px-2 py-1 rounded text-xs font-medium border border-[#2d2d2d]"
                >
                  {type}
                </span>
              ))}
              {remainingTypesCount > 0 && (
                <button
                  onClick={() => setShowAllClientTypes(true)}
                  className="bg-[#1a1a1a] text-[#5a5ff2] px-2 py-1 rounded text-xs font-medium border border-[#2d2d2d]"
                >
                  +{remainingTypesCount}
                </button>
              )}
            </div>
          )}

          {/* Tags Section - Compact with chevron */}
          <button
            onClick={onOpenTags}
            className="w-full mb-3 flex items-center justify-between py-1.5 hover:bg-[#1f1f1f] rounded-lg px-2 -mx-2 transition-colors"
          >
            <span className="text-[#8a8a8a] text-xs">Tags</span>
            <div className="flex items-center gap-2">
              <span className="text-white text-xs">{selectedTagsCount}</span>
              <ChevronRight className="w-4 h-4 text-[#8a8a8a]" />
            </div>
          </button>

          {/* Divider */}
          <div className="h-px bg-[#2d2d2d] mb-3" />

          {/* Bottom Row: Status + More */}
          <div className="flex items-center justify-between">
            <button className="bg-[#1e3a1e] text-[#86efac] px-3 py-1.5 rounded-lg flex items-center gap-2 flex-1 max-w-[280px] border border-[#2d4a2d]">
              <span className="text-sm font-medium">New Client</span>
              <ChevronDown className="w-4 h-4 ml-auto" />
            </button>
            <button className="ml-2" onClick={onOpenMenu}>
              <MoreVertical className="w-5 h-5 text-[#8a8a8a]" />
            </button>
          </div>
        </div>

        {/* AI Prospecting - Compact row with chevron */}
        <button
          onClick={onOpenAIProspecting}
          className="w-full px-3 py-2.5 flex items-center justify-between hover:bg-[#1f1f1f] transition-colors border-t border-[#2d2d2d]"
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#86efac]" />
            <span className="text-white text-sm font-medium">AI Prospecting</span>
            <span className="text-[#6a6a6a] text-xs">Active</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#8a8a8a]" />
        </button>

        {/* Additional Details - Compact row with chevron */}
        <button
          onClick={onOpenAdditionalDetails}
          className="w-full px-3 py-2.5 flex items-center justify-between hover:bg-[#1f1f1f] transition-colors border-t border-[#2d2d2d]"
        >
          <span className="text-white text-sm font-medium">Additional Details</span>
          <ChevronRight className="w-4 h-4 text-[#8a8a8a]" />
        </button>

        {/* Relationships - Compact row with chevron */}
        <button
          onClick={onOpenRelationships}
          className="w-full px-3 py-2.5 flex items-center justify-between hover:bg-[#1f1f1f] transition-colors border-t border-[#2d2d2d]"
        >
          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-medium">Relationships</span>
            <span className="text-[#6a6a6a] text-xs">3</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#8a8a8a]" />
        </button>

        {/* Collaborators - Compact row with chevron */}
        <button
          onClick={onOpenCollaborators}
          className="w-full px-3 py-2.5 flex items-center justify-between hover:bg-[#1f1f1f] transition-colors border-t border-[#2d2d2d]"
        >
          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-medium">Collaborators</span>
            <span className="text-[#6a6a6a] text-xs">3</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#8a8a8a]" />
        </button>
      </div>

      {/* Client Types Bottom Sheet */}
      {showAllClientTypes && (
        <ClientTypesSheet 
          types={allClientTypes}
          onClose={() => setShowAllClientTypes(false)}
        />
      )}

      {/* Contact Selector Bottom Sheet */}
      {showEmailSelector && (
        <ContactSelectorSheet 
          type="email"
          contacts={emails}
          onClose={() => setShowEmailSelector(false)}
          onSelect={handleEmailSelect}
        />
      )}
      {showPhoneSelector && (
        <ContactSelectorSheet 
          type="phone"
          contacts={phones}
          onClose={() => setShowPhoneSelector(false)}
          onSelect={handlePhoneSelect}
        />
      )}
    </div>
  );
}
