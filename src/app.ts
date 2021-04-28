interface TLength {
    length: number
}
function getLength<T extends TLength>(value: T): {value: T, count: string} {
    return {
        value,
        count : `Object has ${value.length} symbols`
    }
}

console.log(getLength("dfsdf"));