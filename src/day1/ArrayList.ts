/*
    Time complexities -
    find -> O(1)
    push & pop -> O(1)
    enqueue & dequeue -> O(n) due to potential shifting (also includes insertAt & removeAt)
*/

export default class ArrayList<T> {
    public length: number;
    private capacity: number;
    private arr: Array<T>;

    constructor(capacity: number) {
        this.length = 0;
        this.capacity = capacity;
        this.arr = [];
    }

    prepend(item: T): void {
        if (this.length === this.capacity) {
            this.capacity = this.capacity * 2;
        }

        this.length += 1;
        for (let i = this.length - 1; i > 0; i--) {
            this.arr[i] = this.arr[i - 1];
        }
        this.arr[0] = item;
    }

    insertAt(item: T, idx: number): void {
        if (this.length === this.capacity) {
            this.capacity = this.capacity * 2;
        }

        this.length += 1;
        for (let i = this.length - 1; i > idx; i--) {
            this.arr[i] = this.arr[i - 1];
        }
        this.arr[idx] = item;
    }

    append(item: T): void {
        if (this.length === this.capacity) {
            this.capacity = this.capacity * 2;
        }

        this.arr[this.length] = item;
        this.length += 1;
    }

    remove(item: T): T | undefined {
        for (let i = 0; i < this.length; i++) {
            if (this.arr[i] === item) {
                return this.removeAt(i);
            }
        }

        return undefined;
    }

    get(idx: number): T | undefined {
        if (idx >= this.length) {
            return undefined;
        }

        return this.arr[idx];
    }

    removeAt(idx: number): T | undefined {
        if (idx >= this.length) {
            return undefined;
        }

        const ret = this.arr[idx];
        this.length -= 1;
        for (let i = idx; i < this.length; i++) {
            this.arr[i] = this.arr[i + 1];
        }

        return ret;
    }
}
