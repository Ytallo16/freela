"use client";

import { useState } from 'react';

export default function Prescricao() {
  const [pacienteSelecionado, setPacienteSelecionado] = useState('');
  const [medicamentos, setMedicamentos] = useState([
    { id: 1, nome: '', dosagem: '', posologia: '', duracao: '' }
  ]);
  const [observacoes, setObservacoes] = useState('');
  
  // Lista de pacientes fictícia
  const pacientes = [
    { id: '1', nome: 'Maria Silva' },
    { id: '2', nome: 'João Santos' },
    { id: '3', nome: 'Ana Oliveira' },
    { id: '4', nome: 'Pedro Costa' },
    { id: '5', nome: 'Márcia Souza' }
  ];

  // Adicionar um novo medicamento vazio ao formulário
  const adicionarMedicamento = () => {
    const novoId = medicamentos.length > 0 ? Math.max(...medicamentos.map(m => m.id)) + 1 : 1;
    setMedicamentos([...medicamentos, { id: novoId, nome: '', dosagem: '', posologia: '', duracao: '' }]);
  };

  // Remover um medicamento do formulário
  const removerMedicamento = (id: number) => {
    if (medicamentos.length > 1) {
      setMedicamentos(medicamentos.filter(med => med.id !== id));
    }
  };

  // Atualizar os dados de um medicamento
  const atualizarMedicamento = (id: number, campo: string, valor: string) => {
    setMedicamentos(medicamentos.map(med => {
      if (med.id === id) {
        return { ...med, [campo]: valor };
      }
      return med;
    }));
  };

  // Enviar o formulário
  const enviarPrescricao = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica para salvar a prescrição
    console.log({
      paciente: pacienteSelecionado,
      medicamentos,
      observacoes
    });
    alert('Prescrição salva com sucesso!');
  };

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Nova Prescrição</h1>
        <div>
          <button 
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 mr-2"
          >
            Cancelar
          </button>
          <button 
            onClick={enviarPrescricao}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Salvar Prescrição
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={enviarPrescricao}>
          {/* Seleção de Paciente */}
          <div className="mb-6">
            <label htmlFor="paciente" className="block text-sm font-medium text-gray-700 mb-1">
              Paciente
            </label>
            <select
              id="paciente"
              value={pacienteSelecionado}
              onChange={(e) => setPacienteSelecionado(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Selecione um paciente</option>
              {pacientes.map(paciente => (
                <option key={paciente.id} value={paciente.id}>
                  {paciente.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Formulário para Medicamentos */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium text-gray-900">Medicamentos</h2>
              <button 
                type="button"
                onClick={adicionarMedicamento}
                className="text-sm bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
              >
                + Adicionar Medicamento
              </button>
            </div>
            
            {medicamentos.map((med, index) => (
              <div key={med.id} className="bg-gray-50 p-4 rounded-md mb-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-md font-medium text-gray-800">Medicamento {index + 1}</h3>
                  {medicamentos.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => removerMedicamento(med.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remover
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`medicamento-${med.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Nome do Medicamento
                    </label>
                    <input
                      type="text"
                      id={`medicamento-${med.id}`}
                      value={med.nome}
                      onChange={(e) => atualizarMedicamento(med.id, 'nome', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Ex: Amoxicilina"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor={`dosagem-${med.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Dosagem
                    </label>
                    <input
                      type="text"
                      id={`dosagem-${med.id}`