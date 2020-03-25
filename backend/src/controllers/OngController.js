const crypto = require('crypto'); //criptografia, mas vai ser utilizado para gerar um texto aleatório para o ID da ong
const connection = require('../database/connection');


module.exports = {
    async index(request,response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request,response){
        // const data = request.body;
        const {name, email, whatsapp, city, uf} = request.body;
        //console.log(data);

        //criar o ID da ong: gera 4 bytes de caracteres hexadecimais
        const id = crypto.randomBytes(4).toString('HEX');
        //passar os dados para o banco de dados:
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
   
        //com o await, só vai para a próxima parte depois que aquela acabar. Para usar await, precisa do async na parte de cima.
        return response.json({id}); // só vamos retornar o ID da ong, pois é essa info que utilizaremos
    }
}