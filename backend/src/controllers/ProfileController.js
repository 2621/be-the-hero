//para não ter dois métodos de listagem no controller de incidentes, não é uma boa prática
const connection = require('../database/connection');

module.exports = {
    async index(request,response) {
        const ong_id = request.headers.authorization;
        
        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');
    
        return response.json(incidents);
    }
}