function printArgs(...args) {
  console.log(arguments.length);
  return args;
}

function forEach(list, fn) {
  for (let v of list) {
    fn(v);
  }
}

// console.log(printArgs(1, 123, 12, 3, 123, 1, 23, 1, 23, 12, 3, 12));
// console.log(printArgs.length);

forEach([1, 2, 3, 4, 5], function each(val) {
  console.log(val);
});

function foo() {
  return bar(function inner(msg) {
    return msg.toUpperCase();
  });
}

function bar(func) {
  return func("Hello");
}

console.log(foo());

function foo1(msg) {
  var fn = function inner() {
    return msg.toUpperCase();
  };
  return fn;
}

var helloFn = foo1("Hello");

helloFn();

function person(name) {
  return function identify() {
    console.log(`I am ${name}`);
  };
}

var fred = person("Fred");
var finch = person("Finch");

fred();
finch();

function runningCounter(start) {
  var val = start;

  return function current(increment = 1) {
    val = val + increment;
    return val;
  };
}

var score = runningCounter(0);

score();
var count = score(10);
console.log(count);

function flatten(data) {
  var result = {};

  function recurse(cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      for (var i = 0, l = cur.length; i < l; i++) {
        recurse(cur[i], prop + "[" + i + "]");
      }
      if (l == 0) {
        result[prop] = [];
      }
    } else {
      var isEmpty = true;
      for (var p in cur) {
        isEmpty = false;
        recurse(cur[p], prop ? prop + "." + p : p);
      }
      if (isEmpty && prop) {
        result[prop] = {};
      }
    }
  }
  recurse(data, "");
  return result;
}

const hello = { hellp: { finch: "world", nihao: 123 } };
console.log(flatten(hello));

function FlattenDemo(data) {
  let result = {};

  function recurse(cur, prop) {
    // 如果此处是原始数据  应该赋值
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      let l = cur.length;
      for (let i = 0; i < l; i++) {
        recurse(cur[i], `${prop}-${i}`);
      }

      if (l === 0) {
        result[prop] = [];
      }
    } else {
      let isEmpty = true;
      for (let p in cur) {
        isEmpty = false;
        recurse(cur[p], prop ? `${prop}.${p}` : p);
      }
      if (isEmpty && prop) {
        result[prop] = {};
      }
    }
  }

  recurse(data, "");
  return result;
}

const nihao = { finch: { finch: [123, 123, 1, 123] } };

const result = FlattenDemo(nihao);
console.log(result);
