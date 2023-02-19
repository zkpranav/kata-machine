/*
    Its a binary tree, i.e atmost 2 children
    Left child <= parent, right child > parent

    If left unbalanced, values to skew the tree to one side, effectively turning it into a linked list
    Therefore, time complexity for search is b/w O(log(n)) - O(h) where, h is the height of the tree
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

    delete(value: number): number | undefined {
        if (this.root === undefined) {
            return undefined;
        }

        let parent: BinaryNode<number> = this.root;
        let node: BinaryNode<number> | null = this.root;

        while(node !== null) {
            if (value === node.value) {
                // No children case
                if (!node.left && !node.right) {
                    const res = node.value;

                    if (node === this.root) {
                        this.root = undefined;
                        return res;
                    }
                    
                    if (parent.left === node) {
                        parent.left = null;
                        return res;
                    } else {
                        parent.right = null;
                        return res;
                    }
                }

                // Two children case
                if (node.left && node.right) {
                    let subTreeRootParent = node;
                    let subTreeRoot = node.left;
                    while(subTreeRoot.right) {
                        subTreeRootParent = subTreeRoot;
                        subTreeRoot = subTreeRoot.right;
                    }

                    if (subTreeRoot.left) {
                        // One child
                        if (subTreeRootParent.left === subTreeRoot) {
                            subTreeRootParent.left = subTreeRoot.left;
                        } else {
                            subTreeRootParent.right = subTreeRoot.left;
                        }
                    }

                    const res = node.value;
                    node.value = subTreeRoot.value;

                    return res;
                }

                // One child case
                if (node.left || node.right) {
                    const res = node.value;
                    if (node === this.root) {
                        node.left? this.root = node.left: this.root = node.right!;
                        return res;
                    }

                    if (parent.left === node) {
                        node.left? parent.left = node.left: parent.left = node.right;
                    } else {
                        node.left? parent.right = node.left: parent.right = node.right;
                    }
                    return res;
                }

                throw new Error("Unreachable code");
            } else if (value < node.value) {
                parent = node;
                node = node.left;
            } else {
                parent = node;
                node = node.right;
            }
        }

        return undefined;
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

bTree.delete(4);
console.log("--------------- *** ---------------");
bTree.inorderTraversal();

bTree.delete(51);
console.log("--------------- *** ---------------");
bTree.inorderTraversal();