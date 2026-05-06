
# VivaCare - Frontend 

<br />

<div align="center">
    <img src="https://ik.imagekit.io/vjqejp2vh/VivaCare/Logo%20VivaCare%20Clara.png?updatedAt=1777032061555" alt="Logo VivaCare" width="40%"/>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

<br /><br />

## 1.📝 Descrição Geral

O **VivaCare** é uma solução digital desenvolvida para descomplicar a gestão de seguros de vida. O foco do projeto é substituir a burocracia e as "letras miúdas" por uma experiência digital ágil e intuitiva, permitindo que os usuários (corretores) gerenciem sua carteira de clientes e os planos de cobertura com total eficiência.

1.1 Sobre o Front-end

A aplicação web foi construída utilizando **React** e **Tailwind CSS**, focando em uma interface limpa, responsiva e de alta performance. O front-end integra funcionalidades essenciais como:

* **Painel do Corretor:** Gerenciamento visual completo de clientes e apólices, com validações de dados em tempo real para garantir a segurança das informações.
* **Central de Atendimento ao Cliente:** Um formulário de contato dedicado, permitindo que o segurado envie mensagens diretamente para a equipe de corretores.


## 2. 🚀 Deploy da Aplicação

O projeto já está no ar e disponível para uso! Você pode acessar a plataforma completa e testar suas funcionalidades diretamente no link abaixo:

🔗 **[Acessar o VivaCare](https://vivacare.netlify.app/home)**

------

## 3. ✨ Recursos Principais
- 🔐 **Autenticação e Segurança:** Sistema de Login e Cadastro para corretores, com proteção de rotas através do consumo de Tokens JWT e `AuthContext`.
- 👥 **Gestão de Clientes:** Interface completa (CRUD) para cadastro, visualização, edição e exclusão de segurados. Conta com gerador dinâmico de avatares para usuários sem foto.
- 🛡️ **Validação de Formulários Avançada:** Interceptação no lado do cliente garantindo dados limpos antes do envio à API. Inclui validação de e-mail (Regex), bloqueio para cadastro de menores de 18 anos e exigência de padrão internacional de telefone (`+55`).
- 📄 **Gestão de Apólices:** Modais dinâmicos para a criação e vínculo de apólices aos clientes, exibindo os planos, preços e dependentes ativos.
- 🔔 **Feedback Visual Contínuo:** Utilização de Toasts e Spinners de carregamento para garantir que o usuário saiba exatamente o que está acontecendo no sistema.

------

## 4. 📸 Protótipo e Capturas de Tela

<div align="center">
    <img src="https://ik.imagekit.io/vjqejp2vh/VivaCare/Vivacare/home.png" alt="Tela Inicial" width="90%"/>
  
</div>

<br /><br />

<table align="center" width="100%">
  <tr>
    <td align="center" width="50%" valign="bottom">
      <img src="https://ik.imagekit.io/vjqejp2vh/VivaCare/Vivacare/cardapocliente.png" alt="Captura de cards navegacao" width="95%"/>
    </td>
    <td align="center" width="50%" valign="bottom">
      <img src="https://ik.imagekit.io/vjqejp2vh/VivaCare/Vivacare/formcont.png" alt="Captura de Formulário" width="95%"/>
    </td>
  </tr>
  <tr>
    <td align="center"><b>Cards de Navegação</b></td>
    <td align="center"><b>Formulário para Contato</b></td>
  </tr>

  <tr>
    <td colspan="2"><br><br></td>
  </tr>

  <tr>
    <td align="center" width="50%" valign="bottom">
      <img src="https://ik.imagekit.io/vjqejp2vh/VivaCare/Vivacare/sobre.png" alt="Captura de Sobre" width="95%"/>
    </td>
    <td align="center" width="50%" valign="bottom">
      <img src="https://ik.imagekit.io/vjqejp2vh/VivaCare/Vivacare/sobrequip.png" alt="Captura de Equipe" width="95%"/>
    </td>
  </tr>
  <tr>
    <td align="center"><b>Informações sobre o VivaCare</b></td>
    <td align="center"><b>Informações da Equipe</b></td>
  </tr>

  <tr>
    <td colspan="2"><br><br></td>
  </tr>

  <tr>
    <td align="center" width="50%" valign="bottom">
      <img src="https://ik.imagekit.io/vjqejp2vh/VivaCare/Vivacare/login.png" alt="Captura da tela de login" width="95%"/>
    </td>
    <td align="center" width="50%" valign="bottom">
      <img src="https://ik.imagekit.io/vjqejp2vh/VivaCare/Vivacare/cadusuario.png" alt="Captura da tela de cadastro" width="95%"/>
    </td>
  </tr>
  <tr>
    <td align="center"><b>Página de Login</b></td>
    <td align="center"><b>Página de Cadastro</b></td>
  </tr>

  <tr>
    <td colspan="2"><br><br></td>
  </tr>

  <tr>
    <td align="center" width="50%" valign="bottom">
      <img src="https://ik.imagekit.io/vjqejp2vh/VivaCare/Vivacare/cadastrarapopng.png" alt="Captura da tela de cadastro apólice" width="95%"/>
    </td>
    <td align="center" width="50%" valign="bottom">
      <img src="https://ik.imagekit.io/vjqejp2vh/VivaCare/cadcliente.png" alt="Captura da tela de cadastro cliente" width="95%"/>
    </td>
  </tr>
  <tr>
    <td align="center"><b>Cadastro de Apólice</b></td>
    <td align="center"><b>Cadastro de Cliente</b></td>
  </tr>

  <tr>
    <td colspan="2"><br><br></td>
  </tr>

  <tr>
    <td align="center" colspan="2" valign="bottom">
      <img src="https://ik.imagekit.io/vjqejp2vh/VivaCare/Vivacare/perfilatualizar.png" alt="Captura do Perfil Usuário" width="47.5%"/>
    </td>
  </tr>
  <tr>
    <td align="center" colspan="2"><b>Perfil Corretor</b></td>
  </tr>
</table>
------

## 5. 💻 Tecnologias

| Item                       | Descrição  |
| -------------------------- | ---------- |
| 🖥️ **Servidor** | Node JS    |
| ⌨️ **Linguagem de programação** | TypeScript |
| ⚛️ **Biblioteca** | React JS   |
| ⚡ **Build** | Vite       |
| 🎨 **Framework de Estilização** | Tailwind CSS |
| 🛣️ **Roteamento** | React Router DOM |

---

## 6. 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter a seguinte ferramenta instalada:

- [Node.js](https://nodejs.org/) (v16+)
 
## 7. 🚀 Configuração e Execução Local

Para testar a plataforma completa na sua máquina, é necessário rodar o Back-end (API) e o Front-end. Siga os passos abaixo:

### ⚙️ 1. Iniciando o Back-end (API)
1. Clone o repositório do Back-end do VivaCare:
   ```bash
   git clone https://github.com/Javascript13-Grupo02/Projeto-integrador-03-VivaCare.git
   ```
2. Siga as instruções no `README.md` do Back-end para instalar as dependências e iniciar o servidor (certifique-se de que a API está rodando corretamente, geralmente em `http://localhost:4000`).

### 💻 2. Iniciando o Front-end (React)
1. Clone este repositório do Front-end:
   ```bash
   git clone https://github.com/Javascript13-Grupo02/Projeto-Integrador-06-VivaCare-Frontend.git
   ```
2. Acesse a pasta do projeto e instale as dependências: 
   ```bash
   cd Projeto-Integrador-06-VivaCare-Frontend
   npm install
   ```
3. *(Opcional)* Caso a sua API local esteja rodando em uma porta diferente, verifique o arquivo de configuração de serviços (`src/services/Service.ts`) e atualize a URL base se necessário.
4. Execute o projeto: 
   ```bash
   npm run dev
   ```
5. A aplicação estará disponível no seu navegador no endereço: `http://localhost:5173`

---

## 8. 📁 Estrutura do Projeto

A arquitetura do front-end foi organizada visando a separação de responsabilidades (separando a lógica de estado das interfaces visuais), facilitando a escalabilidade. Abaixo está a estrutura de diretórios principal na pasta `src/`:


```text
📦 Projeto VivaCare
├── src/
   ├── components/         # Componentes visuais reutilizáveis e isolados
   │   ├── apolice/        # Gestão visual das coberturas de seguro de vida
   │   │   ├── cardapolice/    # Componente para exibição resumida da apólice
   │   │   ├── deletarapolice/ # Tela/Componente de confirmação de exclusão
   │   │   ├── formapolice/    # Formulário para criar/editar as condições do seguro
   │   │   ├── listaapolice/   # Tabela ou grade listando as apólices ativas
   │   │   └── modalapolice/   # Modal para interações rápidas sem sair da tela
   │   │
   │   ├── cliente/        # Gestão visual da carteira de segurados do corretor
   │   │   ├── cardcliente/    # Resumo dos dados do cliente
   │   │   ├── deletarcliente/ # Confirmação de remoção de cliente
   │   │   ├── formcliente/    # Cadastro de novos clientes na plataforma
   │   │   ├── listacliente/   # Listagem geral dos clientes do corretor
   │   │   └── modalcliente/   # Modal para visualização/edição rápida
   │   │
   │   ├── footer/         # Rodapé institucional do VivaCare (Footer.tsx)
   │   ├── formcontato/    # Formulário de suporte ou contato (FormContato.tsx)
   │   └── navbar/         # Barra de navegação principal da plataforma
   │
   ├── contexts/           # Gerenciamento de estado global
   │   └── AuthContext.tsx # Controle de sessão, login do corretor e permissões
   │
   ├── models/             # Interfaces TypeScript (Espelham o Backend)
   │   ├── Apolice.ts      # Tipagem dos dados do seguro (valor, cobertura, vigência)
   │   ├── Cliente.ts      # Tipagem dos dados do segurado
   │   ├── Usuario.ts      # Tipagem do corretor/administrador
   │   └── UsuarioLogin.ts # Tipagem específica para o payload de autenticação
   │
   ├── pages/              # Telas completas roteáveis
   │   ├── cadastro/       # Tela de registro para novos corretores
   │   ├── equipe/         # Página sobre a equipe desenvolvedora (Generation)
   │   ├── home/           # Dashboard principal pós-login (resumo de apólices/clientes)
   │   ├── login/          # Tela de entrada no sistema
   │   ├── perfil/         # Gerenciamento dos dados da conta do corretor
   │   └── sobre/          # Landing page explicando os benefícios do VivaCare
   │
   ├── services/           # Comunicação com a API (Backend)
   │   └── Service.ts      # Configuração do Axios para chamadas REST
   │
   ├── utils/              # Funções utilitárias reaproveitáveis
   │   ├── ChecagemIdade.ts # Validação de idade mínima para contratação do seguro
   │   └── ToastAlerta.ts   # Alertas visuais padronizados (sucesso, erro)
   │
   ├── App.css             # Estilizações globais auxiliares
   ├── App.tsx             # Componente Raiz (Provedor de Contextos e Rotas)
   ├── index.css           # Diretrizes base do Tailwind CSS
   └── main.tsx            # Ponto de inicialização do React

```


------

<p align="center">
  Desenvolvido por <b>AllCare</b>.
</p>

<p align="center">
  <img src="https://ik.imagekit.io/vjqejp2vh/proj03/Logo%20AllCare%20Cores%20Claras.png" alt="AllCare" width="300">
</p>
