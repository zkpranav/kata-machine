/*
    Divide & Conqure - 
    Divide the problem into smaller sub-problems and then solve them individually.

    Strategy -
    1. Pick a pivot
    2. Place the pivot in the middle, i.e everything less than it to the left, and everything higher than it to the right.
    3. This sorts one element, the pivot but the "sub-array" to its left and right have specific properties.
    4. Solve the subarrays in a similar fashion until no more subarrays can be formed.
*/
export default function quick_sort(arr: number[]): void {
    quickSort(arr, 0, arr.length - 1);
}

function quickSort(arr: number[], low: number, high: number): void {
    if (low >= high) {
        return;
    }

    const pivotIdx = partition(arr, low, high);
    quickSort(arr, low, pivotIdx - 1);
    quickSort(arr, pivotIdx + 1, high);
}

function partition(arr: number[], low: number, high: number): number {
    // Assume a pivot
    const pivot = arr[high];
    let idx = low - 1;

    // Place every value lower than pivot, before the potential pivot position
    for (let i = low; i < high; i++) {
        if (arr[i] <= pivot) {
            idx += 1;
            const temp = arr[i];
            arr[i] = arr[idx];
            arr[idx] = temp;
        }
    }

    // Increment to get the pivot position
    idx += 1;
    arr[high] = arr[idx];
    arr[idx] = pivot;

    return idx;
}