import { api } from './api';
import { Alerta } from '../types/Alerta';

export async function listarAlertas(): Promise<Alerta[]> {
  const res = await api.get('/alertas');
  return res.data;
}

export async function criarAlerta(data: Omit<Alerta, 'id'>): Promise<void> {
  await api.post('/alertas', data);
}

export async function atualizarAlerta(id: number, data: Omit<Alerta, 'id'>): Promise<void> {
  await api.put(`/alertas/${id}`, data);
}

export async function excluirAlerta(id: number): Promise<void> {
  await api.delete(`/alertas/${id}`);
}
