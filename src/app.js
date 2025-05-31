const express = require('express')
const router = require('./routes')
const app = express()
const PORT = 3000

app.use(router)

app.listen(PORT, () => console.log(`Servidor iniciado!\nRodando em http://localhost:${PORT}/`))