import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

//Função para cadastrar usuário
export const cadastrarUsuario = async (
  url: string,
  dados: Object,
  setDados: Function,
) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

//Função para autenticar usuário
export const login = async (url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

// Consultar
export const buscar = async (
  url: string,
  setDados: Function,
  header: Object,
) => {
  const resposta = await api.get(url, {
    ...header,
    headers: {
      ...(header as any).headers,
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
  });
  setDados(resposta.data);
};

// Cadastrar
export const cadastrar = async (
  url: string,
  dados: Object,
  setDados: Function,
  header: Object,
) => {
  const resposta = await api.post(url, dados, header);
  setDados(resposta.data);
};

// Atualizar
export const atualizar = async (
  url: string,
  dados: Object,
  setDados: Function,
  header: Object,
) => {
  const resposta = await api.put(url, dados, header);
  setDados(resposta.data);
};

// Deletar
export const deletar = async (url: string, header: Object) => {
  await api.delete(url, header);
};
