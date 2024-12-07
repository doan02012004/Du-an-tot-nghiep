import nodemailer from "nodemailer";

const sendEmail = async (to, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Hoặc cấu hình SMTP khác của bạn
    auth: {
      user: process.env.EMAIL_USER, // Địa chỉ email của bạn
      pass: process.env.EMAIL_PASS, // Mật khẩu email của bạn
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: htmlContent, // Thay text bằng html để gửi email dưới dạng HTML
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;