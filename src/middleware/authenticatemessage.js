
const jwt =require('jsonwebtoken');
const authenticate = (req, res, next) => {
    try{ const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token);

    req.user = decode;
    next()
    }
    catch(error){
        res.json({
            message: 'You have no access for viewing any message unless you are an admin!'
    })
    }
}
module.exports = authenticate
