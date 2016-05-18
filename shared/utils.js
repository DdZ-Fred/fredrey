import React, { PropTypes } from 'react';
import DeviconsIcon from './components/icons/DeviconsIcon';
import SemanticIcon from './components/icons/SemanticIcon';
import SvgIcon from './components/icons/SvgIcon';


/**
 * [Generates the appropriate icon React component]
 * @param  {String} provider   [devicons/semantic/svg]
 * @param  {String} icon       [For devicons & semantic, it should be the className
 *                             of the according icon. Otherwise, the filename of
 *                             the svg file should be here]
 * @return {React Component}   [The appropriate React Component]
 */
export function generateIcon(provider, icon) {
  switch (provider) {
    case 'devicons':
      return <DeviconsIcon icon={icon} />;

    case 'semantic':
      return <SemanticIcon icon={icon} />;

    case 'svg':
      return <SvgIcon icon={icon} />;

    default:
      return DeviconsIcon;
  }
}


/**
 * Copy param to clipboard.
 * Works with:
 * - Firefox 41+
 * - Chrome 42+
 * - IE 9+ & Edge
 * - Opera 29+
 * - Safari: NOT YET
 * @param  {String}  text [Text to copy to clipboard]
 */
export function copyToClipboard(text) {
  // Doesn't work if 'hidden' or 'display-none'
  const tempTxtInput = document.createElement('input');
  tempTxtInput.id = 'textToCopy';
  tempTxtInput.type = 'text';
  tempTxtInput.readOnly = true;
  // IMPORTANT: Only one dimension should be 0px
  // otherwise Chrome won't select anything.
  tempTxtInput.style.height = '0px';
  tempTxtInput.defaultValue = text;

  // Append to body the tempTxtInput with needed text
  document.querySelector('body').appendChild(tempTxtInput);

  // Select Input text
  // Only works on text-type Input and textarea
  tempTxtInput.select();
  // document.getElementById(tempTxtInput.id).select();

  // Copy selection
  const copyBool = document.execCommand('copy');

  // Remove tempTxtInput from DOM-Doc
  document.querySelector('body').removeChild(tempTxtInput);
  return copyBool;
}


/**
 * Allows to reset the state of the form. It cleans up all the errors
 * that can appear after validation.
 * @param {String} formSelector   CSS-style selector that targets the form
 *                                Default: '.ui.form'
 */
export function resetSemanticInvalidForm(formSelector = '.ui.form') {
  const aForm = document.querySelector(formSelector);
  // Remove error class from form
  aForm.classList.remove('error');

  // Remove error class from fields
  // unless the element has the message class.
  // The error messages container has the 3 classes, field/error/message
  // and the error class is needed for the errors to render appropriately.
  const invalidFields = aForm.querySelectorAll('.field.error');
  for (let i = 0; i < invalidFields.length; i++) {
    if (!invalidFields[i].classList.contains('message')) {
      invalidFields[i].classList.remove('error');
    }
  }

  // Empty the .ui.error.message div
  const errorMessagesContainer = aForm.querySelector('.ui.error.message');
  if (errorMessagesContainer.firstChild) {
    errorMessagesContainer.removeChild(errorMessagesContainer.firstChild);
  }
}
