import { Node } from "./node.js";

export function LinkedList() {
  let headNode = null;

  const append = function (value) {
    if (headNode === null) {
      headNode = Node(value);
      return;
    }

    let current = headNode;

    while (current.next !== null) {
      current = current.next;
    }

    current.next = Node(value);
  };

  const prepend = function (value) {
    if (headNode === null) {
      headNode = Node(value);
      return;
    }

    let newHead = Node(value);
    let currentHead = headNode;
    newHead.next = currentHead;
    headNode = newHead;
  };

  const size = function () {
    if (headNode === null) return 0;

    let count = 0;
    let current = headNode;
    while (current !== null) {
      count++;
      current = current.next;
    }

    return count;
  };

  const head = function () {
    return headNode !== null ? headNode.value : undefined;
  };

  const tail = function () {
    if (headNode === null) return undefined;

    let current = headNode;

    while (current.next !== null) {
      current = current.next;
    }

    return current.value;
  };

  const at = function (index) {
    if (headNode === null) return undefined;

    let current = headNode;
    let curIndex = 0;

    while (current !== null) {
      if (curIndex === index) {
        return current.value;
      }
      current = current.next;
      curIndex++;
    }

    return undefined;
  };

  const pop = function () {
    if (headNode === null) return undefined;

    const previousHead = headNode;
    headNode = headNode.next;
    return previousHead.value;
  };

  const contains = function (value) {
    if (headNode === null) return false;

    let current = headNode;

    while (current !== null) {
      if (current.value === value) {
        return true;
      }
      current = current.next;
    }

    return false;
  };

  const findIndex = function (value) {
    if (headNode === null) return -1;

    let current = headNode;
    let curIndex = 0;

    while (current !== null) {
      if (current.value === value) {
        return curIndex;
      }
      current = current.next;
      curIndex++;
    }

    return -1;
  };

  const toString = function () {
    if (headNode === null) {
      return "null";
    }

    let current = headNode;
    let stringToPrint = "";

    while (current !== null) {
      stringToPrint += "( " + current.value + " ) -> ";
      current = current.next;
    }

    stringToPrint += "null";

    return stringToPrint;
  };

  const insertAt = function (index, ...values) {
    if (index < 0 || index > this.size()) throw RangeError;

    let current = headNode;
    let previous = null;
    let curIndex = 0;

    while (current !== null) {
      if (curIndex === index) {
        for (const value of values) {
          const newNode = Node(value);
          newNode.next = current;
          if (previous === null) {
            headNode = newNode;
            previous = headNode;
          } else {
            previous.next = newNode;
            previous = newNode;
          }
        }
        console.log(this.toString());
        return;
      }

      previous = current;
      current = current.next;
      curIndex++;
    }

    for (const value of values) {
      const newNode = Node(value);
      newNode.next = previous.next;
      previous.next = newNode;
      previous = newNode;
    }
  };

  const removeAt = function (index) {
    if (index < 0 || index >= this.size()) throw RangeError;

    let current = headNode;
    let previous = null;
    let curIndex = 0;

    while (current !== null) {
      if (curIndex === index) {
        if (previous === null) {
          headNode = headNode.next;
        } else {
          previous.next = current.next;
          current = previous;
        }
        return;
      }
      previous = current;
      current = current.next;
      curIndex++;
    }
  };

  return {
    append,
    prepend,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    findIndex,
    toString,
    insertAt,
    removeAt,
  };
}
