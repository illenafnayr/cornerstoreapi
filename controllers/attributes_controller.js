const express = require('express');
const attributes = express.Router()
const { sequelize, Attribute, Product } = require('../models');


// Create
attributes.post('/', async(req, res)=>{
    const { productUuid, name } = req.body
    try {

        // find product by uuid
        const product = await Product.findOne({
            where:  { uuid: productUuid }
        })

        const attribute = await Attribute.create({ productId: product.id, name })
        return res.json(attribute)
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
})

// Read All
attributes.get('/', async(req, res)=>{
    try {
        const attributes = await Attribute.findAll({
            include: ['attributeValue']
        })
        return res.json(attributes)
    } catch(error) {
        console.log(error)
        return res.status(500).json({error: 'something went wrong'})
    }
})

// Read One
attributes.get('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const attribute = await Attribute.findOne({
            where: { uuid },
            // include: ['subCategory']
        })
        return res.json(attribute)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'something went wrong' })
    }
})

// Delete One
attributes.delete('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const attribute = await Attribute.findOne({
            where: { uuid }
        })
        await attribute.destroy()
        return res.json({ message: `Category with UUID:${uuid} was deleted` })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'something went wrong' })
    }
})

attributes.patch('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const attribute = await Attribute.findOne({ where: { uuid } })
       for (const i in req.body) {
           attribute[i] = req.body[i]
       }
        
        await attribute.save()
        res.json(attribute)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'something went wrong' })
    }
})

module.exports = attributes;