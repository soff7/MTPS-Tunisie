// utils/email.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // أو استخدم خدمة بريد أخرى مثل SendGrid
  auth: {
    user: process.env.EMAIL_USER, // بريدك الإلكتروني
    pass: process.env.EMAIL_PASS, // كلمة مرور التطبيق (App Password) لـ Gmail
  },
});

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html, // دعم تنسيق HTML اختياري
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = { sendEmail };