const dfsSearch = require("..");

test("Test: Search in tree, without removing parents children", () => {
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
  const searchResult = JSON.stringify(
    dfsSearch(root, {
      detectTarget: (node) => node.name === "item5",
      getChildren: (node) => node.children,
      getUid: node => JSON.stringify(node)
    })
  );
  expect(searchResult).toBe(
    '{"path":[{"name":"item2","children":[{"name":"item3"},{"name":"item4","children":[{"name":"item5"},{"name":"item6"}]},{"name":"item7"}]},{"name":"item4","children":[{"name":"item5"},{"name":"item6"}]},{"name":"item5"}],"targetNode":{"name":"item5"}}'
  );
});

test("Test: Search in tree, with removing parents children", () => {
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
  const searchResult = JSON.stringify(
    dfsSearch(root, {
      detectTarget: (node) => node.name === "item5",
      getChildren: (node) => node.children,
      getUid: node => JSON.stringify(node),
      removeChildren: (node) => {
        delete node.self.children;
        return node;
      },
    })
  );
  expect(searchResult).toBe(
    '{"path":[{"name":"item2"},{"name":"item4"},{"name":"item5"}],"targetNode":{"name":"item5"}}'
  );
});

test("Test: Search result does not exist", () => {
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
  expect(
    JSON.stringify(
      dfsSearch(root, {
        detectTarget: (node) => node.name === "item5",
        getChildren: (node) => node.children,
      })
    )
  ).toBe(undefined);
});
