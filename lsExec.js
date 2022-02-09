const { exec } = require("child_process");

exec("cd && cd /var/repositories/ && mkdir test.git && cd test.git/ && git init && mkdir code && mkdir docker && touch .gitignore", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});