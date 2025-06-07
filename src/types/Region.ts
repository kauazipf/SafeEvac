export type NivelRisco = 'BAIXO' | 'MEDIO' | 'ALTO' | 'CRITICO';

export interface Regiao {
  id?: number;
  nome: string;
  latitude: number;
  longitude: number;
  descricao: string;
  nivelRisco: NivelRisco;
}
