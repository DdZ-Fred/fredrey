import { configure } from '@kadira/storybook';

import '../public/semantic/dist/semantic.min.css';
import '../public/index.css';

function loadStories() {
  require('../shared/components/.stories');
}
configure(loadStories, module);
