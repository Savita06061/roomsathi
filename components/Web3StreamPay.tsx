import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap, Play, Pause, RefreshCw, ArrowUpRight, Cpu, DollarSign, Clock, Radio } from 'lucide-react';
import { RentStream, Language, User } from '../types';

interface Web3StreamPayProps {
  language: Language;
  user: User | null;
}

const INITIAL_STREAMS: RentStream[] = [
  {
    id: 'stream_1',
    listingTitle: 'Luxury 2BHK Flat - Civic Center',
    ratePerSecSUSD: 0.000038, // Approx 100 SUSD / month
    totalDepositedSUSD: 100,
    streamedSoFarSUSD: 34.82104,
    isActive: true,
    landlordAddress: '0x3f12a...9e44',
    startDate: '2026-07-01'
  }
];

const Web3StreamPay: React.FC<Web3StreamPayProps> = ({ language, user }) => {
  const [streams, setStreams] = useState<RentStream[]>(INITIAL_STREAMS);

  // Real-time ticking stream simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setStreams(prevStreams =>
        prevStreams.map(stream => {
          if (stream.isActive) {
            return {
              ...stream,
              streamedSoFarSUSD: stream.streamedSoFarSUSD + stream.ratePerSecSUSD * 2
            };
          }
          return stream;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleStreamActive = (id: string) => {
    setStreams(prev =>
      prev.map(s => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden my-8">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-tr from-emerald-600 to-teal-500 p-3.5 rounded-2xl text-white shadow-lg shadow-emerald-600/30">
            <Zap size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black tracking-tight">Real-Time Crypto Rent Streaming</h2>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-emerald-500/30 tracking-widest flex items-center gap-1">
                <Radio size={12} className="animate-pulse" /> Sablier Move Protocol
              </span>
            </div>
            <p className="text-slate-400 text-xs mt-1">
              Pay rent per second in ShelbyUSD or APT. Pause, resume, or top up anytime on-chain.
            </p>
          </div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 px-4 py-2.5 rounded-2xl flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            0.000038 SUSD / sec
          </span>
        </div>
      </div>

      {/* Streams List */}
      <div className="space-y-4 my-6">
        {streams.map((stream) => {
          const progressPct = Math.min(
            100,
            (stream.streamedSoFarSUSD / stream.totalDepositedSUSD) * 100
          );

          return (
            <div
              key={stream.id}
              className="bg-slate-950/90 border border-slate-800 rounded-3xl p-6 relative overflow-hidden space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-white">{stream.listingTitle}</h3>
                    <span
                      className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${
                        stream.isActive
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {stream.isActive ? 'Active Stream ⚡' : 'Paused ⏸️'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Landlord: <code className="text-orange-400">{stream.landlordAddress}</code> • Started: {stream.startDate}
                  </p>
                </div>

                <button
                  onClick={() => toggleStreamActive(stream.id)}
                  className={`px-4 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                    stream.isActive
                      ? 'bg-amber-600/20 hover:bg-amber-600 text-amber-400 hover:text-white border border-amber-500/30'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {stream.isActive ? (
                    <>
                      <Pause size={14} /> Pause Stream
                    </>
                  ) : (
                    <>
                      <Play size={14} /> Resume Stream
                    </>
                  )}
                </button>
              </div>

              {/* Ticking Balance Display */}
              <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-baseline sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Streamed to Landlord:
                </span>
                <span className="text-2xl font-black font-mono text-emerald-400 tracking-wider">
                  ${stream.streamedSoFarSUSD.toFixed(6)} ShelbyUSD
                </span>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-xs text-slate-400 font-mono mb-1.5">
                  <span>Progress: {progressPct.toFixed(1)}%</span>
                  <span>Cap: ${stream.totalDepositedSUSD} SUSD</span>
                </div>
                <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPct}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Web3StreamPay;
