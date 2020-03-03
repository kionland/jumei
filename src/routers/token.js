const jwt = require('jsonwebtoken');

// @param {String} data
// @param {Number} expiresIn

//生成token
let secret = 'hentai'; //钥匙
function create(data, expiresIn = 60*60*24*7) {
    let token = jwt.sign({
        data
    }, secret, {
        expiresIn
    });
    return token;
};

//验证token
function verify(token) {
    let res;
    try {
        let result = jwt.verify(token, secret);
        console.log('token校验:', result);

        res = true;
    } catch (err) {
        res = false;
    }
    return res;
};

module.exports = {
    create,
    verify
};