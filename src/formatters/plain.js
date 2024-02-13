import _ from 'lodash';

const separator = '\n';

const buildPath = (path, key) => (path.length > 0 ? `${path}.${key}` : String(key));

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return (_.isString(value)) ? `'${value}'` : String(value);
};

const formatPlain = (diff) => {
  const iter = (tree, path) => {
    const result = tree
      .filter((node) => node.type !== 'unchanged')
      .map((node) => {
        const currentPath = buildPath(path, node.key);
        switch (node.type) {
          case 'deleted':
            return `Property '${currentPath}' was removed`;
          case 'added':
            return `Property '${currentPath}' was added with value: ${stringify(node.value)}`;
          case 'nested':
            return iter(node.children, currentPath);
          case 'changed':
            return `Property '${currentPath}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
          default:
            throw new Error(`Unknown node type: '${node.type}'`);
        }
      });
    return result.join(separator);
  };
  return iter(diff, '');
};

export default formatPlain;
