const bcrypt = require('bcrypt');



async function run() {
    const salt = await bcrypt.genSalt(10); // define the time it take to generate salt
    const hased  = await bcrypt.hash('1234', salt); // hash the password
    console.log(salt);
    console.log(hased);
}

run();