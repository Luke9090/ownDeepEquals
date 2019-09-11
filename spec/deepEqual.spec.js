const { expect } = require("chai");
const deepEqual = require("../deepEqual");

describe("deepEqual", () => {
  it("returns true when passed two similar arrays or objects that contain only primitives", () => {
    const obj1 = { a: "apple", b: "banana", c: "carrot" };
    const obj2 = { a: "apple", b: "banana", c: "carrot" };
    expect(deepEqual(obj1, obj2)).to.be.true;
    const arr1 = ["apple", "banana", "carrot"];
    const arr2 = ["apple", "banana", "carrot"];
    expect(deepEqual(arr1, arr2)).to.be.true;
  });
  it("returns true when passed two dissimilar arrays or objects that contain only primitives", () => {
    const obj1 = { a: "apple", b: "banana", c: "carrot", d: "carrot" };
    const obj2 = { a: "apple", b: "banana", c: "carrot" };
    expect(deepEqual(obj1, obj2)).to.be.false;
    const arr1 = ["apple", "banana", "carrot", "carrot"];
    const arr2 = ["apple", "banana", "carrot"];
    expect(deepEqual(arr1, arr2)).to.be.false;
    const obj3 = { a: "apple", b: "banana", d: "carrot" };
    const obj4 = { a: "apple", b: "banana", c: "carrot" };
    expect(deepEqual(obj3, obj4)).to.be.false;
  });
  it("doesn't care about order in objects", () => {
    const obj1 = { a: "apple", b: "banana", c: "carrot" };
    const obj2 = { a: "apple", c: "carrot", b: "banana" };
    expect(deepEqual(obj1, obj2)).to.be.true;
  });
  it("does care about order in arrays", () => {
    const arr3 = ["apple", "banana", "carrot"];
    const arr4 = ["apple", "carrot", "banana"];
    expect(deepEqual(arr3, arr4)).to.be.false;
  });
  it("distinguishes between numerically-keyed objects and similar arrays", () => {
    const obj = { 0: "apple", 1: "banana", 2: "carrot" };
    const arr = ["apple", "banana", "carrot"];
    expect(deepEqual(obj, arr)).to.be.false;
  });
});
