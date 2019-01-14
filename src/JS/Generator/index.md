## Generator 函数有多个理解角度

- 状态机，还是一个遍历器对象生成函数。
- 是一个普通函数，但是有两个特征。一是，function 关键字与函数名之间有星号，函数体内使用 yield 表达式，定义不同的内部状态

```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
```
上面代码定义了一个Generator函数，它内部有两个yield表达式，即该函数有三个状态: hello, world, return语句。

## yield表达式
Generator函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，yield表达式即使暂停标志。
遍历器对象的next方法的运行逻辑如下。
1. 遇到yield表达式， 就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值作为返回的value属性值。
2. 下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。
3. 如果没有遇到yield表达式，就一直运行到函数结束，知道return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。

## next方法的参数
yield表达式本身没有返回值，或者说总是返回undefined，next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。





