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
    },
        MostraDados: async (req, res) => {
        try {
            const dados = await sistemModel.Dados()
            res.json(dados)
        } catch (error) {
            console.error("Erro ao mostrar dados:", error);
            res.status(500).json({ erro: "Erro ao mostrar dados" });
        }
    }
}

module.exports = financeiroController
