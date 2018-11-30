// ~ Array.every()
// Return true if all funcs return true, else false
export function evalSequence(seq: Function[], entity): boolean {
    for (let i = 0; i < seq.length; i++) {
        if (!seq[i](entity)) return false;
    }

    return true;
}

// ~ Array.some()
// Return true when a func returns true, else false
export function evalSelector(sel: Function[], entity): boolean {
    for (let i = 0; i < sel.length; i++) {
        if (sel[i](entity)) return true;
    }

    return false;
}