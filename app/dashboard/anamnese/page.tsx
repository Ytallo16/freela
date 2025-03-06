"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Patient, mockPatients } from '../../../mocks';
import { useProntuarioNumber } from '../../../hooks/useProntuarioNumber';

export default function Anamnese() {
  const prontuarioNumber = useProntuarioNumber();

  // Atualizar os tipos de etapas para incluir sistema_neurologico
  const [step, setStep] = useState<'select-patient' | 'historia-doenca' | 'antecedentes' | 'sistema_neurologico' | 'medicamentos' | 'alergias' | 'habitos'>('select-patient');
  
  // Estado para armazenar o paciente selecionado
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  
  // Estado para o termo de busca
  const [searchTerm, setSearchTerm] = useState('');
  
  // Atualizar o estado do formulário para incluir os novos campos
  const [formData, setFormData] = useState({
    numeroProntuario: '',
    cuidador: '',
    queixaPrincipal: '',
    comorbidades: '',
    medicamentosUsoContínuo: '',
    alergiaMedicamentosa: '',
    antecedentesPatologicos: '',
    medicamentosEmUso: '',
    alergiasConhecidas: '',
    habitosDeVida: '',
    nivelConsciencia: '',
    pupilas: '',
    alteracoesFala: '',
    deficitMotor: '',
    desvioComissuraLabial: '',
    glasgow: '',
    observacoesNeurologicas: ''
  });

  // Lista de opções de cuidadores
  const cuidadorOptions = [
    { value: '', label: 'Selecione o cuidador' },
    { value: 'proprio', label: 'Próprio paciente' },
    { value: 'mae', label: 'Mãe' },
    { value: 'pai', label: 'Pai' },
    { value: 'filho', label: 'Filho(a)' },
    { value: 'conjuge', label: 'Cônjuge' },
    { value: 'irmao', label: 'Irmão(ã)' },
    { value: 'neto', label: 'Neto(a)' },
    { value: 'cuidador', label: 'Cuidador profissional' },
    { value: 'outro', label: 'Outro' },
  ];

  // Filtragem de pacientes baseada no termo de busca
  const filteredPatients = searchTerm 
    ? mockPatients.filter(patient => 
        patient.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.cnsCpf.includes(searchTerm))
    : mockPatients;

  // Handler para mudanças nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler para seleção de paciente - agora indo direto para historia-doenca
  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    // Atualiza o formulário com o número do prontuário
    setFormData(prev => ({
      ...prev,
      numeroProntuario: `${prontuarioNumber}/${new Date().getFullYear()}`
    }));
    setStep('historia-doenca');
  };

  // Handler para avançar para a próxima etapa - removida referência a queixa-principal
  const handleNext = () => {
    switch (step) {
      case 'historia-doenca':
        setStep('antecedentes');
        break;
      case 'antecedentes':
        setStep('sistema_neurologico');
        break;
      case 'sistema_neurologico':
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

  // Handler para voltar para a etapa anterior - removida referência a queixa-principal
  const handleBack = () => {
    switch (step) {
      case 'historia-doenca':
        setStep('select-patient');
        setSelectedPatient(null);
        break;
      case 'antecedentes':
        setStep('historia-doenca');
        break;
      case 'sistema_neurologico':
        setStep('antecedentes');
        break;
      case 'medicamentos':
        setStep('sistema_neurologico');
        break;
      case 'alergias':
        setStep('medicamentos');
        break;
      case 'habitos':
        setStep('alergias');
        break;
    }
  };

  // Handler para envio do formulário completo - removida referência a queixaPrincipal
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
      numeroProntuario: '',
      cuidador: '',
      queixaPrincipal: '',
      comorbidades: '',
      medicamentosUsoContínuo: '',
      alergiaMedicamentosa: '',
      antecedentesPatologicos: '',
      medicamentosEmUso: '',
      alergiasConhecidas: '',
      habitosDeVida: '',
      nivelConsciencia: '',
      pupilas: '',
      alteracoesFala: '',
      deficitMotor: '',
      desvioComissuraLabial: '',
      glasgow: '',
      observacoesNeurologicas: ''
    });
    setStep('select-patient');
  };

  // Componente para exibição do progresso das etapas - removida etapa de queixa-principal
  const ProgressBar = () => {
    const steps = [
      { key: 'select-patient', label: 'Selecionar Paciente' },
      { key: 'historia-doenca', label: 'História da Doença' },
      { key: 'antecedentes', label: 'Antecedentes' },
      { key: 'sistema_neurologico', label: 'Sistema Neurológico' },
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
                index <= currentStepIndex ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {index + 1}
              </div>
              <span className={`text-xs mt-1 ${
                index <= currentStepIndex ? 'text-gray-800 font-medium' : 'text-gray-500'
              }`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <div className="relative h-1 bg-gray-200 mt-4">
          <div
            className="absolute h-1 bg-gray-700 transition-all duration-300"
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
                      className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer transition-colors flex items-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center mr-4 text-white font-semibold shadow-sm">
                        {patient.nome.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800 text-lg">{patient.nome}</h3>
                        <div className="flex flex-wrap text-sm text-gray-600 mt-1">
                          <span className="mr-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(patient.dataNascimento)}
                          </span>
                          <span className="mr-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {patient.idade} anos
                          </span>
                          <span className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      case 'historia-doenca':
        return (
          <div className="bg-white shadow-md rounded-lg p-6">
            {/* Cabeçalho do paciente */}
            <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center mr-4 text-white font-semibold shadow-sm">
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

            {/* Apenas número do prontuário e cuidador nesta tela */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número do Prontuário
                </label>
                <input
                  type="text"
                  value={formData.numeroProntuario}
                  readOnly
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700 font-medium"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cuidador Responsável 
                </label>
                <select
                  name="cuidador"
                  value={formData.cuidador}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-black placeholder-gray-500"
                  required
                >
                  {cuidadorOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button 
                onClick={handleBack}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Voltar
              </button>
              
              <button 
                onClick={handleNext}
                disabled={!formData.cuidador}
                className={`px-4 py-2 rounded-md transition-colors ${
                  formData.cuidador
                    ? 'bg-gray-700 text-white hover:bg-gray-800' 
                    : 'bg-gray-300 cursor-not-allowed text-white'
                }`}
              >
                Próximo
              </button>
            </div>
          </div>
        );

      case 'antecedentes':
        return (
          <div className="bg-white shadow-md rounded-lg p-6">
            {/* Cabeçalho do paciente */}
            <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center mr-4 text-white font-semibold shadow-sm">
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

            {/* Campos de anamnese */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Queixa Principal
                </label>
                <textarea
                  name="queixaPrincipal"
                  value={formData.queixaPrincipal}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-gray-900"
                  placeholder="Descreva a queixa principal do paciente"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comorbidades
                </label>
                <textarea
                  name="comorbidades"
                  value={formData.comorbidades}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-gray-900"
                  placeholder="Liste as comorbidades do paciente"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medicamentos de Uso Contínuo
                </label>
                <textarea
                  name="medicamentosUsoContínuo"
                  value={formData.medicamentosUsoContínuo}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-gray-900"
                  placeholder="Liste os medicamentos de uso contínuo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alergia Medicamentosa
                </label>
                <textarea
                  name="alergiaMedicamentosa"
                  value={formData.alergiaMedicamentosa}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-gray-900"
                  placeholder="Informe as alergias medicamentosas conhecidas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Antecedentes Pessoais
                </label>
                <textarea
                  name="antecedentesPatologicos"
                  value={formData.antecedentesPatologicos}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-gray-900"
                  placeholder="Descreva os antecedentes pessoais relevantes"
                />
              </div>
            </div>

            {/* Botões de navegação */}
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
                    ? 'bg-gray-700 text-white hover:bg-gray-800' 
                    : 'bg-gray-300 cursor-not-allowed text-white'
                }`}
              >
                Próximo
              </button>
            </div>
          </div>
        );

      case 'sistema_neurologico':
        return (
          <div className="bg-white shadow-md rounded-lg p-6">
            {/* Cabeçalho do paciente */}
            <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center mr-4 text-white font-semibold shadow-sm">
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

            <h3 className="text-lg font-semibold mb-6 text-gray-800">Sistema Neurológico</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nível de Consciência
                </label>
                <input
                  type="text"
                  name="nivelConsciencia"
                  value={formData.nivelConsciencia}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pupilas
                </label>
                <input
                  type="text"
                  name="pupilas"
                  value={formData.pupilas}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-gray-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alterações da Fala
                </label>
                <input
                  type="text"
                  name="alteracoesFala"
                  value={formData.alteracoesFala}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Déficit Motor
                </label>
                <input
                  type="text"
                  name="deficitMotor"
                  value={formData.deficitMotor}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-gray-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Desvio Comissura Labial
                </label>
                <input
                  type="text"
                  name="desvioComissuraLabial"
                  value={formData.desvioComissuraLabial}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Glasgow
                </label>
                <input
                  type="text"
                  name="glasgow"
                  value={formData.glasgow}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-gray-900"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observações
              </label>
              <textarea
                name="observacoesNeurologicas"
                value={formData.observacoesNeurologicas}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-gray-900"
                placeholder="Observações adicionais sobre o sistema neurológico"
              />
            </div>

            <div className="flex justify-between mt-8">
              <button 
                onClick={handleBack}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Voltar
              </button>
              
              <button 
                onClick={handleNext}
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                Próximo
              </button>
            </div>
          </div>
        );

      // As outras etapas continuam com a mesma lógica, apenas atualizando as cores
      case 'medicamentos':
      case 'alergias':
      case 'habitos':
        // Atualizar o cabeçalho do paciente em todas as outras telas
        return (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center mr-4 text-white font-semibold shadow-sm">
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
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors"
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
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">Anamnese</h1>
      
      {step !== 'select-patient' && <ProgressBar />}
      
      <div className="max-w-4xl mx-auto">
        {renderStep()}
      </div>
    </div>
  );
}
