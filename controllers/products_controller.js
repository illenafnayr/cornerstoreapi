const express = require('express');
const products = express.Router()
const { sequelize, Category, Product, Attribute } = require('../models');



// Create
products.post('/', async(req, res)=>{
    const { categoryUuid, attributeUuid, name, description } = req.body
    try {
        // find user by uuid
        const category = await Category.findOne({
            where:  { uuid: categoryUuid }
        })

        const product = await Product.create({ categoryId: category.id, name, description })
        return res.json(product)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})


// Read All
products.get('/', async(req, res)=>{
    try {
        const products = await Product.findAll({ include: ['category', {model: Attribute, include: 'attributeValues'}]})
        return res.json(products)
    } catch(error) {
        console.log(error)
        return res.status(500).json({error: 'something went wrong'})
    }
})

// Read One
products.get('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const product = await Product.findOne({
            where: { uuid },
            include: ['category', 'attributes']
        })
        return res.json(product)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'something went wrong'})
    }
})

products.patch('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const product = await Product.findOne({ where: { uuid } })
       for (const i in req.body) {
           product[i] = req.body[i]
       }
        
        await product.save()
        res.json(product)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'something went wrong' })
    }
})

// Delete One
products.delete('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const product = await Product.findOne({
            where: { uuid }
        })
        await product.destroy()
        return res.json({ message: `Product with UUID:${uuid} was deleted` })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'something went wrong' })
    }
})

module.exports = products;