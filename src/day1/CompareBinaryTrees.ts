/*
    Prefer a depth-first search here, or a similar stack oriented search because it preserves shape
*/

export default function compare(a: BinaryNode<number> | null, b: BinaryNode<number> | null): boolean {
    if (a === null || b == null) {
        if (a === b) {
            return true;
        } else  {
            return false;
        }
    }

    if (a.value !== b.value) {
        return false;
    } else {
        return compare(a.left, b.left) && compare(a.right, b.right);
    }
}