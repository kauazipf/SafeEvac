import { api } from './api';
import { Alerta } from '../types/Alerta';

export async function criarAlerta(dados: Omit<Alerta, 'id'>): Promise<void> {
  await api.post('/alertas', dados);
}

export async function listarAlertas(): Promise<Alerta[]> {
  const response = await api.get<Alerta[]>('/alertas');
  return response.data;
}
