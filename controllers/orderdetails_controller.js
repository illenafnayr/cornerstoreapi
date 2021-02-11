const express = require('express');
const orderDetails = express.Router()
const { sequelize, OrderDetail, Order, Product } = require('../models');


// Create
orderDetails.post('/', async(req, res)=>{
    const { orderUuid, productUuid, qty} = req.body
    try {
        // find user by uuid
        const order = await Order.findOne({
            where:  { uuid: orderUuid }
        })

        // find product by uuid
        const product = await Product.findOne({
            where:  { uuid: productUuid }
        })

        const orderDetail = await OrderDetail.create({ orderId: order.id, productId: product.id, qty })
        return res.json(orderDetail)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})


// Read All
orderDetails.get('/', async(req, res)=>{
    try {
        const orderDetails = await OrderDetail.findAll({ include: ['order', {model: Product, include: {all:true}}]})
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

// Update One
orderDetails.patch('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const orderDetail = await OrderDetail.findOne({ where: { uuid } })
       for (const i in req.body) {
           orderDetail[i] = req.body[i]
       }
        
        await orderDetail.save()
        res.json(orderDetail)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'something went wrong' })
    }
})

orderDetails.delete('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const orderDetail = await OrderDetail.findOne({
            where: { uuid }
        })
        await orderDetail.destroy()
        return res.json({ message: `Order Detail option with UUID:${uuid} was deleted` })
    } catch (error) {
        
    }
})

module.exports = orderDetails;