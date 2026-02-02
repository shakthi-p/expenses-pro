import React, { useState, useEffect } from 'react';
import { Transaction, TransactionType, SummaryData } from './types';
import SummaryCards from './components/SummaryCards';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import ExpenseChart from './components/ExpenseChart';
import { Download, LayoutDashboard, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from Local Storage on Mount
  useEffect(() => {
    const saved = localStorage.getItem('transactions');
    if (saved) {
      try {
        setTransactions(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse transactions", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to Local Storage on Change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }, [transactions, isLoaded]);

  // Calculate Summary
  const summary: SummaryData = transactions.reduce(
    (acc, t) => {
      if (t.type === 'income') {
        acc.totalIncome += t.amount;
        acc.totalBalance += t.amount;
      } else {
        acc.totalExpense += t.amount;
        acc.totalBalance -= t.amount;
      }
      return acc;
    },
    { totalBalance: 0, totalIncome: 0, totalExpense: 0 }
  );

  const handleAddTransaction = (name: string, amount: number, type: TransactionType, category: string) => {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      name,
      amount,
      type,
      category,
      date: new Date().toISOString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const handleExportCSV = () => {
    const headers = ['Date,Name,Category,Type,Amount'];
    const csvContent = transactions.map(t => {
      const date = new Date(t.date).toLocaleDateString();
      const amount = t.type === 'expense' ? -t.amount : t.amount;
      return `${date},"${t.name}",${t.category},${t.type},${amount}`;
    }).join('\n');

    const blob = new Blob([headers + '\n' + csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expenses_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans pb-20">
      {/* Advanced Header */}
      <div className="relative bg-[#1e1b4b] overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-24">
          <header className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg">
                <LayoutDashboard size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Expenses Pro</h1>
                <div className="flex items-center gap-2 text-indigo-200 text-sm font-medium mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Your Personal Finance Tracker
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleExportCSV}
              className="group flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-sm font-semibold text-white backdrop-blur-sm border border-white/10 shadow-lg"
              disabled={transactions.length === 0}
            >
              <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" />
              Export CSV
            </button>
          </header>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-10">
        <SummaryCards data={summary} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column: Form & List */}
          <div className="xl:col-span-2 space-y-8">
            <TransactionForm onAddTransaction={handleAddTransaction} />
            <TransactionList 
              transactions={transactions} 
              onDelete={handleDeleteTransaction} 
            />
          </div>

          {/* Right Column: Charts & Info */}
          <div className="space-y-8">
            <div className="sticky top-8 space-y-8">
               {transactions.some(t => t.type === 'expense') ? (
                 <ExpenseChart transactions={transactions} />
               ) : (
                 <div className="bg-white p-12 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                       <Sparkles className="text-slate-300" size={32} />
                    </div>
                   <p className="text-slate-400 font-medium">Add expenses to unlock analytics</p>
                 </div>
               )}
               
               <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                 <div className="relative z-10">
                   <div className="flex items-center gap-2 mb-3 text-indigo-300">
                      <Sparkles size={18} />
                      <h4 className="font-bold uppercase tracking-wider text-xs">Financial Insight</h4>
                   </div>
                   <p className="text-slate-300 text-sm leading-relaxed">
                     Consistently tracking small expenses (like that daily coffee) can reveal surprising saving opportunities over a month. 
                     <br/><br/>
                     <span className="text-white font-semibold">Try the 50/30/20 rule:</span> 50% needs, 30% wants, 20% savings.
                   </p>
                 </div>
                 <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500 opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                 <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500 opacity-10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;