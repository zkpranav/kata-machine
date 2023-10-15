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

    insert(value: number, node: BinaryNode<number> | null): void {
        if (!node) {
            if (this.root === undefined) {
                this.root = {
                    value: value,
                    left: null,
                    right: null
                } as BinaryNode<number>;
                return;
            } else {
                throw new Error("Node cannot be Falsy");
            }
        }

        if (value <= node.value) {
            if (node.left) {
                this.insert(value, node.left);
            } else {
                node.left = {
                    value: value,
                    left: null,
                    right: null
                } as BinaryNode<number>;
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
            }
        }
    }

    find(value: number): BinaryNode<number> | undefined {
        if (this.root === undefined) {
            return undefined;
        }

        let ret = undefined;
        let node: BinaryNode<number> | null = this.root;
        do {
            if (value === node.value) {
                ret = node;
                break;
            } else if (value < node.value) {
                node = node.left;
            } else {
                node = node.right;
            }
        } while (node);

        return ret;
    }

    min(root: BinaryNode<number>): BinaryNode<number> {
        let node = root;
        while (node.left) {
            node = node.left;
        }
        return node;
    }

    deleteMin(root: BinaryNode<number>): BinaryNode<number> {
        let node: BinaryNode<number> | null = this.min(root) as BinaryNode<number>;
        const ret = node;
        node = node.right;

        return ret;
    }

    delete(value: number): number | undefined {
        let node: BinaryNode<number> | undefined | null = this.find(value);
        if (node === undefined) {
            return undefined;
        }

        const ret = node.value;
        if (node.left === null && node.right === null) {
            // 0 children
            node = null;
        } else if (node.left && node.right === null) {
            // 1 child
            node = node.left;
        } else if (node.right && node.left === null) {
            // 1 child
            node = node.right;
        } else {
            // 2 children
            const min = this.deleteMin(node.right as BinaryNode<number>);
            min.left = node.left;
            min.right = node.right;
            node = min;
        }

        return ret;
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
