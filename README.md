# Urbaniz - TypeScript

Reconstrução do site oficial da Urbaniz utilizando TypeScript, Node.js e Express.

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Webpack

## Instalação

```bash
# Clonar o repositório
git clone https://github.com/GalantaTech/ts_urbaniz.git
cd ts_urbaniz

# Instalar dependências
npm install

# Compilar o projeto
npm run build

# Iniciar o servidor
npm start
```

## Scripts Disponíveis

- `npm start`: Inicia o servidor em produção
- `npm run dev`: Inicia o servidor em modo de desenvolvimento com recarregamento automático
- `npm run build`: Compila o projeto para produção
- `npm run clean`: Remove a pasta de distribuição

## Estrutura do Projeto

```
ts_urbaniz/
├── dist/                # Código compilado
├── public/              # Arquivos estáticos
│   ├── css/             # Estilos CSS
│   ├── img/             # Imagens
│   ├── js/              # JavaScript compilado
│   └── video/           # Vídeos
├── src/                 # Código fonte
│   ├── index.ts         # Ponto de entrada do servidor
│   └── public/          # Arquivos TypeScript para o frontend
│       └── js/
│           ├── main.ts
│           └── particles-config.ts
├── package.json         # Dependências e scripts
├── tsconfig.json        # Configuração do TypeScript
└── webpack.config.js    # Configuração do Webpack
```

## Licença

ISC