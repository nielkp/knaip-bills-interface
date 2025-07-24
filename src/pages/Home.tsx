import Button from '../components/Button';

const Home = () => {
  return (
    <div className="bg-gray-950 min-h-screen">
      <div className="container-app">
        <section className="py-12 md:py-20">
          {/* TOPO DO SITE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Gerencie suas finanças com o <span className="text-primary-500">KnaipBills</span>
              </h1>
              <p className="text-lg text-white mb-2">
                Uma plataforma simples e eficiente para controlar suas despesas e receitas. Organize
                suas finanças pessoais ou do seu negócio com facilidade.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 space-x-4">
              <Button className="text-center px-6 py-3">Começar Agora</Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
