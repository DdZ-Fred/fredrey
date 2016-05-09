import React, { PropTypes } from 'react';
import DeviconsIcon from './components/icons/DeviconsIcon';
import SemanticIcon from './components/icons/SemanticIcon';
import SvgIcon from './components/icons/SvgIcon';


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
