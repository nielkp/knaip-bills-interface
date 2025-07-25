import { signInWithPopup } from 'firebase/auth';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { firebaseAuth, googleAuthProvider } from '../config/firebase';

const Login = () => {
  const handleLogin = async () => {
    const result = await signInWithPopup(firebaseAuth, googleAuthProvider);
    console.log(result);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <header>
          <h1 className="text-center text-3xl font-extrabold text-primary-500">KnaipBills</h1>
          <p className="mt-2 text-center">Gerencie suas finanças de forma simples e eficiente</p>
        </header>

        <main className="mt-8 bg-gray-800 border border-gray-700 py-8 px-4 shadow-md rounded-lg sm:px-10 space-y-6">
          <section className="mb-6">
            <h2 className="text-lg font-medium">Faça login para continuar</h2>
            <p className="mt-1 text-sm">Acesse sua conta para começar a gerenciar suas finanças</p>
          </section>

          <GoogleLoginButton onClick={handleLogin} isLoading={false} />

          <footer className="mt-6">
            <p className="mt-1 text-sm text-center text-gray-300">
              Ao fazer login, você concorda com nossos termos de uso e política de privacidade.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Login;
