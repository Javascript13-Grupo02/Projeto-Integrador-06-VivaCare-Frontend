import type Apolice from "./Apolice";

export default interface Cliente {
  id: number;
  nome: string;
  email: string;
  dataNascimento: string;
  foto?: string;
  apolices: Apolice[];
}
