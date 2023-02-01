/*
    Notes -
    Consider off by 1 conditions.
    Include low & exclude high or vice versa. Depending on this, decide whether to floor or ceil the mid calculation.
*/
export default function bs_list(haystack: number[], needle: number): boolean {
    let low = 0;
    let high = haystack.length;

    do {
        const mid = Math.floor(low + (high - low) / 2);
        const value = haystack[mid];
        if (value === needle) {
            return true;
        } else if (value > needle) {
            high = mid;
        } else {
            low = mid + 1;
        }
    } while(low < high);

    return false;
}