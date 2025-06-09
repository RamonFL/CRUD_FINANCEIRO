const client = require('../../SQL/db');

let id = 1
const sistemModel = {
    CriarDados(description, financial, entry, date) {
        
        const inserirdados = async (date, financial, description, entry) => {

        try {
            await client.query('INSERT INTO tb_fluxo_caixa (data, valor, descricao, tipo) VALUES ($1, $2, $3, $4)', [date, financial, description, entry]);
            console.log('Dados inserido com sucesso!');
        } catch (err) {
            console.error('Erro ao inserir dados:', err);
        }
        };
        
        inserirdados(date, financial, description, entry)
    },

    ExcluirDados(id){
        const index = arr.findIndex(item => item.id == id)

        if(index !== -1){
            arr.splice(index, 1)
        }else{
            console.log("objeto nao encontrado")
        }
    }
}

module.exports = sistemModel