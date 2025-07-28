import { ArrowLeft, CheckCircle, Shield, Sparkles, TrendingUp } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { signWithGoogle, authState } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signWithGoogle();
    } catch (err) {
      console.error('Erro ao fazer login com o Google.', err);
    }
  };

  useEffect(() => {
    if (authState.user && !authState.loading) {
      navigate('/dashboard');
    }
  }, [authState.user, authState.loading, navigate]);

  const benefits = [
    'Controle financeiro completo',
    'Relatórios inteligentes',
    'Categorias personalizadas',
    'Sincronização em tempo real',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-900/20 via-transparent to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-96 bg-gradient-to-b from-transparent via-primary-500/20 to-transparent"></div>

      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-20 group flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="text-sm">Voltar</span>
      </button>

      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding & Benefits */}
          <div className="hidden lg:block space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 text-primary-400 text-sm font-medium backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                Plataforma #1 em Gestão Financeira
              </div>

              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300 leading-tight">
                Bem-vindo ao
                <span className="text-primary-500"> KnaipBills</span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed">
                Transforme sua relação com o dinheiro. Mais de
                <span className="text-primary-400 font-semibold"> 50.000 usuários</span> já
                revolucionaram suas finanças conosco.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-1 rounded-full">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50k+</div>
                <div className="text-sm text-gray-400">Usuários Ativos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">R$ 1M+</div>
                <div className="text-sm text-gray-400">Gerenciado</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.9★</div>
                <div className="text-sm text-gray-400">Avaliação</div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur opacity-75"></div>
              <div className="absolute inset-0.5 bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-3xl"></div>

              <div className="relative z-10 space-y-8">
                {/* Mobile Header */}
                <div className="lg:hidden text-center space-y-4">
                  <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 text-primary-400 text-sm font-medium backdrop-blur-sm">
                    <Sparkles className="w-4 h-4" />
                    KnaipBills
                  </div>
                  <h1 className="text-3xl font-bold text-white">Acesse sua conta</h1>
                </div>

                {/* Desktop Header */}
                <div className="hidden lg:block text-center space-y-4">
                  <div className="inline-flex items-center gap-2 bg-primary-500/20 border border-primary-500/30 rounded-full px-4 py-2 text-primary-300 text-sm font-medium backdrop-blur-sm">
                    <Shield className="w-4 h-4" />
                    Login Seguro
                  </div>
                  <h2 className="text-2xl font-bold text-white">Faça login para continuar</h2>
                  <p className="text-gray-400">
                    Acesse sua conta para começar a gerenciar suas finanças
                  </p>
                </div>

                {/* Login Button */}
                <div className="space-y-6">
                  <GoogleLoginButton onClick={handleLogin} isLoading={authState.loading} />
                  {/* Loading State */}
                  {authState.loading && (
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 text-primary-400">
                        <div className="w-4 h-4 border-2 border-primary-400 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm">Conectando...</span>
                      </div>
                    </div>
                  )}

                  {/* Error State */}
                  {authState.error && (
                    <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-xl p-4 text-center backdrop-blur-sm">
                      <div className="text-red-400 font-medium">Ops! Algo deu errado</div>
                      <div className="text-red-300 text-sm mt-1">
                        {authState.error} - Tente novamente
                      </div>
                    </div>
                  )}
                </div>

                {/* Security Badges */}
                <div className="flex items-center justify-center gap-6 pt-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-gray-400">SSL Seguro</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-gray-400">Dados Criptografados</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center pt-4 border-t border-white/10">
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Ao fazer login, você concorda com nossos
                    <button className="text-primary-400 hover:text-primary-300 mx-1 underline transition-colors">
                      Termos de Uso
                    </button>
                    e
                    <button className="text-primary-400 hover:text-primary-300 mx-1 underline transition-colors">
                      Política de Privacidade
                    </button>
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom CTA for Mobile */}
            <div className="lg:hidden mt-8 text-center space-y-4">
              <div className="text-gray-400 text-sm">
                Mais de <span className="text-primary-400 font-semibold">50.000 usuários</span>{' '}
                confiam no KnaipBills
              </div>
              <div className="flex justify-center gap-6">
                <div className="text-center">
                  <div className="text-lg font-bold text-white">4.9★</div>
                  <div className="text-xs text-gray-400">Avaliação</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white">100%</div>
                  <div className="text-xs text-gray-400">Seguro</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white">24/7</div>
                  <div className="text-xs text-gray-400">Suporte</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
