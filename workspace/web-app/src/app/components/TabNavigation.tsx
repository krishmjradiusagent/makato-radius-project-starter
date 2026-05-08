import { TabType } from '../App';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs: { id: TabType; label: string }[] = [
  { id: 'activity', label: 'Activity' },
  { id: 'transactions', label: 'Transactions' },
  { id: 'searches', label: 'Searches' },
  { id: 'listings', label: 'Listings' },
  { id: 'notes', label: 'Notes' },
  { id: 'reminders', label: 'Reminders' },
  { id: 'recommended', label: 'Recommended properties' },
];

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="shrink-0 px-4 mb-3">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-[#5a5ff2] text-white'
                : 'bg-[#1a1a1a] text-[#8a8a8a] border border-[#2d2d2d] hover:bg-[#252525]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}