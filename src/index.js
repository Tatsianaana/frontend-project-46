import fs from 'node:fs';
import path from 'node:path';
import _ from 'lodash';
import parse from './parsers.js';
import makeDiff from './makeDiff.js';
import format from './formatters/index.js';

const getAbsolutePath = (filePath) => path.resolve(process.cwd(), '../__fixtures__', filePath);

const excludeFormat = (filePath) => {
  const extension = path.extname(getAbsolutePath(filePath));
  return _.trimStart(extension, '.');
};

const getData = (filePath) => {
  const data = fs.readFileSync(getAbsolutePath(filePath), 'utf-8');
  const dataFormat = excludeFormat(filePath);
  return parse(data, dataFormat);
};

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const data1 = getData(filePath1);
  const data2 = getData(filePath2);
  const diff = makeDiff(data1, data2);
  return format(diff, formatName);
};

export default genDiff;
