/**
 * [Handles the errors that can occur when requesting /contactMe API resource]
 * @param  {Object} contactMeRequestResponse [Axios response object]
 *         @property  {Object}  data       [Data sent with response]
 */
export function handleContactMeErrors({ data }) {
  switch (data.type) {
    case 'missing_data': {
      alert('Gibidin');
      // Reset reCaptcha
      // Enable submit button
      break;
    }
    default: {
      break;
    }

  }
}
