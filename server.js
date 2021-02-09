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
//For development
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });
//For deployment
// db.sequelize.sync();

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

// app.get('/users', async(req, res)=>{
//     const { firstName, lastName, email, passwd, ip } = req.body
//     try {
//         const user = await User.all({ firstName, lastName, email, passwd, ip })
//         return res.json(user)
//     } catch (error) {
//         console.log(error)
//         return res.status(500)
//     }
// })





// Routes //
// app.get("/", async (req, res) => {
//     // res.json({ message: "Welcome to bezkoder application." });
//     try {
//         let results = await db.all();
//         res.json(results)
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500)
//     }
// });






// Listening //
app.listen(PORT, async () => {
    console.log(`we get requests ... port:${PORT}`)
    await sequelize.sync({ force: true })
    console.log('database synced!')
})