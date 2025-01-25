
// const {
//     senderEmail,
//     senderPassword
// } = process.env

// function sendEmail(recepientEmail, token) {
//     console.log(recepientEmail, token);
//     const mailOption = {
//         from: senderEmail,
//         to: recepientEmail,
//         html: `<p>Please verify your email and click on the link below: 
//                     <a href="http://ourfrontend.com/${token}" target="_blank">
//                        Click here
//                     </a>
//         </p>`,
//         subject: "Verification Email"
//     }
//     transporter.sendMail(mailOption, (error, succes) => {
//         if (error) return res.send(err);

//         console.log('Successfully sent.')
//     })
// }