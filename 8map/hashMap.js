import { defaultToString } from "../util.js";
import LinkedList from "./../6linkedList/linkedList.js"


class ValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }

    toString() {
        return `[#${this.key}: ${this.value}]`;
    }
}
class HashTable {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }

    loseloseHashCode(key) {
        if(typeof key === "number") {
            return key;
        }
        const tableKey = this.toStrFn(key);
        let hash = 0;

        for (let index = 0; index < tableKey.length; index++) {
            hash += tableKey.charCodeAt(index);
        }

        return hash % 37;
    }

    djb2HashCode(key) {  //更好一点的散列函数
        const tableKey = this.toStrFn(key); // {1} 
        let hash = 5381; // {2} 
        for (let i = 0; i < tableKey.length; i++) { // {3} 
            hash = (hash * 33) + tableKey.charCodeAt(i); // {4} 
        } 
        return hash % 1013; // {5} 
    }

    hashCode(key) {
        return this.djb2HashCode(key);
    }

    put(key, value) {
        if(key != null && value != null) {
            const position = this.hashCode(key);
            this.table[position] = new ValuePair(key, value);
            return true;
        }

        return false;
    }

    get(key) { 
        const valuePair = this.table[this.hashCode(key)]; 
        return valuePair == null ? undefined : valuePair.value; 
    }

    remove(key) { 
        const hash = this.hashCode(key); // {1} 
        const valuePair = this.table[hash]; // {2} 
        if (valuePair != null) { 
            delete this.table[hash]; // {3} 
            return true; 
        } 
        return false; 
    }
}

class HashTableSeparateChaining extends HashTable{
    constructor(toStrFn = defaultToString) {
        super();
        this.toStrFn = toStrFn;
        this.table = {};
    }

    // put(key, value) {
    //     if(key != null && value != null) {
    //         const position = this.hashCode(key);
    //         if(this.table[position] == null) {
    //             this.table[position] = new LinkedList();
    //         }

    //         this.table[position].push(new ValuePair(key, value));
    //         return true;
    //     }

    //     return false;
    // }

    // get(key) {
    //     const position = this.hashCode|(key);
    //     const linkedList = this.table[position];
    //     if(linkedList != null && !linkedList.isEmpty()) {
    //         let current = linkedList.getHead();

    //         while(current != null) {
    //             if(current.ele.key === key) {
    //                 return current.ele.value;
    //             }
    //             current = current.next;
    //         }
    //     }

    //     return undefined;
    // }

    // remove(key) {
    //     const position = this.hashCode(key);
    //     const linkedList = this.table[position];
    //     if(linkedList != null && !linkedList.isEmpty()) {
    //         let current = linkedList.getHead();

    //         while(current != null) {
    //             if(current.ele.key == key) {
    //                 linkedList.remove(current.ele);
    //                 if(linkedList.isEmpty()) {
    //                     delete this.table[position]
    //                 }
    //                 return true;
    //             }
    //             current = current.next;
    //         }
    //     }
    // }



    put(key, value) {
        if(key != null && value != null) {
            const position = this.hashCode(key);
            if(this.table[position] == null) {
                this.table[position] = new ValuePair(key, value);
            } else {
                let index = position + 1;
                while(this.table[index] != null) {
                    index++;
                }
                this.table[index] = new ValuePair(key, value);
            }
            return true;
        }
        return false;
    }

    get(key) {
        const position = this.hashCode(key);
        if(this.table[position] != null) {
            if(this.table[position].key === key) {
                return this.table[position].value;
            }
            let index = position + 1;
            while(this.table[index] != null && this.table[index].key != key) {
                index++;
            }
            if(this.table[index] != null && this.table[index].key === key) {
                return this.table[position].value;
            }
        }
        return undefined;
    }

    remove(key) {
        const position = this.hashCode(key);
        if(this.table[position] != null) {
            if(this.table[position].key === key) {
                delete this.table[position];
                this.verifyRemoveSideEffect(key, position);
                return true;
            }
            let index = position + 1;
            while(this.table[index] != null && this.table[index].key !== key) {
                index++;
            }
            if(this.table[index] != null && this.table[index].key === key) {
                delete this.table[index];
                this.verifyRemoveSideEffect(key, index);
                return true
            }
        }
        return false;
    }

    verifyRemoveSideEffect(key, removePosition) {
        const hash = this.hashCode(key);
        let index = removePosition + 1;
        while(this.table[index] != null) {
            const posHash = this.hashCode(this.table[index].key);
            if(posHash <= hash || posHash <= removePosition) {
                this.table[removePosition] = this.table[index];
                delete this.table[index];
                removePosition = index;
            }
            index++;
        }
    }
}

let hashTableSeparateChaining = new HashTableSeparateChaining();
hashTableSeparateChaining.put('Ygritte', 'ygritte@email.com'); 
hashTableSeparateChaining.put('Jonathan', 'jonathan@email.com'); 
hashTableSeparateChaining.put('Jamie', 'jamie@email.com'); 
hashTableSeparateChaining.put('Jack', 'jack@email.com'); 
hashTableSeparateChaining.put('Jasmine', 'jasmine@email.com'); 
hashTableSeparateChaining.put('Jake', 'jake@email.com'); 
hashTableSeparateChaining.put('Nathan', 'nathan@email.com'); 
hashTableSeparateChaining.put('Athelstan', 'athelstan@email.com'); 
hashTableSeparateChaining.put('Sue', 'sue@email.com'); 
hashTableSeparateChaining.put('Aethelwulf', 'aethelwulf@email.com'); 
hashTableSeparateChaining.put('Sargeras', 'sargeras@email.com');

hashTableSeparateChaining.remove('Jonathan'); 

console.log(hashTableSeparateChaining)