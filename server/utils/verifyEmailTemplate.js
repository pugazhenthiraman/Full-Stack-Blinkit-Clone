// const verifyEmailTemplate = ({ name, url }) => {
//   return `
//     <p>Dear${name}</p>
//     <p>Thank you for registering Binkeyit..</p>
//     <a herf=${url} style="color:white;backgroud:blue; margin-top:10px">Verify Email</a>
//     `;
// };
// module.exports = verifyEmailTemplate;

const verifyEmailTemplate = ({ name, url }) => {
  return `
    <p>Dear ${name},</p>
    <p>Thank you for registering with Binkeyit.</p>
    <a href="${url}" 
       style="color: white; background: blue; padding: 10px; text-decoration: none; margin-top: 10px; display: inline-block;">
       Verify Email
    </a>
  `;
};
module.exports = verifyEmailTemplate;
