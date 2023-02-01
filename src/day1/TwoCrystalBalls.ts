/*
    Problem -
    Given two crystal balls that will break if dropped from a high enough distance, determine that exact spot in which it will break in the most optimized way.
    The solution has to be a hybrid of jumping and scanning i.e divide & linear search because we only get 2 tries.
    Strategy - 
    Jump a k amount until a ball breaks, then walk back from the previous jump until you find the critical point.
    Halving doesn't work, because worst case, you need to walk half the array.

    Fails w/ sqrt(N), specifically if the sqrt isn't an integer, eg: 257.
    In that case write logic to handle the left out portion of the array.
*/
export default function two_crystal_balls(breaks: boolean[]): number {
    let arrayEndFlag = false;
    const jumpAmount = Math.floor(Math.sqrt(breaks.length));

    let i = 0;
    while (true) {
        if (breaks[i]) {
            let j = i - jumpAmount;
            if (j < 0) {
                j = 0;
            }
            while(j <= i) {
                if (breaks[j]) {
                    return j;
                }

                j += 1;
            }
        }

        i += jumpAmount;
        if (i > breaks.length && arrayEndFlag === false) {
            i = breaks.length - 1;
            arrayEndFlag = true;
        } else if (arrayEndFlag == true) {
            break;
        }
    }

    return -1;
}