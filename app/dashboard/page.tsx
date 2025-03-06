"use client";

import { FaUserPlus, FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  
  const handleCadastrarPaciente = () => {
    router.push("/dashboard/cadastro-paciente");
  };
  
  const handleBuscarPaciente = () => {
    // Navegue para a página de busca quando implementada
    // router.push("/pacientes/buscar");
    console.log("Navegando para busca de paciente");
  };
  
  return (
    <div className="py-6 px-4 md:px-6">
      {/* Cabeçalho com Logo e Nome da Clínica */}
      <div className="flex flex-col items-center mb-10">
        <div className="flex items-center justify-center h-24 w-24 rounded-full bg-blue-600 mb-4">
          <span className="text-white text-4xl font-bold">CM</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
          Clínica Médica Saúde Total
        </h1>
      </div>
      
      {/* Botões de Ação */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <button 
          onClick={handleCadastrarPaciente}
          className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border-2 border-blue-100 hover:border-blue-300"
        >
          <div className="bg-blue-100 p-5 rounded-full mb-4">
            <FaUserPlus className="text-blue-600 text-4xl" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Cadastrar Paciente</h2>
          <p className="text-gray-500 mt-2 text-center">Adicionar um novo paciente ao sistema</p>
        </button>
        
        <button 
          onClick={handleBuscarPaciente}
          className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border-2 border-green-100 hover:border-green-300"
        >
          <div className="bg-green-100 p-5 rounded-full mb-4">
            <FaSearch className="text-green-600 text-4xl" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Buscar Paciente</h2>
          <p className="text-gray-500 mt-2 text-center">Localizar e visualizar dados de pacientes</p>
        </button>
      </div>

      
    </div>
  );
}
