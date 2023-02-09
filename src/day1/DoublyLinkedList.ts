type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    prepend(item: T): void {
        const node = { value: item } as Node<T>;
        this.length += 1;

        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head.prev = node;
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

        let curr = this.head;
        for (let i = 0; i < this.length && curr; i++) {
            if (i === (idx - 1)) {
                break;
            }

            curr = curr.next;
        }
        curr = curr as Node<T>;

        const node = { value: item } as Node<T>;
        this.length += 1;

        node.prev = curr;
        node.next = curr.next;
        curr.next = node;
        if (node.next) {
            node.next.prev = node;
        }
    }

    append(item: T): void {
        const node = { value: item } as Node<T>;
        this.length += 1;

        if (!this.tail) {
            this.tail = this.head = node;
            return;
        }

        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
    }

    remove(item: T): T | undefined {
        if (this.length === 0) {
            return undefined;
        }

        let curr = this.head;
        for (let i = 0; i < this.length; i++) {
            if (curr?.value === item) {
                return this.removeAt(i);
            }
        }

        return undefined;
    }

    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }

        let curr = this.head;
        for (let i = 0; i < this.length && curr; i++) {
            if (i === idx) {
                break;
            }

            curr = curr.next;
        }

        return curr!.value;
    }

    removeAt(idx: number): T | undefined {
        if (this.length === 0 || idx < 0 || idx >= this.length) {
            return undefined;
        }

        if (idx === this.length - 1) {
            this.length -= 1;
            const value = this.tail!.value;
            this.tail = this.tail!.prev;
            return value;
        } else if (idx === 0) {
            this.length -= 1;
            const value = this.head!.value;
            this.head = this.head!.next;
            return value;
        }

        this.length -= 1;
        let curr = this.head;
        for (let i = 0; i < this.length && curr; i++) {
            if (i === idx) {
                break;
            }

            curr = curr.next;
        }
        curr = curr as Node<T>;
        curr.prev!.next = curr.next;
        curr.next!.prev = curr.prev;
        
        return curr.value;
    }

    print(): void {
        let curr = this.head;
        console.log("---------- **** ----------");
        for (let i = 0; i < this.length; i++) {
            console.log(`${i}: ${curr!.value}`);
            curr = curr?.next;
        }
    }
}