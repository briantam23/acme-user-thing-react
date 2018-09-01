const db = require('./db');
const { User, Thing, UserThing } = db.models;
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

app.listen(PORT, () => `listening on port ${PORT}`);

app.use('/public', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/users', (req, res, next) => {
    User.findAll({
        include: [ {
            model: UserThing,
            include: [ Thing ] 
        }]
    })
        .then(users => res.send(users))
        .catch(next);
})



db.syncAndSeed();