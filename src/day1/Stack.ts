/*
    A <-- B <-- C(h)
    Push at the head
    Pop at the head

    Time complexities -
    peek -> O(1)
    push & pop -> O(1)
*/

type SNode<T> = {
    value: T,
    prev?: SNode<T>
};

export default class Stack<T> {
    public length: number;
    private head?: SNode<T>;

    constructor() {
        this.head = undefined;
        this.length = 0;
    }

    push(item: T): void {
        const node = {
            value: item
        } as SNode<T>;
        this.length += 1;

        node.prev = this.head;
        this.head = node;
    }

    pop(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        this.length -= 1;
        const temp = this.head;
        this.head = this.head.prev;
        temp.prev = undefined;

        return temp.value;
    }

    peek(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        return this.head.value;
    }
}
