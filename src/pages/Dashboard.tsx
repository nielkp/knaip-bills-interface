import { ArrowDown, ArrowUp, TrendingUp, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import MonthYearSelect from '../components/MonthYearSelect';
import { getTransactionsSummary } from '../services/transactionService';
import type { TransactionSummary } from '../types/transactions';

const initialSummary: TransactionSummary = {
  balance: 0,
  totalExpenses: 0,
  totalIncomes: 0,
  expensesByCategory: [],
};

const createPieSlices = (data) => {
  let cumulativePercentage = 0;

  return data.map((item, index) => {
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

    // Ajuste os raios para que as linhas fiquem mais próximas do gráfico
    const lineRadius = radius + 10; // Aumente o valor para aproximar as linhas
    const lineEndRadius = lineRadius + 15; // Aumente o valor para aproximar as linhas

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
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [summary, setSummary] = useState<TransactionSummary>(initialSummary);
  const [hoveredSlice, setHoveredSlice] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);

  const generateMonthlyData = () => {
    const months = ['Nov/2024', 'Dez/2024', 'Jan/2025', 'Fev/2025', 'Mar/2025', 'Abr/2025'];
    const data = months.map((monthLabel) => ({
      month: monthLabel,
      Despesas: Math.floor(Math.random() * 2000) + 500,
      Receitas: Math.floor(Math.random() * 1500) + 800,
    }));
    setMonthlyData(data);
  };

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
    generateMonthlyData();
  }, [month, year]);

  return (
    <div className="container-app">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">DashBoard</h1>
        <MonthYearSelect
          month={month}
          year={year}
          onMonthChange={setMonth}
          onYearChange={setYear}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card glowEffect hover title="Saldo" icon={<Wallet className="text-green-500" />}>
          <p className="font-bold text-green-500">
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
      </div>
    </div>
  );
};

export default Dashboard;
