const fs = require('fs')
const nodemailer = require('nodemailer')
const { getMaxListeners } = require('process')
require('dotenv').config()

module.exports = {
  response: (response, status, msg, data, pagination) => {
    const result = {}
    result.status = status || 200
    result.msg = msg
    result.data = data
    result.pagination = pagination
    return response.status(result.status).json(result)
  },

  deleteImage: (imgLoc) => {
    fs.unlink(imgLoc, (error) => {
      error ? console.log('Image not found') : console.log('Image deleted')
    })
  },

  convertToSnakeCase: (str) => {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
  },

  sendMail: (msg, url, userEmailAddress) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'putericky@gmail.com',
        pass: 'vfalwcnombfcgsvt'
      }
    })

    const mailOptions = {
      from: `"Tikecting">`, // sender address
      to: 'syahputraricky2@gmail.com', // list of receivers
      subject: `Tikecting - `, // Subject line
      html: `<b>Click Here to activate</b> <a href=${url}>Click !</>` // html body
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  }
}
