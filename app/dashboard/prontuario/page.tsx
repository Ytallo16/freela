"use client";

import { useState } from 'react';

export default function Prontuario() {
  const [activeTab, setActiveTab] = useState('informacoes');
  
  const paciente = {
    nome: "Maria Silva",
    idade: 45,
    dataNascimento: "10/05/1978",
    telefone: "(11) 98765-4321",
    email: "maria.silva@email.com",
    endereco: "Rua das Flores, 123 - São Paulo, SP",
    convenio: "MediSaúde",
    numeroCarteira: "123456789",
    alergias: "Penicilina, Dipirona",
    historicoFamiliar: "Hipertensão (mãe), Diabetes (pai)"
  };

  const consultas = [
    { data: "15/07/2023", medico: "Dr. Silva", especialidade: "Clínica Geral", motivo: "Dor de cabeça recorrente" },
    { data: "30/05/2023", medico: "Dra. Santos", especialidade: "Neurologia", motivo: "Avaliação de enxaqueca" },
    { data: "10/03/2023", medico: "Dr. Oliveira", especialidade: "Clínica Geral", motivo: "Exames de rotina" },
    { data: "22/11/2022", medico: "Dr. Silva", especialidade: "Clínica Geral", motivo: "Gripe" }
  ];

  const exames = [
    { data: "20/07/2023", nome: "Hemograma Completo", resultado: "Normal", medico: "Dr. Silva" },
    { data: "20/07/2023", nome: "Colesterol Total", resultado: "Elevado", medico: "Dr. Silva" },
    { data: "05/06/2023", nome: "Ressonância Magnética", resultado: "Ver laudo", medico: "Dra. Santos" },
    { data: "15/03/2023", nome: "Raio-X Tórax", resultado: "Normal", medico: "Dr. Oliveira" }
  ];

  const medicamentos = [
    { nome: "Dipirona 500mg", posologia: "1 comprimido de 8 em 8 horas se dor", dataInicio: "15/07/2023", dataFim: "22/07/2023" },
    { nome: "Propranolol 40mg", posologia: "1 comprimido pela manhã", dataInicio: "30/05/2023", dataFim: "Contínuo" },
    { nome: "Omeprazol 20mg", posologia: "1 cápsula em jejum", dataInicio: "30/05/2023", dataFim: "30/08/2023" }
  ];

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Prontuário do Paciente</h1>
        <div>
          <button 
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Imprimir Prontuário
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Cabeçalho do prontuário */}
        <div className="p-6 border-b">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{paciente.nome}</h2>
              <p className="text-gray-600">{paciente.idade} anos - Nascimento: {paciente.dataNascimento}</p>
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Ativo
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Telefone: {paciente.telefone}</p>
              <p className="text-sm text-gray-600">Email: {paciente.email}</p>
              <p className="text-sm text-gray-600">Endereço: {paciente.endereco}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Convênio: {paciente.convenio}</p>
              <p className="text-sm text-gray-600">Carteira: {paciente.numeroCarteira}</p>
              <p className="text-sm text-gray-600 font-medium text-red-600">Alergias: {paciente.alergias}</p>
            </div>
          </div>
        </div>

        {/* Tabs de navegação */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('informacoes')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'informacoes'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Informações Gerais
            </button>
            <button
              onClick={() => setActiveTab('consultas')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'consultas'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Consultas
            </button>
            <button
              onClick={() => setActiveTab('exames')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'exames'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Exames
            </button>
            <button
              onClick={() => setActiveTab('medicamentos')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'medicamentos'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Medicamentos
            </button>
          </nav>
        </div>

        {/* Conteúdo das tabs */}
        <div className="p-6">
          {activeTab === 'informacoes' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Histórico Médico</h3>
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <p className="text-gray-700">
                  Paciente com histórico de enxaqueca crônica, em tratamento contínuo. Realizou avaliação neurológica recente.
                  Não possui outras comorbidades significativas. Realiza exames de rotina regularmente.
                </p>
              </div>

              <h3 className="text-lg font-medium text-gray-900 mb-3">Histórico Familiar</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700">{paciente.historicoFamiliar}</p>
              </div>
            </div>
          )}

          {activeTab === 'consultas' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Histórico de Consultas</h3>
                <button className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">
                  Nova Consulta
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Médico</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Especialidade</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motivo</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {consultas.map((consulta, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{consulta.data}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{consulta.medico}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{consulta.especialidade}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{consulta.motivo}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-800 mr-3">Ver</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'exames' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Exames Realizados</h3>
                <button className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">
                  Novo Exame
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exame</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resultado</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Médico</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {exames.map((exame, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{exame.data}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{exame.nome}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{exame.resultado}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{exame.medico}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-800 mr-3">Ver</button>
                          <button className="text-blue-600 hover:text-blue-800">Baixar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'medicamentos' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Medicamentos</h3>
                <button className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">
                  Novo Medicamento
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicamento</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posologia</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Início</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Término</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {medicamentos.map((medicamento, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{medicamento.nome}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{medicamento.posologia}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{medicamento.dataInicio}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{medicamento.dataFim}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span 
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              medicamento.dataFim === "Contínuo" 
                                ? "bg-green-100 text-green-800" 
                                : new Date(medicamento.dataFim.split('/').reverse().join('-')) < new Date() 
                                  ? "bg-gray-100 text-gray-800" 
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {medicamento.dataFim === "Contínuo" 
                              ? "Ativo" 
                              : new Date(medicamento.dataFim.split('/').reverse().join('-')) < new Date() 
                                ? "Finalizado" 
                                : "Em andamento"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
