import * as nodemailer from 'nodemailer'
import * as path from 'path'
import * as dotenv from 'dotenv'
const hbs = require('nodemailer-express-handlebars')
dotenv.config()

const host = process.env.SMTP_HOST
const port = parseInt(process.env.SMTP_PORT as string, 10)
const user = process.env.SMTP_USER
const pass = process.env.SMTP_PW
const testEmail = process.env.TEST_EMAIL

const getTransporter = () => {
  return nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: { user, pass }
  })
}

const createInfo = () => {
  return {
    from: user,
    to: testEmail,
    subject: 'Daily Digest',
    template: 'email',
    attachments: [
      {
        filename: 'chart.png',
        path: 'src/assets/chart.png',
        cid: 'chart'
      }
    ]
  }
}

const getHandlebarOptions = () => {
  return {
    viewEngine: {
      partialsDir: path.resolve('./templates/'),
      defaultLayout: false
    },
    viewPath: path.resolve('./templates/')
  }
}

const sendDailyDigest = async () => {
  const transporter = getTransporter()
  const handlebarOptions = getHandlebarOptions()
  transporter.use('compile', hbs(handlebarOptions))
  const info = createInfo()
  return await transporter.sendMail(info)
}

export { sendDailyDigest }
