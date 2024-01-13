var expressFunction = require('express')
const router = expressFunction.Router()
const authorization = require('../config/authorize')
const mongoose = require('mongoose')

var Schema = require("mongoose").Schema
const productSchema = Schema({
    type:String,    
    name:String,
    detail:String,
    price:Number,
    takecare: String,
    size: String,
    img:String

},{
    coolection:'products'
})
let Product
try{
    Product=mongoose.model('products')
}catch(error){
    Product=mongoose.model('products',productSchema)
}

const insertProduct = (dataProduct)=>{
    return new Promise((resolve, reject) => {
        var new_product = new Product(
            dataProduct
        )
        new_product.save((err,data)=>{
            if(err){
                reject(new Error('Cannot insert product to DB!!!'))
            }else{
                resolve({message:'Product added successfully'})
            }
        })
    })
}

const getProduct = () =>{
    return new  Promise((resolve, reject)=>{
        Product.find({},(err,data)=>{
            if(err){
                reject(new Error('Cannot get order !!!'))
            }else{
               if(data){
                   resolve(data)
               }else{
                reject(new Error('Cannot get order !!!'))
               }
            }
        })
    })
}

router.route('/add').post(authorization,(req,res)=>{
    console.log('add');
    insertProduct(req.body).then(result =>{
        console.log(result);
        res.status(200).json(result)
    }).catch(err=>{
        console.log(err);
    })
})

router.route('/get').get((req,res)=>{
    console.log('add');
    getProduct(req.body).then(result =>{
        console.log(result);
        res.status(200).json(result)
    }).catch(err=>{
        console.log(err);
    })
})

module.exports = router