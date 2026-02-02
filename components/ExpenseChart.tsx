import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Transaction } from '../types';

interface ExpenseChartProps {
  transactions: Transaction[];
}

const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#3b82f6', '#14b8a6', '#64748b'];

const ExpenseChart: React.FC<ExpenseChartProps> = ({ transactions }) => {
  // Aggregate data by category for expenses only
  const data = React.useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryMap = new Map<string, number>();
    let total = 0;

    expenses.forEach(t => {
      const current = categoryMap.get(t.category) || 0;
      categoryMap.set(t.category, current + t.amount);
      total += t.amount;
    });

    const chartData = Array.from(categoryMap.entries())
      .map(([name, value]) => ({ 
        name, 
        value,
        percentage: (value / total) * 100 
      }))
      .sort((a, b) => b.value - a.value);

    return {
      chartData,
      totalExpense: total
    };
  }, [transactions]);

  if (data.chartData.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-800 text-lg">Expense Breakdown</h3>
      </div>
      
      {/* Chart Section */}
      <div className="h-[280px] relative mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data.chartData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
              cornerRadius={6}
              stroke="none"
            >
              {data.chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Amount']}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                padding: '12px 16px',
                fontFamily: 'Inter, sans-serif'
              }}
              itemStyle={{ color: '#1e293b', fontWeight: 600 }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-1">Total</p>
          <p className="text-2xl font-bold text-slate-800">
            ₹{data.totalExpense.toLocaleString('en-IN', { maximumFractionDigits: 0, notation: "compact" })}
          </p>
        </div>
      </div>

      {/* Custom Detailed List */}
      <div className="space-y-5">
        {data.chartData.map((item, index) => (
          <div key={item.name} className="group">
            <div className="flex justify-between items-end mb-1">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-sm font-semibold text-slate-700">{item.name}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-slate-800">₹{item.value.toLocaleString('en-IN')}</span>
                <span className="text-xs text-slate-400 ml-2 font-medium">{item.percentage.toFixed(1)}%</span>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{ 
                  width: `${item.percentage}%`, 
                  backgroundColor: COLORS[index % COLORS.length] 
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseChart;