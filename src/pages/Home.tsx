import {
  ArrowRight,
  CreditCard,
  List,
  Shield,
  Sparkles,
  TrendingUp,
  Wallet,
  Zap,
} from 'lucide-react';
import type { JSX } from 'react';
import { useNavigate } from 'react-router';
import Button from '../components/Button';

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
  gradient: string;
}

const Home = () => {
  const navigate = useNavigate();

  const features: ReadonlyArray<Feature> = [
    {
      icon: <Wallet className="w-8 h-8 text-white" />,
      title: 'Controle Financeiro',
      description:
        'Monitore suas despesas e receitas em um lugar só, com uma interface intuitiva e fácil de usar.',
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      title: 'Relatórios Inteligentes',
      description:
        'Visualize graficamente seus gastos com analytics avançados e insights personalizados.',
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      icon: <List className="w-8 h-8 text-white" />,
      title: 'Categorias Personalizadas',
      description: 'Organize suas transações em categorias inteligentes com tags automáticas.',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      icon: <CreditCard className="w-8 h-8 text-white" />,
      title: 'Transações Ilimitadas',
      description:
        'Adicione quantas transações quiser com sincronização em tempo real e backup automático.',
      gradient: 'from-purple-500 to-pink-600',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-black min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-transparent to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="container-app relative z-10">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 text-primary-400 text-sm font-medium backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                Nova versão disponível
              </div>

              <h1 className=" bg-gradient-to-r from-primary-400 to-primary-600 text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300 leading-tight">
                Gerencie suas
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
                  finanças com o
                </span>
                <h1 className="text-primary-500">Knaip Bills</h1>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Transforme sua relação com o dinheiro usando nossa plataforma de gestão financeira
                <span className="text-primary-400 font-semibold"> baseada em gráficos.</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="group bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-primary-500/25 transition-all duration-300 flex items-center gap-2"
                  onClick={() => navigate('/login')}
                >
                  Começar Gratuitamente
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-gray-400">100% Seguro</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm text-gray-400">Setup em 2 min</span>
                </div>
              </div>
            </div>

            {/* Interactive Visual Element */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold">Visão Geral</h3>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 p-4 rounded-xl border border-green-500/20">
                      <div className="text-green-400 text-sm">Receitas</div>
                      <div className="text-white text-2xl font-bold">R$ 12.500</div>
                    </div>
                    <div className="bg-gradient-to-br from-red-500/20 to-pink-600/20 p-4 rounded-xl border border-red-500/20">
                      <div className="text-red-400 text-sm">Despesas</div>
                      <div className="text-white text-2xl font-bold">R$ 8.300</div>
                    </div>
                  </div>

                  <div className="h-32 bg-gradient-to-r from-primary-500/20 to-blue-500/20 rounded-xl flex items-end justify-center p-4 border border-primary-500/20">
                    <div className="text-center">
                      <TrendingUp className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                      <div className="text-primary-400 text-sm">Crescimento +23%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-gray-300 text-sm backdrop-blur-sm">
              Recursos Principais
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Tudo que você precisa para
              <span className="text-primary-500"> prosperar</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Nossa plataforma oferece ferramentas avançadas para transformar sua gestão financeira
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl p-8 rounded-2xl hover:shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className={`mb-6 bg-gradient-to-r ${feature.gradient} p-4 rounded-2xl inline-block shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="relative bg-gradient-to-r from-primary-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-xl p-12 md:p-16 rounded-3xl text-center border border-white/10 overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-blue-500/5 rounded-3xl"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-blue-500 to-purple-500"></div>

            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary-500/20 border border-primary-500/30 rounded-full px-6 py-2 text-primary-300 text-sm font-medium backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                Aproveite agora mesmo!
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Pronto para
                <span className="text-primary-500"> transformar</span>
                <br />
                suas finanças?
              </h2>

              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Junte-se aos <span className="text-primary-400 font-semibold"> usuários</span> que
                já revolucionaram sua gestão financeira com o KnaipBills!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  className="group bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-400 hover:to-blue-400 text-white font-bold px-10 py-5 rounded-xl shadow-xl hover:shadow-primary-500/30 transition-all duration-300 flex items-center gap-3 text-lg"
                  onClick={() => navigate('/login')}
                >
                  Criar Conta Gratuita
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Button>

                <div className="text-center">
                  <div className="text-sm text-gray-400">✓ Sem cartão de crédito</div>
                  <div className="text-sm text-gray-400">✓ Setup em 2 minutos</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
