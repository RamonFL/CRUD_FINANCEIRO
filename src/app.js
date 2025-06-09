const express = require('express')
const cors = require('cors')
const router = require('./routes')
const app = express()
const PORT = 3000

// Middleware para interpretar JSON no corpo da requisição
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const client = require('../SQL/db');

client.query('SELECT * FROM tb_fluxo_caixa', (err, res) => {
    if (err) {
    console.error('Erro ao executar a query', err);
    } else {
    console.log(res.rows); // mostra os dados da tabela
    }
})

app.use(router)

app.listen(PORT, () => console.log(`Servidor iniciado!\nRodando em http://localhost:${PORT}/`))
