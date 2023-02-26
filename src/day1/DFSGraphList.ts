/*
    Time complexity -
    O(V + E)
*/

function walk(graph: WeightedAdjacencyList, curr: number, needle: number, seen: boolean[], path: number[]): boolean {
    if (seen[curr]) {
        return false;
    }
    seen[curr] = true;
    path.push(curr);

    if (curr === needle) {
        return true;
    }

    const adjs = graph[curr];
    for (let i = 0; i < adjs.length; i++) {
        const ret = walk(graph, adjs[i].to, needle, seen, path);
        if (ret) {
            return true;
        }
    }

    path.pop();
    return false;
}

export default function dfs(graph: WeightedAdjacencyList, source: number, needle: number): number[] | null {
    const path: number[] = [];
    const seen: boolean[] = new Array(graph.length).fill(false);

    const ret = walk(graph, source, needle, seen, path);
    if (ret) {
        return path;
    } else {
        return null;
    }
}