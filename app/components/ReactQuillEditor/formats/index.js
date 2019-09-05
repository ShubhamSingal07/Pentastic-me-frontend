import { Quill } from 'react-quill';

import ResponsiveEmbed from './ResponsiveEmbed';
import DividerBlot from './DividerBlot';
import ImageBlot from './ImageBlot';

Quill.register(ResponsiveEmbed);
Quill.register({
  'formats/divider': DividerBlot,
});
Quill.register(ImageBlot);

const formats = [['image'], ['video'], ['formats/divider', 'divider']];

export default formats;
