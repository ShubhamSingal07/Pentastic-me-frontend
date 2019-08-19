import { Quill } from 'react-quill';

import ResponsiveEmbed from './ResponsiveEmbed';
import DividerBlot from './DividerBlot';

Quill.register(ResponsiveEmbed);
Quill.register({
  'formats/divider': DividerBlot,
});

const formats = [['video'], ['formats/divider', 'divider']];

export default formats;
