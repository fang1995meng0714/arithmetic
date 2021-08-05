class Set {
    constructor() {
        this.items = {};
    }

    has(ele) {
        return Object.prototype.hasOwnProperty.call(this.items, ele)
    }

    add(ele) {
        if(!this.has(ele)) {
            this.items[ele] = ele;
            return true;
        }

        return false;
    }

    delete(ele) {
        if(this.has(ele)) {
            delete this.items[ele];
            return true;
        }

        return false;
    }

    clear() {
        this.items = {};
    }

    size() {
        let count = 0;
        for(let key in this.items) {
            if(this.items.hasOwnProperty(key)) {
                count++;
            }
        }

        return count;
    }

    values() {
        return Object.values(this.items);
    }

    union(otherSet) {
        const unionSet = new Set();
        this.values().forEach(vlaue => unionSet.add(vlaue));
        otherSet.values().forEach(value => unionSet.add(value));

        return unionSet;
    }

    intersection(otherSet) {
        const intersectionSet = new Set();
        const values = this.values();
        const otherValues = otherSet.values();
        let biggerSet = values;
        let smallerSet = otherValues;

        if(otherValues.length - values.length > 0) {
            biggerSet = otherValues;
            smallerSet = values;
        }

        smallerSet.forEach(value => {
            if(biggerSet.includes(value)) {
                intersectionSet.add(value)
            }
        })

        return intersectionSet;
    }

    difference(otherSet) { 
        const differenceSet = new Set(); // {1} 
        this.values().forEach(value => { // {2} 
            if (!otherSet.has(value)) { // {3} 
                differenceSet.add(value); // {4} 
            } 
        }); 
        return differenceSet; 
    }

    isSubsetOf(otherSet) {
        if(this.size() > otherSet.size()) {
            return false;
        }

        let isSubset = true;
        this.values().every(value => {
            if(!otherSet.has(value)) {
                isSubset = false;

                return false;
            }
            return true
        })

        return isSubset;
    }
}

const setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

const setB = new Set(); 
setB.add(3); 
setB.add(4); 
setB.add(5); 
setB.add(6);

const unionAB = setA.union(setB);
const intersectionAB = setA.intersection(setB);
console.log(intersectionAB)
