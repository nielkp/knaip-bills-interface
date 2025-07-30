import { useEffect, useId, useState } from 'react';
import Card from '../components/Card';
import TransactionTypeSelector from '../components/TransactionTypeSelector';
import { getCategories } from '../services/categoryService';
import type { Category } from '../types/category';
import { TransactionType } from '../types/transactions';

interface FormData {
  description: string;
  amount: number;
  date: string;
  categoryId: string;
  type: TransactionType;
}

const initialFormData = {
  description: '',
  amount: 0,
  date: '',
  categoryId: '',
  type: TransactionType.EXPENSE,
};

const TransactionsForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const formId = useId();

  useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      const response = await getCategories();
      setCategories(response);
    };

    fetchCategories();
  }, []);

  const handleTransactionType = (newType: TransactionType) => {
    setFormData((prev) => ({ ...prev, type: newType }));
  };

  const handleSubmit = () => {};

  return (
    <div>
      <div className="p-4 text-white">
        <h1 className="text-xl font-bold">Nova Transação</h1>

        <Card>
          <form onSubmit={handleSubmit}></form>
          <div>
            <label htmlFor={formId}>Tipo de Despesa</label>
            <TransactionTypeSelector
              id={formId}
              value={formData.type}
              onChange={handleTransactionType}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TransactionsForm;
