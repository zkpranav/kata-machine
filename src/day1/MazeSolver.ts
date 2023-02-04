/*
    Structure for recursive solutions -
    Base cases - Keep it tight
    ...
    ..
    Pre recurse - The setup
    Recurse
    Post recurse - The clean-up
*/

const dir = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
];

function walk(maze: string[], wall: string, curr: Point, end: Point, seen: boolean[][], path: Point[]): boolean {
    // Check if off the maze
    if (
        curr.x < 0 || curr.x >= maze[0].length ||
        curr.y < 0 || curr.y >= maze.length
    ) {
        return false;
    }

    // Check if on a wall
    if (maze[curr.y][curr.x] === wall) {
        return false;
    }

    // Check if at the end
    if (curr.x === end.x && curr.y === end.y) {
        path.push(end);
        return true;
    }

    // Check if seen
    if (seen[curr.y][curr.x]) {
        return false;
    }

    seen[curr.y][curr.x] = true;
    path.push(curr);

    for (let i = 0; i < dir.length; i++) {
        const [x, y] = dir[i];
        const ret = walk(maze, wall, {
            x: curr.x + x,
            y: curr.y + y
        }, end, seen, path);

        if (ret) {
            // We know that this point is part of the solution
            return true;
        }
    }

    path.pop();
    return false;
}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
    const seen: boolean[][] = [];
    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false));
    }
    const path: Point[] = [];

    const ret = walk(maze, wall, start, end, seen, path);
    if (ret) {
        return path;
    } else {
        return [{x: -1 , y: -1}];
    }
}