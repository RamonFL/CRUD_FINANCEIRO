const express = require('express');
const financeiroController = require('../Back/Controller/financeiroController');
const router = express.Router();

router.post('/criar', financeiroController.Criar)
router.delete('/deletar', financeiroController.Deletar)

module.exports = router;