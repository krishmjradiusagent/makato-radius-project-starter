import { useState } from 'react';
import { ClientProfile } from './components/ClientProfile';
import { WebClientProfile } from './components/WebClientProfile';
import { SearchesList } from './components/SearchesList';
import { SearchesListWeb } from './components/SearchesListWeb';
import { OffersList } from './components/OffersList';
import { OffersListWeb } from './components/OffersListWeb';
import { ListingsList } from './components/ListingsList';
import { ListingsListWeb } from './components/ListingsListWeb';
import { SearchDetail } from './components/SearchDetail';
import { OfferDetail } from './components/OfferDetail';
import { ListingDetail } from './components/ListingDetail';
import { DSButton } from './components/ds';
import { ThreePanelClientProfile } from './components/ThreePanelClientProfile';

export type TabType = 'activity' | 'transactions' | 'searches' | 'listings' | 'notes' | 'reminders' | 'recommended';

export type Screen =
  | { type: 'profile'; tab: TabType }
  | { type: 'three-panel' }
  | { type: 'searches-list' }
  | { type: 'offers-list' }
  | { type: 'listings-list' }
  | { type: 'search-detail'; id: string }
  | { type: 'offer-detail'; id: string }
  | { type: 'listing-detail'; id: string };

export default function App() {
  const [screenStack, setScreenStack] = useState<Screen[]>([
    { type: 'three-panel' }
  ]);
  const [viewMode, setViewMode] = useState<'mobile' | 'web'>('web');

  const currentScreen = screenStack[screenStack.length - 1];

  const navigate = (screen: Screen) => {
    setScreenStack([...screenStack, screen]);
  };

  const goBack = () => {
    if (screenStack.length > 1) {
      setScreenStack(screenStack.slice(0, -1));
    }
  };

  const setTab = (tab: TabType) => {
    setScreenStack([{ type: 'profile', tab }]);
  };

  return (
    <div className={`min-h-screen ${viewMode === 'web' ? 'bg-[#fafafa]' : 'bg-[#0a0a0a] dark'}`}>
      {/* View Mode Toggle */}
      <div className={`fixed top-4 right-4 z-50 flex gap-2 rounded-lg p-1 ${
        viewMode === 'web'
          ? 'bg-white border border-[#e5e5e5]'
          : 'bg-[#1a1a1a] border border-[#2d2d2d]'
      }`}>
        <DSButton
          onClick={() => setViewMode('mobile')}
          variant={viewMode === 'mobile' ? 'default' : 'ghost'}
          className={viewMode === 'web' ? 'text-[#737373] hover:text-[#171717]' : ''}
        >
          Mobile
        </DSButton>
        <DSButton
          onClick={() => setViewMode('web')}
          variant={viewMode === 'web' ? 'default' : 'ghost'}
        >
          Web
        </DSButton>
      </div>

      {/* Render based on view mode and screen */}
      {currentScreen.type === 'three-panel' && (
        <ThreePanelClientProfile />
      )}
      {currentScreen.type === 'profile' && (
        <>
          {viewMode === 'mobile' ? (
            <ClientProfile
              activeTab={currentScreen.tab}
              onTabChange={setTab}
              onNavigate={navigate}
            />
          ) : (
            <WebClientProfile
              activeTab={currentScreen.tab}
              onTabChange={setTab}
              onNavigate={navigate}
            />
          )}
        </>
      )}
      {currentScreen.type === 'searches-list' && (
        <>
          {viewMode === 'mobile' ? (
            <SearchesList onBack={goBack} onNavigate={navigate} />
          ) : (
            <SearchesListWeb onBack={goBack} onNavigate={navigate} />
          )}
        </>
      )}
      {currentScreen.type === 'offers-list' && (
        <>
          {viewMode === 'mobile' ? (
            <OffersList onBack={goBack} onNavigate={navigate} />
          ) : (
            <OffersListWeb onBack={goBack} onNavigate={navigate} />
          )}
        </>
      )}
      {currentScreen.type === 'listings-list' && (
        <>
          {viewMode === 'mobile' ? (
            <ListingsList onBack={goBack} onNavigate={navigate} />
          ) : (
            <ListingsListWeb onBack={goBack} onNavigate={navigate} />
          )}
        </>
      )}
      {currentScreen.type === 'search-detail' && (
        <SearchDetail id={currentScreen.id} onBack={goBack} />
      )}
      {currentScreen.type === 'offer-detail' && (
        <OfferDetail id={currentScreen.id} onBack={goBack} />
      )}
      {currentScreen.type === 'listing-detail' && (
        <ListingDetail id={currentScreen.id} onBack={goBack} />
      )}
    </div>
  );
}