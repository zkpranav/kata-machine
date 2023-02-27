/*  
    LRU - Least Recently Used Cache, keeps track of cached objects.
    Bubbles up the most recently used object to the top, and naturally, the least used one to the bottom.
    If capacity is exceeded, the least used object is "evicted".

    Implemented as a composition of a doubly-linked list & a hashmap.
    A doubly linked list, to maintain order.
    A hash-map to provide constant access to each node.

    Time complexity - (In practical cases its a few pointer operations, but still independent of the input)
    Get -> O(1) -- O(1) + update; update -> 7 O(1) a combination of delete and insert
    Insert -> O(1)
    Evict -> O(1)
    Update -> O(1)
*/

type Node<T> = {
    key: any
    value: T,
    next: Node<T> | undefined,
    prev: Node<T> | undefined
};

function createNode<K, V>(key: K, value: V): Node<V> {
    return {
        key: key,
        value: value,
        next: undefined,
        prev: undefined
    };
}

export default class LRU<K, V> {
    private length: number;
    private head: Node<V> | undefined;
    private tail: Node<V> | undefined;

    private lookup: Map<K, Node<V>>;

    private capacity: number = 10;

    constructor(capacity: number) {
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.capacity = capacity;
    }

    update(key: K, value: V): void {
        let node = this.lookup.get(key);
        if (!node) {
            node = createNode(key, value);
            this.length += 1;
            this.prepend(node);
            this.trimCache();

            this.lookup.set(key, node);
        } else {
            this.detach(node);
            this.prepend(node);
            node.value = value;
        }
    }

    get(key: K): V | undefined {
        const node = this.lookup.get(key);
        if (!node) {
            return undefined;
        }

        this.detach(node);
        this.prepend(node);

        return node.value;
    }

    private detach(node: Node<V>): void {
        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        if (this.head === node) {
            this.head = this.head.next;
        }

        if (this.tail === node) {
            this.tail = this.tail.prev;
        }

        node.next = node.prev = undefined;
    }

    private prepend(node: Node<V>): void {
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    private trimCache(): void {
        if (this.length <= this.capacity) {
            return;
        }

        const tail = this.tail as Node<V>;
        this.detach(this.tail as Node<V>);
        this.lookup.delete(tail.key);
        this.length -= 1;
    }
}
