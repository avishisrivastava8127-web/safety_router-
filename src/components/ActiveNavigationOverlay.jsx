import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ShieldCheck, 
  X
} from 'lucide-react';

export default function ActiveNavigationOverlay({ onClose }) {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    {
      instruction: "Head east along Market Street towards 4th St",
      subtext: "Well-lit commercial sidewalk • High foot traffic zone",
      distance: "120 m",
      checkpoint: "Next Safe Haven: Walgreens 24/7 (150m ahead)"
    },
    {
      instruction: "Continue straight on Market past SFPD Substation",
      subtext: "Active police foot patrols & city CCTV coverage",
      distance: "400 m",
      checkpoint: "Next Safe Haven: SFPD Downtown Desk (Passing now)"
    },
    {
      instruction: "Cross 2nd Street at illuminated pedestrian crosswalk",
      subtext: "Twin LED streetlamps with audible countdown timer",
      distance: "250 m",
      checkpoint: "Next Safe Haven: 7-Eleven 24h Express (300m ahead)"
    },
    {
      instruction: "Arrive at Ferry Building Marketplace Promenade",
      subtext: "Wide waterfront plaza • Destination reached safely",
      distance: "80 m",
      checkpoint: "Safety Destination Reached • Alert contacts you arrived"
    }
  ];

  // Advance step every 6 seconds for live demo simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [steps.length]);

  const currentStep = steps[stepIndex];

  return (
    <div className="fixed inset-x-3 top-3 z-40 max-w-xl mx-auto flex flex-col gap-2 pointer-events-auto animate-in slide-in-from-top duration-300">
      {/* Top Turn-by-Turn Card (Google Maps Walking Style) */}
      <div className="rounded-2xl bg-emerald-700 text-white shadow-2xl p-4 flex items-center justify-between border border-emerald-600">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-800/80 border border-emerald-500/50 flex items-center justify-center shrink-0 shadow-inner">
            <ArrowUpRight className="w-7 h-7 text-white stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black uppercase tracking-wider text-emerald-200">
                {currentStep.distance}
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-800 text-emerald-200">
                Turn {stepIndex + 1}/{steps.length}
              </span>
            </div>
            <h3 className="font-bold text-sm leading-snug text-white mt-0.5">
              {currentStep.instruction}
            </h3>
            <p className="text-xs text-emerald-200/90 mt-0.5">
              {currentStep.subtext}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white flex items-center justify-center transition-colors shrink-0 ml-2"
          title="Exit Navigation Mode"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Safety Checkpoint Tracker Pill */}
      <div className="self-center px-4 py-1.5 rounded-full bg-zinc-900/90 text-emerald-400 border border-emerald-500/40 backdrop-blur-md shadow-lg flex items-center gap-2 text-xs font-semibold">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>{currentStep.checkpoint}</span>
      </div>
    </div>
  );
}
