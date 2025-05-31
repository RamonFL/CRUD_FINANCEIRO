const sistemModel = require("../Model/sistemModel")

const financeiroController = {
    Criar:(req,res) => {
        const objeto = sistemModel.CriarDados()
        res.send(console.log(objeto))
    }
}

module.exports = financeiroController
