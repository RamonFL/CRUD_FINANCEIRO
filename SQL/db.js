const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'sistema_financeiro',
    password: '230996',
    port: 5432,
});

client.connect()
.then(() => console.log('Conectado ao banco de dados!'))
.catch(err => console.error('Erro na conexão', err));

module.exports = client