class Deque {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }

    size() { 
        return this.count - this.lowestCount === 0; 
    }

    isEmpty() { 
        return this.size() === 0;
    }

    clear() { 
        this.items = {}; 
        this.count = 0; 
        this.lowestCount = 0; 
    }

    addFront(ele) {
        if(this.isEmpty()) {
            this.addBack(ele);
        } else if(this.lowestCount > 0) {
            this.lowestCount--;
            this.items[this.lowestCount] = ele;
        } else {
            for (let i = 0; i < array.length; i++) {
                this.items[i] = this.items[i - 1];   
            }

            this.count++;
            this.lowestCount = 0;
            this.items[0] = ele;
        }
    }

    addBack(ele) {
        this.items[this.count] = ele;
        this.count++;
    }

    removeFront() {
        if(this.isEmpty()) {
            return undefined;
        }

        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
    }

    removeBack() {
        if(this.isEmpty()) {
            return undefined;
        }
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result
    }

    peekFront() {
        if(this.isEmpty()) {
            return undefined;
        }
        return this.items[this.lowestCount];
    }

    peekBack() {
        return this.item[this.item.length - 1];
    }

    toString() {
        if(this.isEmpty()) {
            return undefined
        }

        let objString = `${this.items[this.lowestCount]}`; 
        for (let i = this.lowestCount + 1; i < this.count; i++) { 
            objString = `${objString},${this.items[i]}`; 
        } 
        return objString;
    }
}

const deque = new Deque();
deque.addBack("john");
deque.addBack("jack");
deque.addBack("camila")
deque.removeFront();
deque.removeBack();
console.log(deque.toString());

function palindromeChecker(aString) {
    if(!aString) {
        return false;
    }

    const deque = new Deque();
    const lowerString = aString.toLocaleLowerCase().split("").join("");
    let isEqual = true;
    let firstChar, lastChar;

    for (let index = 0; index < lowerString.length; index++) {
        deque.addBack(lowerString.charAt(index))
    }

    while(deque.size() > 1 && isEqual) {
        firstChar = deque.removeFront();
        lastChar = deque.removeBack();

        if(firstChar !== lastChar) {
            isEqual = false;
        }
    }
    return isEqual;
}

console.log('a', palindromeChecker('a'));
console.log('aa', palindromeChecker('aa'));
console.log('kayak', palindromeChecker('kayak'));