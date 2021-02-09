const express = require('express');
const users = express.Router()
const { sequelize, User } = require('../models');


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
        const users = await User.findAll()
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
            where: { uuid }
        })
        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'something went wrong'})
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
        
    }
})

module.exports = users;