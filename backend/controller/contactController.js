const sendEmail = require('../utils/sendEmail');

const escapeHtml = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const sendContactQuery = async (req, res) => {

    const { name, email, message } = req.body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
        return res.status(400).json({
            message: 'Name, email, and message are required.'
        });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({
            message: 'Enter a valid email address.'
        });
    }

    try {

        const ownerEmail = process.env.EMAIL_USER;

        if (!ownerEmail) {
            return res.status(500).json({
                message: 'Owner email is not configured.'
            });
        }

        await sendEmail(
            ownerEmail,
            `New website query from ${name.trim()}`,
            `<h2>New contact query</h2>
             <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
             <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
             <p><strong>Message:</strong></p>
             <p>${escapeHtml(message.trim()).replace(/\n/g, '<br>')}</p>`
        );

        return res.status(201).json({
            message: 'Your message has been sent successfully.'
        });

    } catch (error) {

        console.error('Contact query error:', error.message);

        return res.status(500).json({
            message: 'Unable to send your message. Please try again later.'
        });
    }
};

module.exports = { sendContactQuery };