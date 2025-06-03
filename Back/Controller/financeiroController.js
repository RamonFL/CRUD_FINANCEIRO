const sistemModel = require("../Model/sistemModel")
const financeiroController = {
    Criar: (req, res) => {
        const {description, financial, entry, date} = req.body
        sistemModel.CriarDados(description, financial, entry, date)
        res.send("Criado")
    },

    Deletar: (req, res) => {
        let {id} = req.body
        sistemModel.ExcluirDados(id)
        res.send("exlcuido")
    }
}

module.exports = financeiroController
