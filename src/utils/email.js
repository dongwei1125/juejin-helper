const nodemailer = require('nodemailer')
const { EMAIL, AUTHORIZATION_CODE, SMTP_SERVER } = require('../ENV.js')

const email = async ({ title = '', content = '' } = {}) => {

  try {
    const suffix = /@(?<suffix>.*)/.exec(EMAIL).groups.suffix
    const options = {
      host: !!SMTP_SERVER
              ? SMTP_SERVER
              : `smtp.${suffix}`,
      auth: {
        user: EMAIL,
        pass: AUTHORIZATION_CODE,
      },
    }
    const transporter = nodemailer.createTransport(options)

    await transporter.verify()

    return transporter.sendMail({
      from: `稀土掘金助手 <${EMAIL}>`,
      to: EMAIL,
      subject: title,
      html: content,
    })
  } catch (error) {
    console.log(error.stack)
  }
}

module.exports = email