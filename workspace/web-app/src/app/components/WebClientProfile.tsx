import { ClientHeaderWeb } from './ClientHeaderWeb';
import { TabNavigationWeb } from './TabNavigationWeb';
import { TransactionsTabWeb } from './TransactionsTabWeb';
import { ActivityTabWeb } from './ActivityTabWeb';
import { SearchesTabWeb } from './SearchesTabWeb';
import { ListingsTabWeb } from './ListingsTabWeb';
import { NotesTabWeb } from './NotesTabWeb';
import { RemindersTabWeb } from './RemindersTabWeb';
import { RecommendedPropertiesTabWeb } from './RecommendedPropertiesTabWeb';
import { ActivityFilterDialog } from './ActivityFilterDialog';
import { TransactionFilterDialog } from './TransactionFilterDialog';
import { SearchesFilterDialog } from './SearchesFilterDialog';
import { ListingsFilterDialog } from './ListingsFilterDialog';
import { NotesFilterDialog } from './NotesFilterDialog';
import { RemindersFilterDialog } from './RemindersFilterDialog';
import { RecommendedPropertiesFilterDialog } from './RecommendedPropertiesFilterDialog';
import { AddNoteDialog } from './AddNoteDialog';
import { AddReminderDialog } from './AddReminderDialog';
import { ClientMenuDialog } from './ClientMenuDialog';
import { AllTagsDialog } from './AllTagsDialog';
import { ContactDetailsDialog } from './ContactDetailsDialog';
import { EditProfileDialog } from './EditProfileDialog';
import { TabType, Screen } from '../App';
import { useState } from 'react';

interface WebClientProfileProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onNavigate: (screen: Screen) => void;
}

export function WebClientProfile({ activeTab, onTabChange, onNavigate }: WebClientProfileProps) {
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
  const [showContactDetails, setShowContactDetails] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  return (
    <div className="flex h-screen bg-[#fafafa]">
      {/* Left Sidebar - Client Info */}
      <div className="w-[380px] border-r border-[#e5e5e5] overflow-y-auto flex-shrink-0 bg-white">
        <ClientHeaderWeb
          onOpenMenu={() => setShowClientMenu(true)}
          onOpenTags={() => setShowAllTags(true)}
          onOpenContactDetails={() => setShowContactDetails(true)}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Tab Navigation - Horizontal */}
        <TabNavigationWeb 
          activeTab={activeTab} 
          onTabChange={onTabChange}
        />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1200px] mx-auto p-6 relative">
            {activeTab === 'transactions' && (
              <>
                <TransactionsTabWeb 
                  onNavigate={onNavigate}
                  onFilterClick={() => setShowTransactionFilter(true)}
                />
                {showTransactionFilter && (
                  <TransactionFilterDialog onClose={() => setShowTransactionFilter(false)} />
                )}
              </>
            )}
            {activeTab === 'activity' && (
              <>
                <ActivityTabWeb 
                  onFilterClick={() => setShowActivityFilter(true)}
                  onNavigate={onNavigate}
                />
                {showActivityFilter && (
                  <ActivityFilterDialog onClose={() => setShowActivityFilter(false)} />
                )}
              </>
            )}
            {activeTab === 'searches' && (
              <>
                <SearchesTabWeb 
                  onNavigate={onNavigate}
                  onFilterClick={() => setShowSearchesFilter(true)}
                />
                {showSearchesFilter && (
                  <SearchesFilterDialog onClose={() => setShowSearchesFilter(false)} />
                )}
              </>
            )}
            {activeTab === 'listings' && (
              <>
                <ListingsTabWeb 
                  onNavigate={onNavigate}
                  onFilterClick={() => setShowListingsFilter(true)}
                />
                {showListingsFilter && (
                  <ListingsFilterDialog onClose={() => setShowListingsFilter(false)} />
                )}
              </>
            )}
            {activeTab === 'notes' && (
              <>
                <NotesTabWeb 
                  onFilterClick={() => setShowNotesFilter(true)}
                  onAddNoteClick={() => setShowAddNote(true)}
                />
                {showNotesFilter && (
                  <NotesFilterDialog onClose={() => setShowNotesFilter(false)} />
                )}
              </>
            )}
            {activeTab === 'reminders' && (
              <>
                <RemindersTabWeb 
                  onFilterClick={() => setShowRemindersFilter(true)}
                  onAddReminderClick={() => setShowAddReminder(true)}
                />
                {showRemindersFilter && (
                  <RemindersFilterDialog onClose={() => setShowRemindersFilter(false)} />
                )}
              </>
            )}
            {activeTab === 'recommended' && (
              <>
                <RecommendedPropertiesTabWeb 
                  onFilterClick={() => setShowRecommendedFilter(true)}
                />
                {showRecommendedFilter && (
                  <RecommendedPropertiesFilterDialog onClose={() => setShowRecommendedFilter(false)} />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Filter Dialogs - These were moved inline above */}
      {showClientMenu && (
        <ClientMenuDialog 
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
        <AllTagsDialog onClose={() => setShowAllTags(false)} />
      )}
      {showContactDetails && (
        <ContactDetailsDialog onClose={() => setShowContactDetails(false)} />
      )}
      {showEditProfile && (
        <EditProfileDialog onClose={() => setShowEditProfile(false)} />
      )}
      {showAddNote && (
        <AddNoteDialog onClose={() => setShowAddNote(false)} />
      )}
      {showAddReminder && (
        <AddReminderDialog onClose={() => setShowAddReminder(false)} />
      )}
    </div>
  );
}