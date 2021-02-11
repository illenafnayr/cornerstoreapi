const express = require('express');
const orderDetails = express.Router()
const { sequelize, OrderDetail, Order } = require('../models');


// Create
orderDetails.post('/', async(req, res)=>{
    const { orderUuid, qty} = req.body
    try {
        // find user by uuid
        const order = await Order.findOne({
            where:  { uuid: orderUuid }
        })
        const orderDetail = await OrderDetail.create({ orderId: order.id, qty })
        return res.json(orderDetail)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})


// Read All
orderDetails.get('/', async(req, res)=>{
    try {
        const orderDetails = await OrderDetail.findAll({ include: 'order'})
        return res.json(orderDetails)
    } catch(error) {
        console.log(error)
        return res.status(500).json({error: 'something went wrong'})
    }
})

// Read One
orderDetails.get('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const orderDetail = await OrderDetail.findOne({
            where: { uuid }
        })
        return res.json(orderDetail)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'something went wrong'})
    }
})

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

module.exports = orderDetails;