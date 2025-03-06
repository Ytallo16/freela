import { useState, useEffect } from 'react';

const PRONTUARIO_KEY = 'last_prontuario_number';

export function useProntuarioNumber() {
  const [prontuarioNumber, setProntuarioNumber] = useState<number>(0);

  useEffect(() => {
    // Recupera o último número do localStorage
    const lastNumber = parseInt(localStorage.getItem(PRONTUARIO_KEY) || '0');
    // Incrementa o número
    const newNumber = lastNumber + 1;
    // Salva o novo número
    localStorage.setItem(PRONTUARIO_KEY, newNumber.toString());
    // Atualiza o state
    setProntuarioNumber(newNumber);
  }, []); // Executa apenas uma vez na montagem do componente

  return prontuarioNumber;
}
