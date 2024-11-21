import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,  // Đảm bảo EMAIL_USER là đúng (ví dụ: "your-email@gmail.com")
      pass: process.env.EMAIL_PASS,  // Nếu sử dụng App Password, thay đổi EMAIL_PASS thành App Password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,  // Đảm bảo EMAIL_USER là đúng
    to,
    subject,
    html
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
