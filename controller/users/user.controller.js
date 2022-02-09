// Required Packages
const jwt = require('jsonwebtoken');
// required models 
const Bcrypt = require('../../models/crypt/bcrypt');
const Users = require('../../models/users');
const { exec } = require("child_process");
const RepositoryModel = require('../../models/createrepo');

const secret = "JWTSECRET";
let UserObject = {}

// Method to generate jwt token for user authentication
UserObject.generateJwt = (valObj) => {
    let expiry = new Date();
    expiry.setDate(expiry.getMinutes() + 1);
    return jwt.sign({
        _id: valObj._id,
        email: valObj.email
    },
        secret,
        { expiresIn: '24h' });
},

    // Controller for user signup API
    UserObject.SignUp = async (req, res) => {
        // console.log(req.body);
        try {
            // console.log('ether',req.body.fname);
            let fname = req.body.fname;
            let lname = req.body.lname;
            let email = req.body.email;
            let password = req.body.password;
            let cpassword = req.body.cpassword;
            let errorObj = {};
            let emailtest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let profileObj = {};
            if (typeof fname !== 'undefined' && fname && fname !== '') {
                profileObj.fname = fname;
            } else {
                errorObj.fname = 'First name is required or Invalid';
            }

            if (typeof lname !== 'undefined' && lname && lname !== '') {
                profileObj.lname = lname;
            } else {
                errorObj.lname = 'Last name is required or Invalid';
            }

            if (typeof email !== 'undefined' && email && email !== '') {
                if (emailtest.test(String(email).toLowerCase())) {
                    profileObj.email = email.toLowerCase();
                } else {
                    errorObj.email = 'Invalid Email Address';
                }
            } else {
                errorObj.email = 'Email Address required or Invalid';
            }

            if (typeof password !== 'undefined' && password && password !== '') {
                if (password == cpassword) {
                    profileObj.password = password;
                } else {
                    errorObj.password = 'Confirm password is wrong';
                }
            } else {
                errorObj.password = 'Password is required or Invalid';
            }

            if (Object.keys(errorObj).length === 0) {
                profileObj.password = await Bcrypt.encrypt(password);
                Users.create(profileObj, function (errUser, user) {
                    if (errUser) {
                        if (errUser.code && errUser.code === 11000) {
                            return res.status(200).json({
                                "success": false,
                                "message": 'Email already exists, please try another.',
                            });
                        } else {
                            return res.status(500).json({
                                "success": false,
                                "message": 'Internal Server Error'
                            });
                        }
                    } else {
                        return res.status(200).json({ "success": true, "message": "Registration has been done successfully" });
                    }
                })

            } else {
                return res.status(200).json({ "success": false, "message": errorObj });
            }
        } catch (e) {
            return res.status(500).json({ "success": false, "message": "Something went wrong" })
        }
    }

// Controller for user login API
UserObject.LogIn = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let errorObj = {};
        if (typeof email !== 'undefined' && email && email !== '') {
            email = email.toLowerCase();
        } else {
            errorObj.email = 'Email Address required or Invalid';
        }
        if (typeof password !== 'undefined' && password && password !== '') {
        } else {
            errorObj.password = 'Password is required or Invalid';
        }
        Users.findOne({ email: email }, async (err, user) => {
            if (user) {
                if (user && user.status == "Active") {
                    let is_password = await Bcrypt.comparePassword(password, user.password)
                    if (is_password) {
                        let token = UserObject.generateJwt(user)
                        return res.status(200).json({ "success": true, "message": "Login Successful", "token": token })
                    } else {
                        return res.status(200).json({ "success": false, "message": "Password didn't matched" })
                    }
                } else {
                    return res.status(200).json({ "success": false, "message": "Account deactivated, Please contact admin" })
                }
            } else {
                return res.status(200).json({ "success": false, "message": "No account exists for this email" })
            }
        })
    } catch (e) {
        return res.status(500).json({ "success": false, "message": "Something went wrong" })
    }
}

UserObject.lexExec = (req, res) => {

    try {
        // console.log('sdfghjklkjhgfdfghjklkjhgfd');
        let userid = req.payload._id;
        let reponame = req.body.reponame;
        let privacytype = req.body.privacytype;
        let adduser = req.body.adduser;
        repoObj = {
            reponame: reponame,
            privacytype: privacytype,
            adduser: '',
            userid: userid
        }
        // console.log(userid, req.body);
        exec("cd && pwd && cd ../home/peacegit/ && mkdir " + reponame + ".git && cd " + reponame + ".git/ && git init --bare && mkdir code && mkdir docker && touch .gitignore", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return res.status(200).json({ success: false, message: 'Something Went wrong', data: error.message })
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return res.status(200).json({ success: false, message: 'Something went wrong', data: stderr })
            }
            console.log(`stdout: ${stdout}`);
            repoObj.adduser = stdout;
            RepositoryModel.create(repoObj).then((repo) => {
                return res.status(200).json({ success: true, message: 'Repository created !!', data: stdout })
            })

        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "success": false, "message": "Something went wrong", type: "error in main catch" })
    }
}



UserObject.userdetails = (req, res) => {
    try {
        let userid = req.payload._id;
        if (typeof userid !== 'undefined' && userid && userid !== '') {
            Users.findOne({ _id: userid }).then((user) => {
                res.status(200).json({ success: true, message: 'User Found !!', data: user })
            }).catch((error) => {
                console.log(error);
            })
        }
    } catch (error) {

    }
}

module.exports = UserObject