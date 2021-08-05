import { defaultEquals } from "../util.js";
import { Node } from "../models/linked-list-model.js";


//链表
export default class LinkedList {
    constructor(equalsFn = defaultEquals) {
        this.count = 0;
        this.head = undefined;
        this.equalsFn = equalsFn;
    }

    push(ele) {
        const node = new Node(ele);
        let current;
        if(this.head == null) {
            this.head = node;
        } else {
            current = this.head;
            while(current.next != null) {
                current = current.next;
            }
            current.next = node;
        }

        this.count++;
    }

    removeAt(index) {
        if(index >= 0 && index < this.count) {
            let current = this.head;

            if(index === 0) {
                this.head = current.next;
            } else {
                let previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = current.next;
            }
            this.count--;
            return current.ele;
        }

        return undefined;
    }

    getElementAt(index) { 
        if (index >= 0 && index <= this.count) { // {1} 
            let node = this.head;
            for (let i = 0; i < index; i++) {
                node = node.next;
            }

            return node;
        } 
        return undefined; // {5} 
    }

    insert(ele, index) {
        if(index >= 0 && index <= this.count) {
            const node = new Node(ele);

            if(index === 0) {
                const current = this.head;
                node.next = current;
                this.head = node;
            } else {
                const previous = this.getElementAt(index - 1);
                const current = previous.next;
                node.next = current;
                previous.next = node;
            }
            this.count++;
            return true;
        }

        return false;
    }

    indexOf(ele) {
        let current = this.head;
        for (let i = 0; i < this.count && current != null; i++) {
            if(this.equalsFn(ele, current.ele)) {
                return i;
            }

            current = current.next;
        }

        return -1;
    }

    remove(ele) {
        const index = this.indexOf(ele);
        return this.removeAt(index);
    }

    size() {
        return this.count;
    }

    isEmpty() {
        return this.size === 0;
    }

    getHead() {
        return this.head;
    }

    toString() { 
        if (this.head == null) { // {1} 
        return ''; 
        } 
        let objString = `${this.head.element}`; // {2} 
        let current = this.head.next; // {3} 
        for (let i = 1; i < this.size() && current != null; i++) { // {4} 
        objString = `${objString},${current.element}`; 
        current = current.next; 
        } 
        return objString; // {5} 
       }
}

const list = new LinkedList();
list.push(10);
list.push(11);
list.push(12);
list.push(13);
list.insert(14,1);
list.remove(14)
// console.log(list);


