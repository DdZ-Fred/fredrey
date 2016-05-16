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
