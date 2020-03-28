const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');


describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();//limpa o banco de dados antes de começar a testar
        await connection.migrate.latest();
    });

    afterAll( async () => {
        await connection.destroy();
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            //em rota tipo profille que tem que passar o Header: .set('Authorization', 'idvalidod');
            .send({
                name: "teste1",
                email: "contato@gmail.com",
                whatsapp: "1252345346",
                city: "curitiba",
                uf: "PR"
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});