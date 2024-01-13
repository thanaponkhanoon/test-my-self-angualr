var expressFunction = require('express')
const router = expressFunction.Router()
const authorization = require('../config/authorize')
const mongoose = require('mongoose')

var Schema = require("mongoose").Schema
const addressSchema = Schema({  
    userId:String,
    firstname:String,
    lastname:String,
    phonenumber:String,
    address:String
},{
    coolection:'addresses'
})
let Address
try{
    Address=mongoose.model('addresses')
}catch(error){
    Address=mongoose.model('addresses',addressSchema)
}

const insertAdderss = (dataAddress)=>{
    return new Promise((resolve, reject) => {
        var new_address = new Address(
            dataAddress
        )
        new_address.save((err,data)=>{
            if(err){
                reject(new Error('Cannot insert adderss to DB!!!'))
            }else{
                resolve({message:'Adderss added successfully'})
            }
        })
    })
}

const addressPut = (addressData) =>{
    return new  Promise((resolve, reject)=>{
        Address.findOneAndUpdate({userId:addressData.userId},{firstname:addressData.firstname,lastname:addressData.lastname,phonenumber:addressData.phonenumber,address:addressData.address },(err,data)=>{
            if(err){
                reject(new Error('Cannot put address !!!'))
            }else{
               if(data){
                   resolve(data)
               }else{
                reject(new Error('Cannot put address !!!'))
               }
            }
        })
    })
}

const getAddressById = (id) =>{
    return new  Promise((resolve, reject)=>{
        Address.find({userId:id},(err,data)=>{
            if(err){
                reject(new Error('Cannot get address !!!'))
            }else{
               if(data){
                   resolve(data)
               }else{
                reject(new Error('Cannot get address !!!'))
               }
            }
        })
    })
}


router.route('/add').post((req,res)=>{
     let playload ={
         userId : req.body.userId,
         firstname:req.body.firstname,
         lastname:req.body.lastname,
         address:req.body.address,
         phonenumber:req.body.phonenumber
     }
    insertAdderss(playload).then(result =>{
        console.log(result);
        res.status(200).json(result)
    }).catch(err=>{
        console.log(err);
    })
})


router.route('/put').put(authorization,(req,res)=>{
    console.log(req.body);
    addressPut(req.body).then(result=>{
        res.status(200).json(result)
    }).catch(err=>{
        console.log(err);
    })
})

router.route('/get/:id').get(authorization,(req,res)=>{
    getAddressById(req.params.id).then(result=>{
        res.status(200).json(result)
    }).catch(err=>{
        console.log(err);
    })
})



module.exports = router