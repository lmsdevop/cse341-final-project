const request = require('supertest');
const app = require('../app');

describe('Vehicle API', () => {
    let vehicleSign = 'XYZ1234';

    test('GET /vehicles should return all vehicles', async () => {
        const res = await request(app).get('/vehicles');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('POST /vehicles should create a new vehicle', async () => {
        const newVehicle = {
            vehicle_renavam: 12345678901,
            vehicle_sign: vehicleSign,
            vehicle_fabrication_year: new Date('2020-01-01'),
            vehicle_model_year: new Date('2021-01-01'),
            vehicle_brand: 'Toyota',
            vehicle_model: 'Corolla',
            vehicle_chassi: '1HGCM82633A123456',
            vehicle_color: 'Blue',
            vehicle_category: 'owner',
            vehicle_gas: 'flex',
            vehicle_client_cpf: 12345678901
        };

        const res = await request(app).post('/vehicles').send(newVehicle);
        expect(res.status).toBe(201);
        expect(res.body.vehicle_sign).toBe(newVehicle.vehicle_sign);
    });

    test('GET /vehicles/:vehicle_sign should return a single vehicle', async () => {
        const res = await request(app).get(`/vehicles/${vehicleSign}`);
        expect(res.status).toBe(200);
        expect(res.body.vehicle_sign).toBe(vehicleSign);
    });
    test('PUT /vehicles/:vehicle_sign should update a vehicle', async () => {
        const updatedVehicle = {
            vehicle_color: 'Red'
        };

        const res = await request(app).put(`/vehicles/${vehicleSign}`).send(updatedVehicle);
        expect(res.status).toBe(200);
        expect(res.body.vehicle_color).toBe(updatedVehicle.vehicle_color);
    });

    test('DELETE /vehicles/:vehicle_sign should delete a vehicle', async () => {
        const res = await request(app).delete(`/vehicles/${vehicleSign}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Vehicle deleted');
    });

    test('GET /vehicles/:vehicle_sign should return 404 for deleted vehicle', async () => {
        const res = await request(app).get(`/vehicles/${vehicleSign}`);
        expect(res.status).toBe(404);
    });
});
