// Dependencies //
const express = require('express');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
const { sequelize, User } = require('./models');
const bodyParser = require("body-parser");
const cors = require("cors");
// const db = require("./models");

// Config //
dotenv.config();
const PORT = process.env.PORT
const app = express();
app.use(express.json())
const corsOptions = {
    origin: "http://localhost:4321"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/users', async(req, res)=>{
    const { firstName, lastName, email, passwd, ip } = req.body
    try {
        const user = await User.create({ firstName, lastName, email, passwd, ip })
        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
})

app.get('/users', async(req, res)=>{
    try {
        const users = await User.findAll()
        return res.json(users)
    } catch(error) {
        console.log(error)
        return res.status(500).json({error: 'something went wrong'})
    }
})


// Listening //
app.listen(PORT, async () => {
    console.log(`we get requests ... port:${PORT}`)
    //For development
    // await sequelize.sync({ force: true }).then(() => {
    //     console.log("Drop and re-sync db.");
    // });
    //For deployment
    // await sequelize.sync();
    await sequelize.authenticate();
    
    console.log('database Connected!')
})