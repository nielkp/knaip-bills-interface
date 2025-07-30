import { AlertCircle, Banknote, Calendar, Save, Tag, Wallet } from 'lucide-react';
import { type ChangeEvent, type FormEvent, useEffect, useId, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import Select from '../components/Select';
import TransactionTypeSelector from '../components/TransactionTypeSelector';
import { getCategories } from '../services/categoryService';
import { createTransaction } from '../services/transactionService';
import type { Category } from '../types/category';
import { type CreateTransactionDTO, TransactionType } from '../types/transactions';

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
  const [formData, setFormData] = useState<FormData>(() => ({
    description: '',
    amount: 0,
    date: '',
    categoryId: '',
    type: TransactionType.EXPENSE,
  }));
  const [error, setError] = useState<string | null>(null);
  const formId = useId();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      const response = await getCategories();
      setCategories(response);
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((category) => category.type === formData.type);

  const validateForm = (): boolean => {
    if (!formData.description || !formData.amount || !formData.date || !formData.categoryId) {
      setError('Preencha Todos os Campos!');
      return false;
    }

    if (formData.amount <= 0) {
      setError('Valor deve ser maior que zero!');
      return false;
    }

    return true;
  };

  const handleTransactionType = (newType: TransactionType) => {
    setFormData((prev) => ({ ...prev, type: newType }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = event.target;

    let newValue: string | number = value;

    if (name === 'amount') {
      newValue = parseFloat(value) || 0;
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleCancel = () => {
    navigate('/transacoes');
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!validateForm()) {
        return;
      }

      const transactionData: CreateTransactionDTO = {
        description: formData.description,
        amount: formData.amount,
        categoryId: formData.categoryId,
        type: formData.type,
        date: `${formData.date}T12:00:00.000Z`,
      };

      await createTransaction(transactionData);
      toast.success('Transação Adicionada com Sucesso!');
      navigate('/transacoes');
    } catch (err) {
      toast.error('Falha ao Adicionar Transação!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-app py-8">
      <div className="text-white max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Nova Transação</h1>

        <Card>
          {error && (
            <div className="flex items-center bg-red-300 rounded-xl p-4 mb-6 gap-2">
              <AlertCircle className="w-5 h-5 text-red-700" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-2 flex gap-2 flex-col">
              <label htmlFor={formId} className="mb-2">
                Tipo de Transação
              </label>
              <TransactionTypeSelector
                id={formId}
                value={formData.type}
                onChange={handleTransactionType}
              />
            </div>

            <Input
              label="Descrição"
              name="description"
              value={formData.description}
              onChange={handleChange}
              icon={<Banknote className="w-4 h-4" />}
              placeholder="Ex: Supermercado, Farmácia, Salário, etc..."
            />

            <Input
              label="Valor"
              name="amount"
              type="number"
              step="0.01"
              value={formData.amount.toString()}
              onChange={handleChange}
              placeholder="R$ 0,00"
              icon={<Wallet className="w-4 h-4" />}
              required
            />

            <Input
              label="Data"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              icon={<Calendar className="w-4 h-4" />}
            />

            <Select
              label="Categoria"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              icon={<Tag className="w-4 h-4" />}
              options={[
                { value: '', label: 'Selecione uma Categoria' },
                ...filteredCategories.map((category) => ({
                  value: category.id,
                  label: category.name,
                })),
              ]}
            />

            <div className="flex justify-center space-x-3 mt-2">
              <Button
                type="button"
                className="text-white"
                variant="outline"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                disabled={loading}
                type="submit"
                variant={formData.type === TransactionType.EXPENSE ? 'danger' : 'success'}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-4 border-gray-700 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <Save className="w-5 h-5 mr-2" />
                )}
                Salvar
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default TransactionsForm;
