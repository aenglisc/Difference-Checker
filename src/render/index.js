import paddedRender from './paddedRender';
import plainRender from './plainRender';
import jsonRender from './jsonRender';

export const formats = {
  padded: tree => paddedRender(tree),
  plain: tree => plainRender(tree),
  json: tree => jsonRender(tree),
};

export default treeObject => formats[treeObject.format](treeObject.tree);
