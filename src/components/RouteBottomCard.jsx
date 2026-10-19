import React from 'react';
import { 
  Shield, 
  Zap, 
  Lightbulb, 
  Users, 
  Store, 
  AlertTriangle, 
  ChevronUp, 
  Share2, 
  Navigation, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function RouteBottomCard({
  routes,
  activeRouteId,
  onSelectRoute,
  isNightMode,
  onOpenShareModal,
  onStartNavigation,
  isOpen,
  onToggleOpen
}) {

  const safestRoute = routes?.safest;
  const fastestRoute = routes?.fastest;
  const currentRoute = activeRouteId === 'safest' ? safestRoute : fastestRoute;

  if (!currentRoute) return null;

  // Active metrics based on Day/Night
  const metrics = isNightMode ? currentRoute.nightMetrics : currentRoute.dayMetrics;
  const score = metrics.safetyScore;

  // Color calculation based on score
  const getScoreColor = (sc) => {
    if (sc >= 80) return { text: 'text-emerald-500', bg: 'bg-emerald-500', border: 'border-emerald-500', light: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300' };
    if (sc >= 60) return { text: 'text-amber-500', bg: 'bg-amber-500', border: 'border-amber-500', light: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300' };
    return { text: 'text-red-500', bg: 'bg-red-500', border: 'border-red-500', light: 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300' };
  };

  const scoreTheme = getScoreColor(score);

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-30 transition-all duration-300 ease-in-out pointer-events-none flex justify-center`}
    >
      <div 
        className={`w-full max-w-xl mx-auto rounded-t-3xl shadow-2xl backdrop-blur-xl border-t border-x transition-all duration-300 pointer-events-auto flex flex-col ${
          isNightMode 
            ? 'bg-zinc-900/95 border-zinc-700 text-zinc-100 shadow-black/80' 
            : 'bg-white/95 border-zinc-200 text-zinc-900 shadow-zinc-900/20'
        } ${isOpen ? 'max-h-[82vh]' : 'max-h-[160px]'}`}
      >
        {/* Pull Handle & Route Comparison Tabs Header */}
        <div 
          onClick={onToggleOpen}
          className="pt-2.5 pb-2 px-4 cursor-pointer select-none flex flex-col items-center hover:bg-black/5 dark:hover:bg-white/5 rounded-t-3xl transition-colors"
        >
          {/* Mobile Handle */}
          <div className="w-12 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600 mb-2"></div>

          {/* Quick Route Switcher Bar */}
          <div 
            className="w-full grid grid-cols-2 gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* SAFEST ROUTE TAB */}
            {safestRoute && (
              <button
                onClick={() => onSelectRoute('safest')}
                className={`relative flex items-center justify-between p-2.5 rounded-2xl border transition-all text-left ${
                  activeRouteId === 'safest'
                    ? 'bg-emerald-500/10 border-emerald-500 ring-2 ring-emerald-500/30 dark:bg-emerald-950/50'
                    : 'bg-zinc-100/70 dark:bg-zinc-800/60 border-transparent hover:bg-zinc-200/60 dark:hover:bg-zinc-700/60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    activeRouteId === 'safest' 
                      ? 'bg-emerald-600 text-white shadow-sm' 
                      : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'
                  }`}>
                    <Shield className="w-4 h-4 fill-white/20" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold truncate">Safest</span>
                      <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                        {safestRoute.duration}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Score: <strong className="text-emerald-600 dark:text-emerald-400">
                        {isNightMode ? safestRoute.nightMetrics.safetyScore : safestRoute.dayMetrics.safetyScore}
                      </strong>/100
                    </div>
                  </div>
                </div>

                <div className="text-right pl-1">
                  <span className="inline-block text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-500 text-white shadow-xs">
                    {isNightMode ? 'Best Pick' : 'Top Safe'}
                  </span>
                </div>
              </button>
            )}

            {/* FASTEST ROUTE TAB */}
            {fastestRoute && (
              <button
                onClick={() => onSelectRoute('fastest')}
                className={`relative flex items-center justify-between p-2.5 rounded-2xl border transition-all text-left ${
                  activeRouteId === 'fastest'
                    ? 'bg-red-500/10 border-red-500 ring-2 ring-red-500/30 dark:bg-red-950/50'
                    : 'bg-zinc-100/70 dark:bg-zinc-800/60 border-transparent hover:bg-zinc-200/60 dark:hover:bg-zinc-700/60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    activeRouteId === 'fastest' 
                      ? 'bg-red-600 text-white shadow-sm' 
                      : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'
                  }`}>
                    <Zap className="w-4 h-4 fill-white/20" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold truncate">Fastest</span>
                      <span className="text-[10px] font-semibold text-red-600 dark:text-red-400">
                        {fastestRoute.duration}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Score: <strong className={isNightMode ? 'text-red-500' : 'text-amber-500'}>
                        {isNightMode ? fastestRoute.nightMetrics.safetyScore : fastestRoute.dayMetrics.safetyScore}
                      </strong>/100
                    </div>
                  </div>
                </div>

                <div className="text-right pl-1">
                  <span className={`inline-block text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded-full ${
                    isNightMode
                      ? 'bg-red-600 text-white animate-pulse'
                      : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                  }`}>
                    {isNightMode ? 'Risk' : '-4 min'}
                  </span>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Collapsed State Quick Preview Bar */}
        {!isOpen && (
          <div className="px-4 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <span className={`font-bold ${scoreTheme.text}`}>
                {metrics.ratingTier}
              </span>
              <span className="text-zinc-400">•</span>
              <span className="text-zinc-500 dark:text-zinc-400">
                {currentRoute.distance} ({currentRoute.duration})
              </span>
            </div>
            <button
              onClick={onToggleOpen}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1"
            >
              <span>View Safety Breakdown</span>
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Expanded Content Scroll Area */}
        {isOpen && (
          <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
            {/* Night Warning Banner */}
            {isNightMode && (
              <div className={`p-3 rounded-2xl border flex items-start gap-3 ${
                activeRouteId === 'safest'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
                  : 'bg-red-500/10 border-red-500/40 text-red-900 dark:text-red-200'
              }`}>
                {activeRouteId === 'safest' ? (
                  <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                )}
                <div className="text-xs leading-relaxed">
                  <strong className="font-bold block mb-0.5">
                    {activeRouteId === 'safest'
                      ? '🌙 Night Mode: Safest Route Strongly Recommended'
                      : '⚠️ Night Warning: High Risk on Shortcut Alleys'}
                  </strong>
                  {activeRouteId === 'safest'
                    ? 'Maintains 88/100 score with 24/7 store illumination, emergency kiosks, and active foot patrols. +54 points safer than the shortcut.'
                    : 'Safety score drops to 34/100 at night due to 4 dark alley segments with broken streetlights and recent incident reports.'}
                </div>
              </div>
            )}

            {/* Main Safety Score Card */}
            <div className="p-4 rounded-2xl bg-zinc-100/70 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-zinc-400">
                    Safety Score
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${scoreTheme.light}`}>
                    {metrics.ratingTier}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                  {currentRoute.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs">
                  {metrics.summary}
                </p>
              </div>

              {/* Circular Score Gauge */}
              <div className="relative flex flex-col items-center justify-center shrink-0">
                <div className="relative w-18 h-18 w-[72px] h-[72px] flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    {/* Background track */}
                    <path
                      className="text-zinc-200 dark:text-zinc-700"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    {/* Score stroke */}
                    <path
                      className={score >= 80 ? 'text-emerald-500' : score >= 60 ? 'text-amber-500' : 'text-red-500'}
                      strokeDasharray={`${score}, 100`}
                      strokeLinecap="round"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-black tracking-tight leading-none">
                      {score}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-zinc-400 mt-0.5">
                      / 100
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* REQUIREMENT 3: Detailed 4-Metric Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-1">
                Safety Factor Breakdown
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* 1. LIGHTING */}
                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                        <Lightbulb className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold">Street Lighting</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">
                      {metrics.lighting.score}%
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${metrics.lighting.score > 75 ? 'bg-emerald-500' : metrics.lighting.score > 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${metrics.lighting.score}%` }}
                    />
                  </div>
                  <div className="text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
                    {metrics.lighting.label}
                  </div>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-normal">
                    {metrics.lighting.detail}
                  </p>
                </div>

                {/* 2. CROWD LEVEL */}
                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                        <Users className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold">Crowd Level</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">
                      {metrics.crowdLevel.score}%
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${metrics.crowdLevel.score > 70 ? 'bg-emerald-500' : metrics.crowdLevel.score > 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${metrics.crowdLevel.score}%` }}
                    />
                  </div>
                  <div className="text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
                    {metrics.crowdLevel.label}
                  </div>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-normal">
                    {metrics.crowdLevel.detail}
                  </p>
                </div>

                {/* 3. OPEN SHOPS NEARBY */}
                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                        <Store className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold">Open Businesses</span>
                    </div>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      {metrics.openShops.count} spots
                    </span>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${metrics.openShops.score > 70 ? 'bg-emerald-500' : metrics.openShops.score > 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${metrics.openShops.score}%` }}
                    />
                  </div>
                  <div className="text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
                    {metrics.openShops.label}
                  </div>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-normal">
                    {metrics.openShops.detail}
                  </p>
                </div>

                {/* 4. INCIDENT REPORTS */}
                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                        metrics.incidentReports.count === 0 
                          ? 'bg-emerald-500/10 text-emerald-500' 
                          : 'bg-red-500/10 text-red-500'
                      }`}>
                        <AlertTriangle className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold">Incident Reports</span>
                    </div>
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                      metrics.incidentReports.count === 0 
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' 
                        : 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300'
                    }`}>
                      {metrics.incidentReports.count} logged
                    </span>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${metrics.incidentReports.count === 0 ? 'bg-emerald-500' : metrics.incidentReports.count < 4 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${metrics.incidentReports.score}%` }}
                    />
                  </div>
                  <div className="text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
                    {metrics.incidentReports.label}
                  </div>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-normal">
                    {metrics.incidentReports.detail}
                  </p>
                </div>
              </div>
            </div>

            {/* Route Safety Badges / Highlights */}
            <div className="p-3 rounded-xl bg-zinc-100/60 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/60">
              <div className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                Key Corridor Features:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {metrics.safetyFeatures?.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-[11px] text-zinc-600 dark:text-zinc-400">
                    {item.startsWith('⚠️') ? (
                      <span className="text-red-500">{item}</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons: Start Navigation & Share Trip */}
            <div className="pt-1 grid grid-cols-[1fr,auto] gap-2.5">
              <button
                onClick={onStartNavigation}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all"
              >
                <Navigation className="w-4 h-4 fill-white/20" />
                <span>Start Walking Navigation</span>
              </button>

              <button
                onClick={onOpenShareModal}
                className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-2xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 active:scale-[0.98] text-zinc-800 dark:text-zinc-200 font-bold text-sm border border-zinc-200 dark:border-zinc-700 transition-all"
                title="Share live trip with trusted contacts"
              >
                <Share2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="hidden sm:inline">Share Trip</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
