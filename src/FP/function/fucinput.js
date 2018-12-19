const unary = fn => arg => fn(arg);
const identity = v => v;

const str = "   Now is the time for all...  ".split(/\s|\b/);
const number = ['1', '2', '3'].map(unary(parseInt));
const filterWords = str.filter(identity);
console.log(number);
console.log(filterWords);

const partial =
    (fn, ...presetArg) =>
        (...laterArgs) =>
            fn(...presetArg, ...laterArgs);

const compose = (fn2, fn1) =>
    originValue =>
        fn2(fn1(originValue))

const compose1 = (...fns) => result => {
    const list = [...fns];
    while (list.length > 0) {
        result = list.pop()(result);
    }
    return result;
}

const words = (str) => {
    return String(str).toLowerCase().split(/\s|\b/).filter(v => /^[\w]+$/.test(v));
}

const unique = (list) => {
    const uniqList = [];

    for (let v of list) {
        if (uniqList.indexOf(v) === -1) {
            uniqList.push(v);
        }
    }
    return uniqList;
}

const pipe = (...fns) => (result) => {
    const list = [...fns];

    while (list.length > 0) {
        result = list.shift()(result);
    }
    return result;
}

const skipShortWords = (words) => {
    const filterWords = [];

    for (let word of words) {
        if (word.length > 4) {
            filterWords.push(word);
        }
    }

    return filterWords;
}

var text = "To compose two functions together, pass the \
output of the first function call as the input of the \
second function call.";

const obj = { a: 20 };
const raw = identity(obj);

console.log(raw === obj);
