const express = require('express');
const phonenumbers = express.Router()
const { sequelize, User, PhoneNumber } = require('../models');


// Create
phonenumbers.post('/', async(req, res)=>{
    const { userUuid, countryCode, areaCode, number, type } = req.body
    try {
        // find user by uuid
        const user = await User.findOne({
            where:  { uuid: userUuid }
        })
        const phonenumber = await PhoneNumber.create({ userId: user.id, countryCode, areaCode, number, type })
        return res.json(phonenumber)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})


// Read All
phonenumbers.get('/', async(req, res)=>{
    try {
        const phonenumbers = await PhoneNumber.findAll({ include: 'user'})
        return res.json(phonenumber)
    } catch(error) {
        console.log(error)
        return res.status(500).json({error: 'something went wrong'})
    }
})

// Read One
phonenumbers.get('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const address = await PhoneNumber.findOne({
            where: { uuid }
        })
        return res.json(phonenumber)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'something went wrong'})
    }
})

phonenumbers.patch('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const phonenumber = await PhoneNumber.findOne({ where: { uuid } })
       for (const i in req.body) {
           phonenumber[i] = req.body[i]
       }
        
        await phonenumber.save()
        res.json(phonenumber)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'something went wrong' })
    }
})

// Delete One
phonenumbers.delete('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const phonenumber = await PhoneNumber.findOne({
            where: { uuid }
        })
        await phonenumber.destroy()
        return res.json({ message: `Phone Number with UUID:${uuid} was deleted` })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'something went wrong' })
    }
})

module.exports = phonenumbers;