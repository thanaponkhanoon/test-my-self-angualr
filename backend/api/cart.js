var expressFunction = require('express')
const router = expressFunction.Router()
const authorization = require('../config/authorize')
const mongoose = require('mongoose')

var Schema = require("mongoose").Schema
const productSchema = Schema({
    name: String,
    price: Number,
    detail: String,
    quantity: Number,
    type: String
})
const cartSchema = Schema({
    userId: String,
    product: [productSchema],
}, {
    coolection: 'cart'
})
let Cart
try {
    Cart = mongoose.model('cart')
} catch (error) {
    Cart = mongoose.model('cart', cartSchema)
}
const insertCart = (dataCart) => {
    return new Promise((resolve, reject) => {
        var new_cart = new Cart(
            dataCart
        )
        new_cart.save((err, data) => {
            if (err) {
                reject(new Error('Cannot insert cart to DB!!!'))
            } else {
                resolve({ message: 'Cart added successfully' })
            }
        })
    })
}

const pushCart = (cartData, id) => {
    console.log("this " + id);
    return new Promise((resolve, reject) => {
        Cart.updateOne({ userId: id }, { $push: { product: cartData.product } }, (err, data) => {
            if (err) {
                reject(new Error('Cannot push data cart to DB!!!'))
            } else {
                resolve({ message: 'Cart push successfully' }, data)
            }
        })
    })
}

const pushQuantityCart = (myquantity, cartData, id) => {
    return new Promise((resolve, reject) => {
        Cart.updateOne({ userId: id, "product.name":cartData.product.name}, { $set :{ 'product': { 'quantity':  myquantity,
    'name':cartData.product.name,'detail':cartData.product.detail,'type':cartData.product.type,'price':cartData.product.price  } }}, (err, data) => {
            if (err) {
                reject(new Error('Cannot push data cart to DB!!!'))
            } else {
                resolve({ message: 'Cart push successfully' }, data)
            }
        })
    })
}

const getCartById = (id) => {
    return new Promise((resolve, reject) => {
        Cart.find({ userId: id }, (err, data) => {
            if (err) {
                reject(new Error('Cannot get cart !!!'))
            } else {
                if (data) {
                    resolve(data)
                } else {
                    reject(new Error('Cannot  get cart !!!'))
                }
            }
        })
    })
}

const delteProductInCart = (userid, productid) => {
    console.log();
    return new Promise((resolve, reject) => {
        Cart.updateOne({ userId: userid }, { $pull: { 'product': { '_id': '' + productid + '' } } }, (err, data) => {
            if (err) {
                reject(new Error('Cannot Delete product !!!'))
            } else {
                if (data) {
                    resolve(data)
                } else {
                    reject(new Error('Cannot Delete product !!!'))
                }
            }
        })
    })
}


router.route('/delete/:idproduct/:iduser').delete(authorization,(req, res) => {
    delteProductInCart(req.params.iduser, req.params.idproduct).then(result => {
        console.log(result);
        res.status(200).json(result)
    }).catch(err => {
        console.log(err);
    })
})

router.route('/add/:id').post((req, res) => {
    const playload = {
        userId: req.params.id
    }
    insertCart(playload).then(result => {
        console.log(result);
        res.status(200).json(result)
    }).catch(err => {
        console.log(err);
    })
})

router.route('/put').put(authorization, (req, res) => {
    console.log("1");
    let playload = {
        product: {
            name: req.body.product.name,
            price: req.body.product.price,
            detail: req.body.product.detail,
            quantity: req.body.product.quantity,
            type: req.body.product.type
        }
    }
    getCartById(req.body.userId).then(result => {
        console.log(result)
        if (result[0].product.length > 0) {
            for (let i = 0; i < result[0].product.length; i++) {
                if (result[0].product[i].name == playload.product.name) {
                    console.log("2");
                    myquantity = result[0].product[i].quantity + playload.product.quantity
                    pushQuantityCart(myquantity,playload, req.body.userId).then(result => {
                        res.status(200).json(result)
                    }).catch(err => {
                        console.log(err);
                    })
                }
                else {
                    console.log("3");
                    pushCart(playload, req.body.userId).then(result => {
                        res.status(200).json(result)
                    }).catch(err => {
                        console.log(err);
                    })
                }
            }
        } else {
            console.log("4");
            pushCart(playload, req.body.userId).then(result => {
                res.status(200).json(result)
            }).catch(err => {
                console.log(err);
            })
        }
    }).catch(err => {
        console.log(err);
    })

})


router.route('/get/:id').get(authorization, (req, res) => {
    getCartById(req.params.id).then(result => {
        console.log(result);
        res.status(200).json(result)
    }).catch(err => {
        console.log(err);
    })
})



module.exports = router