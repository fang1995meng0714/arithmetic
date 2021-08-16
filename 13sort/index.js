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
array = insertionSort([3, 5, 1, 4, 2]);
console.log(array);