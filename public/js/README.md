# Diretório de JavaScript

Este diretório será preenchido automaticamente durante a compilação do projeto com os arquivos JavaScript compilados a partir dos arquivos TypeScript.

## Arquivos esperados após a compilação

- `main.js` - Código principal compilado a partir de src/public/js/main.ts
- `particles.js` - Configuração do particles.js compilado a partir de src/public/js/particles-config.ts

## Observações

- Não adicione arquivos JavaScript manualmente neste diretório
- Os arquivos neste diretório são gerados pelo webpack durante o build
- Em ambiente de desenvolvimento, quando executando `npm run dev`, os arquivos serão atualizados automaticamente

Para gerar os arquivos JavaScript, execute:

```bash
npm run build
```