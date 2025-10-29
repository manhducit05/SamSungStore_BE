let count = 0;

function createTree(arr, parentId = "") {
  const tree = [];

  arr.forEach(item => {
    // Access _id correctly
    const itemId = item._id ? item._id.toString() : "";

    // Check if the current item's parent_id matches the parentId we're looking for
    if (item.parent_id.toString() === parentId) {
      count++;
      // Create a new object to avoid mutating the original
      const newItem = { ...item.toObject(), index: count }; // Use toObject() to get a plain JS object

      // Find children for the current item
      const children = createTree(arr, itemId); // Use itemId to find children
      if (children.length > 0) {
        newItem.children = children; // Assign children only if they exist
      }

      tree.push(newItem); // Push the new item to the tree
    }
  });

  return tree;
}

module.exports.tree = (arr, parentId = "") => {
  count = 0; // Reset count for new tree creation
  return createTree(arr, parentId); // Return the constructed tree
};
