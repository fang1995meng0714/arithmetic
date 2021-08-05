import { Node } from "../models/linked-list-model.js";
import LinkedList from "../6linkedList/linkedList.js";
import { defaultEquals } from "../util.js";

//双向链表
class DoubleNode extends Node {
    constructor(ele, next, prev) {
        super(ele, next);
        this.prev = prev;
    }
}

class DoubleLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn);
        this.tail = undefined;
    }

    insert(ele, index) {
        if(index >= 0 && index <= this.count) {
            const node = new DoubleNode(ele);
            // console.log(node)
            let current = this.head;

            if(index === 0) {
                if(this.head == null) {
                    this.head = node;
                    this.tail = node;
                } else {
                    node.next = this.head;
                    current.prev = node;
                    this.head = node
                }
            } else if(index === this.count) {
                current = this.tail;
                current.next = node;
                node.prev = current;
                this.tail = node;
            } else {
                const prev = this.getElementAt(index - 1);
                current = prev.next;
                node.next = current;
                prev.next = node;
                current.prev = node;
                node.prev = prev;
            }

            this.count++;
            return true;
        }

        return false;
    }

    removeAt(index) {
        if(index >= 0 && index < this.count) {
            let current = this.head;

            if(index === 0) {
                this.head = current.next;

                if(this.count === 1) {
                    this.tail = undefined;
                } else {
                    this.head.prev = undefined
                }
            } else if(index === this.count -1) {
                current = this.tail;
                this.tail = current.prev;
                this.tail.next = undefined
            } else {
                current = this.getElementAt(index);
                const previous = current.prev;
                previous.next = current.next;
                current.next.prev = previous;
            }

            this.count--;
            return current.ele;
        }
        return undefined
    }
}

let doubleLinkedList = new DoubleLinkedList();
doubleLinkedList.insert(10, 0);
doubleLinkedList.insert(20, 1);
doubleLinkedList.insert(30, 2);
doubleLinkedList.insert(40, 3);

doubleLinkedList.removeAt(2)
console.log(doubleLinkedList);