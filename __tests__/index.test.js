import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import genDiff from '../src/index.js';
import format from '../src/formatters/index.js';
import formatStylish from '../src/formatters/stylish.js';
import formatPlain from '../src/formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const dataFormats = ['json', 'yml'];

const expectedStylish = readFixture('stylish-result.txt');
const expectedPlain = readFixture('plain-result.txt');
const expectedJson = readFixture('json-result.txt');

describe('genDif', () => {
  test.each(dataFormats)('%s', (format) => {
    const filePath1 = getFixturePath(`file1.${format}`);
    const filePath2 = getFixturePath(`file2.${format}`);
    expect(genDiff(filePath1, filePath2)).toEqual(expectedStylish);
    expect(genDiff(filePath1, filePath2, 'stylish')).toEqual(expectedStylish);
    expect(genDiff(filePath1, filePath2, 'plain')).toEqual(expectedPlain);
    expect(genDiff(filePath1, filePath2, 'json')).toEqual(expectedJson);
  });
});
