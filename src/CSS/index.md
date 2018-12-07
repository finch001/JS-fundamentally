
# CSS编码规范




[1 前言](#1-%E5%89%8D%E8%A8%80)

[2 代码风格](#2-%E4%BB%A3%E7%A0%81%E9%A3%8E%E6%A0%BC)

　　[2.1 文件](#21-%E6%96%87%E4%BB%B6)

　　[2.2 缩进](#22-%E7%BC%A9%E8%BF%9B)

　　[2.3 空格](#23-%E7%A9%BA%E6%A0%BC)

　　[2.4 行长度](#24-%E8%A1%8C%E9%95%BF%E5%BA%A6)

　　[2.5 选择器](#25-%E9%80%89%E6%8B%A9%E5%99%A8)

　　[2.6 属性](#26-%E5%B1%9E%E6%80%A7)

[3 通用](#3-%E9%80%9A%E7%94%A8)

　　[3.1 选择器](#31-%E9%80%89%E6%8B%A9%E5%99%A8)

　　[3.2 属性缩写](#32-%E5%B1%9E%E6%80%A7%E7%BC%A9%E5%86%99)

　　[3.3 属性书写顺序](#33-%E5%B1%9E%E6%80%A7%E4%B9%A6%E5%86%99%E9%A1%BA%E5%BA%8F)

　　[3.4 清除浮动](#34-%E6%B8%85%E9%99%A4%E6%B5%AE%E5%8A%A8)

　　[3.5 !important](#35-important)

　　[3.6 z-index](#36-z-index)

[4 值与单位](#4-%E5%80%BC%E4%B8%8E%E5%8D%95%E4%BD%8D)

　　[4.1 文本](#41-%E6%96%87%E6%9C%AC)

　　[4.2 数值](#42-%E6%95%B0%E5%80%BC)

　　[4.3 url()](#43-url)

　　[4.4 长度](#44-%E9%95%BF%E5%BA%A6)

　　[4.5 颜色](#45-%E9%A2%9C%E8%89%B2)

　　[4.6 2D 位置](#46-2d-%E4%BD%8D%E7%BD%AE)

[5 文本编排](#5-%E6%96%87%E6%9C%AC%E7%BC%96%E6%8E%92)

　　[5.1 字体族](#51-%E5%AD%97%E4%BD%93%E6%97%8F)

　　[5.2 字号](#52-%E5%AD%97%E5%8F%B7)

　　[5.3 字体风格](#53-%E5%AD%97%E4%BD%93%E9%A3%8E%E6%A0%BC)

　　[5.4 字重](#54-%E5%AD%97%E9%87%8D)

　　[5.5 行高](#55-%E8%A1%8C%E9%AB%98)

[6 变换与动画](#6-%E5%8F%98%E6%8D%A2%E4%B8%8E%E5%8A%A8%E7%94%BB)

[7 响应式](#7-%E5%93%8D%E5%BA%94%E5%BC%8F)

[8 兼容性](#8-%E5%85%BC%E5%AE%B9%E6%80%A7)

　　[8.1 属性前缀](#81-%E5%B1%9E%E6%80%A7%E5%89%8D%E7%BC%80)

　　[8.2 Hack](#82-hack)

　　[8.3 ex<x>pression](#83-ex<x>pression)





## 1 前言


CSS作为网页样式的描述语言，在百度一直有着广泛的应用。本文档的目标是使CSS代码风格保持一致，容易被理解和被维护。

虽然本文档是针对CSS设计的，但是在使用各种CSS的预编译器(如less、sass、stylus等)时，适用的部分也应尽量遵循本文档的约定。


## 2 代码风格


### 2.1 文件


#### [建议] `CSS` 文件使用无 `BOM` 的 `UTF-8` 编码。

解释：

UTF-8 编码具有更广泛的适应性。BOM 在使用程序或工具处理文件时可能造成不必要的干扰。

### 2.2 缩进


#### [强制] 使用 `4` 个空格做为一个缩进层级，不允许使用 `2` 个空格 或 `tab` 字符。


示例：

```css
.selector {
    margin: 0;
    padding: 0;
}
```

### 2.3 空格


#### [强制] `选择器` 与 `{` 之间必须包含空格。

示例：

```css
.selector {
}
```

#### [强制] `属性名` 与之后的 `:` 之间不允许包含空格， `:` 与 `属性值` 之间必须包含空格。

示例：

```css
margin: 0;
```

#### [强制] `列表型属性值` 书写在单行时，`,` 后必须跟一个空格。

示例：

```css
font-family: Arial, sans-serif;
```

### 2.4 行长度


#### [强制] 每行不得超过 `120` 个字符，除非单行不可分割。

解释：

常见不可分割的场景为URL超长。


#### [建议] 对于超长的样式，在样式值的 `空格` 处或 `,` 后换行，建议按逻辑分组。

示例：

```css
/* 不同属性值按逻辑分组 */
background:
    transparent url(aVeryVeryVeryLongUrlIsPlacedHere)
    no-repeat 0 0;

/* 可重复多次的属性，每次重复一行 */
background-image:
    url(aVeryVeryVeryLongUrlIsPlacedHere)
    url(anotherVeryVeryVeryLongUrlIsPlacedHere);

/* 类似函数的属性值可以根据函数调用的缩进进行 */
background-image: -webkit-gradient(
    linear,
    left bottom,
    left top,
    color-stop(0.04, rgb(88,94,124)),
    color-stop(0.52, rgb(115,123,162))
);
```

### 2.5 选择器


#### [强制] 当一个 rule 包含多个 selector 时，每个选择器声明必须独占一行。

示例：

```css
/* good */
.post,
.page,
.comment {
    line-height: 1.5;
}

/* bad */
.post, .page, .comment {
    line-height: 1.5;
}
```

#### [强制] `>`、`+`、`~` 选择器的两边各保留一个空格。

示例：

```css
/* good */
main > nav {
    padding: 10px;
}

label + input {
    margin-left: 5px;
}

input:checked ~ button {
    background-color: #69C;
}

/* bad */
main>nav {
    padding: 10px;
}

label+input {
    margin-left: 5px;
}

input:checked~button {
    background-color: #69C;
}
```

#### [强制] 属性选择器中的值必须用双引号包围。

解释：

不允许使用单引号，不允许不使用引号。


示例：

```css
/* good */
article[character="juliet"] {
    voice-family: "Vivien Leigh", victoria, female
}

/* bad */
article[character='juliet'] {
    voice-family: "Vivien Leigh", victoria, female
}
```

### 2.6 属性


#### [强制] 属性定义必须另起一行。

示例：

```css
/* good */
.selector {
    margin: 0;
    padding: 0;
}

/* bad */
.selector { margin: 0; padding: 0; }
```

#### [强制] 属性定义后必须以分号结尾。

示例：

```css
/* good */
.selector {
    margin: 0;
}

/* bad */
.selector {
    margin: 0
}
```






## 3 通用




### 3.1 选择器


#### [强制] 如无必要，不得为 `id`、`class` 选择器添加类型选择器进行限定。

解释：

在性能和维护性上，都有一定的影响。


示例：


```css
/* good */
#error,
.danger-message {
    font-color: #c00;
}

/* bad */
dialog#error,
p.danger-message {
    font-color: #c00;
}
```

#### [建议] 选择器的嵌套层级应不大于 3 级，位置靠后的限定条件应尽可能精确。

示例：

```css
/* good */
#username input {}
.comment .avatar {}

/* bad */
.page .header .login #username input {}
.comment div * {}
```



### 3.2 属性缩写



#### [建议] 在可以使用缩写的情况下，尽量使用属性缩写。

示例：

```css
/* good */
.post {
    font: 12px/1.5 arial, sans-serif;
}

/* bad */
.post {
    font-family: arial, sans-serif;
    font-size: 12px;
    line-height: 1.5;
}
```

#### [建议] 使用 `border` / `margin` / `padding` 等缩写时，应注意隐含值对实际数值的影响，确实需要设置多个方向的值时才使用缩写。

解释：

border / margin / padding 等缩写会同时设置多个属性的值，容易覆盖不需要覆盖的设定。如某些方向需要继承其他声明的值，则应该分开设置。


示例：

```css
/* centering <article class="page"> horizontally and highlight featured ones */
article {
    margin: 5px;
    border: 1px solid #999;
}

/* good */
.page {
    margin-right: auto;
    margin-left: auto;
}

.featured {
    border-color: #69c;
}

/* bad */
.page {
    margin: 5px auto; /* introducing redundancy */
}

.featured {
    border: 1px solid #69c; /* introducing redundancy */
}
```


### 3.3 属性书写顺序


#### [建议] 同一 rule set 下的属性在书写时，应按功能进行分组，并以 **Formatting Model（布局方式、位置） > Box Model（尺寸） > Typographic（文本相关） > Visual（视觉效果）** 的顺序书写，以提高代码的可读性。

解释：

- Formatting Model 相关属性包括：`position` / `top` / `right` / `bottom` / `left` / `float` / `display` / `overflow` 等
- Box Model 相关属性包括：`border` / `margin` / `padding` / `width` / `height` 等
- Typographic 相关属性包括：`font` / `line-height` / `text-align` / `word-wrap` 等
- Visual 相关属性包括：`background` / `color` / `transition` / `list-style` 等

另外，如果包含 `content` 属性，应放在最前面。


示例：

```css
.sidebar {
    /* formatting model: positioning schemes / offsets / z-indexes / display / ...  */
    position: absolute;
    top: 50px;
    left: 0;
    overflow-x: hidden;

    /* box model: sizes / margins / paddings / borders / ...  */
    width: 200px;
    padding: 5px;
    border: 1px solid #ddd;

    /* typographic: font / aligns / text styles / ... */
    font-size: 14px;
    line-height: 20px;

    /* visual: colors / shadows / gradients / ... */
    background: #f5f5f5;
    color: #333;
    -webkit-transition: color 1s;
       -moz-transition: color 1s;
            transition: color 1s;
}
```


### 3.4 清除浮动



#### [建议] 当元素需要撑起高度以包含内部的浮动元素时，通过对伪类设置 `clear` 或触发 `BFC` 的方式进行 `clearfix`。尽量不使用增加空标签的方式。

解释：

触发 BFC 的方式很多，常见的有：

* float 非 none
* position 非 static
* overflow 非 visible

如希望使用更小副作用的清除浮动方法，参见 [A new micro clearfix hack](http://nicolasgallagher.com/micro-clearfix-hack/) 一文。

另需注意，对已经触发 BFC 的元素不需要再进行 clearfix。


### 3.5 !important


#### [建议] 尽量不使用 `!important` 声明。


#### [建议] 当需要强制指定样式且不允许任何场景覆盖时，通过标签内联和 `!important` 定义样式。

解释：

必须注意的是，仅在设计上 `确实不允许任何其它场景覆盖样式` 时，才使用内联的 `!important` 样式。通常在第三方环境的应用中使用这种方案。下面的 z-index 章节是其中一个特殊场景的典型样例。



### 3.6 z-index



#### [建议] 将 `z-index` 进行分层，对文档流外绝对定位元素的视觉层级关系进行管理。

解释：

同层的多个元素，如多个由用户输入触发的 Dialog，在该层级内使用相同的 `z-index` 或递增 `z-index`。

建议每层包含100个 `z-index` 来容纳足够的元素，如果每层元素较多，可以调整这个数值。


#### [建议] 在可控环境下，期望显示在最上层的元素，`z-index` 指定为 `999999`。

解释：

可控环境分成两种，一种是自身产品线环境；还有一种是可能会被其他产品线引用，但是不会被外部第三方的产品引用。

不建议取值为 `2147483647`。以便于自身产品线被其他产品线引用时，当遇到层级覆盖冲突的情况，留出向上调整的空间。


#### [建议] 在第三方环境下，期望显示在最上层的元素，通过标签内联和 `!important`，将 `z-index` 指定为 `2147483647`。

解释：

第三方环境对于开发者来说完全不可控。在第三方环境下的元素，为了保证元素不被其页面其他样式定义覆盖，需要采用此做法。




## 4 值与单位


### 4.1 文本


#### [强制] 文本内容必须用双引号包围。

解释：

文本类型的内容可能在选择器、属性值等内容中。


示例：

```css
/* good */
html[lang|="zh"] q:before {
    font-family: "Microsoft YaHei", sans-serif;
    content: "“";
}

html[lang|="zh"] q:after {
    font-family: "Microsoft YaHei", sans-serif;
    content: "”";
}

/* bad */