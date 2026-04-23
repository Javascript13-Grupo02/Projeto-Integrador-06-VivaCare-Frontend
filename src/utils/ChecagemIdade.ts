import { differenceInYears } from "date-fns";
import type Cliente from "../models/Cliente";

export function podeCadastrar(cliente: Cliente): boolean {
  const hoje = new Date();
  const nascimento = new Date(cliente.data_nascimento);
  const idade = differenceInYears(hoje, nascimento);
  return idade >= 18;
}
