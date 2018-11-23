JS的模块方案

在ES6之前，JS一直没有自己的模块加载方案，最重要的有CommonJS和AMD两种，前者用于服务器，后者用于浏览器。ES6在语言标准的层面，实现了模块功能，而且实现相当简单。

ES6模块的设计思想就是尽量的静态化，使得编译时就能确认模块的依赖关系，以及输入和输出的变量。CommonJS和AMD模块，都只能在运行确认这些东西，比如CommonJS模块就是对象。

    let {readFile} = require('fs');
    
    let _fs = require('fs');
    let readFile = _fs.readFile

这种加载称为“运行时加载“，因为只有运行时才能得到这个对象。

ES6模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。

严格模式

严格模式有如下限制：

1. 变量必须声明后再使用
2. 函数的参数不能有同名属性，否则报错。
3. 不能对只读属性赋值，否则报错。
4. 禁止this指向全局变量

export 命令

一个模块就是一个独立的文件，该文件内部的所有变量，外部无法获取，如果需要读取模块内部的某个变量，就必须使用export关键字输出改变量

export输出：变量，函数，类

需要注意的是，export规定的是对外的接口，必须与模块内部的变量建立一一对应关系

    export var m = 1;
    
    var m = 1;
    export{m};
    
    var n = 1;
    export {n as m};

export 可以出现在模块的任何位置，只要处于模块顶层就行。 但是如果处于块级作用域，就会报错。

模块的整体加载

当我们使用花括号的时候，只是部分加载，所有输出值都加载在这个对象上面。

    import * as circle from './circle'；
    
    // 下面两行都是不允许的
    circle.foo = 'hello';
    circle.area = function(){}

模块整体加载所在的那个对象，不允许在运行时改变。

export default 命令

export 与import的复合写法

    export {foo, bar} from 'my_module';

跨模块常量

import

import命令会被JavaScript静态分析，先于模块内的其他语句执行。

    if(x === 2){
        import MyModual from './myModual';
    }

上面代码中，引擎处理import语句是在编译时，这时不会去分析或执行if语句，所以import语句放在if代码块之中毫无意义，因此会报句法错误，而不是执行时错误。也就是说，import和export命令只能在模块的顶层，不能在代码块之中

Module的加载实现

async  defer

<script> 标签打开defer或async属性，脚本就会异步加载。渲染引擎遇到这一行命令，就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。

defer 需要整个页面在内存中正常渲染结束（DOM结构完成生成，以及其他脚本执行完成），才会执行。

async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再渲染。

defer 是在按照顺序加载， async则不能保证

浏览器加载ES6 module (type = module)

ES6模块与CommonJS模块的差异

两者的差异： 

1. CommonJS模块输出的是一个值的拷贝， ES6模块输出的是值的引用。
2. CommonJS模块是运行时加载，ES6模块 是编译时输出接口










