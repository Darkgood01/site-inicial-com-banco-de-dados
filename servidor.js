const mongoose = require('mongoose');

// Conectar ao MongoDB (troque "meuSite" pelo nome do seu banco)
mongoose.connect('mongodb://localhost:27017/meuSite', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB!');
});

