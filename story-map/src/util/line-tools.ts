import { Line, Passage } from "@/types";

const cropFactor = 1.05;

export const cropLine = (ln: Line, p1: Passage, p2: Passage) => {
    // These should be the numbers I need
    const xDelta = ln.x2 - ln.x1 || 0.0000001; // the .00000001 is to avoid division by 0
    const yDelta = ln.y2 - ln.y1 || 0.0000001;
    const lnFactor = Math.abs(xDelta / yDelta);
    const p1Factor = p1.size.x / p1.size.y;
    const p2Factor = p2.size.x / p2.size.y;

    // This means ln exits p1 out of top or bottom edge
    if (lnFactor < p1Factor) {
        if (yDelta > 0) {
            const removeY = p1.size.y / 2 * cropFactor;
            ln.y1 += removeY;
            ln.x1 += (removeY  / yDelta) * xDelta;
        } else {
            const removeY = p1.size.y / 2 * cropFactor;
            ln.y1 -= removeY;
            ln.x1 -= (removeY  / yDelta) * xDelta;
        }
    } else {
        // Else left of right edge
        if (xDelta > 0) {
            const removeX = p1.size.x / 2 * cropFactor;
            ln.x1 += removeX;
            ln.y1 += (removeX  / xDelta) * yDelta;
        } else {
            const removeX = p1.size.x / 2 * cropFactor;
            ln.x1 -= removeX;
            ln.y1 -= (removeX  / xDelta) * yDelta;
        }
    }

    // This means ln exits p1 out of top or bottom edge
    if (lnFactor < p2Factor) {
        if (yDelta < 0) {
            const removeY = p2.size.y / 2 * cropFactor;
            ln.y2 += removeY;
            ln.x2 += (removeY  / yDelta) * xDelta;
        } else {
            const removeY = p2.size.y / 2 * cropFactor;
            ln.y2 -= removeY;
            ln.x2 -= (removeY  / yDelta) * xDelta;
        }
    } else {
        // Else left of right edge
        if (xDelta < 0) {
            const removeX = p2.size.x / 2 * cropFactor;
            ln.x2 += removeX;
            ln.y2 += (removeX  / xDelta) * yDelta;
        } else {
            const removeX = p2.size.x / 2 * cropFactor;
            ln.x2 -= removeX;
            ln.y2 -= (removeX  / xDelta) * yDelta;
        }
    }
};