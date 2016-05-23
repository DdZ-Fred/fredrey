/**
 * [Handles the errors that can occur when requesting /contactMe API resource]
 * @param  {Object} contactMeRequestResponse [Axios response object]
 *         @property  {Object}  data       [Data sent with response]
 */
export function handleContactMeErrors({ data }) {
  const origin = data.type.substring(0, data.type.indexOf('_'));

  switch (origin) {
    case 'missing': {
      // patata
      break;
    }
    case 'recaptcha': {

      break;
    }
    case 'mailgun': {

      break;
    }
    default: {
      break;
    }

  }
}
