export default class ArrayList<T> {
    public length: number;
    private capacity: number;
    private arr: T[];

    constructor(c: number) {
        this.capacity = c;
        this.length = 0;
        this.arr = [];
    }

    prepend(item: T): void {
        if (this.length === this.capacity) {
            this.doubleCapacity();
        }

        if (this.arr[0] === undefined) {
            this.arr[0] = item;
            this.length += 1;
            return;
        }

        for (let i = this.length; i > 0; --i) {
            this.arr[i] = this.arr[i - 1];
        }
        this.arr[0] = item;
        this.length += 1;
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            return;
        }

        if (idx === 0) {
            this.prepend(item);
        } else if (idx === this.length) {
            this.append(item);
        }

        if (this.length === this.capacity) {
            this.doubleCapacity();
        }

        for (let i = this.length; i > idx; --i) {
            this.arr[i] = this.arr[i - 1];
        }
        this.arr[idx] = item;
        this.length += 1;
    }

    append(item: T): void {
        if (this.length === this.capacity) {
            this.doubleCapacity();
        }

        this.arr[this.length] = item;
        this.length += 1;
    }

    remove(item: T): T | undefined {
        if (this.length === 0) {
            return undefined;
        }

        let i = 0;
        for (; i < this.length; ++i) {
            if (this.arr[i] === item) {
                break;
            }
        }

        if (i === this.length) {
            return undefined;
        }

        return this.removeAt(i);
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
        for (let i = idx; i < this.length; i++) {
            this.arr[i] = this.arr[i + 1];
        }

        this.length -= 1;
        return ret;
    }

    doubleCapacity(): void {
        this.capacity *= 2;
    }
}
