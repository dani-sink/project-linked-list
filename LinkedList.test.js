/**
 * Tests for the Odin Linked Lists project.
 */

import { LinkedList } from "./src/linkedList.js";

describe("LinkedList — empty list", () => {
  let list;
  beforeEach(() => {
    list = LinkedList();
  });

  test("starts with size 0", () => {
    expect(list.size()).toBe(0);
  });

  test("head is undefined", () => {
    expect(list.head()).toBeUndefined();
  });

  test("tail is undefined", () => {
    expect(list.tail()).toBeUndefined();
  });

  test('toString of an empty list is "null"', () => {
    expect(list.toString()).toBe("null");
  });

  test("contains is false for anything", () => {
    expect(list.contains("anything")).toBe(false);
  });

  test("findIndex returns -1 for anything", () => {
    expect(list.findIndex("anything")).toBe(-1);
  });

  test("at() out of range returns undefined", () => {
    expect(list.at(0)).toBeUndefined();
  });
});

describe("LinkedList — append", () => {
  let list;
  beforeEach(() => {
    list = new LinkedList();
  });

  test("appending to an empty list sets head and tail to the same value", () => {
    list.append("a");
    expect(list.size()).toBe(1);
    expect(list.head()).toBe("a");
    expect(list.tail()).toBe("a");
  });

  test("appends go to the end, in order", () => {
    list.append("a");
    list.append("b");
    list.append("c");
    expect(list.size()).toBe(3);
    expect(list.head()).toBe("a"); // first stays first
    expect(list.tail()).toBe("c"); // newest is last
    expect(list.at(1)).toBe("b");
  });
});

describe("LinkedList — prepend", () => {
  let list;
  beforeEach(() => {
    list = new LinkedList();
  });

  test("prepending to an empty list sets head and tail", () => {
    list.prepend("a");
    expect(list.size()).toBe(1);
    expect(list.head()).toBe("a");
    expect(list.tail()).toBe("a");
  });

  test("prepend puts the new node at the front", () => {
    list.append("b");
    list.append("c");
    list.prepend("a");
    expect(list.size()).toBe(3);
    expect(list.head()).toBe("a"); // new front
    expect(list.tail()).toBe("c"); // tail unchanged
    expect(list.at(1)).toBe("b");
  });
});

describe("LinkedList — at(index)", () => {
  let list;
  beforeEach(() => {
    list = new LinkedList();
    list.append("a");
    list.append("b");
    list.append("c");
  });

  test("returns the node at each valid index", () => {
    expect(list.at(0)).toBe("a");
    expect(list.at(1)).toBe("b");
    expect(list.at(2)).toBe("c");
  });

  test("returns undefined for an index past the end", () => {
    expect(list.at(3)).toBeUndefined();
    expect(list.at(99)).toBeUndefined();
  });
});

describe("LinkedList — pop", () => {
  let list;
  beforeEach(() => {
    list = new LinkedList();
    list.append("a");
    list.append("b");
    list.append("c");
  });

  test("removes the last node and shrinks size", () => {
    const poppedVal = list.pop(); // a
    expect(poppedVal).toBe("a");
    expect(list.size()).toBe(2);
    expect(list.tail()).toBe("c");
    expect(list.contains("c")).toBe(true);
  });

  test("popping down to one, then empty, resets head and tail", () => {
    const firstPopped = list.pop(); // a
    const secondPopped = list.pop(); // b
    expect(firstPopped).toBe("a");
    expect(secondPopped).toBe("b");
    expect(list.size()).toBe(1);
    expect(list.head()).toBe("c");
    expect(list.tail()).toBe("c");

    list.pop(); // c
    expect(list.size()).toBe(0);
    expect(list.head()).toBeUndefined();
    expect(list.tail()).toBeUndefined();
  });
});

describe("LinkedList — contains & find", () => {
  let list;
  beforeEach(() => {
    list = new LinkedList();
    list.append("a");
    list.append("b");
    list.append("c");
  });

  test("contains is true for present values, false otherwise", () => {
    expect(list.contains("a")).toBe(true);
    expect(list.contains("c")).toBe(true);
    expect(list.contains("z")).toBe(false);
  });

  test("findIndex returns the index of a present value", () => {
    expect(list.findIndex("a")).toBe(0);
    expect(list.findIndex("b")).toBe(1);
    expect(list.findIndex("c")).toBe(2);
  });

  test("findIndex returns -1 for a missing value", () => {
    expect(list.findIndex("z")).toBe(-1);
  });
});

describe("LinkedList — toString", () => {
  test("formats nodes as ( value ) -> ... -> null", () => {
    const list = new LinkedList();
    list.append("a");
    list.append("b");
    list.append("c");
    expect(list.toString()).toBe("( a ) -> ( b ) -> ( c ) -> null");
  });

  test("a single-node list", () => {
    const list = new LinkedList();
    list.append("a");
    expect(list.toString()).toBe("( a ) -> null");
  });

  test("an empty list", () => {
    const list = new LinkedList();
    expect(list.toString()).toBe("null");
  });
});

describe("LinkedList — General test case", () => {
  let list;
  beforeEach(() => {
    list = new LinkedList();
  });

  test("General test case", () => {
    list.append("dog");
    list.append("cat");
    list.append("parrot");
    list.append("hamster");
    list.append("snake");
    list.append("turtle");

    expect(list.toString()).toBe(
      "( dog ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> null",
    );
  });
});

/* ------------------------------------------------------------------ *
 * EXTRA CREDIT
 * ------------------------------------------------------------------ */
describe("LinkedList — insertAt / removeAt (extra credit)", () => {
  let list;
  beforeEach(() => {
    list = new LinkedList();
    list.append("a");
    list.append("b");
    list.append("c");
  });

  test("insertAt the middle shifts the rest right", () => {
    list.insertAt(1, "x");
    expect(list.size()).toBe(4);
    expect(list.at(0)).toBe("a");
    expect(list.at(1)).toBe("x"); // inserted
    expect(list.at(2)).toBe("b"); // shifted
  });

  test("insertAt index 0 behaves like prepend", () => {
    list.insertAt(0, "x");
    expect(list.head()).toBe("x");
    expect(list.size()).toBe(4);
  });

  test("insertAt the end behaves like append", () => {
    list.insertAt(3, "x");
    expect(list.tail()).toBe("x");
    expect(list.size()).toBe(4);
  });

  test("removeAt the middle closes the gap", () => {
    list.removeAt(1); // remove 'b'
    expect(list.size()).toBe(2);
    expect(list.at(0)).toBe("a");
    expect(list.at(1)).toBe("c"); // pulled left
    expect(list.contains("b")).toBe(false);
  });

  test("removeAt index 0 removes the head", () => {
    list.removeAt(0);
    expect(list.head()).toBe("b");
    expect(list.size()).toBe(2);
  });

  test("removeAt the last index removes the tail", () => {
    list.removeAt(2);
    expect(list.tail()).toBe("b");
    expect(list.size()).toBe(2);
  });
});
