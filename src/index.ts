import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Definir pasta pública para servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Rota de fallback para SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'desenvolvimento'}`);
});