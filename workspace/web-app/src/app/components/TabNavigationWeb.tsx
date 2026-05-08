import { TabType } from '../App';

interface TabNavigationWebProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function TabNavigationWeb({ activeTab, onTabChange }: TabNavigationWebProps) {
  const tabs: { id: TabType; label: string }[] = [
    { id: 'activity', label: 'Activity' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'searches', label: 'Searches' },
    { id: 'listings', label: 'Listings' },
    { id: 'notes', label: 'Notes' },
    { id: 'reminders', label: 'Reminders' },
    { id: 'recommended', label: 'Recommended Properties' },
  ];

  return (
    <div className="border-b border-[#e5e5e5] bg-white shrink-0">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                px-6 py-4 text-sm font-medium transition-colors relative
                ${activeTab === tab.id 
                  ? 'text-[#171717]' 
                  : 'text-[#737373] hover:text-[#171717]'
                }
              `}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5a5ff2]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}