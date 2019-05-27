const UsersModel = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const env = require('../../env');
const nodemailer = require('nodemailer');

const forgotPassword = async (req, res) => {
    try {
        //@ts-ignore
        const user = await UsersModel.findOne(
            { email: req.body.email }
        );

        if (user === null) {
            console.error('email not in database');
            res.status(403).send('email not in database');
        }else {
            const token = jwt.sign({ id: user.id }, env.secret, { expiresIn: '1h' });
            user.update({
                resetPasswordToken: token,
                resetPasswordExpires: Date.now() + 360000,
            });

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: `${process.env.EMAIL_ADDRESS}`,
                    pass: `${process.env.EMAIL_PASSWORD}`,
                }});

            const mailOptions = {
                from: 'timeoffapp1@gmail.com',
                to: `${user.email}`,
                subject: 'Link To Reset Password',
                text:
                    'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
                    + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
                    + `http://localhost:3000/reset/${token}\n\n`
                    + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
            };

            console.log('sending mail');
            transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                    console.error('there was an error: ', err);
                } else {
                    console.log('here is the res: ', response);
                    res.status(200).json('recovery email sent');
                }
            });
        }
    } catch(err){
        console.log(err.response);
    }
};


module.exports = {
    forgotPassword,
}
