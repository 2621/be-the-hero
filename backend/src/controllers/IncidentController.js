const connection = require('../database/connection');

module.exports = {
    async index(request,response) {
        const { page = 1} = request.query;//para fazer por página /incidents?page=2

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs','ong_id','=', 'incidents.ong_id')//para também imprimir os dados da tabela de ONGs, com um determinado id
            .limit(5)//para a paginação, limita em 5 por página
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);
    
        response.header('X-Total-Count', count['count(*)']);
        
        return response.json(incidents);
    },

    async create(request,response){
        const { title, description, value } = request.body;
    
        //headers: guarda informação do contexto da requisição
        //é onde faremos a autenticação da ong em questão
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        //verificar se o o incidente a ser deletado pertence à ong certa
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();//só pega o 1º resultado da pesquisa, já q só vai ter um
        
        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.'});
        }

        await connection('incidents').where('id',id).delete();

        return response.status(204).send();
    }
}