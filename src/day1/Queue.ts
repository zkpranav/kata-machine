/*
    (h)A --> B --> C(t)
    Dequeue at head
    Enqueue at tail

    Time complexities - 
    Peek - O(1)
    enqueue & dequeue O(1)
*/

type QNode<T> = {
    value: T,
    next?: QNode<T>
}

export default class Queue<T> {
    public length: number;
    private head?: QNode<T>;
    private tail?: QNode<T>;

    constructor() {
        this.head = undefined;
        this.tail = undefined;
        this.length = 0;
    }

    enqueue(item: T): void {
        this.length += 1;
        const node = {
            value: item
        } as QNode<T>;

        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        this.tail.next = node;
        this.tail = node;
    }

    deque(): T | undefined { 
        if (!this.head) {
            return undefined;
        }
        
        this.length -= 1;

        const temp = this.head;
        this.head = this.head.next;
        temp.next = undefined;

        if (this.length === 0) {
            this.head = this.tail = undefined;
        }

        return temp.value;
    }

    peek(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        return this.head.value;
    }
}
