import axios from "axios";

const api = axios.create({
  baseURL: "https://vivacare.onrender.com"
})

// Consultar
export const buscar = async(url: string, setDados: Function) => {
  const resposta = await api.get(url);
  setDados(resposta.data)
}

// Cadastrar
export const cadastrar = async(url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data)
}

// Atualizar
export const atualizar = async(url: string, dados: Object, setDados: Function) => {
  const resposta = await api.put(url, dados);
  setDados(resposta.data)
}

// Deletar
export const deletar = async(url: string) => {
  await api.delete(url);
}