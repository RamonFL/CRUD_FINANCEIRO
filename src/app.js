const express = require('express')
const cors = require('cors')
const router = require('./routes')
const app = express()
const PORT = 3000

// Middleware para interpretar JSON no corpo da requisição
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use(router)

app.listen(PORT, () => console.log(`Servidor iniciado!\nRodando em http://localhost:${PORT}/`))
