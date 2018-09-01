const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme-user-thing-react', {
    logging: false
});

const User = conn.define('user', {
    name: Sequelize.STRING
})

const Thing = conn.define('thing', {
    name: Sequelize.STRING
})

const UserThing = conn.define('userThing', {
    name: Sequelize.STRING
})

User.hasMany(UserThing);
Thing.hasMany(UserThing);

UserThing.belongsTo(User);
UserThing.belongsTo(Thing);

const syncAndSeed = () => {
    let moe, larry, shep, joe, curly, foo1, foo2, foo3, bazz1, bazz2;
    return conn.sync({ force: true })
        .then(() => {
            return Promise.all([
                User.create({ name: 'moe' }),
                User.create({ name: 'larry' }),
                User.create({ name: 'shep' }),
                User.create({ name: 'joe' }),
                User.create({ name: 'curly' })
            ]) 
        })
        .then((users) => {
            [moe, larry, shep, joe, curly] = users;
            return Promise.all([
                Thing.create({ name: 'foo' }),
                Thing.create({ name: 'foo' }),
                Thing.create({ name: 'foo' }),
                Thing.create({ name: 'bazz' }),
                Thing.create({ name: 'bazz' })
            ])
        })
        .then(things => {
            [foo1, foo2, foo3, bazz1, bazz2] = things;
            return Promise.all([
                UserThing.create({ userId: moe.id, thingId: foo1.id }),
                UserThing.create({ userId: moe.id, thingId: foo2.id }),
                UserThing.create({ userId: larry.id, thingId: foo3.id }),
                UserThing.create({ userId: larry.id, thingId: bazz1.id }),
                UserThing.create({ userId: shep.id, thingId: bazz2.id })
            ])
        })
}


module.exports = {
    models: {
        User,
        Thing,
        UserThing
    },
    syncAndSeed
}