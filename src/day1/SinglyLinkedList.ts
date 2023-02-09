type Node<T> = {
    value: T;
    next: Node<T>;
};

export default class SinglyLinkedList<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
    }

    prepend(item: T): void {
        const node = { value: item } as Node<T>;
        this.length += 1;

        if (!this.head) {
            this.head = node;
            return;
        }

        node.next = this.head;
        this.head = node;
    }
    
    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) {
            throw new Error(`Insertion not possible at ${idx}`);
        } else if (idx === this.length) {
            this.append(item);
            return;
        } else if (idx === 0) {
            this.prepend(item);
            return;
        }

        const node = { value: item } as Node<T>;
        this.length += 1;

        let curr = this.head as Node<T>;
        for (let i = 1; i < idx && curr; i++) {
            curr = curr.next;
        }
        curr = curr as Node<T>;

        node.next = curr.next;
        curr.next = node;
    }

    append(item: T): void {
        if (!this.head) {
            this.prepend(item);
            return;
        }

        const node = { value: item } as Node<T>;
        this.length += 1;

        let curr = this.head as Node<T>;
        while(curr.next) {
            curr = curr.next;
        }
        curr.next = node;

        return;
    }

    remove(item: T): T | undefined {
        if (this.length === 0) {
            return undefined;
        }

        let curr = this.head as Node<T>;
        for (let i = 0; i < this.length && curr; i++) {
            if (curr.value === item) {
                return this.removeAt(i);
            }

            curr = curr.next;
        }

        return undefined;
    }

    get(idx: number): T | undefined {
        if (!this.head) {
            return undefined;
        }

        let curr = this.head as Node<T>;
        for (let i = 0; i < this.length && curr; i++) {
            if (i === idx) {
                break;
            }

            curr = curr.next;
        }
        curr = curr as Node<T>;

        return curr.value;
    }

    removeAt(idx: number): T | undefined {
        if (this.length === 0 || idx < 0 || idx >= this.length) {
            return undefined;
        } else if (idx === 0) {
            const value = this.head!.value;
            this.length -= 1;
            if (this.length === 0) {
                this.head = undefined;
            } else {
                this.head = this.head!.next;
            }

            return value;
        }

        let curr = this.head as Node<T>;
        for (let i = 1; i < idx && curr; i++) {
            curr = curr.next;
        }
        curr = curr as Node<T>;

        const value = curr.next.value;
        this.length -= 1;
        curr.next = curr.next.next;

        return value;
    }
}
