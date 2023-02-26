function hasUnvisited(seen: boolean[], dists: number[]): boolean {
    return seen.some((s, idx) => {
        return !s && dists[idx] < Infinity;
    });
}

function getLowestUnvisited(seen: boolean[], dists: number[]): number {
    let idx = -1;
    let lowestDistance = Infinity;

    for (let i = 0; i < seen.length; i++) {
        if (seen[i]) {
            continue;
        }

        if (dists[i] < lowestDistance) {
            lowestDistance = dists[i];
            idx = i;
        }
    }

    return idx;
}

export default function dijkstra_list(source: number, sink: number, arr: WeightedAdjacencyList): number[] {
    const visited: boolean[] = new Array(arr.length).fill(false);
    const prev: number[] = new Array(arr.length).fill(-1);
    const dists: number[] = new Array(arr.length).fill(Infinity);
    dists[source] = 0;

    while(hasUnvisited(visited, dists)) {
        const curr = getLowestUnvisited(visited, dists);
        visited[curr] = true;

        const adjs = arr[curr];
        for (let i = 0; i < adjs.length; i++) {
            const edge = adjs[i];
            if (visited[edge.to]) {
                continue;
            }

            const dist = dists[curr] + edge.weight;
            if (dist < dists[edge.to]) {
                dists[edge.to] = dist;
                prev[edge.to] = curr;
            }
        }
    }

    const path = [];
    let curr = sink;
    while (prev[curr] !== -1) {
        path.push(curr);
        curr = prev[curr];
    }
    path.push(source);

    return path.reverse();
}