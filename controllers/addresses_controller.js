const express = require('express');
const addresses = express.Router()
const { sequelize, User, Address } = require('../models');


// Create
addresses.post('/', async(req, res)=>{
    const { userUuid, street, city, state, zipcode, isShipping, isBilling } = req.body
    try {
        // find user by uuid
        const user = await User.findOne({
            where:  { uuid: userUuid }
        })
        const address = await Address.create({ userId: user.id, street, city, state, zipcode, isShipping, isBilling })
        return res.json(address)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})


// Read All
addresses.get('/', async(req, res)=>{
    try {
        const addresses = await Address.findAll({ include: 'user'})
        return res.json(addresses)
    } catch(error) {
        console.log(error)
        return res.status(500).json({error: 'something went wrong'})
    }
})

// Read One
addresses.get('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const address = await Address.findOne({
            where: { uuid }
        })
        return res.json(address)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'something went wrong'})
    }
})

addresses.patch('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const address = await Address.findOne({ where: { uuid } })
       for (const i in req.body) {
           address[i] = req.body[i]
       }
        
        await address.save()
        res.json(address)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'something went wrong' })
    }
})

// Delete One
addresses.delete('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const address = await Address.findOne({
            where: { uuid }
        })
        await address.destroy()
        return res.json({ message: `Address with UUID:${uuid} was deleted` })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'something went wrong' })
    }
})

module.exports = addresses;