const express = require('express');
const payments = express.Router()
const { sequelize, Payment } = require('../models');


// Create
payments.post('/', async(req, res)=>{
    const { userId, ccCompany, number, expMonth, expYear, cvv, primary } = req.body
    try {
        const payment = await Payment.create({ userId, ccCompany, number, expMonth, expYear, cvv, primary })
        return res.json(payment)
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
})

// Read All
payments.get('/', async(req, res)=>{
    try {
        const payments = await Payment.findAll()
        return res.json(payments)
    } catch(error) {
        console.log(error)
        return res.status(500).json({error: 'something went wrong'})
    }
})

// Read One
payments.get('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const payment = await Payment.findOne({
            where: { uuid }
        })
        return res.json(payment)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'something went wrong'})
    }
})

// Delete One
payments.delete('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const payment = await Payment.findOne({
            where: { uuid }
        })
        await payment.destroy()
        return res.json({ message: `${uuid} was deleted` })
    } catch (error) {
        
    }
})

module.exports = payments;