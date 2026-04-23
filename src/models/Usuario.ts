import type Apolice from "./Apolice";

export default interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  senha: string;
  foto?: string;
  apolice?: Apolice[] | null;
}
