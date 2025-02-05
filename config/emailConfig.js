// config/emailConfig.js
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  service: 'gmail',  // or any other service
  auth: {
    user: 'foundation-mail@gmail.com', // Your foundation's email
    pass: 'jfskjeffkjfs'  // Use app-specific password for security
  }
});

export default transporter;