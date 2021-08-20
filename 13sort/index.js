import { Compare, defaultCompare,swap, defaultEquals} from '../util.js';

// 冒泡
function bubbleSort(array, compareFn = defaultCompare){
    let {length} = array;
    for(let i = 0; i < length; i++) {
        for(let j = 0; j < length - 1;j++) {
            if(compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
                swap(array, j , j + 1);
            }
        }
    }

    return array;
}

function modifiedBubbleSort(array, compareFn = defaultCompare) {
    let {length} = array;
    for(let i = 0; i < length; i++) {
        for(let j = 0; j < length - 1; j++) {
            if(compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
                swap(array, j , j + 1);
            }
        }
    }

    return array;
}

// 创建数组
function createNonSortedArray(size) { // 6 
    const array = []; 
    for (let i = size; i > 0; i--) { 
        array.push(i); 
    }

    return array; 
} 
let array = createNonSortedArray(5); // {7} 

// 选择排序
function selectionSort(array, compareFn=defaultCompare) {
    const {length} = array;
    let indexMin;

    for(let i = 0; i < length - 1; i++) {
        let indexMin = i;
        for(let j = i; j < length; j++) {
            if(compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN) {
                indexMin = j;
            }
        }

        if(i !== indexMin) {
            swap(array, i, indexMin);
        }
    }

    return array;
}

// array = selectionSort(array);
// console.log(array);

// 插入排序
function insertionSort(array, compareFn = defaultCompare) {
    const {length} = array;
    let temp;

    for(let i = 1; i < length; i++) {
        let j = i;
        temp = array[i];

        while(j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN) {
            array[j] = array[j - 1];
            j--;
        }

        array[j] = temp;
    }
    return array;
}
// array = insertionSort([3, 5, 1, 4, 2]);
// console.log(array);

function mergeSort(array, compareFn = defaultCompare) {
    if(array.length > 1) {
        const {length} = array;
        const middle = Math.floor(length / 2);
        const left = mergeSort(array.slice(0, middle), compareFn);
        const right = mergeSort(array.slice(middle, length), compareFn);
        array = merge(left, right, compareFn);
    }

    return array;
}

function merge(left, right, compareFn) {
    let i = 0;
    let j = 0;
    const result = [];
    while(i < left.length && j < right.length) {
        result.push(
            compareFn(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++]
        )
    }

    return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}
// array = mergeSort([3, 5, 1, 4, 2]);
// console.log(array);


//简化版并归
const sort = (arr) => {
    let k = arr.length;
    if(k === 1) return arr;
    if(k === 2) return arr[0] > arr[1] ?[arr[1],arr[0] ]:[arr[1],arr[0]];

    let left = arr.slice(0, Math.floor(k / 2));
    let right = arr.slice(Math.floor(k / 2));
    return merge(sort(left), sort(right));
}

const inplaceMerge = (a, b) => {
    let c = [];
    let i = 0;
    let k = 0;

    while(i < a.length || k < b.length) {
        if(i >= a.length) {
            c.push(b[k]);
            k+=1;
        } else if(k >= b.length) {
            c.push(a[i]);
            i+=1;
        } else {
            if(a[i] <= b[k]) {
                c.push(a[i]);
                i+=1;
            } else {
                c.push(b[k])
                k+=1;
            }
        }
    }

    return c;
}

//简单版快排
function simpleQuickSort(arr) {
    if(arr.length < 2) return arr;
    let left = [];
    let right = [];
    let pivot = Math.floor(arr.length / 2);
    let temp = arr.splice(pivot, 1)[0];
    
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] <= temp) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...simpleQuickSort(left), temp, ...simpleQuickSort(right)];
}


//快速排序
function quickSort(array, compareFn = defaultCompare) {
    return quick(array, 0, array.length - 1, compareFn);
}
function quick(array, left, right, compareFn) {
    let index;
    if(array.length > 1) {
        index = partition(array, left, right, compareFn);
        if(left < index - 1) {
            quick(array, left, index - 1, compareFn);
        }
        if(index < right) {
            quick(array, index, right, compareFn);
        }
    }
    return array;
}

function partition(array, left, right, compareFn) {
    const pivot = array[Math.floor((right + left) / 2)];
    let i = left;
    let j = right;
    while(i <= j) {
        while(compareFn(array[i], pivot) === Compare.LESS_THAN) {
            i++;
        }
        while(compareFn(array[j], pivot) === Compare.BIGGER_THAN) {
            j--;
        }
        if(i <= j) {
            swap(array, i, j);
            i++;
            j--;
        }
    }
    return i;
}

// array = simpleQuickSort([3, 5, 3, 1, 4, 2, 4, 3, 2,3]);
// console.log(array);


// 计数排序
function countingSort(arr) {
    if(arr.length < 2) {
        return array;
    }
    const maxValue = findMaxValue(arr);
    const counts = new Array(maxValue + 1);

    arr.forEach(ele => {
        if(!counts[ele]) {
            counts[ele] = 0;
        }
        counts[ele]++;
    })
    let sortedIndex = 0;
    console.log(counts);
    counts.forEach((count, i) => {
        while(count > 0) {
            arr[sortedIndex++] = i;
            count--;
        }
    })
    return arr;
}
function findMaxValue(arr) {
    let max = arr[0];
    for(let i = 1; i < arr.length; i++) {
        if(arr[i] > max) {
            max = arr[i];
        }
    }

    return max;
}
// array = countingSort( [3, 5, 1,3, 4, 2, 10]);
// console.log(array);


//桶排序
function bucketSort(arr, bucketSize = 5) {
    if(arr.length < 2) {
        return arr;
    }
    const buckets = createBuckets(arr, bucketSize);
    return sortBuckets(buckets);
}
//创建桶
function createBuckets(arr, bucketSize) {
    let minValue = arr[0];
    let maxValue = arr[0];
    for(let i = 1; i < arr.length; i++) {
        if(arr[i] < minValue) {
            minValue = arr[i];
        } else if(arr[i] > maxValue) {
            maxValue = arr[i];
        }
    }
    const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    const buckets = [];
    for(let i = 0; i < bucketCount; i++) {
        buckets[i] = [];
    }
    for(let i = 0;i < arr.length; i++) {
        const bucketIndex = Math.floor((arr[i] - minValue) / bucketSize);
        buckets[bucketIndex].push(arr[i]);
    }
    return buckets;
}
function sortBuckets(buckets) {
    const sortedArray = [];
    for(let i = 0; i < buckets.length; i++) {
        if(buckets[i] != null) {
            insertionSort(buckets[i]);
            sortedArray.push(...buckets[i]);
        }
    }

    return sortedArray;
}

// array = bucketSort( [3, 5, 1,3, 4, 2, 10]);
// console.log(array);


//基数
// function radixSort(arr, radixBase = 10) {
//     if(arr.length < 2) {
//         return arr;
//     }
//     const minValue = findMinValue(arr);
//     const maxValue = findMaxValue(arr);
//     let significantDigit = 1;
//     while((maxValue - minValue) / significantDigit >= 1) {
//         arr = countingSortForRadix(arr, radixBase, significantDigit, minValue);;
//         significantDigit *= radixBase;
//     }

//     return array;
// }

// function countingSortForRadix(array, radixBase, significantDigit, minValue) { 
//     let bucketsIndex; 
//     const buckets = []; 
//     const aux = []; 
//     for (let i = 0; i < radixBase; i++) { // {5} 
//     buckets[i] = 0; 
//     } 
//     for (let i = 0; i < array.length; i++) { // {6} 
//     bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % 
//    radixBase); // {7} 
//     buckets[bucketsIndex]++; // {8} 
//     } 
//     for (let i = 1; i < radixBase; i++) { // {9} 
//     buckets[i] += buckets[i - 1]; 
//     } 
//     for (let i = array.length - 1; i >= 0; i--) { // {10} 
//     bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % 
//    radixBase); // {11} 
//     aux[--buckets[bucketsIndex]] = array[i]; // {12} 
//     } 
//     for (let i = 0; i < array.length; i++) { // {13} 
//     array[i] = aux[i]; 
//     } 
//     return array; 
// }

// array = radixSort( [3, 5, 1,3, 4, 2, 10]);
// console.log(array);


// 顺序搜索
const DOES_NOT_EXIST = -1;

function sequentialSearch(arr, value, equalsFn = defaultEquals) {
    for(let i = 0; i < arr.length; i++) {
        if(equalsFn(value, arr[i])){
            return i;
        }
    }

    return DOES_NOT_EXIST;
}
// console.log(sequentialSearch([5, 4, 3, 2, 1], 3));


//二分搜索
function binarySearch(array, value, compareFn = defaultCompare) {
    const sortedArray = quickSort(array);
    let low = 0;
    let high = sortedArray.length - 1;
    while(lesserOrEquals(low, high, compareFn)) {
        const mid = Math.floor((low + high) / 2);
        const element =  sortedArray[mid];
        if(compareFn(element, value) === Compare.LESS_THAN) {
            low = mid + 1;
        } else if(compareFn(element, value) === Compare.LESS_THAN) {
            high = mid - 1;
        } else {
            return mid;
        }
    }
    return DOES_NOT_EXIST;
}
function lesserOrEquals(a, b, compareFn) {
    const comp = compareFn(a, b);
    return comp === Compare.LESS_THAN || comp === Compare.EQUALS;
}

//简略版二分搜索
function simpleBinarySearch(arr, key) {
    let low = 0, high = arr.length - 1;
    while(low < high) {
        let mid = Math.floor((low + high) / 2);
        if(key === arr[mid]) {
            return mid;
        } else if(key < arr[mid]) {
            low = mid + 1;
        } else if (key > arr[mid]) {
            high = mid - 1;
        }
    }

    return -1;
}

console.log(simpleBinarySearch([5, 4, 3, 2, 1], 3));