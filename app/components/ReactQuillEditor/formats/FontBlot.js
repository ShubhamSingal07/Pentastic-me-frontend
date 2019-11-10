import { Quill } from 'react-quill';

const Font = Quill.import('formats/font');
Font.whitelist = ['serif', 'monospace', 'merriweather', 'aref-ruqaa'];

export default Font;
