const sgmail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");

const sendPasswordEmail = async (name, email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: "your email",
      pass: "your password"
    }
  });
  try {
    let info = await transporter.sendMail({
      from: "sender email",
      to: email,
      subject: `PASSWORD RESET`,
      text: `Dear ${name}, You just created a forgot password request please click the link to proceed: http://taalam-alquran.herokuapp.com/ResetPassword/${token}`
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.log("Not Sent");
  }
};
module.exports = { sendPasswordEmail };
