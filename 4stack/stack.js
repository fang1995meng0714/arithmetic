export default class Stack{
    constructor() {
        this.item = {};
        this.count = 0;
    }

    push(ele) {
        this.item[this.count] = ele;
        this.count++;
    }

    size() { 
        return this.count; 
    }

    isEmpty() { 
        return this.count === 0; 
    }

    pop() {
        if(this.isEmpty()) {
            return undefined;
        }
        this.count--;
        const result = this.item[this.count];
        delete this.item[this.count];
        return result
    }

    toString() {
        if(this.isEmpty()) {
            return "";
        }

        let objString = `${this.item[0]}`;
        for (let index = 0; index < this.count.length; index++) {
            objString = `${objString},${this.item[i]}`;
        }

        return objString;
    }
}

// const stack = new Stack(); 
// stack.push(5); 
// stack.push(8);
// console.log(Object.getOwnPropertyNames(stack));
// console.log(Object.keys(stack)); // {2} 
// console.log(stack.item); // {3}


// 十进制转二进制
// function decimalToBinary(decNumber) {   
// 	const remStack = new Stack();
//     let number = decNumber;
//     let rem;
//     let binaryString = "";

//     while(number > 0) {
//         rem = Math.floor(number % 2);
//         remStack.push(rem);
//         number = Math.floor(number / 2)
//     }
//     while(!remStack.isEmpty()) {
//         binaryString += remStack.pop().toString();
//     }

//     return binaryString;
// }

// function baseConverter(decNumber, base) {
//     const remStack = new Stack();
//     const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     let number = decNumber;
//     let rem;
//     let baseString = "";

//     if(!(base >= 2 && base <= 36)) {
//         return "";
//     }

//     while(number > 0) {
//         rem = Math.floor(number % base);
//         remStack.push(rem);
//         number = Math.floor(number / base);
//     }

//     while(!remStack.isEmpty()) {
//         baseString += digits[remStack.pop()];
//     }
//     return baseString;
// }

// console.log(baseConverter(100345, 35));



// function isDouble(str) {
//     const stack = new Stack();
//     let len = str.length;

//     for (let i = 0; i < len; i++) {
//         const item = str[i];
//         if(item === "(") {
//             stack.push(item);
//         }else if(item === ")" ) {
//             if(!stack.isEmpty()) {
//                 stack.pop();
//             } else {
//                 continue;
//             }
//         }
//     }

//     return stack.size() === 0;
// }
// console.log(isDouble("()ss()ss(sss(ss)(ss)ss)"));
// console.log(isDouble("()ss()ss(sss(ss)(ss)ss))"));
