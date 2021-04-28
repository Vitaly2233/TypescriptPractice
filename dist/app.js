"use strict";
function getLength(value) {
    return {
        value,
        count: `Object has ${value.length} symbols`
    };
}
console.log(getLength("dfsdf"));
