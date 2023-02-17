/*
    A tree order traversal, where you visit each level of the tree completely before proceeding to the next.
*/

export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const q: BinaryNode<number>[] = [head];

    while (q.length) {
        const node = q.shift() as BinaryNode<number>;

        if (node.value === needle) {
            return true;
        }

        if (node.left) {
            q.unshift(node.left);
        }
        if (node.right) {
            q.unshift(node.right);
        }
    }

    return false;
}