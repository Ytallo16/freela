"use client";

import { useState } from 'react';

export default function Anamnese() {
  const [formData, setFormData] = useState({
    queixaPrincipal: '',
    historiaDoencaAtual: '',
    antecedentesPatologicos: '',
    medicamentosEmUso: '',
    alergiasConhecidas: '',
    habitosDeVida: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica para salvar os dados
    console.log(formData);
    alert('Anamnese salva com sucesso!');
  };

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Anamnese do Paciente</h1>
        <div>
          <button 
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 mr-2"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Salvar Anamnese
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="queixaPrincipal" className="block text-sm font-medium text-gray-700 mb-1">
                Queixa Principal
              </label>
              <textarea
                id="queixaPrincipal"
                name="queixaPrincipal"
                value={formData.queixaPrincipal}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Descreva a queixa principal do paciente"
              ></textarea>
            </div>

            <div>
              <label htmlFor="historiaDoencaAtual" className="block text-sm font-medium text-gray-700 mb-1">
                História da Doença Atual
              </label>
              <textarea
                id="historiaDoencaAtual"
                name="historiaDoencaAtual"
                value={formData.historiaDoencaAtual}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Descreva a história da doença atual"
              ></textarea>
            </div>

            <div>
              <label htmlFor="antecedentesPatologicos" className="block text-sm font-medium text-gray-700 mb-1">
                Antecedentes Patológicos
              </label>
              <textarea
                id="antecedentesPatologicos"
                name="antecedentesPatologicos"
                value={formData.antecedentesPatologicos}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Liste os antecedentes patológicos relevantes"
              ></textarea>
            </div>

            <div>
              <label htmlFor="medicamentosEmUso" className="block text-sm font-medium text-gray-700 mb-1">
                Medicamentos em Uso
              </label>
              <textarea
                id="medicamentosEmUso"
                name="medicamentosEmUso"
                value={formData.medicamentosEmUso}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Liste os medicamentos em uso atualmente"
              ></textarea>
            </div>

            <div>
              <label htmlFor="alergiasConhecidas" className="block text-sm font-medium text-gray-700 mb-1">
                Alergias Conhecidas
              </label>
              <input
                type="text"
                id="alergiasConhecidas"
                name="alergiasConhecidas"
                value={formData.alergiasConhecidas}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Liste as alergias conhecidas"
              />
            </div>

            <div>
              <label htmlFor="habitosDeVida" className="block text-sm font-medium text-gray-700 mb-1">
                Hábitos de Vida
              </label>
              <textarea
                id="habitosDeVida"
                name="habitosDeVida"
                value={formData.habitosDeVida}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Descreva hábitos relevantes (tabagismo, etilismo, atividade física, etc)"
              ></textarea>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
