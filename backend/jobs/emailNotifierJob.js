const config = require('../config/config')
const nodemailer = require('nodemailer')
const Constants = require('../constants/constants')
const ejs = require('ejs')
const path = require('path')
const fs = require('fs')
const logger = require('../helper/logger').createLogger('emailNotifierJob')

class EmailNotifierJob {
  constructor () {
    this.userId = String.empty
  }

  async notifyUser (emailAddress, templateType, userName = null, receipientEmail = null, receipientPhone = null, messageTextContent = null, additionalArgs = {}) {
    try {
      const userEmail = process.env.EMAIL_NOTIFICATION_USER
      const senderEmail = process.env.ADMIN_RECIPIENT_EMAILS.split(',').map(email => email.trim());
      const fromEmail = process.env.ADMIN_FROM_USER_EMAIL
      const transporter = nodemailer.createTransport({
        host: config.gmail_smtp.host,
        port: config.gmail_smtp.port,
        secure: config.gmail_smtp.secure,
        auth: {
          user: userEmail,
          pass: process.env.EMAIL_NOTIFICATION_PASSWORD
        }
      })

      let subject = 'Bonheur - '
      let emailTemplate = null
      let args = {}
      switch (templateType) {
        case Constants.Template.SIGNUP_NOTIFY:
          emailTemplate = fs.readFileSync(path.join(__dirname, '../templates/signupNotificationTemplate.ejs'), 'utf8')
          subject = 'Welcome Aboard! We\'re Thrilled to Have You'
          args = { options: { link: data, userName: userName} }
          break
        case Constants.Template.SUPPORT_EMAIL:
          emailTemplate = fs.readFileSync(
            path.join(__dirname, '../templates/supportRequestTemplate.ejs'),
            'utf8'
          );
          subject = `🎉 New Inquiry for La Villa Le Bonheur - ${userName} - ${receipientEmail}`;
          args = {
            messageTextContent: messageTextContent,
            receipientPhone: receipientPhone || "Not Provided",
            receipientEmail: receipientEmail || "Not Provided",
          };
          logger.info('notifyUser - Subject::', subject)
          break
        case Constants.Template.USER_INVITE:
          emailTemplate = fs.readFileSync(path.join(__dirname, '../templates/userInviteTemplate.ejs'), 'utf8')
          subject = `Invitation: Join ${userName}'s Team Today!`
          args = { options: { link: data, inviter: userName } }
          break
        case Constants.Template.SUPPORT_BOOKING_EMAIL:
          emailTemplate = fs.readFileSync(
            path.join(__dirname, '../templates/bookingNotificationTemplate.ejs'),
            'utf8'
          );
          subject = `New Booking Confirmation for ${userName}`;
          args = {
            ...additionalArgs,
            receipientPhone: receipientPhone || 'Not Provided',
            receipientEmail: receipientEmail || 'Not Provided',
            messageTextContent: messageTextContent || 'No additional message.',
          };
          break;
        case Constants.Template.CUSTOMER_BOOKING_ACKNOWLEDGMENT:
          emailTemplate = fs.readFileSync(
            path.join(__dirname, '../templates/customerBookingAcknowledgmentTemplate.ejs'),
            'utf8'
          );
          subject = `Booking Confirmation - La Villa Le Bonheur`;
          args = {
            ...additionalArgs,
            name: userName
          };
          break;
        default:
          break
      }

      const mailOptions = {
        from: `Bonheur <${fromEmail}>`,
        to: ((templateType === Constants.Template.SUPPORT_EMAIL || templateType === Constants.Template.SUPPORT_BOOKING_EMAIL) ? senderEmail.join(',') : emailAddress),
        subject
      }

      if (emailTemplate || messageTextContent) {
        if (emailTemplate) {
          const emailHTML = ejs.render(emailTemplate, args)
          mailOptions.html = emailHTML
        }

        if (messageTextContent) {
          mailOptions.text = messageTextContent
        }

        logger.info('notifyUser - mailOptions::', mailOptions)

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            logger.error('notifyUser - Error sending email:', error)
          } else {
            logger.info('notifyUser - Email sent:', info.response)
          }
        })
      }
    } catch (error) {
      logger.error('notifyUser - Error sending email:', error)
      throw error
    }
  }
}

module.exports = EmailNotifierJob
