import {
  CalendarDays,
  CalendarMinus2,
  CalendarPlus2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface MonthYearSelectProps {
  month: number;
  year: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

const monthNames: readonly string[] = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const MonthYearSelect = ({ month, onMonthChange, year, onYearChange }: MonthYearSelectProps) => {
  const currentYear = new Date().getFullYear();
  const years: number[] = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  const handleNextMonth = (): void => {
    if (month === 12) {
      onMonthChange(1);
      onYearChange(year + 1);
    } else {
      onMonthChange(month + 1);
    }
  };

  const handlePreviusMonth = (): void => {
    if (month === 1) {
      onMonthChange(12);
      onYearChange(year - 1);
    } else {
      onMonthChange(month - 1);
    }
  };

  return (
    <div className="flex items-center justify-between bg-gray-900 rounded-lg p-3 border border-gray-700">
      {/* ICONE DO LUCID REACT */}
      <CalendarMinus2 />
      {/* BOTAO // MÊS ANTERIOR */}
      <button
        type="button"
        className="p-2 rounded-full hover:bg-gray-800 hover:text-primary-500 transition-colors cursor-pointer"
        aria-label="Mês Anterior"
        onClick={handlePreviusMonth}
      >
        {/* ICONE DO LUCID REACT */}
        <ChevronLeft />
      </button>
      {/* SELECIONAR O MÊS */}
      <div className="flex gap-2">
        <label htmlFor="month-select" className="sr-only">
          Selecionar Mês
        </label>
        <select
          value={month}
          onChange={(event) => onMonthChange(Number(event.target.value))}
          id="month-select"
          className="bg-gray-800 border-gray-700 cursor-pointer rounded-md py-1 px-3 text-sm font-medium text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {monthNames.map((name, index) => (
            <option key={name} value={index + 1}>
              {name}
            </option>
          ))}
        </select>
        {/* ICONE DO LUCID REACT */}
        <CalendarDays />
        {/* SELECIONAR O ANO */}
        <label htmlFor="year-select" className="sr-only">
          Selecionar Ano
        </label>
        <select
          value={year}
          onChange={(event) => onYearChange(Number(event.target.value))}
          id="year-select"
          className="bg-gray-800 border-gray-700 cursor-pointer rounded-md py-1 px-3 text-sm font-medium text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {years.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      {/* BOTAO // PROXIMO MÊS */}
      <button
        type="button"
        className="p-2 rounded-full hover:bg-gray-800 hover:text-primary-500 transition-colors cursor-pointer"
        aria-label="Proximo Mês"
        onClick={handleNextMonth}
      >
        {/* ICONE DO LUCID REACT */}
        <ChevronRight />
      </button>
      {/* ICONE DO LUCID REACT */}
      <CalendarPlus2 />
    </div>
  );
};

export default MonthYearSelect;
