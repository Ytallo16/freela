"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validação básica
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }

    try {
      // Aqui você implementaria a lógica de autenticação real
      // Simulando um delay de autenticação
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Após login bem-sucedido, redirecionar para o dashboard
      router.push('/dashboard');
    } catch (err) {
      setError('Credenciais inválidas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-green-50 to-teal-50">
      {/* Seção de imagem/branding */}
      <div className="md:w-1/2 flex flex-col justify-center items-center p-8 bg-gradient-to-br from-green-500 to-teal-400">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            {/* Substitua pelo logo real da clínica */}
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
              <span className="text-green-500 text-4xl font-bold">CM</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Clínica Médica</h1>
          <p className="text-white text-xl mb-8">Cuidando da sua saúde com excelência</p>
          <div className="bg-white/20 p-6 rounded-lg backdrop-blur-sm">
            <p className="text-white">
              Acesse nosso sistema para gerenciar consultas, exames e prontuários de forma segura e eficiente.
            </p>
          </div>
        </div>
      </div>

      {/* Formulário de login */}
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Bem-vindo(a)!!</h2>
            <p className="text-gray-600 mt-2">Entre com suas credenciais para acessar o sistema</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email ou Usuário
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-500 text-gray-900"
                placeholder="Digite seu Email ou Usuário"
                required
              />
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <a href="#" className="text-sm text-green-600 hover:text-green-800">
                  Esqueceu a senha?
                </a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-500 text-gray-900"
                placeholder="Digite sua senha"
                required
              />
            </div>

            <div className="flex items-center mb-6">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Lembrar-me
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <span className="inline-flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Entrando...
                </span>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Novo no sistema?{' '}
              <a href="#" className="font-medium text-green-600 hover:text-green-500">
                Entre em contato com o administrador
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
