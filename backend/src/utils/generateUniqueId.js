const crypto = require('crypto');

//no node não usa export default, é o module.exports
module.exports = function generateUniqueId() {
    return crypto.randomBytes(4).toString('HEX');
}

//funcionalidade muito especifica, será testada no tests/unit