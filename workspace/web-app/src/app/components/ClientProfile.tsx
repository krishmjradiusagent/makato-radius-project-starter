import { ClientHeader } from './ClientHeader';
import { TabNavigation } from './TabNavigation';
import { TransactionsTab } from './TransactionsTab';
import { ActivityTab } from './ActivityTab';
import { SearchesTab } from './SearchesTab';
import { ListingsTab } from './ListingsTab';
import { NotesTab } from './NotesTab';
import { RemindersTab } from './RemindersTab';
import { RecommendedPropertiesTab } from './RecommendedPropertiesTab';
import { ActivityFilterSheet } from './ActivityFilterSheet';
import { TransactionFilterSheet } from './TransactionFilterSheet';
import { SearchesFilterSheet } from './SearchesFilterSheet';
import { ListingsFilterSheet } from './ListingsFilterSheet';
import { NotesFilterSheet } from './NotesFilterSheet';
import { RemindersFilterSheet } from './RemindersFilterSheet';
import { RecommendedPropertiesFilterSheet } from './RecommendedPropertiesFilterSheet';
import { AddNoteSheet } from './AddNoteSheet';
import { AddReminderSheet } from './AddReminderSheet';
import { ClientMenuSheet } from './ClientMenuSheet';
import { AllTagsSheet } from './AllTagsSheet';
import { AdditionalDetailsSheet } from './AdditionalDetailsSheet';
import { RelationshipsSheet } from './RelationshipsSheet';
import { CollaboratorsSheet } from './CollaboratorsSheet';
import { AIProspectingSheet } from './AIProspectingSheet';
import { ContactDetailsSheet } from './ContactDetailsSheet';
import { EditProfileSheet } from './EditProfileSheet';
import { TabType, Screen } from '../App';
import { useState } from 'react';

interface ClientProfileProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onNavigate: (screen: Screen) => void;
}

export function ClientProfile({ activeTab, onTabChange, onNavigate }: ClientProfileProps) {
  const [showActivityFilter, setShowActivityFilter] = useState(false);
  const [showTransactionFilter, setShowTransactionFilter] = useState(false);
  const [showSearchesFilter, setShowSearchesFilter] = useState(false);
  const [showListingsFilter, setShowListingsFilter] = useState(false);
  const [showNotesFilter, setShowNotesFilter] = useState(false);
  const [showRemindersFilter, setShowRemindersFilter] = useState(false);
  const [showRecommendedFilter, setShowRecommendedFilter] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [showClientMenu, setShowClientMenu] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  const [showRelationships, setShowRelationships] = useState(false);
  const [showCollaborators, setShowCollaborators] = useState(false);
  const [showAIProspecting, setShowAIProspecting] = useState(false);
  const [showContactDetails, setShowContactDetails] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  return (
    <div className="w-full max-w-[390px] mx-auto h-screen flex flex-col bg-[#0a0a0a]">
      {/* Status Bar */}
      <div className="h-[54px] flex items-center justify-between px-4 text-white shrink-0">
        <span className="font-semibold">9:41</span>
        <div className="flex gap-1.5 items-center">
          <svg className="w-[17px] h-[11px]" viewBox="0 0 18 13" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.5713 2.46628C11.0584 2.46639 13.4504 3.38847 15.2529 5.04195C15.3887 5.1696 15.6056 5.16799 15.7393 5.03834L17.0368 3.77487C17.1045 3.70911 17.1422 3.62004 17.1417 3.52735C17.1411 3.43467 17.1023 3.34603 17.0338 3.28104C12.3028 -1.09368 4.83907 -1.09368 0.108056 3.28104C0.039524 3.34598 0.000639766 3.4346 7.82398e-06 3.52728C-0.000624118 3.61996 0.0370483 3.70906 0.104689 3.77487L1.40255 5.03834C1.53615 5.16819 1.75327 5.1698 1.88893 5.04195C3.69167 3.38836 6.08395 2.46628 8.5713 2.46628Z" fill="currentColor"/>
          </svg>
          <div className="w-[25px] h-[11.5px] border border-white/35 rounded-[4px] relative">
            <div className="absolute inset-[2px] bg-white rounded-[2px]" />
            <div className="absolute -right-[2px] top-1/2 -translate-y-1/2 w-[1.3px] h-[4px] bg-white/40 rounded-r" />
          </div>
        </div>
      </div>

      {/* Sticky Client Header */}
      <ClientHeader 
        onOpenMenu={() => setShowClientMenu(true)}
        onOpenTags={() => setShowAllTags(true)}
        onOpenContactDetails={() => setShowContactDetails(true)}
        onOpenAdditionalDetails={() => setShowAdditionalDetails(true)}
        onOpenRelationships={() => setShowRelationships(true)}
        onOpenCollaborators={() => setShowCollaborators(true)}
        onOpenAIProspecting={() => setShowAIProspecting(true)}
      />

      {/* Tab Navigation - Sticky */}
      <TabNavigation 
        activeTab={activeTab} 
        onTabChange={onTabChange}
      />

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'transactions' && (
          <TransactionsTab 
            onNavigate={onNavigate}
            onFilterClick={() => setShowTransactionFilter(true)}
          />
        )}
        {activeTab === 'activity' && (
          <ActivityTab 
            onFilterClick={() => setShowActivityFilter(true)}
            onNavigate={onNavigate}
          />
        )}
        {activeTab === 'searches' && (
          <SearchesTab 
            onNavigate={onNavigate}
            onFilterClick={() => setShowSearchesFilter(true)}
          />
        )}
        {activeTab === 'listings' && (
          <ListingsTab 
            onNavigate={onNavigate}
            onFilterClick={() => setShowListingsFilter(true)}
          />
        )}
        {activeTab === 'notes' && (
          <NotesTab 
            onFilterClick={() => setShowNotesFilter(true)}
            onAddNoteClick={() => setShowAddNote(true)}
          />
        )}
        {activeTab === 'reminders' && (
          <RemindersTab 
            onFilterClick={() => setShowRemindersFilter(true)}
            onAddReminderClick={() => setShowAddReminder(true)}
          />
        )}
        {activeTab === 'recommended' && (
          <RecommendedPropertiesTab 
            onFilterClick={() => setShowRecommendedFilter(true)}
          />
        )}
      </div>

      {/* Filter Bottom Sheets */}
      {showActivityFilter && (
        <ActivityFilterSheet onClose={() => setShowActivityFilter(false)} />
      )}
      {showTransactionFilter && (
        <TransactionFilterSheet onClose={() => setShowTransactionFilter(false)} />
      )}
      {showSearchesFilter && (
        <SearchesFilterSheet onClose={() => setShowSearchesFilter(false)} />
      )}
      {showListingsFilter && (
        <ListingsFilterSheet onClose={() => setShowListingsFilter(false)} />
      )}
      {showNotesFilter && (
        <NotesFilterSheet onClose={() => setShowNotesFilter(false)} />
      )}
      {showRemindersFilter && (
        <RemindersFilterSheet onClose={() => setShowRemindersFilter(false)} />
      )}
      {showRecommendedFilter && (
        <RecommendedPropertiesFilterSheet onClose={() => setShowRecommendedFilter(false)} />
      )}
      {showAddNote && (
        <AddNoteSheet onClose={() => setShowAddNote(false)} />
      )}
      {showAddReminder && (
        <AddReminderSheet onClose={() => setShowAddReminder(false)} />
      )}
      {showClientMenu && (
        <ClientMenuSheet 
          onClose={() => setShowClientMenu(false)}
          onEditProfile={() => {
            setShowClientMenu(false);
            setShowEditProfile(true);
          }}
          onViewContactDetails={() => {
            setShowClientMenu(false);
            setShowContactDetails(true);
          }}
        />
      )}
      {showAllTags && (
        <AllTagsSheet onClose={() => setShowAllTags(false)} />
      )}
      {showAdditionalDetails && (
        <AdditionalDetailsSheet onClose={() => setShowAdditionalDetails(false)} />
      )}
      {showRelationships && (
        <RelationshipsSheet onClose={() => setShowRelationships(false)} />
      )}
      {showCollaborators && (
        <CollaboratorsSheet onClose={() => setShowCollaborators(false)} />
      )}
      {showAIProspecting && (
        <AIProspectingSheet onClose={() => setShowAIProspecting(false)} />
      )}
      {showContactDetails && (
        <ContactDetailsSheet onClose={() => setShowContactDetails(false)} />
      )}
      {showEditProfile && (
        <EditProfileSheet onClose={() => setShowEditProfile(false)} />
      )}
    </div>
  );
}