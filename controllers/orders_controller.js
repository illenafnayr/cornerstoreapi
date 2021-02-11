const express = require('express');
const orders = express.Router()
const { sequelize, Order, User } = require('../models');


// Create
orders.post('/', async(req, res)=>{
    const { userUuid } = req.body
    try {
        // find user by uuid
        const user = await User.findOne({
            where:  { uuid: userUuid }
        })
        const order = await Order.create({ userId: user.id })
        return res.json(order)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})


// // Read All
// payments.get('/', async(req, res)=>{
//     try {
//         const payments = await Payment.findAll({ include: 'user'})
//         return res.json(payments)
//     } catch(error) {
//         console.log(error)
//         return res.status(500).json({error: 'something went wrong'})
//     }
// })

// // Read One
// payments.get('/:uuid', async(req, res)=>{
//     const uuid = req.params.uuid
//     try {
//         const payment = await Payment.findOne({
//             where: { uuid }
//         })
//         return res.json(payment)
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({error: 'something went wrong'})
//     }
// })

// payments.patch('/:uuid', async(req, res)=>{
//     const uuid = req.params.uuid
//     try {
//         const payment = await Payment.findOne({ where: { uuid } })
//        for (const i in req.body) {
//            payment[i] = req.body[i]
//        }
        
//         await payment.save()
//         res.json(payment)
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ error: 'something went wrong' })
//     }
// })

// // Delete One
// payments.delete('/:uuid', async(req, res)=>{
//     const uuid = req.params.uuid
//     try {
//         const payment = await Payment.findOne({
//             where: { uuid }
//         })
//         await payment.destroy()
//         return res.json({ message: `Payment option with UUID:${uuid} was deleted` })
//     } catch (error) {
        
//     }
// })

module.exports = payments;