import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import { 
  createStartIcon, 
  createDestIcon, 
  createPoiIcon 
} from '../utils/leafletIcons';
import { 
  Phone, 
  ShieldCheck, 
  Clock, 
  Navigation
} from 'lucide-react';

// Sub-component to automatically adjust camera bounds to current route
function MapBoundsController({ bounds }) {
  const map = useMap();

  useEffect(() => {
    if (bounds && bounds.length >= 2) {
      try {
        map.fitBounds(bounds, {
          paddingTopLeft: [40, 190], // leave room for top navigation card
          paddingBottomRight: [40, 240], // leave room for bottom card
          maxZoom: 16,
          animate: true,
          duration: 0.8
        });
      } catch (e) {
        console.error('Error fitting bounds:', e);
      }
    }
  }, [map, bounds]);

  return null;
}

export default function MapView({
  routes,
  activeRouteId,
  onSelectRoute,
  startLocation,
  destLocation,
  safetyPois,
  selectedPoiFilter,
  isNightMode,
  onOpenCard
}) {
  // Combine all coordinates to calculate map bounds
  const bounds = useMemo(() => {
    const coords = [];
    if (startLocation?.coords) coords.push(startLocation.coords);
    if (destLocation?.coords) coords.push(destLocation.coords);
    if (routes?.safest?.path) coords.push(...routes.safest.path);
    if (routes?.fastest?.path) coords.push(...routes.fastest.path);
    return coords.length > 0 ? coords : [[37.7844, -122.4079], [37.7955, -122.3937]];
  }, [startLocation, destLocation, routes]);

  // Center coordinate fallback
  const center = useMemo(() => {
    return [
      (bounds[0][0] + bounds[bounds.length - 1][0]) / 2,
      (bounds[0][1] + bounds[bounds.length - 1][1]) / 2
    ];
  }, [bounds]);

  // Filter POIs
  const filteredPois = useMemo(() => {
    if (!safetyPois) return [];
    if (selectedPoiFilter === 'all') return safetyPois;
    return safetyPois.filter(poi => poi.type === selectedPoiFilter);
  }, [safetyPois, selectedPoiFilter]);

  const safestRoute = routes?.safest;
  const fastestRoute = routes?.fastest;

  const isSafestActive = activeRouteId === 'safest';
  const isFastestActive = activeRouteId === 'fastest';

  // Tile layer configuration
  const tileUrl = isNightMode
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  const tileAttribution = isNightMode
    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={center}
        zoom={15}
        zoomControl={false}
        className="w-full h-full"
      >
        {/* Dynamic Tile Layer based on Day/Night */}
        <TileLayer
          key={isNightMode ? 'dark-tiles' : 'light-tiles'}
          attribution={tileAttribution}
          url={tileUrl}
          maxZoom={19}
        />

        <MapBoundsController bounds={bounds} />

        {/* 1. FASTEST ROUTE (RED) */}
        {fastestRoute && (
          <>
            {/* Glowing highlight under active route */}
            {isFastestActive && (
              <Polyline
                positions={fastestRoute.path}
                pathOptions={{
                  color: '#ef4444',
                  weight: 14,
                  opacity: 0.35,
                  lineCap: 'round',
                  lineJoin: 'round'
                }}
              />
            )}
            <Polyline
              positions={fastestRoute.path}
              pathOptions={{
                color: isFastestActive ? '#ef4444' : '#f87171',
                weight: isFastestActive ? 7 : 4.5,
                opacity: isFastestActive ? 0.95 : 0.5,
                dashArray: isFastestActive ? undefined : '6, 8',
                lineCap: 'round',
                lineJoin: 'round'
              }}
              eventHandlers={{
                click: () => {
                  onSelectRoute('fastest');
                  onOpenCard?.();
                }
              }}
            />
          </>
        )}

        {/* 2. SAFEST ROUTE (GREEN) */}
        {safestRoute && (
          <>
            {/* Glowing highlight under active route */}
            {isSafestActive && (
              <Polyline
                positions={safestRoute.path}
                pathOptions={{
                  color: '#22c55e',
                  weight: 16,
                  opacity: 0.35,
                  lineCap: 'round',
                  lineJoin: 'round'
                }}
              />
            )}
            <Polyline
              positions={safestRoute.path}
              pathOptions={{
                color: isSafestActive ? '#16a34a' : '#4ade80',
                weight: isSafestActive ? 8 : 5,
                opacity: isSafestActive ? 1.0 : 0.55,
                lineCap: 'round',
                lineJoin: 'round'
              }}
              eventHandlers={{
                click: () => {
                  onSelectRoute('safest');
                  onOpenCard?.();
                }
              }}
            />
          </>
        )}

        {/* 3. START LOCATION MARKER */}
        {startLocation?.coords && (
          <Marker
            position={startLocation.coords}
            icon={createStartIcon('A')}
            zIndexOffset={100}
          >
            <Popup className="custom-marker-popup">
              <div className="p-3 max-w-[220px]">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  Start Location
                </div>
                <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 leading-snug">
                  {startLocation.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {startLocation.address}
                </p>
                <div className="mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-300">
                  {startLocation.description}
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* 4. DESTINATION LOCATION MARKER */}
        {destLocation?.coords && (
          <Marker
            position={destLocation.coords}
            icon={createDestIcon('B')}
            zIndexOffset={100}
          >
            <Popup className="custom-marker-popup">
              <div className="p-3 max-w-[220px]">
                <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-bold text-xs uppercase tracking-wider mb-1">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  Destination
                </div>
                <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 leading-snug">
                  {destLocation.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {destLocation.address}
                </p>
                <div className="mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-300">
                  {destLocation.description}
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* 5. SAFETY POI MARKERS (Police, Hospitals, 24/7 Shops) along the safest route */}
        {filteredPois.map((poi) => (
          <Marker
            key={poi.id}
            position={poi.coords}
            icon={createPoiIcon(poi.type)}
            zIndexOffset={50}
          >
            <Popup className="custom-marker-popup">
              <div className="p-3.5 max-w-[260px] text-zinc-900 dark:text-zinc-100">
                {/* Type Header */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    poi.type === 'police'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                      : poi.type === 'hospital'
                      ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {poi.categoryLabel}
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                </div>

                <h3 className="font-bold text-sm leading-snug">
                  {poi.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {poi.address}
                </p>

                {/* Status & Response */}
                <div className="mt-2.5 bg-zinc-50 dark:bg-zinc-800/80 p-2 rounded-lg text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 font-medium">
                    <Clock className="w-3 h-3 text-emerald-500 shrink-0" />
                    <span className="truncate">{poi.openStatus}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 text-[11px]">
                    <Navigation className="w-3 h-3 text-blue-500 shrink-0" />
                    <span>{poi.responseEstimate}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {poi.features?.map((feat, idx) => (
                    <span key={idx} className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-600 dark:text-zinc-300">
                      • {feat}
                    </span>
                  ))}
                </div>

                {/* Phone button */}
                {poi.phone && (
                  <div className="mt-3 pt-2 border-t border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                      {poi.phone}
                    </span>
                    <a
                      href={`tel:${poi.phone}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      Call
                    </a>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
