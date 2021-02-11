const express = require('express');
const attributeValues = express.Router()
const { sequelize, AttributeValue, Attribute } = require('../models');


// Create
attributeValues.post('/', async(req, res)=>{
    const { attributeId, name, price, qty } = req.body
    try {
        // find user by uuid
        const attribute = await Attribute.findOne({
            where:  { uuid: attributeUuid }
        })
        const attributeValue = await AttributeValue.create({ attributeId: attribute.id, name, price, qty })
        return res.json(attributeValue)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})


// Read All
attributeValues.get('/', async(req, res)=>{
    try {
        const attribute_values = await AttributeValue.findAll()
        return res.json(attributeValues)
    } catch(error) {
        console.log(error)
        return res.status(500).json({error: 'something went wrong'})
    }
})

// Read One
attributeValues.get('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const attributeValue = await AttributeValue.findOne({
            where: { uuid }
        })
        return res.json(attributeValue)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'something went wrong'})
    }
})

attributeValues.patch('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const attributeValue = await AttributeValue.findOne({ where: { uuid } })
       for (const i in req.body) {
           attributeValue[i] = req.body[i]
       }
        
        await attributeValue.save()
        res.json(attributeValue)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'something went wrong' })
    }
})

// Delete One
attributeValues.delete('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const attributeValue = await AttributeValue.findOne({
            where: { uuid }
        })
        await attribibuteValue.destroy()
        return res.json({ message: `Attributer value Number with UUID:${uuid} was deleted` })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'something went wrong' })
    }
})

module.exports = phonenumbers;