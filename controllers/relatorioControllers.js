const Produto = require('../models/ProdutoModel');

exports.getRelatorios = (req, res) => {
    Produto.getAllProduto((resultado) => {
        res.render('relatorios', { produtos: resultado }); // Nome precisa ser produtos
    });
};

exports.getLogin = (req, res) => {
    res.render('login');
}

exports.getTela = (req, res) => {
    res.render('main');
};

exports.getCadastro = (req, res) => {
    res.render('cadastro');
};


exports.getTodos = (req, res) => {
    res.render('todos');
}

exports.getMonitores = (req, res) => {
    Produto.getProdutosPorCategoria('monitores', (produtos) => {
        res.render('monitores', { produtos });
    });
};

exports.getGabinetes = (req, res) => {
    Produto.getProdutosPorCategoria('gabinetes', (produtos) => {
        res.render('gabinetes', { produtos });
    });
};

exports.getAcessorios = (req, res) => {
    Produto.getProdutosPorCategoria('acessorios', (produtos) => {
        res.render('acessorios', { produtos });
    });
};