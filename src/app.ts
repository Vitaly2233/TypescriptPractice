interface TLength {
    length: number
}

function getLength<T extends TLength>(value: T): { value: T, count: string } {
    return {
        value,
        count: `Object has ${value.length} symbols`
    }
}

console.log(getLength("dfsdf"));


class objectCollection<T extends object> {
    private _objects: object[] = [];

    addObject(obj: object) {
        this._objects.push(obj);
    }
    seeAllObjects() {
        return this._objects;
    }

}

const obj = new objectCollection();
console.log(obj.seeAllObjects())
obj.addObject({name: "vitaly"});
obj.addObject({age: 17});
console.log(obj.seeAllObjects())