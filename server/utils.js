/**
 * Returns a simple message object.
 * @param  {String} fullname [Client's full name]
 * @param  {String} email    [Client's email]
 * @param  {String} message  [Client's message]
 * @return {Object}          [Message object to send]
 */
export function createFormattedMessage(fullname, email, message) {
  return {
    from: `FREDREY.COM <${process.env.FREDREY_MAILGUN_LOGIN}>`,
    to: 'Frederic.Rey.Pro@gmail.com',
    subject: 'test',
    html: `Hello Frederic!<br /><br />
      My name is ${fullname}.${message}.<br /><br />
      Please contact me at the following address: ${email}`,
  };
}
