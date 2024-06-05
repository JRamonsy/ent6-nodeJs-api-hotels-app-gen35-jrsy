const app = require('../app.js');
const request = require('supertest'); 

let id;
let token;

beforeAll(async () => {
  const credentials = {
    email: "aby@gmail.com",
    password: "aby123",
  }
  const res = await request(app).post('/users/login').send(credentials);
  console.log(res.body)
  token = res.body.token;
});

test('GET /bookings debe traer todas las reservaciones', async () => {
  const res = await request(app)
    .get('/bookings')
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /booking debe crear una reservación', async () => {
  const bookingBody = {
    checkIn: "1990-07-31",
    checkOut: "1990-07-31"
  }
  const res = await request(app)
    .post('/bookings')
    .send(bookingBody)
    .set('Authorization', `Bearer ${token}`);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.checkIn).toBe(bookingBody.checkIn);
});

test('PUT /bookings/:id debe actualizar una reservacion', async () => {
  const updateBookings = {
    checkIn: "2024-07-31"
  }
  const res = await request(app).put(`/bookings/${id}`)
    .send(updateBookings)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updateBookings.name);
});

test('DELETE /bookings/:id debe eliminar una reservación', async () => {
  const res = await request(app)
    .delete(`/bookings/${id}`)
    .set('Authorization', `Bearer ${token}`)
  expect(res.status).toBe(204);
  
});