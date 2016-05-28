import axios from 'axios';
import { getMailgunApiConf } from './apiConfigs';
import { createFormattedMessage } from './utils';

/**
 * Handles the errors that can occur when requesting the reCatpcha API
 * @param  {Object} res                      [HTTP response of the /contactMe resource]
 * @param  {Object} recaptchaRequestResponse [Axios response received requesting the reCaptcha API]
 *         @property  {Number}  status       [Status code]
 *         @property  {String}  statusText   [Status message]
 *         @property  {Object}  config       [Original axios request config]
 */
export function handleRecaptchaErrors(res, { status, statusText, config }) {
  console.log(`\nAPI[/contactMe]: reCaptcha request error.\nStatus: ${statusText} (${status})`);
  switch (status) {

    // Internal Server error
    case 500: {
      console.log('Type: Internal Server Error');
      res.status(400).send({
        type: 'recaptcha_server_error',
        message: 'The Google reCatpcha servers coudn\'t answer, sorry! ' +
        'You\'ll have to contact me the old (and boring) way!',
      });
      break;
    }

    // Not found
    case 404: {
      console.log('Type: Not Found');
      res.status(400).send({
        type: 'recaptcha_not_found',
        message: 'An error occured trying to contact the Google reCaptcha servers. ' +
        'The error has been sent to me and will be resolved soon. ' +
        'You\'ll have to contact me the old (and boring) way! sorry!',
      });
      // Send email to myself with error
      const notFoundEmail = createFormattedMessage('notFound', {
        resourceName: 'reCaptcha',
        requestConfig: config,
      });
      const instance = axios.create();
      instance.request(getMailgunApiConf(notFoundEmail))
      .then(({ data }) => {
        console.log(`\nMailgun: NotFound message sent!\n${data.message}\nMessageId: ${data.id}`);
      })
      .catch(({ status, statusText }) => {
        console.log(`\nMailgun: Error trying to send NotFound email.
          Status: ${status}\nStatusText: ${statusText}`);
      });
      break;
    }

    // Bad request
    case 400: {
      console.log('Type: Bad request');
      res.status(400).send({
        type: 'recaptcha_bad_request',
        message: 'An error occured trying to contact the Google reCaptcha servers, sorry! ' +
        'Please try again!. If the error is recurrent, then, I\'m afraid you\'ll ' +
        'have to contact me the old way!',
      });
      break;
    }

    default: {
      console.log('Type: Other error');
      res.status(400).send({
        type: 'recaptcha_other_error',
        message: 'An error occured trying to contact the Google reCaptcha servers, sorry! ' +
        'I\'m afraid you\'ll have to contact me the old way!',
      });
      break;
    }

  }
}


/**
 * Handles the errors that can occur when requesting the Mailgun API
 * @param  {Object} res                    [HTTP response of the /contactMe resource]
 * @param  {Object} mailgunRequestResponse [Axios response received requesting the Mailgun API]
 *         @property  {Number}  status       [Status code]
 *         @property  {String}  statusText   [Status message]
 *         @property  {Object}  config       [Original axios request config]
 */
export function handleMailgunErrors(res, { status, statusText, config }) {
  console.log(`\nAPI[/contactMe]: Mailgun request error.\nStatus: ${statusText} (${status})`);
  switch (status) {
    // Bad Req: Required param missing
    case 400: {
      console.log('Type: Bad request, a parameter was missing. See request config below:');
      res.status(400).send({
        type: 'mailgun_bad_request',
        message: 'An error occured while trying to send the email, sorry! ' +
          'I\'m afraid you\'ll have to contact me the old way!',
      });
      break;
    }

    // Unauthorized: No valid api key
    case 401: {
      console.log('Type: Unauthorized: Api key not valid!. See request config below:');
      res.status(400).send({
        type: 'mailgun_unauthorized',
        message: 'An error occured while trying to send the email, sorry! ' +
          'I\'m afraid you\'ll have to contact me the old way!',
      });
      break;
    }

    // Mailgun special error(..code is supposed to be for payment errors)
    case 402: {
      console.log('Type: Request failed but parameters are ok!.\nSee request config below:');
      res.status(400).send({
        type: 'mailgun_request_failed',
        message: 'An error occured while trying to send the email, sorry! ' +
          'I\'m afraid you\'ll have to contact me the old way!',
      });
      break;
    }

    // Not Found
    case 404: {
      console.log('Type: Not found. See request config below:');
      res.status(400).send({
        type: 'mailgun_not_found',
        message: 'An error occured while trying to send the email, sorry! ' +
          'I\'m afraid you\'ll have to contact me the old way!',
      });
      break;
    }
    default: {
      console.log(`Type: Server error #${status}, ${statusText}!.`);
      res.status(400).send({
        type: 'mailgun_server_error',
        message: 'There\'s something wrong with the email service (Mailgun) I use, sorry! ' +
          'Their service will probably be back soon online but better to contact me the old way!',
      });
      break;
    }

  }
  console.log(JSON.stringify(config));
}
