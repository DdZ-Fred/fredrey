/**
 * Returns a simple message/email object
 * @param  {String} template    [client/notFound]
 * @param  {Object} data        [Poly-structural...]
 *  IF client:
 *     - data.fullname       {String}   [Client full name]
 *     - data.email          {String}   [Client email]
 *     - data.message        {String}   [Client message]
 *   IF notFound:
 *     - data.resourceName   {String}   [Name of the resource requested]
 *     - data.requestConfig  {Object}   [Represents the config used when the request was made]
 * @return {Object}             [The email to send]
 */
export function createFormattedMessage(template, data) {
  const eFrom = `FREDREY.COM <${process.env.FREDREY_MAILGUN_LOGIN}>`;
  const eTo = 'Frederic.Rey.Pro@gmail.com';
  const eSubject = 'test';
  let eHtml;

  switch (template) {

    case 'client': {
      eHtml = `Dear Frederic!<br/><br/>
        My name is ${data.fullname}.${data.message}<br/><br />
        You can contact me at the following address: ${data.email}`;
      break;
    }

    case 'notFound': {
      eHtml = `Dear mySelf!<br /><br />
        The resource ${data.resourceName} seems not to be available anymore.<br />
        The request's config can be found below:<br />
        ${data.requestConfig.toString()}<br /><br />
        Cheers!`;
      break;
    }

    default: {
      // Test Mailgun API
      eHtml = 'Dear myself!<br /><br />This is a Mailgun Test email!<br /><br />Fred';
      break;
    }
  }
  return {
    from: eFrom,
    to: eTo,
    subject: eSubject,
    html: eHtml,
  };
}
