const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Controllers
const relatorioControllers = require('./controllers/relatorioControllers');
const produtoControllers = require('./controllers/produtoControllers');

// Configurações
app.set('view engine', 'ejs');
app.use(express.static(path.resolve('./public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas principais
app.get('/', relatorioControllers.getTela);
app.get('/cadastro', relatorioControllers.getCadastro);
app.get('/relatorios', relatorioControllers.getRelatorios);
app.get('/login', relatorioControllers.getLogin);

// Rotas de categoria (filtradas)
app.get('/monitores', relatorioControllers.getMonitores);
app.get('/gabinetes', relatorioControllers.getGabinetes);
app.get('/acessorios', relatorioControllers.getAcessorios);

// Rotas de produto (com multer para upload)
app.get('/add', (req, res) => res.render('add'));
app.post('/add', produtoControllers.upload, produtoControllers.addProduto);

app.get('/edit/:id', produtoControllers.getProdutoById);
app.post('/edit/:id', produtoControllers.upload, produtoControllers.updateProduto);

app.get('/delete/:id', produtoControllers.getDeleteByProduto);
app.post('/delete/:id', produtoControllers.deleteProduto);

// Servidor
app.listen(2000, () => {
    console.log('Servidor rodando na porta http://localhost:2000');
});
