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

## Recursos Necessários

Para o funcionamento completo da aplicação, você precisa adicionar:

### Imagens

Adicione as imagens referenciadas no HTML:
- Logos: `public/img/logos/`
- Imagens de conteúdo: `public/img/`

### Vídeos

Os seguintes vídeos são referenciados no código:
- `public/video/0001-0600.mp4`
- `public/video/dobra13_UBNZ_LinhaDoTempo.mp4`

## Notas de Implementação

A aplicação foi reconstruída a partir de um site HTML/CSS/JS original, convertendo seu código JavaScript para TypeScript com tipagem adequada. Foram implementadas as seguintes melhorias:

1. **Servidor Express**: Aplicação servida por um servidor Node.js usando Express
2. **TypeScript**: Código com tipagem forte para melhor manutenção
3. **Webpack**: Sistema de build moderno para compilação dos assets
4. **Estrutura Organizada**: Separação clara entre código fonte e arquivos compilados

## Licença

ISC