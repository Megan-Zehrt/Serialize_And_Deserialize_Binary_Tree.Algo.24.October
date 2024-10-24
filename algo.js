// 297. Serialize and Deserialize Binary Tree



// Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

// Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

// Clarification: The input/output format is the same as how LeetCode serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.





/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    
    let parts = []; // Use an array to accumulate parts of the string

    function BuildString(node) {
        if (node == null) {
            parts.push("null");
            return;
        }
        parts.push(node.val);
        BuildString(node.left);
        BuildString(node.right);
    }

    BuildString(root); // Build the string representation
    return parts.join(',') + ','; // Join and return the final string
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {

    let str = data.split(','); // Split the string into an array
    let index = 0; // Initialize the index

    function buildTree(index) {
        if (str[index] === "null") {
            return { node: null, index: index + 1 }; // Return null and increment index
        }

        let node = new TreeNode(parseInt(str[index])); // Create a new TreeNode
        index++; // Increment index

        // Recursively build the left and right subtrees
        let leftResult = buildTree(index);
        node.left = leftResult.node;
        index = leftResult.index; // Update the index after left subtree

        let rightResult = buildTree(index);
        node.right = rightResult.node;
        index = rightResult.index; // Update the index after right subtree

        return { node: node, index: index }; // Return the node and the updated index
    }

    return buildTree(index).node; // Start building the tree from the index
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */