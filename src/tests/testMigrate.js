const sequelize = require('../utils/connection');
const request = require('supertest'); 
const app = require('../app.js');

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();

        const testUser = {
            firstName: "Abigail",
            lastName: "Gomez",
            email: "aby@gmail.com",
            password: "aby123",
            gender: "female",
        }

        await request(app).post('/users').send(testUser);
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();