const sgmail = require("@sendgrid/mail");

sgmail.setApiKey(process.env.SENDGRID_API_KEY);
const sendPasswordEmail = (name, email, token) => {
  const msg = {
    to: email,
    from: "taealamalquran@gmail.com",
    subject: "TA'ALAM ALQURAN PASSWORD RESET",
    text: `Dear ${name}, You just created a forgot password request please click the link to proceed: http://taalam-alquran.herokuapp.com/ResetPassword/${token}`
  };
  sgmail.send(msg);
};

module.exports = { sendPasswordEmail };
