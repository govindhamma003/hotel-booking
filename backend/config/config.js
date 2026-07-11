require('dotenv').config()

module.exports = {
  appName: 'Bonheur',
  appEnv: process.env.APP_ENV ? process.env.APP_ENV : 'development',
  mail: {
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    ssl: false,
    tls: true,
    auth: {
      user: process.env.EMAIL_NOTIFICATION_USER,
      pass: process.env.EMAIL_NOTIFICATION_PASSWORD
    },
    testRecipient: process.env.EMAIL_NOTIFICATION_TEST_RECIPIENT
  },
  gmail_smtp: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false
  },
  appClient: {
    baseUrl: (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://localhost:5000' : ''
  },
  google: {
    refreshTokenUrl: 'https://oauth2.googleapis.com/token'
  },
  papertrail: {
    notifications: {
      userPostQueueDurationThresholdMs: process.env.USER_POST_QUEUE_DURATION_THRESHOLD ?? 5000
    }
  }
}
