import React from 'react';
import { 
  Shield, 
  Sun, 
  Moon, 
  ArrowRightLeft, 
  Building2,
  Cross,
  Store,
  Compass
} from 'lucide-react';
import { PRESET_LOCATIONS, PRESET_PAIRS } from '../data';

export default function HeaderNav({
  startId,
  destId,
  onSelectStart,
  onSelectDest,
  onSwapEndpoints,
  isNightMode,
  onToggleNightMode,
  selectedPoiFilter,
  onChangePoiFilter
}) {
  return (
    <header className="absolute top-3 left-3 right-3 z-30 max-w-xl mx-auto flex flex-col gap-2.5 pointer-events-auto">
      {/* Top Glass Card: Brand & Time of Day */}
      <div className={`rounded-2xl shadow-xl backdrop-blur-md border transition-all duration-300 p-3.5 ${
        isNightMode 
          ? 'bg-zinc-900/90 border-zinc-700/80 text-white shadow-black/40' 
          : 'bg-white/95 border-emerald-100 text-zinc-900 shadow-emerald-950/10'
      }`}>
        {/* Brand Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200/60 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/30">
              <Shield className="w-5 h-5 fill-white/20" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight leading-none">Safe Route</h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Live Guard
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Walking Navigation • Safety-First Mode
              </p>
            </div>
          </div>

          {/* Time of Day Toggle */}
          <button
            onClick={onToggleNightMode}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
              isNightMode
                ? 'bg-indigo-950/70 text-indigo-200 border-indigo-700/60 hover:bg-indigo-900/80 shadow-inner'
                : 'bg-amber-50 text-amber-900 border-amber-200/80 hover:bg-amber-100/90 shadow-sm'
            }`}
            title="Toggle between Daytime and Nighttime conditions"
          >
            {isNightMode ? (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400/40" />
                <span>Night Mode</span>
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-400/40" />
                <span>Day Mode</span>
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              </>
            )}
          </button>
        </div>

        {/* Start / Destination Inputs */}
        <div className="mt-3 grid grid-cols-[1fr,auto] gap-2 items-center">
          <div className="space-y-2">
            {/* Start Location Input */}
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60">
              <span className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 shrink-0"></span>
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 leading-none mb-0.5">
                  Start Point
                </label>
                <select
                  value={startId}
                  onChange={(e) => onSelectStart(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-zinc-800 dark:text-zinc-100 focus:outline-none cursor-pointer truncate"
                >
                  {PRESET_LOCATIONS.map((loc) => (
                    <option 
                      key={loc.id} 
                      value={loc.id}
                      disabled={loc.id === destId}
                      className="dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100"
                    >
                      {loc.name} ({loc.category})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Destination Location Input */}
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60">
              <span className="w-3 h-3 rounded-full bg-red-500 ring-4 ring-red-500/20 shrink-0"></span>
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 leading-none mb-0.5">
                  Destination
                </label>
                <select
                  value={destId}
                  onChange={(e) => onSelectDest(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-zinc-800 dark:text-zinc-100 focus:outline-none cursor-pointer truncate"
                >
                  {PRESET_LOCATIONS.map((loc) => (
                    <option 
                      key={loc.id} 
                      value={loc.id}
                      disabled={loc.id === startId}
                      className="dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100"
                    >
                      {loc.name} ({loc.category})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <button
            onClick={onSwapEndpoints}
            title="Swap start and destination"
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-zinc-200/80 hover:bg-emerald-500 hover:text-white dark:bg-zinc-800 dark:hover:bg-emerald-600 transition-colors text-zinc-600 dark:text-zinc-300 shadow-sm"
          >
            <ArrowRightLeft className="w-4 h-4 rotate-90 sm:rotate-0" />
          </button>
        </div>

        {/* Quick Presets Pills */}
        <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          <span className="text-[10px] uppercase font-bold text-zinc-400 shrink-0 mr-1">
            Presets:
          </span>
          {PRESET_PAIRS.map((pair) => {
            const isActive = pair.startId === startId && pair.destId === destId;
            return (
              <button
                key={pair.id}
                onClick={() => {
                  onSelectStart(pair.startId);
                  onSelectDest(pair.destId);
                }}
                className={`text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-zinc-100 dark:bg-zinc-800/90 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200/80 dark:hover:bg-zinc-700/80'
                }`}
              >
                {pair.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* POI Filter Bar (Police, Hospitals, 24/7 Shops) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar px-1">
        <button
          onClick={() => onChangePoiFilter('all')}
          className={`flex items-center gap-1 text-[11px] px-3 py-1.5 rounded-full font-semibold shadow-md backdrop-blur-md transition-all border ${
            selectedPoiFilter === 'all'
              ? 'bg-zinc-900 text-white border-zinc-700 dark:bg-white dark:text-zinc-900'
              : 'bg-white/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 border-zinc-200/70 dark:border-zinc-700/70 hover:bg-zinc-100'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>All Safe Spots</span>
        </button>

        <button
          onClick={() => onChangePoiFilter('police')}
          className={`flex items-center gap-1 text-[11px] px-3 py-1.5 rounded-full font-semibold shadow-md backdrop-blur-md transition-all border ${
            selectedPoiFilter === 'police'
              ? 'bg-blue-600 text-white border-blue-500 shadow-blue-500/30'
              : 'bg-white/90 dark:bg-zinc-900/90 text-blue-700 dark:text-blue-300 border-blue-200/60 dark:border-blue-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40'
          }`}
        >
          <Building2 className="w-3.5 h-3.5 text-blue-500" />
          <span>Police (2)</span>
        </button>

        <button
          onClick={() => onChangePoiFilter('hospital')}
          className={`flex items-center gap-1 text-[11px] px-3 py-1.5 rounded-full font-semibold shadow-md backdrop-blur-md transition-all border ${
            selectedPoiFilter === 'hospital'
              ? 'bg-red-600 text-white border-red-500 shadow-red-500/30'
              : 'bg-white/90 dark:bg-zinc-900/90 text-red-700 dark:text-red-300 border-red-200/60 dark:border-red-800/60 hover:bg-red-50 dark:hover:bg-red-950/40'
          }`}
        >
          <Cross className="w-3.5 h-3.5 text-red-500" />
          <span>Urgent Care (2)</span>
        </button>

        <button
          onClick={() => onChangePoiFilter('shop24')}
          className={`flex items-center gap-1 text-[11px] px-3 py-1.5 rounded-full font-semibold shadow-md backdrop-blur-md transition-all border ${
            selectedPoiFilter === 'shop24'
              ? 'bg-amber-600 text-white border-amber-500 shadow-amber-500/30'
              : 'bg-white/90 dark:bg-zinc-900/90 text-amber-700 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/60 hover:bg-amber-50 dark:hover:bg-amber-950/40'
          }`}
        >
          <Store className="w-3.5 h-3.5 text-amber-500" />
          <span>24/7 Havens (3)</span>
        </button>
      </div>
    </header>
  );
}
