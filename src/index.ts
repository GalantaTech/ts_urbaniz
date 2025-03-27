import express from 'express';
import path from 'path';

// Inicialização do app Express
const app = express();
const PORT = process.env.PORT || 8082;

// Configuração de middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});