"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Patient, mockPatients } from '../../../mocks';

export default function Anamnese() {
  // Estado para controlar a etapa atual do formulário
  const [step, setStep] = useState<'select-patient' | 'queixa-principal' | 'historia-doenca' | 'antecedentes' | 'medicamentos' | 'alergias' | 'habitos'>('select-patient');
  
  // Estado para armazenar o paciente selecionado
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  
  // Estado para o termo de busca
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado para os dados do formulário de anamnese
  const [formData, setFormData] = useState({
    queixaPrincipal: '',
    historiaDoencaAtual: '',
    antecedentesPatologicos: '',
    medicamentosEmUso: '',
    alergiasConhecidas: '',
    habitosDeVida: ''
  });

  // Filtragem de pacientes baseada no termo de busca
  const filteredPatients = searchTerm 
    ? mockPatients.filter(patient => 
        patient.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.cnsCpf.includes(searchTerm))
    : mockPatients;

  // Handler para mudanças nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler para seleção de paciente
  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setStep('queixa-principal');
  };

  // Handler para avançar para a próxima etapa
  const handleNext = () => {
    switch (step) {
      case 'queixa-principal':
        setStep('historia-doenca');
        break;
      case 'historia-doenca':
        setStep('antecedentes');
        break;
      case 'antecedentes':
        setStep('medicamentos');
        break;
      case 'medicamentos':
        setStep('alergias');
        break;
      case 'alergias':
        setStep('habitos');
        break;
    }
  };

  // Handler para voltar para a etapa anterior
  const handleBack = () => {
    switch (step) {
      case 'queixa-principal':
        setStep('select-patient');
        setSelectedPatient(null);
        break;
      case 'historia-doenca':
        setStep('queixa-principal');
        break;
      case 'antecedentes':
        setStep('historia-doenca');
        break;
      case 'medicamentos':
        setStep('antecedentes');
        break;
      case 'alergias':
        setStep('medicamentos');
        break;
      case 'habitos':
        setStep('alergias');
        break;
    }
  };

  // Handler para envio do formulário completo
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPatient) return;
    
    // Aqui você implementaria a lógica para salvar os dados
    console.log({
      patient: selectedPatient,
      anamnese: formData
    });
    
    alert('Anamnese salva com sucesso!');
    
    // Reset dos estados para iniciar uma nova anamnese
    setSelectedPatient(null);
    setFormData({
      queixaPrincipal: '',
      historiaDoencaAtual: '',
      antecedentesPatologicos: '',
      medicamentosEmUso: '',
      alergiasConhecidas: '',
      habitosDeVida: ''
    });
    setStep('select-patient');
  };

  // Componente para exibição do progresso das etapas
  const ProgressBar = () => {
    const steps = [
      { key: 'select-patient', label: 'Selecionar Paciente' },
      { key: 'queixa-principal', label: 'Queixa Principal' },
      { key: 'historia-doenca', label: 'História da Doença' },
      { key: 'antecedentes', label: 'Antecedentes' },
      { key: 'medicamentos', label: 'Medicamentos' },
      { key: 'alergias', label: 'Alergias' },
      { key: 'habitos', label: 'Hábitos' },
    ];
    
    const currentStepIndex = steps.findIndex(s => s.key === step);
    
    return (
      <div className="w-full mb-8">
        <div className="flex justify-between">
          {steps.map((s, index) => (
            <div key={s.key} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStepIndex ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {index + 1}
              </div>
              <span className={`text-xs mt-1 ${
                index <= currentStepIndex ? 'text-emerald-600 font-medium' : 'text-gray-500'
              }`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <div className="relative h-1 bg-gray-200 mt-4">
          <div
            className="absolute h-1 bg-emerald-500 transition-all duration-300"
            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>
    );
  };

  // Formatar data de nascimento para exibição
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  // Renderiza a etapa atual do formulário
  const renderStep = () => {
    switch (step) {
      case 'select-patient':
        return (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Selecione um Paciente</h2>
            
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar paciente por nome ou CPF/CNS..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-gray-800 placeholder-gray-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="overflow-y-auto max-h-96">
              {filteredPatients.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Nenhum paciente encontrado</p>
              ) : (
                <ul className="space-y-3">
                  {filteredPatients.map(patient => (
                    <li 
                      key={patient.id}
                      onClick={() => handleSelectPatient(patient)}
                      className="p-4 border border-gray-200 rounded-md hover:bg-emerald-50 cursor-pointer transition-colors flex items-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mr-4 text-white font-semibold shadow-sm">
                        {patient.nome.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800 text-lg">{patient.nome}</h3>
                        <div className="flex flex-wrap text-sm text-gray-600 mt-1">
                          <span className="mr-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(patient.dataNascimento)}
                          </span>
                          <span className="mr-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {patient.idade} anos
                          </span>
                          <span className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                            </svg>
                            {patient.cnsCpf}
                          </span>
                        </div>
                      </div>
                      <div className="ml-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${patient.sexo === 'M' ? 'bg-blue-100 text-blue-800' : patient.sexo === 'F' ? 'bg-pink-100 text-pink-800' : 'bg-purple-100 text-purple-800'}`}>
                          {patient.sexo === 'M' ? 'Masculino' : patient.sexo === 'F' ? 'Feminino' : 'Outro'}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );

      case 'queixa-principal':
        return (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mr-4 text-white font-semibold shadow-sm">
                {selectedPatient?.nome.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{selectedPatient?.nome}</h2>
                <div className="flex flex-wrap text-sm text-gray-600 mt-1">
                  <span className="mr-3">{selectedPatient?.idade} anos</span>
                  <span className="mr-3">
                    {selectedPatient?.sexo === 'M' ? 'Masculino' : selectedPatient?.sexo === 'F' ? 'Feminino' : 'Outro'}
                  </span>
                  <span>CPF/CNS: {selectedPatient?.cnsCpf}</span>
                </div>
              </div>
            </div>
            
            <h3 className="text-lg font-medium mb-3 text-gray-700">Queixa Principal</h3>
            <p className="text-sm text-gray-600 mb-4">Descreva o principal motivo da consulta, usando as palavras do paciente.</p>
            
            <textarea
              id="queixaPrincipal"
              name="queixaPrincipal"
              value={formData.queixaPrincipal}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Descreva a queixa principal com as palavras do paciente"
            ></textarea>
            
            <div className="flex justify-between mt-8">
              <button 
                onClick={handleBack}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Voltar
              </button>
              
              <button 
                onClick={handleNext}
                disabled={!formData.queixaPrincipal.trim()}
                className={`px-4 py-2 rounded-md transition-colors ${
                  formData.queixaPrincipal.trim() 
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                    : 'bg-emerald-300 cursor-not-allowed text-white'
                }`}
              >
                Próximo
              </button>
            </div>
          </div>
        );

      // As outras etapas continuam com a mesma lógica, apenas atualizando o header do paciente
      case 'historia-doenca':
      case 'antecedentes':
      case 'medicamentos':
      case 'alergias':
      case 'habitos':
        // Atualizar o cabeçalho do paciente em todas as outras telas
        return (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mr-4 text-white font-semibold shadow-sm">
                {selectedPatient?.nome.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{selectedPatient?.nome}</h2>
                <div className="flex flex-wrap text-sm text-gray-600 mt-1">
                  <span className="mr-3">{selectedPatient?.idade} anos</span>
                  <span className="mr-3">
                    {selectedPatient?.sexo === 'M' ? 'Masculino' : selectedPatient?.sexo === 'F' ? 'Feminino' : 'Outro'}
                  </span>
                  <span>CPF/CNS: {selectedPatient?.cnsCpf}</span>
                </div>
              </div>
            </div>
            
            {/* O resto do conteúdo específico de cada etapa permanece o mesmo */}
            
            <div className="flex justify-between mt-8">
              <button 
                onClick={handleBack}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Voltar
              </button>
              
              <button 
                onClick={step === 'habitos' ? handleSubmit : handleNext}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
              >
                {step === 'habitos' ? 'Finalizar' : 'Próximo'}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6 bg-emerald-50 min-h-screen">
      <h1 className="text-3xl font-bold text-emerald-800 mb-10 text-center">Anamnese</h1>
      
      {step !== 'select-patient' && <ProgressBar />}
      
      <div className="max-w-4xl mx-auto">
        {renderStep()}
      </div>
    </div>
  );
}
