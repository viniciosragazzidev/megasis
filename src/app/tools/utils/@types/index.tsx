export interface Equipamento {
  id: string;
  nomeEq: string;
  modeloEq: string;
  marcaEq: string;
  numeroSerieEq: string;
  tecnico: string;
  valorTec: number;
  valorCob: number;
  status: string;
  imagem: string | null;
  descricao: string;
  acessorios: string;
}
export interface Client {
  id: string;
  nome: string;
  contato: number;
  contatos: number[];
}

export interface FormData {
  id: string;
  nome: string;
  contato: number;
  contatos: number[];
  topEqNome: string;
  topEqModelo: string;
  topEqMarca: string;
  topEqNumeroSerie: string;
  topEqTecnico: string;
  topEqValorTec: number;
  topEqValorCob: number;
  topEqStatus: string;
  topEqImagem: string | null;
  topEqDescricao: string;
  topEqAcessorios: string;
  topEqId: string;
  quantidadeEq: number;
  equipamentos: Equipamento[];
}
