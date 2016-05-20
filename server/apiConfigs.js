/**
 * Returns an object that represents the request config needed to consume the reCaptcha API.
 * @param  {Object} req   [Client/browser request which contains the recaptcha response
 *                        and client IP-Address]
 * @return {Object}       [reCaptcha request config]
 */
export function getRecaptchaApiConf(req) {
  return {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
    url: 'https://www.google.com/recaptcha/api/siteverify',
    params: {
      secret: process.env.RECAPTCHA_SECRET,
      response: req.body.recaptchaResponse,
      remoteip: req.ip,
    },
  };
}

/**
 * Returns an object that represents the request config needed to consume the Mailgun API.
 * @param  {Object} mail [Object which represents an email (with to/from/subject...as properties)]
 * @return {Object}      [Mailgun request config]
 */
export function getMailgunApiConf(mail) {
  return {
    method: 'post',
    baseURL: process.env.FREDREY_MAILGUN_BASEURL,
    url: '/messages',
    auth: {
      username: 'api',
      password: process.env.FREDREY_MAILGUN_KEY,
    },
    params: mail,
  };
}
