const express = require('express');
const app = express();

const port = 3000;
const bodyParser = require('body-parser');

//configurar EJS como mecanismo de visualização
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//configurar o estilo que está na public
app.use(express.static('public'));

//configurar bodyParser do formulário
app.use(bodyParser.urlencoded({extend: true}));


//simular banco de dados
const posts = [
    {
        id: 1,
        titulo: 'primeiro post',
        conteudo: 'conteudo do 1 post'
    },
    {
        id: 2,
        titulo: 'segundo post',
        conteudo: 'conteudo do 2 post'
    },
    {
        id: 3,
        titulo: 'terceiro post',
        conteudo: 'conteudo do 3 post'
    },
];

//rota princiapl
app.get('/', (req, res) => {
    res.render('index', {posts})
});

app.get('/post/:id', (req, res) => {
    const id = req.params.id;
    const post = posts.find(post => post.id === parseInt(id));

    res.render('post', {post});
});

//Rota para adicionar a postagem
app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    const { titulo, conteudo } = req.body;
    const id = posts.length + 1;
    posts.push({id, titulo, conteudo});
    res.redirect('/');
});

app.listen(port, () => {
    console.log('server rodando');
});