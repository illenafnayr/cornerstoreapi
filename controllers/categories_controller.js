const express = require('express');
const categories = express.Router()
const { sequelize, Category, Product } = require('../models');


// Create
categories.post('/', async(req, res)=>{
    const { name, imgsrc } = req.body

    // find product by uuid
    // const product = await Product.findOne({
    //     where:  { uuid: productUuid }
    // })
    try {
        const category = await Category.create({ name, imgsrc })
        return res.json(category)
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
})

// Read All
categories.get('/', async(req, res)=>{
    try {
        const categories = await Category.findAll({
            include: [{model: Product, include:{all:true}}]
        })
        return res.json(categories)
    } catch(error) {
        console.log(error)
        return res.status(500).json({error: 'something went wrong'})
    }
})

// Read One
categories.get('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const category = await Category.findOne({
            where: { uuid },
            include: ['subCategory']
        })
        return res.json(category)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'something went wrong' })
    }
})

// Delete One
categories.delete('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const category = await Category.findOne({
            where: { uuid }
        })
        await category.destroy()
        return res.json({ message: `Category with UUID:${uuid} was deleted` })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'something went wrong' })
    }
})

// Update One
categories.patch('/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try {
        const category = await Category.findOne({ where: { uuid } })
       for (const i in req.body) {
           category[i] = req.body[i]
       }
        
        await category.save()
        res.json(category)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'something went wrong' })
    }
})

module.exports = categories;