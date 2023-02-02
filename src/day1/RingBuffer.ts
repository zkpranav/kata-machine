/*
    RingBuffer - Contiguous memory with indexed head & tail.
    Everything b/w head & tail is valid & ordered.

    Constraints -
    Insertion - if head == tail, either deny insertion or resize
    Deletion - if head == tail, deny
    For a defined size N, increment head & tail w/ %N to circle back.

    Uses -
    Async Request queue - When you want only a specific ammount of network requests going on (Queue works too)
    Object pool - When you want to reuse objects for frequenctly occuring tasks, maintain an object pool modeled after a ring buffer
*/
export default class RingBuffer<T> {
    private head: number;
    private tail: number;
    private capacity: number;
    private arr: Array<T>;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.head = this.tail = 0;
        this.arr = [];
    }

    push(item: T): void {
        if ((this.tail + 1) % this.capacity === this.head) {
            // Handle resize
            return;
        }

        this.tail = (this.tail + 1) % this.capacity;
        this.arr[this.tail] = item;
    }

    pop(): T | undefined {
        const tail = this.tail - 1 < 0? this.capacity - 1: this.tail - 1;
        if (tail === this.head) {
            return undefined;
        }

        const ret = this.arr[this.tail];
        this.tail = tail;

        return ret;
    }

    enqueue(item: T): void {
        const head = this.head - 1 < 0? this.capacity - 1: this.head - 1;
        if (head === this.tail) {
            return;
        }

        this.head = head;
        this.arr[this.head] = item;
    }

    dequeue(): T | undefined {
        if ((this.head + 1) % this.capacity === this.tail) {
            return undefined;
        }

        const ret = this.arr[this.head];
        this.head = (this.head + 1) % this.capacity;

        return ret;
    }
}