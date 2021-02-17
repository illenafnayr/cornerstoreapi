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
    origin: "http://localhost:8080"
};
// app.options('*', cors(corsOptions))
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });


// Routes
const usersController = require('./controllers/users_controller.js')
app.use('/users', usersController)

const paymentsController = require('./controllers/payments_controller.js')
app.use('/payments', paymentsController)

const addressesController = require('./controllers/addresses_controller.js')
app.use('/addresses', addressesController)

const phonenumbersController = require('./controllers/phonenumbers_controller.js')
app.use('/phonenumbers', phonenumbersController)

const productsController = require('./controllers/products_controller.js')
app.use('/products', productsController)

const categoriesController = require('./controllers/categories_controller.js')
app.use('/categories', categoriesController)

const attributesController = require('./controllers/attributes_controller.js')
app.use('/attributes', attributesController)

const attributeValuesController = require('./controllers/attributeValues_controller.js')
app.use('/attributevalues', attributeValuesController)

const ordersController = require('./controllers/orders_controller.js')
app.use('/orders', ordersController)

const orderDetailsController = require('./controllers/orderdetails_controller.js')
app.use('/orderdetails', orderDetailsController)

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