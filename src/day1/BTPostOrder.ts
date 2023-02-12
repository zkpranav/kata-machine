function visit(node: BinaryNode<number> | null, path: Array<number>): number[] {
    if (node === null) {
        return path;
    }

    visit(node.left, path);
    visit(node.right, path);
    path.push(node.value);

    return path;
}

export default function post_order_search(head: BinaryNode<number>): number[] {
    return visit(head, []);
}