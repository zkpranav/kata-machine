type Node<T> = {
    value: T,
    next: Node<T> | undefined
}

export default class Queue<T> {
    public length: number;
    private head: Node<T> | undefined;
    private tail: Node<T> | undefined;

    constructor() {
        this.head = undefined;
        this.tail = undefined;
        this.length = 0;
    }

    enqueue(item: T): void {
        const node: Node<T> = {
            value: item,
            next: undefined
        };
        this.length += 1;

        if (this.tail === undefined) {
            this.tail = node;
            this.head = node;
            return;
        }

        this.tail.next = node;
        this.tail = node;
    }

    deque(): T | undefined {
        if (this.head === undefined) {
            return undefined;
        }

        const node = this.head;
        this.length -= 1;

        if (this.head.next === undefined) {
            this.head = undefined;
            this.tail = undefined;

            node.next = undefined;
            return node.value;
        }

        this.head = this.head.next;
        node.next = undefined;
        return node.value;
    }

    peek(): T | undefined {
        if (this.head === undefined) {
            return undefined;
        }

        return this.head.value;
    }
}
