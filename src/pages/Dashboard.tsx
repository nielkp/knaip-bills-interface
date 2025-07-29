import { ArrowDown, ArrowUp, Calendar, TrendingUp, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Card from '../components/Card';
import MonthYearSelect from '../components/MonthYearSelect';
import { getTransactionsMonthly, getTransactionsSummary } from '../services/transactionService';
import type { MonthlyItem, TransactionSummary } from '../types/transactions';
import { formatCurrency } from '../utils/formatters';

interface ExpenseCategory {
  percentage: number;
  categoryColor: string;
  categoryName: string;
}

const initialSummary: TransactionSummary = {
  balance: 0,
  totalExpenses: 0,
  totalIncomes: 0,
  expensesByCategory: [],
};

const createPieSlices = (data: ExpenseCategory[]) => {
  let cumulativePercentage = 0;

  return data.map((item: ExpenseCategory, index: number) => {
    const startAngle = cumulativePercentage * 3.6;
    const endAngle = (cumulativePercentage + item.percentage) * 3.6;

    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    const largeArcFlag = item.percentage > 50 ? 1 : 0;

    const cx = 150;
    const cy = 150;
    const radius = 80;

    const x1 = cx + radius * Math.cos(startAngleRad);
    const y1 = cy + radius * Math.sin(startAngleRad);
    const x2 = cx + radius * Math.cos(endAngleRad);
    const y2 = cy + radius * Math.sin(endAngleRad);

    const pathData = [
      `M ${cx} ${cy}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `Z`,
    ].join(' ');

    const midAngle = (startAngle + endAngle) / 2;
    const midAngleRad = (midAngle * Math.PI) / 180;

    const lineRadius = radius + 10;
    const lineEndRadius = lineRadius + 15;

    const midX = cx + lineRadius * Math.cos(midAngleRad);
    const midY = cy + lineRadius * Math.sin(midAngleRad);
    const lineEndX = cx + lineEndRadius * Math.cos(midAngleRad);
    const lineEndY = cy + lineEndRadius * Math.sin(midAngleRad);

    const textAnchor = lineEndX > cx ? 'start' : 'end';
    const textX = lineEndX + (lineEndX > cx ? 5 : -5);
    const textY = lineEndY;

    cumulativePercentage += item.percentage;

    return {
      ...item,
      pathData,
      midX,
      midY,
      lineEndX,
      lineEndY,
      textX,
      textY,
      textAnchor,
    };
  });
};

const Dashboard = () => {
  const currentDate = new Date();
  const [year, setYear] = useState<number>(currentDate.getFullYear());
  const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
  const [summary, setSummary] = useState<TransactionSummary>(initialSummary);
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);
  const [monthlyItemsData, setMonthlyItemsData] = useState<MonthlyItem[]>([]);

  useEffect(() => {
    async function loadTransactionsSummary() {
      try {
        const response = await getTransactionsSummary(month, year);

        setSummary({
          ...response,
          expensesByCategory: response.expensesByCategory ?? [],
        });
      } catch (error) {
        console.error('Erro ao carregar resumo das transações:', error);
        setSummary(initialSummary);
      }
    }

    loadTransactionsSummary();
  }, [month, year]);

  useEffect(() => {
    async function loadTransactionsMonthly() {
      const response = await getTransactionsMonthly(month, year, 4);
      console.log(response);
      setMonthlyItemsData(response.history);
    }

    loadTransactionsMonthly();
  }, [month, year]);

  return (
    <div className="container-app">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Dashboard</h1>
        <MonthYearSelect
          month={month}
          year={year}
          onMonthChange={setMonth}
          onYearChange={setYear}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card
          glowEffect
          hover
          title="Saldo"
          icon={<Wallet className={summary.balance < 0 ? 'text-red-500' : 'text-green-500'} />}
          className={`${summary.balance < 0 ? 'bg-red-500/10 border-red-500' : 'bg-green-500/10 border-green-500'} transition-colors duration-300`}
        >
          <p className={`font-bold ${summary.balance < 0 ? 'text-red-500' : 'text-green-500'}`}>
            {summary.balance.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
        </Card>

        <Card title="Receitas" icon={<ArrowUp className="text-green-500" />}>
          <p className="font-bold text-green-500">
            {summary.totalIncomes.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
        </Card>

        <Card title="Despesas" icon={<ArrowDown className="text-red-600" />}>
          <p className="font-bold text-red-600">
            {summary.totalExpenses.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 mt-3">
        <Card
          icon={<TrendingUp size={20} className="text-primary-500" />}
          title="Despesas por Categoria"
          className="min-h-80"
        >
          {summary.expensesByCategory?.length > 0 ? (
            <>
              <div className="h-64 mt-4 flex justify-center">
                <div className="relative">
                  <svg width="300" height="300" viewBox="0 0 300 300">
                    {createPieSlices(summary.expensesByCategory).map((slice, index) => (
                      <g key={index}>
                        <path
                          d={slice.pathData}
                          fill={slice.categoryColor}
                          stroke="#1f2937"
                          strokeWidth="2"
                          style={{
                            cursor: 'pointer',
                            opacity: hoveredSlice === index ? 0.8 : 1,
                            transition: 'opacity 0.2s',
                          }}
                          onMouseEnter={() => setHoveredSlice(index)}
                          onMouseLeave={() => setHoveredSlice(null)}
                        />

                        <line
                          x1={slice.midX}
                          y1={slice.midY}
                          x2={slice.lineEndX}
                          y2={slice.lineEndY}
                          stroke={slice.categoryColor}
                          strokeWidth="2"
                        />

                        <text
                          x={slice.textX}
                          y={slice.textY}
                          fill={slice.categoryColor}
                          fontSize="14"
                          fontWeight="bold"
                          textAnchor={slice.textAnchor}
                          dominantBaseline="middle"
                        >
                          {slice.percentage.toFixed(1)}%
                        </text>
                      </g>
                    ))}
                  </svg>

                  {hoveredSlice !== null && (
                    <div
                      className="absolute top-0 left-full ml-4 bg-gray-800 text-white p-3 border border-gray-600 rounded shadow-lg z-10"
                      style={{ minWidth: '150px' }}
                    >
                      <p className="font-bold text-sm text-white">
                        {summary.expensesByCategory[hoveredSlice].categoryName}
                      </p>
                      <p className="text-sm text-gray-200">
                        {summary.expensesByCategory[hoveredSlice].amount.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </p>
                      <p className="text-sm text-gray-200">
                        {summary.expensesByCategory[hoveredSlice].percentage.toFixed(1)}%
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap justify-center gap-4">
                  {summary.expensesByCategory.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: entry.categoryColor }}
                      />
                      <span className="text-sm font-medium text-white">{entry.categoryName}</span>
                      <span className="text-xs text-gray-300">
                        ({entry.percentage.toFixed(1)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-sm text-gray-300">Nenhuma despesa encontrada para este período</p>
            </div>
          )}
        </Card>

        <Card
          icon={<Calendar size={20} className="text-primary-500" />}
          title="Histórico Mensal"
          className="min-h-80"
        >
          <div className="h-72 mt-4">
            {monthlyItemsData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyItemsData} margin={{ left: 30, right: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis
                    dataKey="name"
                    stroke="#94A3B8"
                    tick={{ style: { textTransform: 'capitalize' } }}
                  />
                  <YAxis
                    stroke="#94A3B8"
                    tick={{ style: { fontSize: 14 } }}
                    tickFormatter={formatCurrency}
                  />
                  <Tooltip
                    formatter={(value: number) => `R$ ${value.toFixed(2)}` as any}
                    contentStyle={{ backgroundColor: '#0E1621', borderColor: '#2A2A2A' }}
                    labelStyle={{ color: '#F8F8F8' }}
                  />
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                  <Bar dataKey="expenses" fill="#FF6384" name="Despesas" />
                  <Bar dataKey="income" fill="#37E359" name="Receitas" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64">
                <p className="text-sm text-gray-300">
                  Nenhuma despesa encontrada para este período
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
