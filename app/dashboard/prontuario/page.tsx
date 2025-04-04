"use client";

import { useState } from 'react';
import { mockPatients, Patient } from '@/mocks/patients';

export default function Prontuario() {
  const [activeTab, setActiveTab] = useState('informacoes');
  const [selectedPatient, setSelectedPatient] = useState<Patient>(mockPatients[0]);
  
  // Estados para campos editáveis com valores iniciais vazios
  const [evolucao, setEvolucao] = useState('');
  const [sinaisVitais, setSinaisVitais] = useState({
    tax: "",
    pa: "",
    fc: "",
    glicemia: "",
    fr: "",
    sapo2: ""
  });
  const [avaliacaoRiscos, setAvaliacaoRiscos] = useState({
    braden: {
      total: 0,
      risco: ""
    },
    morse: {
      total: 0,
      risco: ""
    },
    fugulin: {
      total: 0,
      cuidados: ""
    }
  });

  const handlePatientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const patient = mockPatients.find(p => p.id === event.target.value);
    if (patient) {
      setSelectedPatient(patient);
      // Reseta todos os campos editáveis
      setEvolucao('');
      setSinaisVitais({
        tax: "",
        pa: "",
        fc: "",
        glicemia: "",
        fr: "",
        sapo2: ""
      });
      setAvaliacaoRiscos({
        braden: {
          total: 0,
          risco: ""
        },
        morse: {
          total: 0,
          risco: ""
        },
        fugulin: {
          total: 0,
          cuidados: ""
        }
      });
    }
  };

  const consultas = [
    { data: "15/07/2023", medico: "Dr. Silva", especialidade: "Clínica Geral", motivo: "Dor de cabeça recorrente" },
    { data: "30/05/2023", medico: "Dra. Santos", especialidade: "Neurologia", motivo: "Avaliação de enxaqueca" },
    { data: "10/03/2023", medico: "Dr. Oliveira", especialidade: "Clínica Geral", motivo: "Exames de rotina" },
  ];

  const exames = [
    { data: "20/07/2023", nome: "Hemograma Completo", resultado: "Normal", medico: "Dr. Silva" },
    { data: "20/07/2023", nome: "Colesterol Total", resultado: "Elevado", medico: "Dr. Silva" },
    { data: "05/06/2023", nome: "Ressonância Magnética", resultado: "Ver laudo", medico: "Dra. Santos" },
  ];

  const medicamentos = [
    { nome: "Dipirona 500mg", posologia: "1 comprimido de 8 em 8 horas se dor", dataInicio: "15/07/2023", dataFim: "22/07/2023" },
  ];

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-black">Prontuário do Paciente</h1>
        <div>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Imprimir Prontuário
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Identificação do Paciente */}
        <div className="p-6 border-b">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <p className="text-sm font-bold text-black mb-2">IDENTIFICAÇÃO</p>
              <div className="mb-2">
                <label htmlFor="patientSelect" className="block text-sm font-bold text-black mb-1">
                  NOME:
                </label>
                <select
                  id="patientSelect"
                  className="w-full p-2 border rounded text-black"
                  value={selectedPatient.id}
                  onChange={handlePatientChange}
                >
                  {mockPatients.map(patient => (
                    <option key={patient.id} value={patient.id}>
                      {patient.nome}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-sm font-bold text-black">
                NOME DA MÃE: <span className="font-normal">{selectedPatient.nomeMae}</span>
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-black">
                PRONTUÁRIO: <span className="font-normal">{selectedPatient.prontuario || selectedPatient.id}</span>
              </p>
              <p className="text-sm font-bold text-black">
                DN: <span className="font-normal">{new Date(selectedPatient.dataNascimento).toLocaleDateString()}</span>
              </p>
              <p className="text-sm font-bold text-black">
                CNS: <span className="font-normal">{selectedPatient.cnsCpf}</span>
              </p>
              <p className="text-sm font-bold text-black">
                DATA: <span className="font-normal">{selectedPatient.dataAdmissao}</span>
              </p>
              <p className="text-sm font-bold text-black">
                HORA: <span className="font-normal">{selectedPatient.horaAdmissao}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Evolução e Avaliação - Agora editável */}
        <div className="p-6 border-b">
          <h3 className="text-sm font-bold text-black mb-2">EVOLUÇÃO E AVALIAÇÃO DE ENFERMAGEM</h3>
          <textarea 
            className="w-full h-40 p-2 border rounded text-black"
            value={evolucao}
            onChange={(e) => setEvolucao(e.target.value)}
          />
        </div>

        {/* Anexos/Imagens */}
        <div className="p-6 border-b">
          <h3 className="text-sm font-bold text-black mb-2">IMAGEM - ANEXO</h3>
          <div className="min-h-[200px] border rounded p-4">
            {selectedPatient.anexos?.length > 0 ? (
              selectedPatient.anexos.map((anexo, index) => (
                <div key={index} className="mb-2">
                  <img src={anexo.url} alt={anexo.descricao} className="max-w-xs" />
                  <p className="text-sm text-black">{anexo.descricao}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-black">Nenhum anexo disponível</p>
            )}
          </div>
        </div>

        {/* Sinais Vitais - Agora editável */}
        <div className="p-6 border-b">
          <h3 className="text-sm font-bold text-black mb-2">SINAIS VITAIS</h3>
          <div className="grid grid-cols-6 gap-4">
            <div>
              <p className="text-sm font-semibold text-black">TAX</p>
              <input
                type="text"
                className="w-full p-2 border rounded text-black"
                value={sinaisVitais.tax}
                onChange={(e) => setSinaisVitais({...sinaisVitais, tax: e.target.value})}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-black">P.A</p>
              <input
                type="text"
                className="w-full p-2 border rounded text-black"
                value={sinaisVitais.pa}
                onChange={(e) => setSinaisVitais({...sinaisVitais, pa: e.target.value})}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-black">F.C</p>
              <input
                type="text"
                className="w-full p-2 border rounded text-black"
                value={sinaisVitais.fc}
                onChange={(e) => setSinaisVitais({...sinaisVitais, fc: e.target.value})}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-black">GLICEMIA</p>
              <input
                type="text"
                className="w-full p-2 border rounded text-black"
                value={sinaisVitais.glicemia}
                onChange={(e) => setSinaisVitais({...sinaisVitais, glicemia: e.target.value})}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-black">F.R</p>
              <input
                type="text"
                className="w-full p-2 border rounded text-black"
                value={sinaisVitais.fr}
                onChange={(e) => setSinaisVitais({...sinaisVitais, fr: e.target.value})}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-black">SAPO2</p>
              <input
                type="text"
                className="w-full p-2 border rounded text-black"
                value={sinaisVitais.sapo2}
                onChange={(e) => setSinaisVitais({...sinaisVitais, sapo2: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Avaliações de Risco - Agora editável */}
        <div className="p-6 grid grid-cols-3 gap-4">
          <div>
            <h3 className="text-sm font-bold text-black mb-2">RISCO DE QUEDA - BRADEN</h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-black">TOTAL:</p>
                <input
                  type="number"
                  className="w-full p-2 border rounded text-black"
                  value={avaliacaoRiscos.braden.total}
                  onChange={(e) => setAvaliacaoRiscos({
                    ...avaliacaoRiscos,
                    braden: {...avaliacaoRiscos.braden, total: Number(e.target.value)}
                  })}
                />
              </div>
              <div>
                <p className="text-sm text-black">RISCO:</p>
                <input
                  type="text"
                  className="w-full p-2 border rounded text-black"
                  value={avaliacaoRiscos.braden.risco}
                  onChange={(e) => setAvaliacaoRiscos({
                    ...avaliacaoRiscos,
                    braden: {...avaliacaoRiscos.braden, risco: e.target.value}
                  })}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-black mb-2">RISCO DE LPP - MORSE</h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-black">TOTAL:</p>
                <input
                  type="number"
                  className="w-full p-2 border rounded text-black"
                  value={avaliacaoRiscos.morse.total}
                  onChange={(e) => setAvaliacaoRiscos({
                    ...avaliacaoRiscos,
                    morse: {...avaliacaoRiscos.morse, total: Number(e.target.value)}
                  })}
                />
              </div>
              <div>
                <p className="text-sm text-black">RISCO:</p>
                <input
                  type="text"
                  className="w-full p-2 border rounded text-black"
                  value={avaliacaoRiscos.morse.risco}
                  onChange={(e) => setAvaliacaoRiscos({
                    ...avaliacaoRiscos,
                    morse: {...avaliacaoRiscos.morse, risco: e.target.value}
                  })}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-black mb-2">GRAU DE DEPENDÊNCIA - FUGULIN</h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-black">TOTAL:</p>
                <input
                  type="number"
                  className="w-full p-2 border rounded text-black"
                  value={avaliacaoRiscos.fugulin.total}
                  onChange={(e) => setAvaliacaoRiscos({
                    ...avaliacaoRiscos,
                    fugulin: {...avaliacaoRiscos.fugulin, total: Number(e.target.value)}
                  })}
                />
              </div>
              <div>
                <p className="text-sm text-black">CUIDADOS:</p>
                <input
                  type="text"
                  className="w-full p-2 border rounded text-black"
                  value={avaliacaoRiscos.fugulin.cuidados}
                  onChange={(e) => setAvaliacaoRiscos({
                    ...avaliacaoRiscos,
                    fugulin: {...avaliacaoRiscos.fugulin, cuidados: e.target.value}
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
