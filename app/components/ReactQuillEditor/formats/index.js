import { Quill } from 'react-quill';

import ResponsiveEmbed from './ResponsiveEmbed';
import DividerBlot from './DividerBlot';
import ImageBlot from './ImageBlot';
import Font from './FontBlot';

Quill.register(ResponsiveEmbed);
Quill.register({
  'formats/divider': DividerBlot,
});
Quill.register(ImageBlot);
Quill.register(Font);

const formats = [['image'], ['video'], ['formats/divider', 'divider']];

export default formats;
