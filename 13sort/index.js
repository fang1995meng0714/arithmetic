import { Compare, defaultCompare,swap} from '../util.js';

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
array = mergeSort([3, 5, 1, 4, 2]);
console.log(array);


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
