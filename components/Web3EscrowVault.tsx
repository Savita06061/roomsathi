import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Lock, Unlock, AlertTriangle, ExternalLink, Cpu, CheckCircle2, RefreshCw, Send, Plus, ArrowUpRight, Copy } from 'lucide-react';
import { Web3Escrow, Language, User } from '../types';

interface Web3EscrowVaultProps {
  language: Language;
  user: User | null;
}

const INITIAL_ESCROWS: Web3Escrow[] = [
  {
    id: 'escrow_101',
    contractAddress: '0x1::room_saathi_escrow::deposit_vault_v2',
    listingTitle: 'Luxury 2BHK Flat - Civic Center',
    amountApt: 4.5,
    amountSusd: 45,
    tenantAddress: '0x7a89b...3c21',
    landlordAddress: '0x3f12a...9e44',
    status: 'LOCKED',
    timelockMonths: 11,
    txHash: '0x8f3a921c84b12e0947239a1a',
    createdAt: '2026-06-15'
  },
  {
    id: 'escrow_102',
    contractAddress: '0x1::room_saathi_escrow::deposit_vault_v2',
    listingTitle: 'Student Single Room - Near College Gate',
    amountApt: 1.2,
    amountSusd: 12,
    tenantAddress: '0x9b41c...8812',
    landlordAddress: '0x1e78d...2a01',
    status: 'RELEASED',
    timelockMonths: 6,
    txHash: '0x7c2b01a89f33c41098ef73d1',
    createdAt: '2026-05-01'
  }
];

const Web3EscrowVault: React.FC<Web3EscrowVaultProps> = ({ language, user }) => {
  const [escrows, setEscrows] = useState<Web3Escrow[]>(INITIAL_ESCROWS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  // New Escrow Form State
  const [listingTitle, setListingTitle] = useState('');
  const [amountApt, setAmountApt] = useState(2.5);
  const [landlordAddress, setLandlordAddress] = useState('');
  const [timelockMonths, setTimelockMonths] = useState(11);

  const handleCreateEscrow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!listingTitle || !landlordAddress) {
      alert('Please fill all required Move contract fields!');
      return;
    }

    setIsDeploying(true);

    setTimeout(() => {
      const newEscrow: Web3Escrow = {
        id: 'escrow_' + Date.now(),
        contractAddress: '0x1::room_saathi_escrow::deposit_vault_v2',
        listingTitle,
        amountApt: Number(amountApt),
        amountSusd: Number(amountApt * 10),
        tenantAddress: user?.walletAddress || '0x7a89b...3c21',
        landlordAddress,
        status: 'LOCKED',
        timelockMonths: Number(timelockMonths),
        txHash: '0x' + Array.from({length: 24}, () => Math.floor(Math.random()*16).toString(16)).join(''),
        createdAt: new Date().toISOString().split('T')[0]
      };

      setEscrows([newEscrow, ...escrows]);
      setIsDeploying(false);
      setShowCreateModal(false);
      
      // Reset form
      setListingTitle('');
      setLandlordAddress('');
      alert('🎉 Web3 Move Escrow Contract successfully deployed on Aptos / Shelby Networks!');
    }, 1800);
  };

  const handleUpdateStatus = (id: string, newStatus: 'RELEASED' | 'DISPUTED') => {
    setEscrows(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: newStatus };
      }
      return item;
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden my-8">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800 relative z-10">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-tr from-orange-600 to-amber-500 p-3.5 rounded-2xl text-white shadow-lg shadow-orange-600/30">
            <Lock size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black tracking-tight">Smart Escrow Vault</h2>
              <span className="bg-orange-500/20 text-orange-400 text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-orange-500/30 tracking-widest flex items-center gap-1">
                <Cpu size={12} /> Move Module
              </span>
            </div>
            <p className="text-slate-400 text-xs mt-1">
              Zero-Trust On-Chain Security Deposit Lockup powered by Aptos & Shelby Networks
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-600/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <Plus size={16} /> Deploy New Escrow
        </button>
      </div>

      {/* Live On-Chain Network Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Network Status</p>
            <p className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Aptos / Shelby Testnet
            </p>
          </div>
          <Cpu className="text-slate-700" size={24} />
        </div>

        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Total Value Locked (TVL)</p>
            <p className="text-sm font-bold text-amber-400 mt-0.5">
              5.7 APT <span className="text-slate-400 text-xs font-normal">($57 ShelbyUSD)</span>
            </p>
          </div>
          <Lock className="text-slate-700" size={24} />
        </div>

        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Move Module Address</p>
            <p className="text-xs font-mono text-slate-300 mt-0.5 truncate max-w-[140px]">
              0x1::room_saathi
            </p>
          </div>
          <ShieldCheck className="text-slate-700" size={24} />
        </div>
      </div>

      {/* Escrow Contracts List */}
      <div className="space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          Active On-Chain Lease Lockups ({escrows.length})
        </h3>

        {escrows.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-5 transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-3 flex-wrap">
                  <h4 className="text-base font-black text-white">{item.listingTitle}</h4>
                  
                  {item.status === 'LOCKED' && (
                    <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Lock size={10} /> Locked ({item.timelockMonths} Months)
                    </span>
                  )}
                  {item.status === 'RELEASED' && (
                    <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Unlock size={10} /> Released to Landlord
                    </span>
                  )}
                  {item.status === 'DISPUTED' && (
                    <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <AlertTriangle size={10} /> Dispute Opened
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap">
                  <span>Tenant: <code className="text-orange-400">{item.tenantAddress}</code></span>
                  <span>Landlord: <code className="text-indigo-400">{item.landlordAddress}</code></span>
                  <span>Date: {item.createdAt}</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono pt-1">
                  <span>Tx: {item.txHash}</span>
                  <button 
                    onClick={() => copyToClipboard(item.txHash)}
                    className="hover:text-white transition-colors cursor-pointer"
                    title="Copy Tx Hash"
                  >
                    {copiedHash === item.txHash ? <CheckCircle2 size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  </button>
                  <a
                    href={`https://explorer.aptoslabs.com/txn/${item.txHash}?network=testnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:underline flex items-center gap-0.5 ml-1"
                  >
                    Explorer <ExternalLink size={10} />
                  </a>
                </div>
              </div>

              {/* Amount & Actions */}
              <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start md:items-end lg:items-center gap-3">
                <div className="text-left md:text-right">
                  <p className="text-lg font-black text-amber-400">{item.amountApt} APT</p>
                  <p className="text-[11px] text-slate-400 font-medium">({item.amountSusd} ShelbyUSD)</p>
                </div>

                {item.status === 'LOCKED' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateStatus(item.id, 'RELEASED')}
                      className="bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 text-[10px] font-black uppercase px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Unlock size={12} /> Release Funds
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(item.id, 'DISPUTED')}
                      className="bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/30 text-[10px] font-black uppercase px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1"
                    >
                      <AlertTriangle size={12} /> Dispute
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Deploy Escrow Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white relative shadow-2xl"
            >
              <h3 className="text-xl font-black text-white mb-2 flex items-center gap-2">
                <Lock className="text-orange-500" /> Deploy Move Escrow Contract
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Lock tenancy security deposit directly inside Aptos / Shelby Move Smart Contract.
              </p>

              <form onSubmit={handleCreateEscrow} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                    Room Listing Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Luxury 1BHK Flat - Station Road"
                    value={listingTitle}
                    onChange={(e) => setListingTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                      Security Deposit (APT)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      required
                      value={amountApt}
                      onChange={(e) => setAmountApt(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                      Timelock Duration
                    </label>
                    <select
                      value={timelockMonths}
                      onChange={(e) => setTimelockMonths(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
                    >
                      <option value={6}>6 Months</option>
                      <option value={11}>11 Months</option>
                      <option value={12}>12 Months</option>
                      <option value={24}>24 Months</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                    Landlord Aptos Wallet Address
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="0x3f12a89c4...7e1a"
                    value={landlordAddress}
                    onChange={(e) => setLandlordAddress(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-orange-400 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                  <span>Estimated Move Gas Fee:</span>
                  <span className="font-mono text-emerald-400 font-bold">~0.00042 APT</span>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider py-3 rounded-2xl transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isDeploying}
                    className="flex-1 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-2xl transition-all shadow-lg shadow-orange-600/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isDeploying ? (
                      <>
                        <RefreshCw className="animate-spin" size={16} /> Deploying Move Contract...
                      </>
                    ) : (
                      <>
                        <Send size={16} /> Lock Escrow On-Chain
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Web3EscrowVault;
