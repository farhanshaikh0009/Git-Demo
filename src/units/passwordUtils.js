const bcrypt = require('bcryptjs');

const hashPassword = async (plainPassword) => {
    if (typeof plainPassword !== 'string') {
        throw new Error('Password must be a string');
    }
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(plainPassword, salt);
};
const isPasswordMatch = async (plainPassword, hashedPassword) => {
    return bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = {hashPassword, isPasswordMatch}