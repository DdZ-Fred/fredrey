/**
 * [Handles the errors that can occur when requesting /contactMe API resource]
 * @param  {Object} contactMeRequestResponse [Axios response object]
 *         @property  {Object}  data         [Data sent with response]
 * @param  {Object} ctx                      [ContactFormModal component context(this)]
 */
export function handleContactMeErrors({ data }, ctx) {
  const origin = data.type.substring(0, data.type.indexOf('_'));

  // Update inner modal type if necessary
  switch (origin) {
    case 'missing': {
      if (ctx.props.innerModalType !== 'missing') {
        ctx.props.updateInnerModalState('missing', data.message);
      }
      break;
    }
    // if recaptcha/mailgun/other
    default: {
      if (ctx.props.innerModalType !== 'failure') {
        ctx.props.updateInnerModalState('failure', data.message);
      }
      break;
    }
  }

  // Show inner modal
  $('.innerModal').modal('show');
}
