# Linked List

A singly linked list implemented from scratch in JavaScript, built for [The Odin Project](https://www.theodinproject.com/lessons/javascript-linked-lists). Two small factory functions — `Node` (a value plus a pointer to the next node) and `LinkedList` (the operations that string nodes together) — with no DOM and no dependencies beyond the test runner.

## What it demonstrates

- Building a **linked data structure** by hand: each node holds a `value` and a `next` pointer, and the list is just a reference to the head node.
- **Traversal-based operations** — almost every method walks the chain node by node (`append`, `size`, `at`, `contains`, `findIndex`, `toString`).
- **Pointer rewiring** for `prepend`, `insertAt`, and `removeAt` — inserting and removing without shifting the rest of the list.
- The **factory-function pattern** with closed-over private state: `headNode` lives in the closure and is never exposed directly; the returned object is the public API.
- **Unit testing with Jest** (via Babel so tests can use ES modules).

## API

The list is created by calling `LinkedList()` (a factory — no `new`):

```js
import { LinkedList } from "./src/linkedList.js";

const list = LinkedList();
list.append("a");
list.append("b");
list.prepend("start");
console.log(list.toString()); // ( start ) -> ( a ) -> ( b ) -> null
```

| Method                       | Description                                                         |
| ---------------------------- | ------------------------------------------------------------------- |
| `append(value)`              | Add a new node to the **end** of the list.                          |
| `prepend(value)`             | Add a new node to the **start** of the list.                        |
| `size()`                     | Return the number of nodes.                                         |
| `head()`                     | Return the **value** of the first node (`undefined` if empty).      |
| `tail()`                     | Return the **value** of the last node (`undefined` if empty).       |
| `at(index)`                  | Return the **value** at `index` (`undefined` if out of range).      |
| `pop()`                      | Remove the first node and return its value.                         |
| `contains(value)`            | Return `true` if `value` is in the list, else `false`.              |
| `findIndex(value)`           | Return the index of the first node with `value`, or `-1` if absent. |
| `toString()`                 | Represent the list as `( a ) -> ( b ) -> null`.                     |
| `insertAt(index, ...values)` | Insert one or more values starting at `index`.                      |
| `removeAt(index)`            | Remove the node at `index`.                                         |

> Note: `head`, `tail`, and `at` return the stored **value** rather than the node object, and `findIndex` follows the JS `indexOf` convention of returning `-1` when not found.

## Project structure

```
project-linked-list/
├── src/
│   ├── node.js          # Node factory: { value, next }
│   └── linkedList.js    # LinkedList factory + all operations
├── index.js             # scratch file for manual experimentation
├── LinkedList.test.js   # Jest test suite
├── babel.config.cjs     # lets Jest run ES modules
└── package.json
```

## Running it

```bash
git clone https://github.com/dani-sink/project-linked-list.git
cd project-linked-list
npm install     # installs Jest + Babel
npm test        # run the test suite
node index.js   # run manual experiments
```

Babel (`@babel/preset-env`) transpiles the `import`/`export` syntax so Jest can run the ES-module source. That's why `npm test` is a plain `jest` with no experimental flags.

## What I learned

- walking the chain with a `current`/`previous` pointer pair is the core move behind almost every method
- insertAt / removeAt made pointer rewiring click — you relink `next`, you don't shift anything
- keeping headNode private in the closure kept the public API clean

---

Part of [The Odin Project](https://www.theodinproject.com/) — Full Stack JavaScript path.
