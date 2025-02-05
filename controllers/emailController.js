

import transporter from '../config/emailConfig.js';


 export const emailhandler = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Email configuration
    const mailOptions = {
      from: email,
      to: 'ayushbajwan@gmail.com', // Foundation's email address
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p>This email was sent from your website's contact form.</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Message sent successfully"
    });
    
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: error.message
    });
  }
};

