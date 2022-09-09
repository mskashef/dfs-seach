const defaultConfig = {
  detectTarget: (node) => true,
  getChildren: () => [],
  getUid: (node) => btoa(encodeURI(JSON.stringify(node))),
  removeChildren: (node) => node,
};

const getResult = (node) => {
  const result = {
    path: [],
    targetNode: node.self,
  };
  while (node.parent) {
    result.path.unshift(node.self);
    node = node.parent;
  }
  return result;
};

function dfsSearch(root, config = {}) {
  const { detectTarget, getChildren, getUid, removeChildren } = Object.assign(
    defaultConfig,
    config
  );
  const explored = new Map();
  const stack = [{ self: root, parent: null }];
  while (stack.length > 0) {
    const node = stack.shift();
    const uid = getUid(node.self);
    // If node is visited previously, do not expand it!
    if (explored.get(uid)) continue;
    explored.set(uid, true);
    if (detectTarget(node.self)) return getResult(node);
    const children = getChildren(node.self) || [];
    stack.unshift(
      ...children.map((child) => ({
        self: child,
        // Add parent to the node in order to be able to return back to the root and find the path
        parent: removeChildren(node.self),
      }))
    );
  }
  return undefined;
}

module.exports = dfsSearch;
