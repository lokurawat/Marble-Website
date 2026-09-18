const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOption = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            html: text
        };

        return await transporter.sendMail(mailOption);

    } catch (error) {
        console.log("error in sending email", error);
        throw error;
    }
};

module.exports = sendEmail;
