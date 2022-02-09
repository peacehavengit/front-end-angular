const bcrypt = require("bcrypt")


let Bcrypt = {}

Bcrypt.encrypt = async (plaintext) => {
    let salt = await bcrypt.genSaltSync(10);
    let password = await bcrypt.hashSync(plaintext, salt);
    return password;
}


Bcrypt.comparePassword = async (plaintext, password) => {
    let confirm = await bcrypt.compareSync(plaintext, password);
    if (confirm){
        return true;
    }else{
        return false
    }
}

module.exports = Bcrypt