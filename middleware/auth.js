let auth = require('../controllers/auth.js');
var express      = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());
function checkAuth(req, res, next) {
    
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)) {
        next();
    } else{
        res.status(400);
        res.send('Not authorized!');
    }
}
module.exports = checkAuth;