/*
    Its a binary tree, i.e atmost 2 children
    Left child <= parent, right child > parent

    If left unbalanced, values to skew the tree to one side, effectively turning it into a linked list
    Therefore, time complexity for search is b/w O(log(n)) - O(h) where, h is the height of the tree

    Can be balanced w/ either an AVL tree or a Red-Black tree
*/

class BinaryTree {
    /*
        Tree isnt balanced.
        Assumes Left is <= and Right is > Root.
    */

    private root: BinaryNode<number> | undefined;

    constructor() {
        this.root = undefined;
    }

    insert(value: number, node: BinaryNode<number> | undefined = this.root): void {
        if (node === undefined && this.root === undefined) {
            this.root = {
                value: value,
                left: null,
                right: null
            } as BinaryNode<number>;
            return;
        } else if (node === undefined) {
            throw new Error("Node can't be undefined if root exists.");
        }
        
        node = node as BinaryNode<number>;
        if (value <= node.value) {
            if (node.left) {
                this.insert(value, node.left);
            } else {
                node.left = {
                    value: value,
                    left: null,
                    right: null
                } as BinaryNode<number>;
                return;
            }
        } else {
            if (node.right) {
                this.insert(value, node.right);
            } else {
                node.right = {
                    value: value,
                    left: null,
                    right: null
                } as BinaryNode<number>;
                return;
            }
        }
    }

    find(value: number): boolean {
        if (this.root === undefined) {
            return false;
        }

        let node: BinaryNode<number> | null = this.root;
        while(node !== null) {
            if (value === node.value) {
                return true;
            } else if (value < node.value) {
                node = node.left;
            } else {
                node = node.right;
            }
        }

        return false;
    }

    deleteWrapper(value: number): number | undefined {
        if (this.root === undefined) {
            return undefined;
        }

        const deletedNode = this.delete(this.root, value);
        if (deletedNode) {
            return deletedNode.value;
        } else {
            return undefined;
        }
    }

    private delete(root: BinaryNode<number> | null, value: number): BinaryNode<number> | null {
        if (root === null) {
            return null;
        }

        if (value < root.value) {
            root.left = this.delete(root.left, value);
        } else if (value > root.value) {
            root.right = this.delete(root.right, value);
        } else {
            // Handle one child case & no child case
            if (root.left === null) {
                return root.right;
            } else if (root.right === null) {
                return root.left;
            }

            // Handle two children case
            let node = root.right;
            while (node.left) {
                node = node.left;
            }

            node.left = root.left;
            return root.right;
        }

        return root;
    }

    inorderTraversal(node: BinaryNode<number> | null | undefined = this.root): void {
        if (!node) {
            return;
        }

        this.inorderTraversal(node.left);
        console.log(node.value);
        this.inorderTraversal(node.right);
    }
}

const bTree = new BinaryTree();

bTree.insert(15);
bTree.insert(51);
bTree.insert(100);
bTree.insert(7);
bTree.insert(25);
bTree.insert(4);
bTree.insert(37);
bTree.inorderTraversal();

bTree.deleteWrapper(4);
console.log("--------------- *** ---------------");
bTree.inorderTraversal();

bTree.deleteWrapper(51);
console.log("--------------- *** ---------------");
bTree.inorderTraversal();
