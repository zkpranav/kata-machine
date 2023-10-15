/*
 * A tree traversal where an enitre branch is explored before moving to the next one.
 *
 * Time complexity -
 * O(n) for n nodes.
 */

export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    const stack: BinaryNode<number>[] = [head];

    let status = false;
    while (stack.length) {
        const node = stack.pop() as BinaryNode<number>;
        if (node.value === needle) {
            status = true;
            break;
        }

        if (node.right) {
            stack.push(node.right);
        }
        if (node.left) {
            stack.push(node.left);
        }
    }

    return status;
}