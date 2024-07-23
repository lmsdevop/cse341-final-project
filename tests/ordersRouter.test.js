const request = require('supertest');
const app = require('../app');

describe('Order API', () => {
    let orderId;

    test('GET /orders should return all orders', async () => {
        const res = await request(app).get('/orders');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('POST /orders should create a new order', async () => {
        const newOrder = {
            order_service_code: 'S001',
            order_client_cpf: 12345678901,
            order_vehicle_sign: 'XYZ1234',
            order_status: 'open',
            order_date_request: new Date()
        };

        const res = await request(app).post('/orders').send(newOrder);
        expect(res.status).toBe(201);
        expect(res.body.order_status).toBe(newOrder.order_status);
        orderId = res.body._id;
    });

    test('GET /orders/:order_id should return a single order', async () => {
        const res = await request(app).get(`/orders/${orderId}`);
        expect(res.status).toBe(200);
        expect(res.body.order_status).toBe('open');
    });
    test('PUT /orders/:order_id should update an order', async () => {
        const updatedOrder = {
            order_status: 'closed'
        };

        const res = await request(app).put(`/orders/${orderId}`).send(updatedOrder);
        expect(res.status).toBe(200);
        expect(res.body.order_status).toBe(updatedOrder.order_status);
    });

    test('DELETE /orders/:order_id should delete an order', async () => {
        const res = await request(app).delete(`/orders/${orderId}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Order deleted');
    });

    test('GET /orders/:order_id should return 404 for deleted order', async () => {
        const res = await request(app).get(`/orders/${orderId}`);
        expect(res.status).toBe(404);
    });
});


