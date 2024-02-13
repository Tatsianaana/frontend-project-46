import _ from 'lodash';

const spaceCount = 4;
const offsetCount = 2;
const spaceChar = ' ';
const separator = '\n';

const setIndentation = (depth, space, offset = 0) => spaceChar.repeat(depth * space - offset);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const entries = Object.entries(data);
  const result = entries.map(([key, value]) => ((_.isObject(value))
    ? `${setIndentation(depth + 1, spaceCount)}${key}: ${stringify(value, depth + 1)}`
    : `${setIndentation(depth + 1, spaceCount)}${key}: ${value}`));
  return `{\n${result.join(separator)}\n${setIndentation(depth, spaceCount)}}`;
};

const formatStylish = (diff) => {
  const iter = (tree, depth) => {
    const result = tree.map((node) => {
      switch (node.type) {
        case 'deleted':
          return `${setIndentation(depth + 1, spaceCount, offsetCount)}- ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'added':
          return `${setIndentation(depth + 1, spaceCount, offsetCount)}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'nested':
          return `${setIndentation(depth + 1, spaceCount)}${node.key}: ${iter(node.children, depth + 1)}`;
        case 'changed':
          return `${setIndentation(depth + 1, spaceCount, offsetCount)}- ${node.key}: ${stringify(node.value1, depth + 1)}\n${setIndentation(depth + 1, spaceCount, offsetCount)}+ ${node.key}: ${stringify(node.value2, depth + 1)}`;
        case 'unchanged':
          return `${setIndentation(depth + 1, spaceCount)}${node.key}: ${stringify(node.value, depth)}`;
        default:
          throw new Error(`Unknown node type: '${node.type}'`);
      }
    });
    return `{\n${result.join(separator)}\n${setIndentation(depth, spaceCount)}}`;
  };
  return iter(diff, 0);
};

export default formatStylish;
