const router = require('express').Router();
const withAuth = require('../utils/auth');
const nodemailer = require('nodemailer');

router.get('/', withAuth, (req, res) => {
    res.render('help', { loggedIn: true });
})

router.post('/send', withAuth, (req, res) => {
    console.log(req.body)
const output = `
    <p>You have a new help request</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${req.body.helpName}</li>
        <li>Email: ${req.body.helpEmail}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.helpMessage}</p>
    `

    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'emma.lehner96@ethereal.email',
            pass: 'BwABArgSuRm8q4J5N4'
        }
    });

    let mailOptions = {
        from: "'Nodemailer Contact' <emma.lehner96@ethereal.email>",
        to: 'sam94@ethereal.email', //bzJrUXNZPcnB5CgcsG
        subject: 'HealthcareHero Help Request',
        text: 'Hello',
        html: output
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('help');
    });
})

module.exports = router;