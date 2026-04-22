import type Cliente from "./Cliente";
import type Usuario from "./Usuario";

export default interface Apolice {
  id: number;
  plano: string;
  preco: number;
  data_inicio: string;
  data_fim: string;
  dependentes: number;
  cliente: Cliente;
  usuario: Usuario;
}
