import nodemailer  from"nodemailer";
async function sendEmail({to = [],cc,bcc,subject,text,html,attachments}={}) {
  let transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    cc,
    bcc,
    to,
    subject,  
    text, 
    html, 
    attachments,
});
console.log(info);
}

export default sendEmail