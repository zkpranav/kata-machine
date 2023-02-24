function search(node: BinaryNode<number> | null, needle: number): boolean {
    if (!node) {
        return false;
    }

    if (needle < node.value) {
        return search(node.left, needle);
    } else if (needle > node.value) {
        return search(node.right, needle);
    } else {
        return true;
    }
}

export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    return search(head, needle);
}