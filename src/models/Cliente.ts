import type Apolice from "./Apolice";


export default interface Cliente {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    data_nascimento: string;
    foto: string;
    apolice: Apolice[];
}


