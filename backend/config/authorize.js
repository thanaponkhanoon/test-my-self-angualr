const jwt = require('jsonwebtoken')
const key = 'MY_KEY'
const authorization = ((req,res,next)=>{
    const token = req.headers['authorization']
    console.log("token", token);
    if(token === undefined){
        return res.status(401).json({
            "status":401,
            "message":'Unauthorized1'
        })
    }
    else{
        jwt.verify(token,key,(err,decode)=>{
            if(err){
                return res.status(401).json({
                    "status":401,
                    "message":'Unauthorized2'
                })
            }
            else{
                console.log("ok");
                next()
            }
        })
    }
})
module.exports = authorization