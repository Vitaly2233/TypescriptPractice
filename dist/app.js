"use strict";
function getLength(value) {
    return {
        value,
        count: `Object has ${value.length} symbols`
    };
}
console.log(getLength("dfsdf"));
class objectCollection {
    constructor() {
        this._objects = [];
    }
    addObject(obj) {
        this._objects.push(obj);
    }
    seeAllObjects() {
        return this._objects;
    }
}
const obj = new objectCollection();
console.log(obj.seeAllObjects());
obj.addObject({ name: "vitaly" });
obj.addObject({ age: 17 });
console.log(obj.seeAllObjects());
