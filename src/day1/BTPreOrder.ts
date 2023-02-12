/*
    Tree traversals -
    Pre-order -> Root, left, right (root in the beginning)
    In-order -> Left, root, right (root in the middle)
    Post-order -> Left, right, root (root in the end)

    Generalized -
    Pre-order - Parent then children
    Post-order - Children then parent
*/

function visit(node: BinaryNode<number> | null, path: Array<number>): number[] {
    if (node === null) {
        return path;
    }

    path.push(node.value);

    visit(node.left, path);
    visit(node.right, path);

    return path;
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
    return visit(head, []);
}