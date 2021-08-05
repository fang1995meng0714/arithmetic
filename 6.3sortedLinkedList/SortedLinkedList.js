import { Node } from "../models/linked-list-model.js";
import LinkedList from "../6linkedList/linkedList.js";
import { defaultEquals } from "../util.js";

const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
}

function defaultCompar(a, b) {
    if(a === b) {
        return 0;
    }

    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

class SortedLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals, compareFn = defaultCompar) {
        super(equalsFn);
        this.compareFn = compareFn;
    }

    insert(ele, index = 0) {
        if(this.isEmpty()) {
            return super.insert(ele, 0);
        }

        const pos = this.getIndexNextSortedElement(ele);
        return super.insert(ele, pos);
    }

    getIndexNextSortedElement(ele) {
        let current = this.head;
        let i = 0;
        for (; i< this.size() && current; i++) {
            const comp = this.compareFn(ele, current.ele);

            if(comp === Compare.LESS_THAN) {
                return i;
            }

            current = current.next;
        };
        return i;
    }
}

let sortedLinkedList = new SortedLinkedList();
sortedLinkedList.insert(4)
sortedLinkedList.insert(2)
sortedLinkedList.insert(1)

// console.log(sortedLinkedList);