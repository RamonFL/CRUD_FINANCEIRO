const express = require('express');
const financeiroController = require('../Back/Controller/financeiroController');
const router = express.Router();

router.post('/criar', financeiroController.Criar)
router.delete('/deletar', financeiroController.Deletar)
router.get('/dados', financeiroController.MostraDados)

module.exports = router;