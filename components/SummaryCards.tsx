import React from 'react';
import { SummaryData } from '../types';
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface SummaryCardsProps {
  data: SummaryData;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ data }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Balance - Main Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-3xl shadow-xl shadow-indigo-200/50 text-white relative overflow-hidden group transform hover:-translate-y-1 transition-all duration-300">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Wallet size={20} className="text-white" />
            </div>
            <p className="text-sm font-medium text-indigo-100">Total Balance</p>
          </div>
          <h2 className="text-4xl font-bold tracking-tight">
            {formatCurrency(data.totalBalance)}
          </h2>
          <p className="text-indigo-200 text-xs mt-2 opacity-80">Available funds</p>
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      </div>

      {/* Income */}
      <div className="bg-white p-6 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col justify-between group hover:border-emerald-100 transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 group-hover:bg-emerald-100 transition-colors">
            <TrendingUp size={24} />
          </div>
          <div className="px-2 py-1 bg-emerald-50 rounded-full text-emerald-600 flex items-center gap-1 text-xs font-semibold">
            <ArrowUpRight size={12} />
            Income
          </div>
        </div>
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">Total Income</p>
          <h2 className="text-3xl font-bold text-slate-800">
            {formatCurrency(data.totalIncome)}
          </h2>
        </div>
      </div>

      {/* Expenses */}
      <div className="bg-white p-6 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col justify-between group hover:border-rose-100 transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-rose-50 rounded-2xl text-rose-600 group-hover:bg-rose-100 transition-colors">
            <TrendingDown size={24} />
          </div>
          <div className="px-2 py-1 bg-rose-50 rounded-full text-rose-600 flex items-center gap-1 text-xs font-semibold">
            <ArrowDownRight size={12} />
            Expense
          </div>
        </div>
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">Total Expenses</p>
          <h2 className="text-3xl font-bold text-slate-800">
            {formatCurrency(data.totalExpense)}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;