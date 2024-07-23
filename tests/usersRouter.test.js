const request = require('supertest');
const app = require('../app');

describe('User API', () => {
    let userId;

    test('GET /users should return all users', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /users should create a new user', async () => {
        const newUser = {
            username: 'johndoe',
            password: 'password123',
            email: 'john.doe@example.com'
        };

        const response = await request(app).post('/users').send(newUser);
        expect(response.status).toBe(201);
        expect(response.body.username).toBe(newUser.username);
        userId = response.body._id;
    });

    test('GET /users/:user_id should return a single user', async () => {
        const response = await request(app).get(`/users/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body.username).toBe('johndoe');
    });
    test('PUT /users/:user_id should update a user', async () => {
        const updatedUser = {
            email: 'john.doe.updated@example.com'
        };

        const response = await request(app).put(`/users/${userId}`).send(updatedUser);
        expect(response.status).toBe(200);
        expect(response.body.email).toBe(updatedUser.email);
    });

    test('DELETE /users/:user_id should delete a user', async () => {
        const response = await request(app).delete(`/users/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User deleted');
    });

    test('GET /users/:user_id should return 404 for deleted user', async () => {
        const response = await request(app).get(`/users/${userId}`);
        expect(response.status).toBe(404);
    });
});
