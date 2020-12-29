if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const database = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        },
        // host: '127.0.0.1',
        // user: 'postgres',
        // password: 'password',
        // database: 'smart-brain'
    }
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('root route');
});

app.get('/profile/:id', profile.handleProfileGet(database));
app.post('/signin', signin.handleSignin(database, bcrypt));
app.post('/register', register.handleRegister(database, bcrypt));
app.put('/image', image.handleImage(database));
app.post('/imageurl', image.handleApiCall);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`SERVING ON PORT ${port}`);
})