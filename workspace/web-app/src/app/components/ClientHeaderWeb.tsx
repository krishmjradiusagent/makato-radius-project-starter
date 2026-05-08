import { Mail, Phone, MessageCircle, MoreVertical, ChevronDown, ChevronUp } from 'lucide-react';
import imgAvatar from "figma:asset/425014815828544c6be381aa86661be1b4dad5c3.png";
import { useState } from 'react';
import { ClientTypesDialog } from './ClientTypesDialog';
import { ContactSelectorDialog } from './ContactSelectorDialog';

interface ClientHeaderWebProps {
  onOpenMenu: () => void;
  onOpenTags: () => void;
  onOpenContactDetails: () => void;
}

export function ClientHeaderWeb({ onOpenMenu, onOpenTags, onOpenContactDetails }: ClientHeaderWebProps) {
  const [aiProspectingExpanded, setAiProspectingExpanded] = useState(true);
  const [additionalDetailsExpanded, setAdditionalDetailsExpanded] = useState(false);
  const [showAllClientTypes, setShowAllClientTypes] = useState(false);
  const [showPhoneSelector, setShowPhoneSelector] = useState(false);
  const [showEmailSelector, setShowEmailSelector] = useState(false);

  const visibleTags = ['First Time Buyer', 'VIP', 'Pre-Approved', 'Future'];
  const totalTags = 8;
  const hiddenTagsCount = totalTags - visibleTags.length;

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
    console.log('Email selected:', email);
  };

  const handlePhoneSelect = (phone: string) => {
    console.log('Phone selected:', phone);
  };

  return (
    <div className="p-6">
      <div className="space-y-4">
        {/* Main Profile Section */}
        <div className="bg-white border border-[#e5e5e5] rounded-2xl p-4 shadow-sm">
          {/* Avatar and Name */}
          <div className="flex items-start gap-3 mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-[#f5f5f5] shrink-0">
              <img src={imgAvatar} alt="Violet Cole" className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <h2 className="text-[#171717] font-semibold text-lg">Violet Cole</h2>
                <button onClick={onOpenMenu} className="p-1 hover:bg-[#f5f5f5] rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-[#737373]" />
                </button>
              </div>
              
              <button className="bg-[#f5f5f5] inline-flex items-center gap-1.5 px-2 py-1 rounded-md">
                <div className="w-3 h-3 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400" />
                </div>
                <span className="text-[#525252] text-xs font-medium">Monica Miller</span>
                <ChevronDown className="w-3 h-3 text-[#525252]" />
              </button>
            </div>
          </div>

          {/* Contact Actions */}
          <div className="flex gap-2 mb-4">
            <button 
              onClick={onOpenContactDetails}
              className="flex-1 h-10 rounded-lg bg-[#5a5ff2]/10 border border-[#5a5ff2] flex items-center justify-center gap-2 hover:bg-[#5a5ff2]/20 transition-colors"
            >
              <Mail className="w-4 h-4 text-[#5a5ff2]" />
              <span className="text-[#5a5ff2] text-sm font-medium">Email</span>
            </button>
            <button 
              onClick={onOpenContactDetails}
              className="flex-1 h-10 rounded-lg bg-[#5a5ff2]/10 border border-[#5a5ff2] flex items-center justify-center gap-2 hover:bg-[#5a5ff2]/20 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#5a5ff2]" />
              <span className="text-[#5a5ff2] text-sm font-medium">Call</span>
            </button>
            <button className="flex-1 h-10 rounded-lg bg-[#5a5ff2]/10 border border-[#5a5ff2] flex items-center justify-center gap-2 hover:bg-[#5a5ff2]/20 transition-colors">
              <MessageCircle className="w-4 h-4 text-[#5a5ff2]" />
              <span className="text-[#5a5ff2] text-sm font-medium">Text</span>
            </button>
          </div>

          {/* Contact Info */}
          <div className="mb-4 space-y-2">
            <div>
              <div className="text-[#a3a3a3] text-xs mb-1">Email</div>
              <button 
                onClick={() => setShowEmailSelector(true)}
                className="text-[#525252] text-sm text-left hover:text-[#5a5ff2] transition-colors w-full"
              >
                {primaryEmail?.value}
                {additionalEmailCount > 0 && (
                  <span className="ml-2 text-[#a3a3a3]">
                    +{additionalEmailCount} {additionalEmailCount === 1 ? 'email' : 'emails'}
                  </span>
                )}
              </button>
            </div>
            <div>
              <div className="text-[#a3a3a3] text-xs mb-1">Phone</div>
              <button 
                onClick={() => setShowPhoneSelector(true)}
                className="text-[#525252] text-sm text-left hover:text-[#5a5ff2] transition-colors w-full"
              >
                {primaryPhone?.value}
                {additionalPhoneCount > 0 && (
                  <span className="ml-2 text-[#a3a3a3]">
                    +{additionalPhoneCount} {additionalPhoneCount === 1 ? 'phone' : 'phones'}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Client Types */}
          {allClientTypes.length > 0 && (
            <div className="flex items-center gap-1.5 mb-3 flex-wrap">
              {visibleClientTypes.map((type, idx) => (
                <span 
                  key={idx}
                  className="bg-[#f5f5f5] text-[#525252] px-2.5 py-1.5 rounded text-xs font-medium border border-[#e5e5e5]"
                >
                  {type}
                </span>
              ))}
              {remainingTypesCount > 0 && (
                <button
                  onClick={() => setShowAllClientTypes(true)}
                  className="bg-[#f5f5f5] text-[#5a5ff2] px-2.5 py-1.5 rounded text-xs font-medium border border-[#e5e5e5] hover:bg-[#ebebeb] transition-colors"
                >
                  +{remainingTypesCount}
                </button>
              )}
            </div>
          )}

          {/* Tags */}
          <div className="flex items-center gap-1.5 mb-4 flex-wrap">
            {visibleTags.map((tag, idx) => (
              <span 
                key={idx}
                className="bg-[#f5f5f5] text-[#525252] px-2.5 py-1.5 rounded text-xs font-medium"
              >
                {tag}
              </span>
            ))}
            {hiddenTagsCount > 0 && (
              <button 
                onClick={onOpenTags}
                className="bg-[#f5f5f5] text-[#5a5ff2] px-2.5 py-1.5 rounded text-xs font-medium hover:bg-[#ebebeb] transition-colors"
              >
                +{hiddenTagsCount}
              </button>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-[#e5e5e5] mb-4" />

          {/* Status */}
          <button className="w-full bg-[#dcfce7] text-[#166534] px-3 py-2 rounded-lg flex items-center justify-between border border-[#86efac] hover:bg-[#bbf7d0] transition-colors">
            <span className="text-sm font-medium">New Client</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* AI Prospecting - Collapsible */}
        <div className="bg-white border border-[#e5e5e5] rounded-2xl overflow-hidden shadow-sm">
          <button 
            onClick={() => setAiProspectingExpanded(!aiProspectingExpanded)}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-[#fafafa] transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
              <span className="text-[#171717] text-sm font-medium">AI Prospecting</span>
              <span className="text-[#a3a3a3] text-xs">Active</span>
            </div>
            {aiProspectingExpanded ? (
              <ChevronUp className="w-4 h-4 text-[#737373]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#737373]" />
            )}
          </button>
          
          {aiProspectingExpanded && (
            <div className="px-4 pb-4 space-y-3">
              <p className="text-[#737373] text-xs leading-relaxed">
                Automatically monitors new listings matching client preferences and sends personalized recommendations weekly.
              </p>
              <div className="flex gap-2">
                <button className="flex-1 bg-[#5a5ff2] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#4a4fe2] transition-colors">
                  Refresh Now
                </button>
                <button className="px-4 bg-white text-[#171717] py-2 rounded-lg text-sm font-medium border border-[#e5e5e5] hover:bg-[#f5f5f5] transition-colors">
                  Settings
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Additional Details - Collapsible */}
        <div className="bg-white border border-[#e5e5e5] rounded-2xl overflow-hidden shadow-sm">
          <button 
            onClick={() => setAdditionalDetailsExpanded(!additionalDetailsExpanded)}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-[#fafafa] transition-colors"
          >
            <span className="text-[#171717] text-sm font-medium">Additional Details</span>
            {additionalDetailsExpanded ? (
              <ChevronUp className="w-4 h-4 text-[#737373]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#737373]" />
            )}
          </button>
          
          {additionalDetailsExpanded && (
            <div className="px-4 pb-4 max-h-[400px] overflow-y-auto">
              <div className="space-y-3">
                <div>
                  <div className="text-[#a3a3a3] text-xs mb-1">Location</div>
                  <div className="text-[#171717] text-sm">San Francisco, CA</div>
                </div>
                <div>
                  <div className="text-[#a3a3a3] text-xs mb-1">Birthday</div>
                  <div className="text-[#171717] text-sm">March 15, 1985</div>
                </div>
                <div>
                  <div className="text-[#a3a3a3] text-xs mb-1">Spouse Birthday</div>
                  <div className="text-[#171717] text-sm">July 22, 1987</div>
                </div>
                <div>
                  <div className="text-[#a3a3a3] text-xs mb-1">Home Anniversary</div>
                  <div className="text-[#171717] text-sm">June 10, 2020</div>
                </div>
                <div>
                  <div className="text-[#a3a3a3] text-xs mb-1">Company Name</div>
                  <div className="text-[#171717] text-sm">Tech Solutions Inc.</div>
                </div>
                <div>
                  <div className="text-[#a3a3a3] text-xs mb-1">Website</div>
                  <div className="text-[#5a5ff2] text-sm hover:underline cursor-pointer">techsolutions.com</div>
                </div>
                <div>
                  <div className="text-[#a3a3a3] text-xs mb-1">Attorney Name</div>
                  <div className="text-[#171717] text-sm">Sarah Johnson</div>
                </div>
                <div>
                  <div className="text-[#a3a3a3] text-xs mb-1">Commission %</div>
                  <div className="text-[#171717] text-sm">3.0%</div>
                </div>
                <div>
                  <div className="text-[#a3a3a3] text-xs mb-1">Priority Status</div>
                  <div className="text-[#22c55e] text-sm font-medium">High</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Client Types Dialog */}
      {showAllClientTypes && (
        <ClientTypesDialog 
          types={allClientTypes}
          onClose={() => setShowAllClientTypes(false)}
        />
      )}

      {/* Contact Selector Dialogs */}
      {showEmailSelector && (
        <ContactSelectorDialog 
          type="email"
          contacts={emails}
          onClose={() => setShowEmailSelector(false)}
          onSelect={handleEmailSelect}
        />
      )}
      {showPhoneSelector && (
        <ContactSelectorDialog 
          type="phone"
          contacts={phones}
          onClose={() => setShowPhoneSelector(false)}
          onSelect={handlePhoneSelect}
        />
      )}
    </div>
  );
}
