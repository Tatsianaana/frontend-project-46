import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const format = (diff, formatName) => {
  switch (formatName) {
    case 'plain':
      return formatPlain(diff);
    case 'json':
      return JSON.stringify(diff);
    case 'stylish':
      return formatStylish(diff);
    default:
      throw new Error(`No such formatter: '${formatName}'`);
  }
};

export default format;
