const expressFunction = require('express')
const mongoose =require('mongoose')
expressApp = expressFunction()

const url = 'mongodb://localhost:27017/myproject';
const config = {
    autoIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}
expressApp.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','http://localhost:4200')
    res.setHeader('Access-Control-Allow-Methods','POST,GET,PUT,PATCH,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Option,Authorization')
    return next()
})

expressApp.use(expressFunction.json({limit: '50mb'}))
expressApp.use((req,res,next)=>{
    mongoose.connect(url,config).then(()=>{
        console.log('Conected to MongoDB');
        next();
    }).catch(err=>{
        console.log('Cannot connect to MongoDB');
        res.status(501).send('Cannot connect to MongoDB')
    })
})
expressApp.use('/api/cart', require('./api/cart'))
expressApp.use('/api/products',require('./api/products'))
expressApp.use('/api/order',require('./api/order'))
expressApp.use('/api/user',require('./api/user'))
expressApp.use('/user', require('./router/user'))
expressApp.use('/login', require('./router/signin'))

expressApp.listen(3000,function(){
    console.log('Listening on port 3000');
})