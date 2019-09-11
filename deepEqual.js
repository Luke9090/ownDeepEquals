function deepEqual(item1, item2) {
  if (item1 === item2) return true; // If items evaluate to equal using the standard equality check then return true, they are either equal primitives or pointers to the same object
  if (Object(item1) !== item1 || Object(item2) !== item2) return false; // If items aren't trivially equal (previous test) and at least one of them is a primitive, they are not equal
  if (Array.isArray(item1) !== Array.isArray(item2)) return false; // If one item is an array and the other is an object, they are not equal
  const keys1 = Object.keys(item1);
  const keys2 = Object.keys(item2);
  if (keys1.length !== keys2.length) return false; // If the two items have different numbers of keys they are not equal
  if (!keys1.every(key => keys2.includes(key))) return false; // If item2 does not include all the same keys as item2, they are not equal

  for (let i = 0; i < keys1.length; i++) {
    // Iterate through the keys of item1
    const currValue1 = item1[keys1[i]];
    const currValue2 = item2[keys1[i]];
    if (!deepEqual(currValue1, currValue2)) return false;
  }
  return true;
}

module.exports = deepEqual;
