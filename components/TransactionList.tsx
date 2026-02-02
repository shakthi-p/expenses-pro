import React from 'react';
import { Trash2, TrendingUp, TrendingDown, Calendar, Search, ArrowRight } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  const [filter, setFilter] = React.useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const filteredTransactions = transactions.filter(t => 
    t.name.toLowerCase().includes(filter.toLowerCase()) || 
    t.category.toLowerCase().includes(filter.toLowerCase())
  );

  if (transactions.length === 0) {
    return (
      <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100 text-center animate-fade-in">
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Calendar className="text-indigo-300" size={40} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">No transactions yet</h3>
        <p className="text-slate-500 max-w-xs mx-auto">Start tracking your financial journey by adding your first transaction.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="text-xl font-bold text-slate-800">Recent Transactions</h3>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search history..." 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-sm"
          />
        </div>
      </div>

      <div className="max-h-[600px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction, index) => (
            <div 
              key={transaction.id}
              style={{ animationDelay: `${index * 0.05}s` }}
              className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 flex items-center justify-between group animate-slide-up"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                  transaction.type === 'income' 
                    ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100' 
                    : 'bg-rose-50 text-rose-600 group-hover:bg-rose-100'
                }`}>
                  {transaction.type === 'income' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-base">{transaction.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-medium px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md">
                      {transaction.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                       • {formatDate(transaction.date)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className={`font-bold text-lg ${
                  transaction.type === 'income' ? 'text-emerald-600' : 'text-slate-800'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </span>
                <button
                  onClick={() => onDelete(transaction.id)}
                  className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                  title="Delete transaction"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">
            No transactions found matching "{filter}"
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;