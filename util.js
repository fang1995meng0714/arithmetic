export function defaultEquals(a, b) {
    return a === b;
}

export function defaultToString(item) {
    if(item === null) {
        return "NULL";
    } else if(item === undefined) {
        return "UNDEFINED";
    } else if(typeof item === "string" || item instanceof String) {
        return `${item}`;
    }

    return item.String();
}

export const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
}

export function defaultCompare(a, b) {
    if(a === b) {
        return 0;
    }

    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

export function swap(array, a, b) {
    // let temp = array[a];
    // a = array[b];
    // b = temp;

    [array[a], array[b]] = [array[b], array[a]]; // ES2015 的方式
}