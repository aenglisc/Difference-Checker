import paddedRender from './paddedRender';
import plainRender from './plainRender';
import jsonRender from './jsonRender';

const formats = {
  padded: tree => paddedRender(tree),
  plain: tree => plainRender(tree),
  json: tree => jsonRender(tree),
};

export default (treeObject) => {
  const { format, tree } = treeObject;
  if (format in formats) {
    return formats[format](tree);
  }
  throw new Error(`${format} is not a proper format`);
};
