const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports = (req, res, next) => {{
    try {
        var token = req.header('Authorization').split(' ');
        const decoded = jwt.verify(token[1], 'secret');
        User.find({email: decoded['email'], is_admin: true})
            .exec()
            .then( user =>{
                if(user.length === 1){
                    req.userData = decoded;
                    console.log(decoded);
                    next();
                }
                else{
                    res.status(401).json({
                        message: 'Auth failed you are not the admin'
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(401).json({
                    message: 'Auth failed you are not the admin'
                });
            });
    }catch(error){
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
}
};