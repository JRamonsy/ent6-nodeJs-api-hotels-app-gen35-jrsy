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

test('GET /reviews debe traer todas las reviews', async () => {
  const res = await request(app).get('/reviews');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Object);
});

test('POST /reviews debe crear una review', async () => {
  const newReview = {
    rating: '5',
    comment: 'comment'
  }
  const res = await request(app)
    .post('/reviews')
    .send(newReview)
    .set('Authorization', `Bearer ${token}`);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.rating).toBe(newReview.rating);
});

test('PUT /reviews/:id debe actualizar una review', async () => {
  const updateReview = {
    rating: "4"
  }
  const res = await request(app).put(`/reviews/${id}`)
    .send(updateReview)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.rating).toBe(updateReview.rating);
});

test('DELETE /reviews/:id debe eliminar una review ', async () => {
  const res = await request(app)
    .delete(`/reviews/${id}`)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
});