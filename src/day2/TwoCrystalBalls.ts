export default function two_crystal_balls(breaks: boolean[]): number {
    if (breaks.length === 0) {
        return -1;
    }

    const jump = Math.floor(Math.sqrt(breaks.length));
    let pos = 0;
    while (pos < breaks.length) {
        if (breaks[pos] === true) {
            let i = pos - jump;
            while (i < pos) {
                if (breaks[i] === true) {
                    return i;
                }
                i += 1;
            }

            return pos;
        }

        pos += jump;
    }

    if (pos - breaks.length < jump) {
        pos = pos - jump + 1;
        while (pos < breaks.length) {
            if (breaks[pos] === true) {
                return pos;
            }

            pos += 1;
        }
    }

    return -1;
}