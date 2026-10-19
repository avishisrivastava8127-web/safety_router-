import React, { useState, useEffect } from 'react';
import HeaderNav from './components/HeaderNav';
import MapView from './components/MapView';
import RouteBottomCard from './components/RouteBottomCard';
import ShareTripModal from './components/ShareTripModal';
import SosModal from './components/SosModal';
import ActiveNavigationOverlay from './components/ActiveNavigationOverlay';
import { 
  PRESET_LOCATIONS, 
  SAFETY_POIS, 
  getRoutesForEndpoints 
} from './data';

export default function App() {
  // Preset selections
  const [startId, setStartId] = useState('powell');
  const [destId, setDestId] = useState('ferry');

  // Active highlighted route ('safest' | 'fastest')
  const [activeRouteId, setActiveRouteId] = useState('safest');

  // Time of Day (Day / Night)
  const [isNightMode, setIsNightMode] = useState(false);

  // POI filter for safety markers
  const [selectedPoiFilter, setSelectedPoiFilter] = useState('all');

  // UI state
  const [isBottomCardOpen, setIsBottomCardOpen] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // Sync Tailwind dark mode class to <html> element
  useEffect(() => {
    if (isNightMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isNightMode]);

  // Retrieve current locations and routes
  const startLocation = PRESET_LOCATIONS.find(loc => loc.id === startId) || PRESET_LOCATIONS[0];
  const destLocation = PRESET_LOCATIONS.find(loc => loc.id === destId) || PRESET_LOCATIONS[1];
  const currentRoutes = getRoutesForEndpoints(startId, destId);

  // Handlers
  const handleSelectStart = (id) => {
    if (id === destId) {
      // Auto swap if choosing same
      setDestId(startId);
    }
    setStartId(id);
    setIsBottomCardOpen(true);
  };

  const handleSelectDest = (id) => {
    if (id === startId) {
      setStartId(destId);
    }
    setDestId(id);
    setIsBottomCardOpen(true);
  };

  const handleSwapEndpoints = () => {
    const prevStart = startId;
    setStartId(destId);
    setDestId(prevStart);
    setIsBottomCardOpen(true);
  };

  const handleSelectRoute = (routeId) => {
    setActiveRouteId(routeId);
    setIsBottomCardOpen(true);
  };

  const toggleNightMode = () => {
    setIsNightMode(prev => !prev);
  };

  return (
    <div className={`relative w-screen h-screen overflow-hidden flex flex-col ${
      isNightMode ? 'dark bg-zinc-950 text-zinc-100' : 'bg-slate-50 text-zinc-900'
    }`}>
      {/* 1. TOP HEADER & DIRECTIONS (Hidden when full navigation HUD is active) */}
      {!isNavigating ? (
        <HeaderNav
          startId={startId}
          destId={destId}
          onSelectStart={handleSelectStart}
          onSelectDest={handleSelectDest}
          onSwapEndpoints={handleSwapEndpoints}
          isNightMode={isNightMode}
          onToggleNightMode={toggleNightMode}
          selectedPoiFilter={selectedPoiFilter}
          onChangePoiFilter={setSelectedPoiFilter}
        />
      ) : (
        <ActiveNavigationOverlay
          route={currentRoutes[activeRouteId]}
          isNightMode={isNightMode}
          onClose={() => setIsNavigating(false)}
        />
      )}

      {/* 2. FULLSCREEN LEAFLET MAP */}
      <main className="relative flex-1 w-full h-full">
        <MapView
          routes={currentRoutes}
          activeRouteId={activeRouteId}
          onSelectRoute={handleSelectRoute}
          startLocation={startLocation}
          destLocation={destLocation}
          safetyPois={SAFETY_POIS}
          selectedPoiFilter={selectedPoiFilter}
          isNightMode={isNightMode}
          onOpenCard={() => setIsBottomCardOpen(true)}
        />
      </main>

      {/* 3. SLIDING BOTTOM ROUTE CARD (Safety Score & Breakdown) */}
      {!isNavigating && (
        <RouteBottomCard
          routes={currentRoutes}
          activeRouteId={activeRouteId}
          onSelectRoute={handleSelectRoute}
          isNightMode={isNightMode}
          onOpenShareModal={() => setIsShareModalOpen(true)}
          onStartNavigation={() => setIsNavigating(true)}
          isOpen={isBottomCardOpen}
          onToggleOpen={() => setIsBottomCardOpen(prev => !prev)}
        />
      )}

      {/* 4. FLOATING RED SOS BUTTON & ALERT SCREEN */}
      <SosModal isNightMode={isNightMode} />

      {/* 5. SHARE TRIP MODAL */}
      <ShareTripModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        routeInfo={currentRoutes[activeRouteId]}
        isNightMode={isNightMode}
      />
    </div>
  );
}
