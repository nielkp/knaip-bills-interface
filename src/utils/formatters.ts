export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const tooltipFormatter = (value: number): [number, string] => {
  return [value, `R$ ${value.toFixed(2)}`];
};

export const formatDate = (date: Date | string): string => {
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat('pt-BR').format(dateObj)
}