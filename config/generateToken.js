const jwt = require('jsonwebtoken');
const generateToken = (id) => {
    return jwt.sign({ id }, 'abc', {
        expiresIn: "30d",
    });
};
module.exports = generateToken;