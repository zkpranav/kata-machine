function visit(node: BinaryNode<number> | null, path: Array<number>): number[] {
    if (node === null) {
        return path;
    }

    visit(node.left, path);
    path.push(node.value);
    visit(node.right, path);

    return path;
}

export default function in_order_search(head: BinaryNode<number>): number[] {
    return visit(head, []);
}