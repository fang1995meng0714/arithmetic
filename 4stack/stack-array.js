class Stack {
    // push(element(s))：添加一个（或几个）新元素到栈顶。
    // pop()：移除栈顶的元素，同时返回被移除的元素。
    // peek()：返回栈顶的元素，不对栈做任何修改（该方法不会移除栈顶的元素，仅仅返回它）。 
    // isEmpty()：如果栈里没有任何元素就返回 true，否则返回 false。 
    // clear()：移除栈里的所有元素。
    // size()：返回栈里的元素个数。该方法和数组的 length 属性很类似。
    constructor() {
        this.item = [];
    }

    push(element) {
        this.item.push(element);
    }

    pop(element) {
        this.item.pop(element);
    }

    peek() {
        return this.item[this.item.length - 1];
    }

    isEmpty() {
        return this.item.length === 0;
    }

    size() {
        return this.item.length;
    }

    clear() {
        this.item = [];
    }
}

const stack = new Stack();
stack.push(5);
stack.push(8);
stack.push(11);
console.log(stack.size());