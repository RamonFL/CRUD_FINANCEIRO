const sistemModel = require("../Model/sistemModel")

const financeiroController = {
    Criar: (req, res) => {
        console.log(req.body);
        res.send("Teste")
        // const objeto = sistemModel.CriarDados()
        // res.send(console.log(objeto))
    }
}

module.exports = financeiroController
