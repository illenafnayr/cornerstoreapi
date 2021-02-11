const express = require('express');
const users = express.Router()
const { sequelize, User, Order, OrderDetail, Product, Attribute, AttributeValue } = require('../models');
const order = require('../models/order');


// Create
users.post('/', async(req, res)=>{
    const { firstName, lastName, email, passwd, ip } = req.body
    try {
        const user = await User.create({ firstName, lastName, email, passwd, ip })
        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
})

// Read All
users.get('/', async(req, res)=>{
    try {
        const users = await User.findAll({
            include: ['payments', 'addresses', 'phonenumbers', {model: Order, include: {model: OrderDetail, include: {model: Product, include: {model: Attribute, include: 'attributeValues'}}}}]
        })
        return res.json(users)
    } catch(error) {
        console.log(error)
        return res.status(500).json({error: 'something went wrong'})
    }
})

// Read One
users.get('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({
            where: { uuid },
            include: ['payments', 'addresses', 'phonenumbers']
        })
        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'something went wrong' })
    }
})

// Delete One
users.delete('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({
            where: { uuid }
        })
        await user.destroy()
        return res.json({ message: `User with UUID:${uuid} was deleted` })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'something went wrong' })
    }
})

users.patch('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({ where: { uuid } })
       for (const i in req.body) {
           user[i] = req.body[i]
       }
        
        await user.save()
        res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'something went wrong' })
    }
})

module.exports = users;