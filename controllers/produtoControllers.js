const Produto = require('../models/ProdutoModel')
const multer = require('multer');
const path = require('path');

// Configuração do multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img'); // Pasta onde a imagem será salva
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome do arquivo salvo
    }
});

const upload = multer({ storage });

// ✅ ESSA LINHA é o que precisa para funcionar no app.js:
exports.upload = upload.single('imagem');


exports.getAllProduto = (req, res) => {
    Produto.getAllProduto((Produto) => {
        res.render('relatorios', { Produto });
    });
};

exports.getProdutoById = (req, res) => {
    const ProdutoId = req.params.id;
    Produto.getProdutoById(ProdutoId, (Produto) => {
        res.render('edit', { Produto });
    });
};

// Exibir usuário antes de deletar
exports.getDeleteByProduto = (req, res) => {
    const ProdutoId = req.params.id;
    Produto.getProdutoById(ProdutoId, (Produto) => {
        res.render('delete', { Produto });
    });
};

exports.addProduto = (req, res) => {
    console.log('Body:', req.body);
    console.log('File:', req.file);

    const newProduto = {
        name: req.body.name,
        descricao: req.body.descricao,
        preco: req.body.preco,
        categoria: req.body.categoria,
        imagem: req.file ? '/img/' + req.file.filename : null
    };

    Produto.addProduto(newProduto, () => {
        res.redirect('/relatorios'); // Redireciona para a lista de produtos
    });
};

exports.updateProduto = (req, res) => {
    const ProdutoId = req.params.id;
    const updatedProduto = {
        name: req.body.name,
        descricao: req.body.descricao,
        preco: req.body.preco
    };
    Produto.updateProduto(ProdutoId, updatedProduto, () => {
        res.redirect('/relatorios');
    });
};

exports.deleteProduto = (req, res) => {
    const ProdutoId = req.params.id;
    Produto.deleteProduto(ProdutoId, () => {
        res.redirect('/relatorios');
    });
};


//Função usada para logar
exports.loginAdmin = (req, res) => {
    const { Adminname, password } = req.body;
    Admin.getAdminByAdminname(Adminname, (Admin) => {
        if (Admin && Admin.pass === password) {
            res.redirect('/')
        } else {
            res.render('login', { loginFalhou: true});
        }
   })
};
