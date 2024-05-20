module.exports = {
    stringToSha1(str) {
        const crypto = require('crypto');
        const shasum = crypto.createHash('sha1');
        shasum.update(str);
        return shasum.digest('hex');
    }
}