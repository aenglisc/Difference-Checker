import paddedRender from './paddedRender';
import plainRender from './plainRender';
import jsonRender from './jsonRender';

const formats = {
  padded: tree => paddedRender(tree),
  plain: tree => plainRender(tree),
  json: tree => jsonRender(tree),
};

export default (treeObject) => {
  if (treeObject.format in formats) {
    return formats[treeObject.format](treeObject.tree);
  }
  throw new Error(`${treeObject.format} is not a proper format`);
};
