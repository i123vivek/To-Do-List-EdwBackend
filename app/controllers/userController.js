const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const passwordLib = require('./../libs/generatePasswordLib');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib');
const check = require('../libs/checkLib');
const countryCode = require('../libs/checkCountryCodeLib');
const token = require('../libs/tokenLib');
const AuthModel = mongoose.model('Auth');
const UserModel = mongoose.model('User');
const events = require('events');
const eventEmitter = new events.EventEmitter();

const mailer = require("../libs/nodemailerLib");

// signup Function.
let signUpFunction = (req, res) => {
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (!validateInput.Email(req.body.email)) {
                    let apiResponse = response.generate(true, 'Email Does not met the requirement', 400, null);
                    reject(apiResponse);
                } else if (check.isEmpty(req.body.password)) {
                    let apiResponse = response.generate(true, 'password parameter is missing', 400, null);
                    reject(apiResponse);
                } else {
                    resolve(req);
                }
            } else {
                logger.error('Field Missing During User Creation', 'userController: createUser()', 5);
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null);
                reject(apiResponse);
            }
        })
    } // end validate user input

    let createUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: req.body.email })
                .exec((err, retrievedUserDetails) => {
                    if (err) {
                        logger.error(err.message, 'userController: createUser', 10)
                        let apiResponse = response.generate(true, 'Failed To Create User', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(retrievedUserDetails)) {
                        let newUser = new UserModel({
                            userId: shortid.generate(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName || '',
                            email: req.body.email.toLowerCase(),
                            country: req.body.country,
                            countryCode: countryCode.findCountryCode(req.body.country.toLowerCase()),
                            mobileNumber: req.body.mobileNumber,
                            password: passwordLib.hashpassword(req.body.password),
                            createdOn: time.now()
                        })
                        newUser.save((err, newUser) => {
                            if (err) {
                                logger.error(err.message, 'userController: createUser', 10)
                                let apiResponse = response.generate(true, 'Failed to create new User', 500, null)
                                reject(apiResponse)
                            } else {
                                let newUserObj = newUser.toObject();
                                resolve(newUserObj);
                            }
                        })
                    } else {
                        logger.error('User Cannot Be Created.User Already Present', 'userController: createUser', 4)
                        let apiResponse = response.generate(true, 'User Already Present With this Email', 403, null)
                        reject(apiResponse)
                    }
                })
        })
    } // end create user function

    validateUserInput(req, res)
        .then(createUser)
        .then((resolve) => {
            delete resolve.password
            let apiResponse = response.generate(false, 'User created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
} // end user signup function

// start of login function

let loginFunction = (req, res) => {
    let findUser = () => {
        console.log("find user function called");
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                UserModel.findOne({ email: req.body.email }, (err, userDetails) => {
                    if (err) {
                        logger.error('Failed To Retrieve User Details', 'userController: findUser()', 10)
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userDetails)) {
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                        reject(apiResponse)
                    } else {
                        logger.info('User Found', 'userController: findUser()', 10)
                        resolve(userDetails)
                    }
                })
            } else {
                let apiResponse = response.generate(true, 'email parameter is missing', 400, null)
                reject(apiResponse)
            }
        })
    } // end of  find user

    let validatePassword = (userDetails) => {
        console.log("retrieved user details are:", userDetails);
        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(req.body.password, userDetails.password, (err, passwordMatch) => {
                if (err) {
                    logger.error(err.message, 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Login Failed', 500, null)
                    reject(apiResponse)
                } else if (passwordMatch) {
                    console.log("password match status", passwordMatch)
                    let userDetailsObj = userDetails.toObject();
                    delete userDetailsObj.password
                    delete userDetailsObj._id
                    delete userDetailsObj.__v
                    delete userDetailsObj.createdOn
                    delete userDetailsObj.modifiedOn
                    resolve(userDetailsObj);
                } else {
                    logger.info('Login Failed Due To Invalid Password', 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Wrong Password.Login Failed', 400, null)
                    reject(apiResponse)
                }
            })
        })
    } //  end of validate password

    let generateToken = (userDetails) => {
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    } // end of generate token

    let saveToken = (tokenDetails) => {
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: tokenDetails.userId })
                .exec((err, retrievedTokenDetails) => {
                    if (err) {
                        logger.error(err.message, 'userController: saveToken', 10)
                        let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(retrievedTokenDetails)) {
                        let newAuthToken = new AuthModel({
                            userId: tokenDetails.userId,
                            authToken: tokenDetails.token,
                            tokenSecret: tokenDetails.tokenSecret,
                            tokenGenerationTime: time.now()
                        })
                        newAuthToken.save((err, newTokenDetails) => {
                            if (err) {
                                logger.error(err.message, 'userController: saveToken', 10)
                                let apiResponse = response.generate(true, 'Failed To save Token', 500, null)
                                reject(apiResponse)
                            } else {
                                let responseBody = {
                                    authToken: newTokenDetails.authToken,
                                    userDetails: tokenDetails.userDetails
                                }
                                resolve(responseBody)
                            }
                        })
                    } else {
                        retrievedTokenDetails.authToken = tokenDetails.token
                        retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                        retrievedTokenDetails.tokenGenerationTime = time.now()
                        retrievedTokenDetails.save((err, newTokenDetails) => {
                            if (err) {
                                logger.error(err.message, 'userController: saveToken', 10)
                                let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                                reject(apiResponse)
                            } else {
                                let responseBody = {
                                    authToken: newTokenDetails.authToken,
                                    userDetails: tokenDetails.userDetails
                                }
                                resolve(responseBody)
                            }
                        })
                    }
                })
        })
    } // end of save token

    findUser(req.res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Login Successful', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })
} // end of login function

/* Get all user Details */
let getAllUser = (req, res) => {
    UserModel.find()
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                logger.error(err.message, 'User Controller: getAllUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller: getAllUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All User Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all users

/* Get single user details */
let getSingleUser = (req, res) => {
    UserModel.findOne({ 'userId': req.params.userId })
        .select('-password -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                logger.error(err.message, 'User Controller: getSingleUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller:getSingleUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'User Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get single user


let getSingleUserDetailByEmail = (req, res) => {
    UserModel.findOne({ 'email': req.params.email })
        .select('-password -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                logger.error(err.message, 'User Controller: getSingleUserDetailByEmail', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller:getSingleUserDetailByEmail')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'User Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get single user

let logout = (req, res) => {

    AuthModel.findOneAndDelete({ userId: req.user.userId }, (err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'user Controller: logout', 10)
            let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'Already Logged Out or Invalid UserId', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Logged Out Successfully', 200, null)
            res.send(apiResponse)
        }
    })
} // end of the logout function

let forgotPassword = (req, res) => {
    let validateEmail = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                UserModel.findOne({ email: req.body.email })
                    .exec((err, userDetails) => {
                        if (err) {
                            console.log(err);
                            logger.error('Failed To Retrieve User Data', 'userController: forgotpassword()->validateEmail()', 10)
                            let apiResponse = response.generate(true, 'Failed To Find given emails- User Details', 500, null)
                            reject(apiResponse)
                        } else if (check.isEmpty(userDetails)) {
                            logger.error('The Email belong to no user', 'userController: forgotPassword() -> validateEmail()', 10)
                            let apiResponse = response.generate(true, 'This Email belong to no user', 404, null)
                            reject(apiResponse)
                        } else {
                            logger.info('User with this email found', 'userController: forgotPassword()->validateEmail', 10)
                            userDetails.resetPasswordToken = shortid.generate();
                            userDetails.resetPasswordExpires = Date.now() + 3600000;
                            userDetails.save((err, userDetails) => {
                                if (err) {
                                    console.log(err);
                                    logger.error(err.message, 'userController: forgotPassword', 10)
                                    let apiResponse = response.generate(true, 'Failed to create or save reset token', 500, null)
                                    reject(apiResponse)
                                } else {
                                    let newUserObj = userDetails.toObject();
                                    let message =
                                        'Please click on the following link, or paste this into your browser to reset your password:\n\n' +
                                        'http://' + req.headers.host + '/reset/' + newUserObj.resetPasswordToken + '\n\n' +
                                        'If you did not request this, please ignore this email and your password will remain unchanged.\n';
                                    let htmlMessage = '<a href=http://www.essindia.club/' + 'reset/' + newUserObj.resetPasswordToken + '>' + "link" + '</a>'

                                    let info = mailer.sendMail1(newUserObj.email, message, htmlMessage);

                                    resolve(userDetails)
                                }
                            })
                        }
                    })
            }
        })
    }
    validateEmail(req, res)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'mail-sent successfully', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.send(err)
        })
} // end of forgotPassword function.

let resetPassword = (req, res) => {
    UserModel.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, userDetails) => {

        console.log("req.body is :", req.body);
        console.log("user details are: ", userDetails);
        if (err) {
            console.log(err);
            logger.error('Failed to retrieve user data', 'userController: resetPassword', 10);
            let apiResponse = response.generate(true, 'Failed to find token- UserDetails', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(userDetails)) {
            logger.error('Password reset token is invalid or expired', 'userController: resetPassword', 7);
            let apiResponse = response.generate(true, 'password reset token is invalid or expired', 408, null)
            res.send(apiResponse);
        } else {

            userDetails.password = passwordLib.hashpassword(req.body.newPassword);
            userDetails.resetPasswordToken = undefined;
            userDetails.resetPasswordExpires = undefined;

            userDetails.save((err, userDetails) => {
                if (err) {
                    console.log("error while saving:", err);
                    logger.error(err.message, 'userController: resetPassword', 10);
                    let apiResponse = response.generate(true, 'failed to save reset password', 500, null);
                    res.send(apiResponse);
                } else {
                    let message = 'The Password of your account ' + userDetails.email + 'has been reset successfully.\n';
                    let info = mailer.sendMail(userDetails.email, message);
                    logger.info('mail sent successfully after reset password', 'userController: resetPassword', 7);
                    let apiResponse = response.generate(false, 'mail sent succesfully after reset-password', 200, null);
                    res.send(apiResponse);
                }
            })
        }
    })
} // end of resetPassword function.


module.exports = {
    signUpFunction: signUpFunction,
    loginFunction: loginFunction,
    getAllUser: getAllUser,
    getSingleUserDetailByEmail: getSingleUserDetailByEmail,
    getSingleUser: getSingleUser,
    logout: logout,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,

}