/*
    Heap - a self balancing data structure, can either be a min or a max heap depending on the nature of the priority
    Instead of a node based structure, imagine an array based structure.
    Parent child relationships -
    For parent index p,
    Left child index l = 2p + 1
    Right child index r = 2p + 2
    
    For children l or r,
    Parent index p = floor((l - 1) /  2)

    Time complexities -
    Insert -> O(h) == O(log n)
    Delete -> O(h) == O(log n)
*/

export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.length = 0;
        this.data = [];
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length += 1;
    }

    delete(): number {
        if (this.length === 0) {
            return -1;            
        }

        const out = this.data[0];

        if (this.length === 1) {
            this.data = [];
            this.length -= 1;

            return out;
        }

        this.length -= 1;
        this.data[0] = this.data[this.length];
        this.heapifyDown(0);

        return out;
    }

    private heapifyDown(idx: number): void {
        const lIdx = this.leftChild(idx);
        const rIdx = this.rightChild(idx);

        if (idx >= this.length || lIdx >= this.length) {
            return;
        }

        const v = this.data[idx];
        const lV = this.data[lIdx];
        const rV = this.data[rIdx];

        if (lV < rV && v > lV) {
            this.data[idx] = lV;
            this.data[lIdx] = v;
            this.heapifyDown(lIdx);
        } else if (rV < lV && v > rV) {
            this.data[idx] = rV;
            this.data[rIdx] = v;
            this.heapifyDown(rIdx);
        }
    }

    private heapifyUp(idx: number): void {
        if (idx === 0) {
            return;
        }

        const parentIdx = this.parent(idx);
        
        if (this.data[idx] < this.data[parentIdx]) {
            const temp = this.data[idx];
            this.data[idx] = this.data[parentIdx];
            this.data[parentIdx] = temp;

            this.heapifyUp(parentIdx);
        }
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    private leftChild(idx: number): number {
        return (2 * idx) + 1;
    }

    private rightChild(idx: number): number {
        return (2 * idx) + 2;
    }
}
