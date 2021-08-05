import { Node } from "../models/linked-list-model.js";
import LinkedList from "../6linkedList/linkedList.js";
import { defaultEquals } from "../util.js";

//循环链表
class CircularLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn);
    }

    insert(ele, index) {
        if(index >= 0 && index <= this.count) {
            const node = new Node(ele);
            let current = this.head;
            if(index === 0) {
                if(this.head == null) {
                    this.head = node;
                    node.next = this.head;
                } else {
                    node.next = current;
                    current = this.getElementAt(this.size());
                    this.head = node;
                    current.next = this.head;
                }
            } else {
                const previous = this.getElementAt(index - 1);
                node.next = previous.next;
                previous.next = node;
            }

            this.count++;
            return true;
        }

        return false;
    }

    removeAt(index) {
        if(index >=  0 && index < this.count) {
            let current = this.head;
            if(index === 0) {
                if(this.size() === 1) {
                    this.head = undefined;
                } else {
                    const removed = this.head;
                    current = this.getElementAt(this.size());
                    this.head = this.head.next;
                    current.next = this.head;
                    current = removed;
                }
            } else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = current.next;
            }

            this.count--;
            return current.ele;
        }

        return undefined;
    }
}

let circularLinkedList = new CircularLinkedList();
circularLinkedList.insert(10, 0);
circularLinkedList.insert(20, 1);
circularLinkedList.insert(30, 2);
circularLinkedList.removeAt(1)
console.log(circularLinkedList);