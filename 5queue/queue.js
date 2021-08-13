export default class Queue {
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

    enqueue(ele) {
        this.items[this.count] = ele;
        this.count++;
    }

    clear() { 
        this.items = {}; 
        this.count = 0; 
        this.lowestCount = 0; 
    }

    dequeue() {
        if(this.isEmpty()) {
            return undefined;
        }

        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
    }

    peek() {
        if(this.isEmpty()) {
            return undefined;
        }
        return this.items[this.lowestCount];
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

const queue = new Queue();
queue.enqueue("John");
queue.enqueue("jack");
queue.enqueue("Camila");

queue.dequeue();
console.log(queue.toString());

function hotPotato(eleList, num) {
    const queue = new Queue();
    const elimitateList = [];

    for (let index = 0; index < eleList.length; index++) {
        queue.enqueue(eleList[index])
    }

    while(queue.size() > 1) {
        for (let i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue());
        }
        elimitateList.push(queue.dequeue)
    }

    return {
        eliminated: elimitateList,
        winner: queue.dequeue()
    }
}

const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl']; 
const result = hotPotato(names, 7);
console.log(result.winner)