export type Rota = {
  id: number;
  nome: string;
  latitude: number;
  longitude: number;
  acessivel: boolean;
};

export const rotasSeguras: Rota[] = [
  {
    id: 1,
    nome: 'Ponto de Encontro A',
    latitude: -23.5503,
    longitude: -46.632,
    acessivel: true,
  },
  {
    id: 2,
    nome: 'Ponto de Encontro B',
    latitude: -23.551,
    longitude: -46.634,
    acessivel: false,
  },
  {
    id: 3,
    nome: 'Ponto de Encontro C',
    latitude: -23.552,
    longitude: -46.631,
    acessivel: true,
  },
];
