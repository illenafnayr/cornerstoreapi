// Dependencies //
const express = require('express');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
const { sequelize } = require('./models');
const bodyParser = require("body-parser");
const cors = require("cors");


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

// Routes
const usersController = require('./controllers/users_controller.js')
app.use('/users', usersController)

const paymentsController = require('./controllers/payments_controller.js')
app.use('/payments', paymentsController)

const addressesController = require('./controllers/addresses_controller.js')
app.use('/addresses', addressesController)

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