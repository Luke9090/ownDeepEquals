const { expect } = require("chai");
const deepEqual = require("../deepEqual");

describe("deepEqual", () => {
  it("returns true when passed identical primitives", () => {
    expect(deepEqual(3, 3)).to.be.true;
    expect(deepEqual("banana", "banana")).to.be.true;
    expect(deepEqual(true, true)).to.be.true;
    expect(deepEqual(false, false)).to.be.true;
  });
  it("returns false when passed non-identical primitives", () => {
    expect(deepEqual(3, 4)).to.be.false;
    expect(deepEqual("banana", "banana".length)).to.be.false;
    expect(deepEqual(true, false)).to.be.false;
    expect(deepEqual("apple", "pear")).to.be.false;
  });
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
  it("returns true for identical, deeply nested objects", () => {
    const hell1 = { 1: { 2: { 3: { 4: { a: "found me!" } } } } };
    const hell2 = { 1: { 2: { 3: { 4: { a: "found me!" } } } } };
    expect(deepEqual(hell1, hell2)).to.be.true;
  });
  it("returns false for non-identical, deeply nested objects", () => {
    const hell1 = { 1: { 2: { 3: { 4: { a: "found me!" } } } } };
    const hell2 = { 1: { 2: { 34: { 4: { a: "found me!" } } } } };
    expect(deepEqual(hell1, hell2)).to.be.false;
    const hell3 = { 1: { 2: { 3: { 4: { a: "found you!" } } } } };
    const hell4 = { 1: { 2: { 3: { 4: { a: "found me!" } } } } };
    expect(deepEqual(hell3, hell4)).to.be.false;
  });
  it("returns true for identical, complex, deeply nested objects", () => {
    const hellbase1 = { 1: { 2: { 3: { 4: { a: "found me!" } } } } };
    const hell1 = { 1: { 2: { 3: { 4: { a: "found me!", hellagain: hellbase1 } }, hell: hellbase1 } } };
    const hellbase2 = { 1: { 2: { 3: { 4: { a: "found me!" } } } } };
    const hell2 = { 1: { 2: { 3: { 4: { a: "found me!", hellagain: hellbase2 } }, hell: hellbase2 } } };
    expect(deepEqual(hell1, hell2)).to.be.true;
  });
  it("returns false for non-identical, complex, deeply nested objects", () => {
    const hellbase1 = { 1: { 2: { 3: { 4: { a: "found me!" } } } } };
    const hell1 = { 1: { 2: { 3: { 4: { a: "found me!", hellagain: hellbase1 } }, hell: hellbase1 } } };
    const hellbase2 = { 1: { 2: { 3: { 4: { a: "found me!" } } } } };
    const hell2 = { 1: { 2: { 3: { 4: { a: "found me!", hellagain: hellbase2 } }, hello: hellbase2 } } };
    expect(deepEqual(hell1, hell2)).to.be.false;
  });
  it("returns true for identical, complex, deeply nested arrays", () => {
    const hellbase1 = ["apple", 3, 12, [13, 14], "monsoon", [4, [["china"], 3], 12]];
    const hell1 = [[], [], [hellbase1], hellbase1, [[[hellbase1]]], "banana"];
    const hellbase2 = ["apple", 3, 12, [13, 14], "monsoon", [4, [["china"], 3], 12]];
    const hell2 = [[], [], [hellbase2], hellbase2, [[[hellbase2]]], "banana"];
    expect(deepEqual(hell1, hell2)).to.be.true;
  });
  it("returns false for non-identical, complex, deeply nested arrays", () => {
    const hellbase1 = ["apple", 3, 12, [13, 14], "monsoon", [4, [["china"], 3], 12]];
    const hell1 = [[], [], [hellbase1], hellbase1, [[[hellbase1]]], "banana"];
    const hellbase2 = ["apple", 3, 12, [13, 14], "monsoon", [4, [["china"], 2], 12]];
    const hell2 = [[], [], [hellbase2], hellbase2, [[[hellbase2]]], "banana"];
    expect(deepEqual(hell1, hell2)).to.be.false;
    const hellbase3 = ["apple", 3, 12, [13, 14], "monsoon", [4, [["china"], 3], 12]];
    const hell3 = [[], [], [hellbase3], hellbase3, [[[hellbase3]]], "banana"];
    const hellbase4 = ["apple", 3, 12, [13, 14], "monsoon", [4, [["china", "taiwan"], 3], 12]];
    const hell4 = [[], [], [hellbase4], hellbase4, [[[hellbase4]]], "banana"];
    expect(deepEqual(hell3, hell4)).to.be.false;
  });
  it("correctly compares items that are a complex mix of objects and arrays", () => {
    const hellArr1 = ["apple", 3, 12, [13, 14], "monsoon", [4, [["china"], 3], 12]];
    const hellObj1 = { 1: { 2: { 3: { 4: { a: "found me!" } } } } };
    const hellMix1 = [{ 1: hellArr1 }, { 2: hellObj1 }, [{ 1: hellArr1 }, { 2: hellObj1 }]];
    const hellArr2 = ["apple", 3, 12, [13, 14], "monsoon", [4, [["china"], 3], 12]];
    const hellObj2 = { 1: { 2: { 3: { 4: { a: "found me!" } } } } };
    const hellMix2 = [{ 1: hellArr2 }, { 2: hellObj2 }, [{ 1: hellArr2 }, { 2: hellObj2 }]];
    expect(deepEqual(hellMix1, hellMix2)).to.be.true;
    const hellArr3 = ["apple", 3, 12, [13, 14], "monsoon", [4, [["china"], 3], 12]];
    const hellObj3 = { 1: { 2: { 3: { 4: { a: "found me!" } } } } };
    const hellMix3 = [{ 1: hellArr3 }, { 2: hellObj3 }, [{ 1: hellArr3 }, { 2: hellObj3 }]];
    const hellArr4 = ["apple", 3, 12, [13, 14], "monsoon", [4, [["china"], 3], 12]];
    const hellObj4 = { 1: { 2: { 3: { 4: { a: "found me!" } } } } };
    const hellMix4 = [{ 1: hellArr4 }, { 2: hellObj1 }, [{ 1: hellArr4 }, { 2: hellObj1 }]];
    expect(deepEqual(hellMix3, hellMix4)).to.be.true;
    const hellArr5 = ["apple", 3, 12, [13, 14], "monsoon", [4, [["china"], 3], 12]];
    const hellObj5 = { 1: { 2: { 3: { 4: { a: "found me!" } } } } };
    const hellMix5 = [{ 1: hellArr5 }, { 2: hellObj5 }, [{ 1: hellArr5 }, { 2: hellObj5 }]];
    const hellArr6 = ["apple", 3, 12, [13, 14], "monson", [4, [["china"], 3], 12]];
    const hellObj6 = { 1: { 2: { 3: { 4: { a: "found me!" } } } } };
    const hellMix6 = [{ 1: hellArr6 }, { 2: hellObj6 }, [{ 1: hellArr6 }, { 2: hellObj6 }]];
    expect(deepEqual(hellMix5, hellMix6)).to.be.false;
  });
  it("returns false when arrays contain the same values, in the same order, but at different indexes", () => {
    const arr1 = ["banana"];
    const arr2 = [];
    arr2[3] = "banana";
    expect(deepEqual(arr1, arr2)).to.be.false;
  });
});
