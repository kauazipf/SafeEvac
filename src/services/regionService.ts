import axios from 'axios';
import { Regiao } from '../types/Region';

const api = axios.create({
  baseURL: 'http://192.168.0.184:8080', 
});

interface RegiaoPage {
  content: Regiao[];
  totalPages: number;
  totalElements: number;
}

export const listarRegioes = (pagina = 0) => api.get(`/regiao?page=${pagina}&size=2`);
export const criarRegiao = (dados: Regiao) => api.post('/regiao', dados);
export const atualizarRegiao = (id: number, dados: Regiao) => api.put(`/regiao/${id}`, dados);
export const deletarRegiao = (id: number) => api.delete(`/regiao/${id}`);
