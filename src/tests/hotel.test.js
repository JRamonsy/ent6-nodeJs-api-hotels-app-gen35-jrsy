const app = require('../app.js');
const request = require('supertest'); 

let token;
let id;

beforeAll(async () => {
  const credentials = {
    email: "aby@gmail.com",
    password: "aby123",
  }
  const res = await request(app).post('/users/login').send(credentials);
  token = res.body.token;
});

test('GET /hotels debe traer todos los hoteles', async () => {
  const res = await request(app).get('/hotels');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /hotels debe crear un hotel', async () => {
  const newHotel = {
    name: 'Chicago',
    description: 'Hotel description',
    price: '500',
    address: 'Av. Arenal',
    lat: 123.123,
    lon: 123.123,
  };
  const res = await request(app)
    .post('/hotels')
    .send(newHotel)
    .set('Authorization', `Bearer ${token}`);
;
  id = res.body.id;
  console.log(res.body)
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(newHotel.name);
  expect(res.body.id).toBeDefined();
});

test('PUT /hotels/:id debe actualizar un hotel', async () => {
  const updateHotel = {
    name: "Chicagos"
  }
  const res = await request(app).put(`/hotels/${id}`)
    .send(updateHotel)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updateHotel.name);
});

test('GET /hotels/:id debe traer un hotel por id', async () => {
  const res = await request(app).get(`/hotels/${id}`);
  expect(res.status).toBe(200);
});

test('DELETE /hotels debe eliminar un hotel', async () => {
  const res = await request(app)
    .delete(`/hotels/${id}`)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
});