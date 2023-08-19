type Node<T> = {
    value: T,
    next: Node<T> | undefined
}

export default class Stack<T> {
    public length: number;
    private head: Node<T> | undefined;

    constructor() {
        this.head = undefined;
        this.length = 0;
    }

    push(item: T): void {
        const node: Node<T> = {
            value: item,
            next: undefined
        };
        this.length += 1;

        if (this.head === undefined) {
            this.head = node;
            return;
        }

        node.next = this.head;
        this.head = node;
    }

    pop(): T | undefined {
        if (this.head === undefined) {
            return undefined;
        }

        const node = this.head;
        this.length -= 1;

        if (this.head.next === undefined) {
            this.head = undefined;
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
