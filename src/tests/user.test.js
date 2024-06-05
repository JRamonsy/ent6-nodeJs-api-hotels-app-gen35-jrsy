const request = require('supertest'); // importacion de los siguientes 2 comandos
const app = require('../app.js');

let id; //se crea la variable que contendra el id
let token; //se crea la variable que contendra el token

// 1. POST /users crear
// 2. POST /users/login logear
// 3. El resto de los tests
// 4. crear variable global token
// 5. asignar el token que se genero en el login
// 6. pasar a los Endpoints protegidos el token con .set

test('POST /users debe crear aun asuario', async () => {
  const newUser = {
    firstName: 'test user',
    lastName: 'test user',
    email: 'test@gmail.com',
    password: 'test123',
    gender: 'other',
  }
  const res = await request(app).post('/users').send(newUser);
  id = res.body.id;
  // console.log(res.body);
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(newUser.firstName);
});

test('POST /users/login debe logear al usuario', async () => { // este Endpoints genera el token
  const credentials = {
    email: 'test@gmail.com',
    password: 'test123',
  }
  const res = await request(app).post('/users/login').send(credentials);
  token = res.body.token; // se asigna el token 
  expect(res.status).toBe(200);
  expect(res.body.token).toBeDefined();
  expect(res.body.user.email).toBe(credentials.email);
});

test('GET /users debe traer todos los usuarios', async () => {
  const res = await request(app).get('/users').set("Authorization", `Bearer ${token}`) //se utiliza el token
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /users/login con credenciales incorrectas debe dar error', async () => {
  const credentials = {
    email: 'incorrect@gmail.com',
    password: 'incorrect123',
  }
  const res = await request(app).post('/users/login').send(credentials);
  expect(res.status).toBe(401);
});

test('DELETE /users/:id debe eliminar un ususario', async () => {
  const res = await request(app)
    .delete(`/users/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});

