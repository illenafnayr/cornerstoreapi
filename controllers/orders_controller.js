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


// Read All
orders.get('/', async(req, res)=>{
    try {
        const orders = await Order.findAll({ include: 'user'})
        return res.json(orders)
    } catch(error) {
        console.log(error)
        return res.status(500).json({error: 'something went wrong'})
    }
})

// Read One
orders.get('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const order = await Order.findOne({
            where: { uuid }
        })
        return res.json(order)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'something went wrong'})
    }
})

orders.patch('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const order = await Order.findOne({ where: { uuid } })
       for (const i in req.body) {
           order[i] = req.body[i]
       }
        
        await order.save()
        res.json(order)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'something went wrong' })
    }
})

// Delete One
orders.delete('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const order = await Order.findOne({
            where: { uuid }
        })
        await order.destroy()
        return res.json({ message: `Order with UUID:${uuid} was deleted` })
    } catch (error) {
        
    }
})

module.exports =orders;