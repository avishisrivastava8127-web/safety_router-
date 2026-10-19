import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldAlert, 
  PhoneCall, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Navigation, 
  Users, 
  Shield, 
  Siren 
} from 'lucide-react';

export default function SosModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('confirm'); // 'confirm' | 'alerted'
  const [countdown, setCountdown] = useState(3);
  const [isSirenPlaying, setIsSirenPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const intervalRef = useRef(null);

  // Web Audio API emergency siren synthesizer
  const startSiren = () => {
    try {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioContextRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(650, ctx.currentTime);

      // Pitch sweep simulation
      let isHigh = false;
      intervalRef.current = setInterval(() => {
        if (!ctx || ctx.state === 'closed') return;
        const now = ctx.currentTime;
        if (isHigh) {
          osc.frequency.setTargetAtTime(650, now, 0.15);
        } else {
          osc.frequency.setTargetAtTime(950, now, 0.15);
        }
        isHigh = !isHigh;
      }, 350);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      oscillatorRef.current = osc;
      setIsSirenPlaying(true);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  const stopSiren = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      } catch {
        // Ignore disconnect errors
      }
      oscillatorRef.current = null;
    }
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch {
        // Ignore close errors
      }
      audioContextRef.current = null;
    }
    setIsSirenPlaying(false);
  };

  const triggerEmergencyAlert = () => {
    setStep('alerted');
    startSiren();
  };

  const openSosModal = () => {
    setCountdown(3);
    setStep('confirm');
    setIsOpen(true);
  };

  const closeSosModal = () => {
    stopSiren();
    setIsOpen(false);
    setStep('confirm');
    setCountdown(3);
  };

  // Handle countdown in confirm step
  useEffect(() => {
    let timer;
    if (isOpen && step === 'confirm') {
      if (countdown > 0) {
        timer = setTimeout(() => {
          setCountdown((c) => {
            if (c <= 1) {
              triggerEmergencyAlert();
              return 0;
            }
            return c - 1;
          });
        }, 1000);
      }
    }
    return () => clearTimeout(timer);
  }, [isOpen, step, countdown]);

  // Clean up audio on unmount or close
  useEffect(() => {
    return () => {
      stopSiren();
    };
  }, []);

  const toggleSiren = () => {
    if (isSirenPlaying) {
      stopSiren();
    } else {
      startSiren();
    }
  };

  return (
    <>
      {/* 1. FLOATING RED SOS BUTTON */}
      <div className="fixed bottom-24 right-4 z-40">
        <button
          onClick={openSosModal}
          className="sos-pulse relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 active:scale-95 text-white shadow-2xl shadow-red-600/60 border-2 border-white transition-transform"
          title="Emergency SOS: Immediate Alert"
          aria-label="Emergency SOS"
        >
          {/* Pulsing beacon ripples */}
          <span className="absolute -inset-1 rounded-full bg-red-500 opacity-40 animate-ping"></span>
          <div className="relative flex flex-col items-center justify-center">
            <span className="text-sm font-black tracking-widest leading-none drop-shadow">SOS</span>
            <span className="text-[8px] font-bold uppercase tracking-wider opacity-90 mt-0.5">Alert</span>
          </div>
        </button>
      </div>

      {/* 2. MODAL DIALOG */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-red-500/50 bg-zinc-950 text-white">
            
            {/* STEP 1: CONFIRMATION SCREEN */}
            {step === 'confirm' && (
              <div className="p-6 flex flex-col items-center text-center space-y-5 animate-in zoom-in-95 duration-150">
                <div className="w-20 h-20 rounded-full bg-red-600/20 border-2 border-red-500 flex items-center justify-center text-red-500">
                  <ShieldAlert className="w-10 h-10 animate-bounce" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-black tracking-tight text-red-500">
                    Emergency SOS Confirmation
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                    Are you in danger? This will broadcast your live location to your trusted contacts and alert nearest police patrols.
                  </p>
                </div>

                {/* Countdown display */}
                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 w-full flex items-center justify-between">
                  <span className="text-xs text-zinc-400 font-semibold">
                    Auto-triggering in:
                  </span>
                  <div className="flex items-center gap-1.5 text-red-400 font-black text-2xl font-mono">
                    <span>{countdown}</span>
                    <span className="text-xs uppercase font-sans text-zinc-500">sec</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="w-full space-y-2.5">
                  <button
                    onClick={triggerEmergencyAlert}
                    className="w-full py-3.5 rounded-2xl bg-red-600 hover:bg-red-500 active:scale-[0.98] text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-red-600/40 transition-all"
                  >
                    Trigger Alert Now
                  </button>
                  <button
                    onClick={closeSosModal}
                    className="w-full py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold text-xs border border-zinc-700 transition-colors"
                  >
                    Cancel (False Alarm / I am Safe)
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: ALERT DISPATCHED / EMERGENCY ACTIVATED SCREEN */}
            {step === 'alerted' && (
              <div className="p-6 space-y-5 animate-in zoom-in-95 duration-200">
                {/* Emergency Flashing Header */}
                <div className="p-3.5 rounded-2xl bg-red-600 text-white flex items-center justify-between shadow-lg shadow-red-600/50 animate-pulse">
                  <div className="flex items-center gap-2.5">
                    <Siren className="w-6 h-6 animate-spin" />
                    <div>
                      <div className="text-xs font-black uppercase tracking-wider">
                        Distress Beacon Active
                      </div>
                      <div className="text-[11px] font-semibold opacity-90">
                        Alert Sent to Contacts + Police
                      </div>
                    </div>
                  </div>

                  {/* Siren Sound Toggle */}
                  <button
                    onClick={toggleSiren}
                    className="px-2.5 py-1.5 rounded-xl bg-black/30 hover:bg-black/50 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    {isSirenPlaying ? (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-yellow-300" />
                        <span>Siren ON</span>
                      </>
                    ) : (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Muted</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Dispatch Status Log */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Live Dispatch Telemetry
                  </h4>

                  {/* 1. Nearest Police Alert */}
                  <div className="p-3 rounded-2xl bg-zinc-900 border border-red-500/30 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div className="text-xs space-y-0.5 flex-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-zinc-100 font-bold">
                          Nearest Police Station Notified
                        </strong>
                        <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">
                          Acknowledged
                        </span>
                      </div>
                      <p className="text-zinc-400 text-[11px]">
                        SFPD Downtown Safety Substation dispatched Patrol Unit #18.
                      </p>
                      <div className="text-[10px] text-zinc-500 font-mono mt-1">
                        Est. Arrival: ~2 minutes • Market & 4th St
                      </div>
                    </div>
                  </div>

                  {/* 2. Contacts Alert */}
                  <div className="p-3 rounded-2xl bg-zinc-900 border border-red-500/30 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Users className="w-4 h-4" />
                    </div>
                    <div className="text-xs space-y-0.5 flex-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-zinc-100 font-bold">
                          Trusted Contacts Alerted (SMS)
                        </strong>
                        <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">
                          Delivered
                        </span>
                      </div>
                      <p className="text-zinc-400 text-[11px]">
                        Emergency SMS with live audio and pinpoint GPS link sent to:
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">Mom (Sarah)</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">Alex (Partner)</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">Marcus (Roommate)</span>
                      </div>
                    </div>
                  </div>

                  {/* 3. Realtime Coordinates */}
                  <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Navigation className="w-3.5 h-3.5 text-red-400" />
                      <span>GPS Coordinates:</span>
                    </div>
                    <span className="font-mono text-zinc-200 font-bold">
                      37.7885° N, 122.4025° W
                    </span>
                  </div>
                </div>

                {/* Primary Emergency Actions */}
                <div className="space-y-2 pt-2">
                  <a
                    href="tel:911"
                    className="w-full py-3.5 rounded-2xl bg-red-600 hover:bg-red-500 active:scale-[0.98] text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/40 transition-all uppercase tracking-wider"
                  >
                    <PhoneCall className="w-4 h-4 animate-bounce" />
                    <span>Call 911 / Emergency Services</span>
                  </a>

                  <button
                    onClick={closeSosModal}
                    className="w-full py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-emerald-400 hover:text-emerald-300 font-bold text-xs border border-zinc-700 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>I Am Safe Now (Deactivate Distress Beacon)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
