import axios from 'axios';
import { getMailgunApiConf } from './apiConfigs';
import { createFormattedMessage } from './utils';

/**
 * Handles the errors that can occur when requesting the reCatpcha API
 * @param  {Object} res                      [HTTP response of the /contactMe resource]
 * @param  {Object} recaptchaRequestResponse [HTTP response received requesting the reCaptcha API]
 */
export function handleRecaptchaErrors(res, recaptchaRequestResponse) {
  const {
    status,
    statusText,
    config,
  } = recaptchaRequestResponse;

  console.log(`reCaptcha request error: ${statusText} (${status})`);
  switch (status) {

    // Internal Server error
    case 500: {
      res.send({
        success: false,
        type: 'recaptcha_server_error',
        message: 'The Google reCatpcha servers coudn\'t answer, sorry!' +
        '<br />You\'ll have to contact me the old (and boring) way!',
      });
      break;
    }

    // Not found
    case 404: {
      res.send({
        success: false,
        type: 'recaptcha_not_found',
        message: 'An error occured trying to contact the Google reCaptcha servers.' +
        '<br />The error has been sent to me and will be resolved soon.' +
        '<br />You\'ll have to contact me the old (and boring) way! sorry!',
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
      res.send({
        success: false,
        type: 'recaptcha_bad_request',
        message: 'An error occured trying to contact the Google reCaptcha servers, sorry!' +
        '<br />Please try again!. If the error is recurrent, then, I\'m afraid you\'ll ' +
        'have to contact me the old way!',
      });
      break;
    }

    default: {
      res.send({
        success: false,
        type: 'recaptcha_other_error',
        message: 'An error occured trying to contact the Google reCaptcha servers, sorry!' +
        '<br />Please try again!. If the error is recurrent, then, I\'m afraid you\'ll ' +
        'have to contact me the old way!',
      });
      break;
    }

  }
}


/**
 * Handles the errors that can occur when requesting the Mailgun API
 * @param  {Object} res                    [HTTP response of the /contactMe resource]
 * @param  {Object} mailgunRequestResponse [HTTP response received requesting the Mailgun API]
 */
export function handleMailgunErrors(res, mailgunRequestResponse) {
  const {
    status,
    statusText,
    config,
  } = mailgunRequestResponse;

  switch (status) {
    // Bad Req: Required param missing
    case 400: {
      console.log('\nMailgun Error: Bad request: A parameter was missing.' +
        'See request config below:');
      res.send({
        success: false,
        type: 'mailgun_bad_request',
        message: '',
      });
      break;
    }

    // Unauthorized: No valid api key
    case 401: {
      console.log('\nMailgun Error: Unauthorized: Api key not valid!. See request config below:');
      res.send({
        success: false,
        type: 'mailgun_unauthorized',
        message: '',
      });
      break;
    }

    case 402: {
      console.log('\nMailgun Error: Unauthorized: Api key not valid!. See request config below:');
      res.send({
        success: false,
        type: 'mailgun_unauthorized',
        message: '',
      });
      break;
    }

    // Not Found
    case 404: {
      console.log('\nMailgun Error: Not found. See request config below:');
      res.send({
        success: false,
        type: 'mailgun_not_found',
        message: '',
      });
      break;
    }
    default: {
      console.log(`\nMailgun Error: Server error #${status}, ${statusText}!.`);
      res.send({
        success: false,
        type: 'mailgun_server_error',
        message: 'There\'s something wrong with the email service (Mailgun) I use, sorry!' +
          'Their service will probably be back soon online but better to contact me the old way!',
      });
      break;
    }

  }
  console.log(config);
}
