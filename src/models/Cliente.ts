import { differenceInYears } from "date-fns";
import type Apolice from "./Apolice";


export default interface Cliente {
    id: number;
    nome: string;
    email: string;
    data_nascimento: string;
    foto?: string;
    apolices: Apolice[];
}


export function podeCadastrar(cliente: Cliente): boolean {
    const hoje = new Date();
    const nascimento = new Date(cliente.data_nascimento);
    const idade = differenceInYears(hoje, nascimento);
    return idade >= 18;
}