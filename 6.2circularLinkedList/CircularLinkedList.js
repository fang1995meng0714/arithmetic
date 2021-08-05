import { Node } from "../models/linked-list-model.js";
import LinkedList from "../6linkedList/linkedList.js";
import { defaultEquals } from "../util.js";

// class DoubleNode extends Node {
//     constructor(ele, next, prev) {
//         super(ele, next);
//         this.prev = prev;
//     }
// }

class CircularLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn);
        this.tail = undefined;
    }


}

let circularLinkedList = new CircularLinkedList();

console.log(circularLinkedList);