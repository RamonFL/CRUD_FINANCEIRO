const arr = []
let id = 1
const sistemModel = {
    CriarDados(description, financial, entry, date) {
        const objeto = {id: id++,description, financial, entry, date}
        arr.push(objeto)
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