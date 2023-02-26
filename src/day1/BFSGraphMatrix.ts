/*
    BFS is reminiscent of a implicit queue
    Done similarly as done on a tree

    Time complexity -
    O(V + E)
*/

export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false);
    // Useful for walking backwards to derive the path
    const prev: number[] = new Array(graph.length).fill(-1);

    seen[source] = true;
    const q: number[] = [source];

    do {
        const curr = q.shift() as number;
        if (curr === needle) {
            break;
        }
        
        const adjs = graph[curr];
        for (let i = 0; i < adjs.length; i++) {
            if (adjs[i] === 0 || seen[i]) {
                continue;
            }

            seen[i] = true;
            q.push(i);
            // Create link for walking back
            prev[i] = curr;
        }

    } while (q.length > 0);

    // Walk back
    let curr = needle;
    const out: number[] = [];

    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }

    if (out.length) {
        out.push(source);
        return out.reverse();
    } else {
        return null;
    }
}