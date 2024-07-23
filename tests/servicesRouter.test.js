const request = require('supertest');
const app = require('../app');

describe('Service API', () => {
    let serviceCode = 'S001';

    test('GET /services should return all services', async () => {
        const res = await request(app).get('/services');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('POST /services should create a new service', async () => {
        const newService = {
            service_code: serviceCode,
            service_name: 'Oil Change',
            service_description: 'Basic oil change service',
            service_price: 50
        };

        const res = await request(app).post('/services').send(newService);
        expect(res.status).toBe(201);
        expect(res.body.service_name).toBe(newService.service_name);
    });

    test('GET /services/:service_code should return a single service', async () => {
        const res = await request(app).get(`/services/${serviceCode}`);
        expect(res.status).toBe(200);
        expect(res.body.service_name).toBe('Oil Change');
    });
    test('PUT /services/:service_code should update a service', async () => {
        const updatedService = {
            service_name: 'Premium Oil Change'
        };

        const res = await request(app).put(`/services/${serviceCode}`).send(updatedService);
        expect(res.status).toBe(200);
        expect(res.body.service_name).toBe(updatedService.service_name);
    });

    test('DELETE /services/:service_code should delete a service', async () => {
        const res = await request(app).delete(`/services/${serviceCode}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Service deleted');
    });

    test('GET /services/:service_code should return 404 for deleted service', async () => {
        const res = await request(app).get(`/services/${serviceCode}`);
        expect(res.status).toBe(404);
    });
});
