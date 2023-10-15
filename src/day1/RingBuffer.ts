/*
    RingBuffer - Contiguous memory with indexed head & tail.
    Everything b/w head & tail is valid & ordered. (Double ended Ring buffer)

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
        // Capacity value is inclusive
        this.capacity = capacity - 1;
        // b/w head -> tail is valid
        this.head = this.capacity;
        this.tail = 0;
        this.arr = [];
    }

    // Insert at the tail
    push(item: T): void {
        if (((this.tail + 1) % this.capacity) === this.head) {
            // Deny
            return;
        }

        this.tail = (this.tail + 1) % this.capacity;
        this.arr[this.tail] = item;
    }

    // Remove at the head
    dequeue(): T | undefined {
        if (this.head === this.tail) {
            // Deny
            return undefined;
        }

        const ret = this.arr[this.head];
        this.head = (this.head + 1) % this.capacity;

        return ret;
    }

    // Remove at the tail
    pop(): T | undefined {
        if (this.tail === this.head) {
            // Deny
            return undefined;
        }

        const ret = this.arr[this.tail];
        // this.tail = (this.tail - 1) % this.capacity;
        this.tail = this.tail - 1 < 0? this.capacity: this.tail - 1;

        return ret;
    }

    // Insert at head
    enqueue(item: T): void {
        const tmp = this.head - 1 < 0? this.capacity: this.head - 1;
        if (tmp === this.tail) {
            // Deny
            return;
        }

        this.head = tmp;
        this.arr[this.head] = item;
    }
}