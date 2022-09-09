# DFS Search

This is a reusable implementation of the DFS algorithm with simple usage.

Using this module you can define a custom way to extract children of a node and it's fully customizable.

## Sample Usage

```js
const dfsSearch = require("@mskashef/dfs-search");
const root = {
  name: "item1",
  children: [
    {
      name: "item2",
      children: [
        {
          name: "item3",
        },
        {
          name: "item4",
          children: [
            {
              name: "item5",
            },
            {
              name: "item6",
            },
          ],
        },
        {
          name: "item7",
        },
      ],
    },
    {
      name: "item8",
      children: [
        {
          name: "item9",
        },
        {
          name: "item10",
        },
      ],
    },
  ],
};
const searchResult = dfsSearch(root, {
  detectTarget: (node) => node.name === "item5", // we are looking for a node with name "item5"
  getChildren: (node) => node.children,
  getUid: (node) => JSON.stringify(node),
  removeChildren: node => {
    delete node.children
    return node
  }
});
console.log(searchResult.targetNode);
/* 
OUTPUT:
{
  "name":"item5"
}
*/
```

## API Document
This function receives two input parameters:
- root: The root object of the tree
- config: The config object

## root:
The tree root

## config:
The config object which it's default values are: 

| property       | Type     | Description                                                                                                                                                                           | Default value                                   |
|----------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------|
| detectTarget   | Function | Receives a node as input param and returns true if this is the node we are looking for. otherwise returns false.                                                                      | (node) => true                                  |
| getChildren    | Function | Receives a node as input param and returns it's children in a javascript array.                                                                                                       | (node) => []                                    |
| getUid         | Function | Receives a node as input param and returns a uniq ID for it. This prop is helpful iterating on a Tree which may has multiple same nodes. This function is to prevent iterating them.  | (node) => btoa(encodeURI(JSON.stringify(node))) |
| removeChildren | Function | Receives a node as input param and returns it after removing its children. This is used when returning result (removes children from the path).                                       |                                                 |

## output:
The output is an object of shape:
```js
{
  path: [
    {name: 'item1'},
    {name: 'item4'},
    {name: 'item5'},
  ],
  targetNode: {name: 'item5'}
}
```
- `path`: This is the path from the root to the targetNode
- `targetNode`: The node we are looking for

And also if the targetNode does not exist in the tree, it will return `undefined`