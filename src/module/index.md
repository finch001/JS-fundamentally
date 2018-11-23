## JS的模块方案

在ES6之前，JS一直没有自己的模块加载方案，最重要的有CommonJS和AMD两种，前者用于服务器，后者用于浏览器。ES6在语言标准的层面，实现了模块功能，而且实现相当简单。

ES6模块的设计思想就是尽量的静态化，使得编译时就能确认模块的依赖关系，以及输入和输出的变量。CommonJS和AMD模块，都只能在运行确认这些东西，比如CommonJS模块就是对象。

~~~~~~~~js
let {readFile} = require('fs');

let _fs = require('fs');
let readFile = _fs.readFile
~~~~~~~~

这种加载称为“运行时加载“，因为只有运行时才能得到这个对象。

ES6模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。

### 严格模式

严格模式有如下限制：

1. 变量必须声明后再使用
2. 函数的参数不能有同名属性，否则报错。
3. 不能对只读属性赋值，否则报错。
4. 禁止this指向全局变量

### export 命令

一个模块就是一个独立的文件，该文件内部的所有变量，外部无法获取，如果需要读取模块内部的某个变量，就必须使用export关键字输出改变量

export输出：变量，函数，类

**需要注意的是，export规定的是对外的接口，必须与模块内部的变量建立一一对应关系**

~~~~~~js
export var m = 1;

var m = 1;
export{m};

var n = 1;
export {n as m};
~~~~~~

`export` 可以出现在模块的任何位置，只要处于模块顶层就行。 但是如果处于块级作用域，就会报错。

### 模块的整体加载

当我们使用花括号的时候，只是部分加载，所有输出值都加载在这个对象上面。

~~~~~js
import * as circle from './circle'；

// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function(){}
~~~~~

模块整体加载所在的那个对象，不允许在运行时改变。

### export default 命令

### export 与import的复合写法

~~~~~js
export {foo, bar} from 'my_module';
~~~~~

### 跨模块常量

## import

`import`命令会被JavaScript静态分析，先于模块内的其他语句执行。

~~~~~js
if(x === 2){
    import MyModual from './myModual';
}
~~~~~

上面代码中，引擎处理`import`语句是在编译时，这时不会去分析或执行`if`语句，所以`import`语句放在`if`代码块之中毫无意义，因此会报句法错误，而不是执行时错误。也就是说，`import`和`export`命令只能在模块的顶层，不能在代码块之中







