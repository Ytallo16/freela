"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CadastroPaciente() {
  const router = useRouter();
  
  // Função para obter a data atual no formato YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };
  
  // Função para obter a hora atual no formato HH:MM
  const getCurrentTime = () => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  };
  
  const [formData, setFormData] = useState({
    nome: '',
    dataNascimento: '',
    cnsCpf: '',
    nomeMae: '',
    dataAdmissao: getCurrentDate(),
    horaAdmissao: getCurrentTime(),
    sexo: '',
    idade: '',
    peso: '',
    altura: '',
    imc: '',
    tipoNaturalidade: '',
    naturalidade: '',
    paisOrigem: '',
    estadoCivil: '',
    escolaridadeProfissao: ''
  });

  const calcularIMC = () => {
    if (formData.peso && formData.altura) {
      const peso = parseFloat(formData.peso);
      const altura = parseFloat(formData.altura) / 100; // converter cm para m
      const imc = (peso / (altura * altura)).toFixed(2);
      setFormData({...formData, imc});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
    
    if (name === 'peso' || name === 'altura') {
      setTimeout(calcularIMC, 500);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Aqui irá o código para enviar os dados para a API
      alert('Paciente cadastrado com sucesso!');
      // Redirecionar para a página de lista de pacientes ou limpar o formulário
    } catch (error) {
      console.error('Erro ao cadastrar paciente', error);
      alert('Erro ao cadastrar paciente');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-green-50 to-green-100 min-h-screen shadow-inner">
      <h1 className="text-3xl font-bold mb-8 text-green-800 text-center border-b-2 border-green-500 pb-4 max-w-3xl mx-auto">
        Cadastro de Paciente
      </h1>
      
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4 max-w-5xl mx-auto border border-gray-100">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-green-700 border-l-4 border-green-500 pl-3">
            Identificação
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">
                Nome
              </label>
              <input 
                className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200" 
                id="nome" 
                name="nome" 
                type="text" 
                value={formData.nome}
                onChange={handleChange}
                placeholder="Nome completo do paciente" 
                required 
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dataNascimento">
                DN (Data de Nascimento)
              </label>
              <input 
                className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200" 
                id="dataNascimento" 
                name="dataNascimento" 
                type="date" 
                value={formData.dataNascimento}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cnsCpf">
                CNS/CPF
              </label>
              <input 
                className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200" 
                id="cnsCpf" 
                name="cnsCpf" 
                type="text" 
                value={formData.cnsCpf}
                onChange={handleChange}
                placeholder="CNS ou CPF do paciente" 
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nomeMae">
                Nome da Mãe
              </label>
              <input 
                className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200" 
                id="nomeMae" 
                name="nomeMae" 
                type="text" 
                value={formData.nomeMae}
                onChange={handleChange}
                placeholder="Nome completo da mãe" 
              />
            </div>
          </div>
        </div>

        <div className="mb-8 bg-green-50 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-4 text-green-700 border-l-4 border-green-500 pl-3">
            Dados de Admissão
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dataAdmissao">
                Data Admissão
              </label>
              <input 
                className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 bg-white" 
                id="dataAdmissao" 
                name="dataAdmissao" 
                type="date" 
                value={formData.dataAdmissao}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="horaAdmissao">
                Hora
              </label>
              <input 
                className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 bg-white" 
                id="horaAdmissao" 
                name="horaAdmissao" 
                type="time" 
                value={formData.horaAdmissao}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-green-700 border-l-4 border-green-500 pl-3">
            Dados Físicos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sexo">
                Sexo
              </label>
              <select 
                className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200" 
                id="sexo" 
                name="sexo" 
                value={formData.sexo}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
                <option value="O">Outro</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="idade">
                Idade
              </label>
              <input 
                className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200" 
                id="idade" 
                name="idade" 
                type="number" 
                value={formData.idade}
                onChange={handleChange}
                placeholder="Idade" 
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="peso">
                Peso (kg)
              </label>
              <input 
                className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200" 
                id="peso" 
                name="peso" 
                type="number" 
                step="0.01" 
                value={formData.peso}
                onChange={handleChange}
                placeholder="Ex: 70.5" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="altura">
                Altura (cm)
              </label>
              <input 
                className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200" 
                id="altura" 
                name="altura" 
                type="number" 
                value={formData.altura}
                onChange={handleChange}
                placeholder="Ex: 170" 
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imc">
                IMC
              </label>
              <input 
                className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none cursor-not-allowed" 
                id="imc" 
                name="imc" 
                type="text" 
                value={formData.imc}
                readOnly
                placeholder="Calculado automaticamente" 
              />
            </div>
          </div>
        </div>

        <div className="mb-8 bg-green-50 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-4 text-green-700 border-l-4 border-green-500 pl-3">
            Dados Pessoais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tipoNaturalidade">
                Naturalidade
              </label>
              <select 
                className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 bg-white" 
                id="tipoNaturalidade" 
                name="tipoNaturalidade" 
                value={formData.tipoNaturalidade}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                <option value="brasileiro">Brasileiro(a)</option>
                <option value="estrangeiro">Estrangeiro(a)</option>
              </select>
            </div>
            
            {formData.tipoNaturalidade === 'brasileiro' && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="naturalidade">
                  Cidade/Estado
                </label>
                <input 
                  className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 bg-white" 
                  id="naturalidade" 
                  name="naturalidade" 
                  type="text" 
                  value={formData.naturalidade}
                  onChange={handleChange}
                  placeholder="Ex: São Paulo/SP" 
                />
              </div>
            )}
            
            {formData.tipoNaturalidade === 'estrangeiro' && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paisOrigem">
                  País de Origem
                </label>
                <input 
                  className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 bg-white" 
                  id="paisOrigem" 
                  name="paisOrigem" 
                  type="text" 
                  value={formData.paisOrigem}
                  onChange={handleChange}
                  placeholder="Ex: Portugal" 
                />
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estadoCivil">
                Estado Civil
              </label>
              <select 
                className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 bg-white" 
                id="estadoCivil" 
                name="estadoCivil" 
                value={formData.estadoCivil}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                <option value="solteiro">Solteiro(a)</option>
                <option value="casado">Casado(a)</option>
                <option value="divorciado">Divorciado(a)</option>
                <option value="viuvo">Viúvo(a)</option>
                <option value="outros">Outros</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="escolaridadeProfissao">
                Escolaridade/Profissão
              </label>
              <input 
                className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 bg-white" 
                id="escolaridadeProfissao" 
                name="escolaridadeProfissao" 
                type="text" 
                value={formData.escolaridadeProfissao}
                onChange={handleChange}
                placeholder="Ex: Ensino Superior / Engenheiro" 
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end pt-4 border-t border-gray-200">
          <button 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-md mr-4" 
            type="submit"
          >
            Cadastrar
          </button>
          <button 
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-300 ease-in-out" 
            type="button"
            onClick={() => router.back()}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
