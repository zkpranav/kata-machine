export default function bs_list(haystack: number[], needle: number): boolean {
    let low = 0;
    let high = haystack.length;

    do {
        const mid = Math.floor(((high - low) / 2) + low);
        const value = haystack[mid];

        if (needle === value) {
            return true;
        } else if (needle > value) {
            low = mid + 1;
        } else {
            high = mid;
        }
    } while (low < high);

    return false;
}
