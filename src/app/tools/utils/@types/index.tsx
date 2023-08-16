export interface Equipamento {
  nomeEq: string;
  modeloEq: string;
  marcaEq: string;
  numeroSerieEq: string;
  tecnico: string;
  valorTec: number;
  valorCob: number;
  status: string;
  imagem: File | null;
  descricao: string;
  acessorios: string;
}
