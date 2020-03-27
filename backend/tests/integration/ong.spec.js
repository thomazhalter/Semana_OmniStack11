const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            //exemplo para authorization
            //set('Authorization', 'ID_exemplo')
            .send({           
                name: "APAD2",
                email: "teste@teste.com.br",
                whatsapp: "11987654321",
                city: "Itu",
                uf: "SP"	            
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
})