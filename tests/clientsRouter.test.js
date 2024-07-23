const request = require('supertest');
const app = require('../app');


describe('Client API', () => {
    let clientId;

    test('GET /clients should return all clients', async () => {
        const res = await request(app).get('/clients');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('POST /clients should create a new client', async () => {
        const newClient = {
            client_cpf: 12345678901,
            client_name: 'John Doe',
            client_type: 'DETRAN',
            client_civil: 'single',
            client_gender: 'male',
            client_phone: 1234567890,
            client_email: 'john.doe@example.com',
        };

        const res = await request(app).post('/clients').send(newClient);
        console.log('Response:', res.body);
        expect(res.status).toBe(201);
        expect(res.body.client_name).toBe(newClient.client_name);
        clientId = res.body._id;
    });

    test('GET /clients/:client_cpf should return a single client', async () => {
        const res = await request(app).get(`/clients/${12345678901}`);
        expect(res.status).toBe(200);
        expect(res.body.client_name).toBe('John Doe');
    });

    test('PUT /clients/:client_cpf should update a client', async () => {
        const updatedClient = {
            client_name: 'Jane Doe',
        };

        const res = await request(app).put(`/clients/${12345678901}`).send(updatedClient);
        expect(res.status).toBe(200);
        expect(res.body.client_name).toBe('Jane Doe');
    });

    test('DELETE /clients/:client_cpf should delete a client', async () => {
        const res = await request(app).delete(`/clients/${12345678901}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Client deleted');
    });
    test('GET /clients/:client_cpf should return 404 for deleted order', async () => {
        const res = await request(app).get(`/clients/${12345678901}`);
        expect(res.status).toBe(404);
    });
});

