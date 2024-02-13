import fs from 'node:fs';
import path from 'node:path';
import parse from './parsers.js';
import makeDiff from './makeDiff.js';
import format from './formatters/index.js';

const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);

const getFormat = (filePath) => {
  const absolutePath = getAbsolutePath(filePath);
  const extension = path.extname(absolutePath).slice(1);
  return extension;
};

const getData = (filePath) => {
  const absolutePath = getAbsolutePath(filePath);
  const data = fs.readFileSync(absolutePath, 'utf-8');
  const dataFormat = getFormat(filePath);
  return parse(data, dataFormat);
};

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const data1 = getData(filePath1);
  const data2 = getData(filePath2);
  const diff = makeDiff(data1, data2);
  return format(diff, formatName);
};

export default genDiff;
