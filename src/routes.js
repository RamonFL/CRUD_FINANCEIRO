const express = require('express');
const financeiroController = require('../Back/Controller/financeiroController');
const router = express.Router();


router.post('/lista', financeiroController.Criar)

router.get('/lista', (req, res) => {
    res.send('lista')
})

module.exports = router;