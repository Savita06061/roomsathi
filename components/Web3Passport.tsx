import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, Sparkles, CheckCircle2, QrCode, ExternalLink, Cpu, Copy, FileCode, Check } from 'lucide-react';
import { Web3Badge, Language, User } from '../types';

interface Web3PassportProps {
  language: Language;
  user: User | null;
}

const INITIAL_BADGES: Web3Badge[] = [
  {
    id: 'badge_1',
    title: 'Verified Tenant Move SBT',
    tokenStandard: 'Move SBT',
    issuedDate: '2026-01-10',
    icon: '🛡️',
    scorePoints: 150,
    description: 'On-chain identity verified by Shelby Decentralized KYC Oracle.'
  },
  {
    id: 'badge_2',
    title: '12-Month On-Time Rent Streak',
    tokenStandard: 'Aptos NFT',
    issuedDate: '2026-04-12',
    icon: '🔥',
    scorePoints: 300,
    description: '12 consecutive monthly rent payments executed via Move smart contracts.'
  },
  {
    id: 'badge_3',
    title: 'Zero-Dispute Escrow Champion',
    tokenStandard: 'Shelby Pass',
    issuedDate: '2026-06-01',
    icon: '💎',
    scorePoints: 200,
    description: 'Successfully released 3 security deposits with 100% landlord satisfaction.'
  }
];

const Web3Passport: React.FC<Web3PassportProps> = ({ language, user }) => {
  const [badges, setBadges] = useState<Web3Badge[]>(INITIAL_BADGES);
  const [isMinting, setIsMinting] = useState(false);
  const [mintedTx, setMintedTx] = useState<string | null>(null);

  const totalScore = badges.reduce((acc, b) => acc + b.scorePoints, 200);

  const handleMintReceiptNFT = () => {
    setIsMinting(true);
    setTimeout(() => {
      const newBadge: Web3Badge = {
        id: 'badge_' + Date.now(),
        title: 'Proof-of-Rent Receipt NFT #' + Math.floor(1000 + Math.random() * 9000),
        tokenStandard: 'Aptos NFT',
        issuedDate: new Date().toISOString().split('T')[0],
        icon: '📜',
        scorePoints: 50,
        description: 'Verifiable on-chain receipt for current month rental payment.'
      };

      setBadges([newBadge, ...badges]);
      setIsMinting(false);
      setMintedTx('0x' + Array.from({length: 20}, () => Math.floor(Math.random()*16).toString(16)).join(''));
    }, 1500);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden my-8">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 p-3.5 rounded-2xl text-white shadow-lg shadow-indigo-600/30">
            <Award size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black tracking-tight">On-Chain Tenant SBT Passport</h2>
              <span className="bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-indigo-500/30 tracking-widest">
                Soulbound Token
              </span>
            </div>
            <p className="text-slate-400 text-xs mt-1">
              Verifiable Decentralized Rental Credit Profile & Move NFT Payment Badges
            </p>
          </div>
        </div>

        <button
          onClick={handleMintReceiptNFT}
          disabled={isMinting}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <Sparkles size={16} /> {isMinting ? 'Minting NFT Receipt...' : 'Mint Rent Receipt NFT'}
        </button>
      </div>

      {/* Credit Score & Web3 ID Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
        {/* Credit Score Card */}
        <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Web3 Credit Score
            </span>
            <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
              Grade A+
            </span>
          </div>

          <div className="my-4">
            <div className="text-4xl font-black text-white flex items-baseline gap-1">
              {totalScore} <span className="text-sm font-normal text-slate-500">/ 900</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 h-full rounded-full transition-all duration-1000"
                style={{ width: `${(totalScore / 900) * 100}%` }}
              ></div>
            </div>
          </div>

          <p className="text-xs text-slate-400">
            Top 2% trusted Web3 tenant across Aptos & Shelby Decentralized Network.
          </p>
        </div>

        {/* Soulbound ID Badge */}
        <div className="bg-gradient-to-br from-slate-950 to-indigo-950/40 border border-slate-800 p-6 rounded-3xl lg:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <QrCode size={18} className="text-indigo-400" />
              <span className="text-xs font-mono text-indigo-300">
                SBT ID: {user?.walletAddress ? user.walletAddress.slice(0, 10) + '...' + user.walletAddress.slice(-6) : '0x7a89b...3c21'}
              </span>
            </div>
            <h3 className="text-xl font-black text-white">
              {user?.name || 'Aptos Web3 Member'}
            </h3>
            <p className="text-xs text-slate-400">
              Verified Web3 Resident • Zero-Knowledge On-Chain Reputation Proof
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-3 py-1 rounded-xl border border-slate-700">
                3 Verified Badges
              </span>
              <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-3 py-1 rounded-xl border border-slate-700">
                Shelby Network V2
              </span>
            </div>
          </div>

          <div className="bg-indigo-600/20 border border-indigo-500/30 p-4 rounded-2xl text-center shrink-0 w-32 h-32 flex flex-col items-center justify-center">
            <QrCode size={64} className="text-indigo-400" />
            <span className="text-[9px] font-mono text-indigo-300 mt-1 uppercase">Scan SBT</span>
          </div>
        </div>
      </div>

      {mintedTx && (
        <div className="bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 p-4 rounded-2xl mb-6 text-xs flex items-center justify-between">
          <span className="flex items-center gap-2 font-medium">
            <CheckCircle2 size={16} className="text-emerald-400" /> Minted Proof-of-Rent NFT on Aptos!
          </span>
          <a
            href={`https://explorer.aptoslabs.com/txn/${mintedTx}?network=testnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-emerald-400 hover:underline flex items-center gap-1"
          >
            Tx: {mintedTx.slice(0, 12)}... <ExternalLink size={12} />
          </a>
        </div>
      )}

      {/* Badges Collection */}
      <div className="space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
          Soulbound Badges & On-Chain Credentials ({badges.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {badges.map((b) => (
            <motion.div
              key={b.id}
              whileHover={{ y: -4 }}
              className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{b.icon}</span>
                  <span className="bg-slate-900 border border-slate-800 text-slate-400 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                    {b.tokenStandard}
                  </span>
                </div>
                <h4 className="text-sm font-black text-white">{b.title}</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {b.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-900 text-[11px]">
                <span className="text-slate-500">{b.issuedDate}</span>
                <span className="text-indigo-400 font-bold">+{b.scorePoints} Points</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Web3Passport;
