## 30分钟理解GraphQL核心概念

[TOC]

GraphQL它是一种查询语言，更是一种API查询语言，引用官方文档的一句话

> ask exactly what you want

我们再使用rest接口时，接口返回的数据格式.数据类型都是后端预先定义好的,如果返回的数据格式并不是调用者所期望的，作为前端的我们只有两种方法来解决问题：

- 和后端沟通，改接口 （更改数据源）
- 自己做一些适配工作（处理数据源）

在GraphQL中，我们通过预先定义一张Schema和声明一些type来达到上面提到的效果：

- 对于数据模型的抽象是通过Type来描述的
- 对于接口获取数据的逻辑是通过Schema来描述的

### Type

对于数据模型的抽象是通过Type来描述的，每一个Type有若干Field组成，每一个Field又分别只想某个Type。

GraphQL的Type简单分为两种，一种叫做 ` Scalar Type`, 另外一种叫做 ` Object Type`。

####  Scalar Type

GraphQL中的内建的标量包含，`String`、`Int`、`Float`、`Boolean`、`Enum`, 可以简单理解为基本类型

#### Object Type

仅有标量是不够的抽象一些复杂的数据模型，这时候我们需要使用对象类型，举个例子：

`````sql
type Article{
    id: ID
    text: String
}
`````

对于对象类型的Field的声明，我们一般使用标量，但是我们也可以使用另外一个对象类型，比如我们再声明一个新的User类型，如下：

~~~~sql
type User {
  id: ID
  name: String
}
~~~~

`````mysql
type Article {
  id: ID
  text: String
  isPublished: Boolean
  author: User
}
`````

#### Type Modifier

对于类型，还有一个比较重要的概念，即类型修饰符，当前的类型修饰符有两种，分别是List和 Required，它们的语法分别为 [Type] 和 Type!，同时这两者可以互相组合，比如 `[Type]!` `[Type!]` `[Type!]!`  , ! 符号的位置不同代表不同的含义。

- [Type]!  列表本身为必填项，但其内部元素可以为空
- [Type!] 列表本身可以为空，但是其内部元素必填 
- 列表本身和内部元素均为必填

### Schema

现在我们介绍Schema， 即它是用来描述 ` 对于接口获取数据逻辑` ，但这样描述仍然是有些抽象的，我们其实不妨将它当作REST架构中每个独立资源的 URI 来理解它， 我们用 Query 来描述资源的获取方式。可以将Schema理解为多个 Query 组成的一张表。

这里又涉及一个新的概念 Query， GraphQL中使用Query来抽象数据的查询逻辑，当下标准下，有三种查询类型，分别是query, mutation, subscription。

#### Query

上面三种查询类型是作为Root Query （根查询）存在的,  对于传统的CRUD项目，我们还需要前两种类型就足够了，第三种是正对当前日趋流行的 `real-time` 应用提出的

- query 获取数据时使用
- mutation 修改数据时使用
- subscription 当希望数据更改时，可以进行消息推送，使用subscription类型

Rest接口：

~~~~~~
GET  /api/v1/articles/
GET  /api/v1/articles/:id
POST /api/v1/article/
DELETE /api/v1/article/:id
PATCH /api/v1/article/:id
~~~~~~

QraphQL Query:

~~~~~~
query {
  articles(): [Article!]!
  article(id: Int): Article!
}

mutation {
  createArticle(): Article!
  updateArticle(id: Int): Article!
  deleteArticle(id: Int): Article!
}
~~~~~~

#### Resolver

如果我们仅仅在Schema中声明了若干Query，那么我们只进行了一半的工作，因为我们并没有提供相关Query所返回数据的逻辑。为了能够使GraphQL正常工作，我们还需要再了解一个核心概念，`Resolver（解析函数）`。

GraphQL中，我们会有一个这样约定，Query和与之对应的Resolver是同名的，这样在GraphQL才能把它们对应起来，举个例子，在介绍Resolver之前，是时候从整体了解下GraphQL的内部工作机制了，假设现在我们要对使用我们已经声明的articles的Query，我们可能会写出如下查询语句

~~~~~
Query{
    articles{
        id
        author{
            name
        }
        comments{
     	  id
       	  desc
       	  author
        }
    }
}
~~~~~

GraphQL在解析这一段查询语句时会按照如下步骤：

1. 首先进行第一层解析，当前Query的Root Query类型是query，同事需要它的名字是articles
2. 之后会尝试使用articles的Resolver获取解析数据，第一层解析完毕
3. 之后对第一层解析的返回值，进行第二层解析，当前article还包括三个子Query，分别是id author 和comments
   1. id在Author类型中为标量类型，解析结束
   2. author在Author类型中为对象类型User，尝试使用User的Resolver获取数据
   3. 之后对第二层解析的返回值，进行第三层解析，当前author还包括一个Query, name 由于它是变量类型，解析结束。

其实我们大概可以发现，GraphQL大体的解析流程就是遇见一个Query之后，尝试使用它的Resolver取值，之后再对返回值进行解析，这个过程是递归的，直到所有解析Field的类型是Scalar Type为止。解析的整个过程我们可以把它想像成一个很长的Resolver Chain(解析链)

Resolver本身的签名在各个语言中都是不一样的，因为它达标数据获取的具体逻辑，但是函数的签名如下：

~~~~~
function(parent, args, ctx, info){
    
}
~~~~~

其中的参数的意义如下：

- parent 当前上一个Resolver的返回值
- args  传入某一个Query的函数  例如 article(id: Int)
- ctx 在Resolver 解析链中不断传递的中间变量
- info 当前Query的AST对象

Resolver内部实现对于GraphQL完全是黑盒状态。这意味着Resolver如何返回数据、返回什么样的数据、从哪返回数据，完全取决于Resolver本身，基于这一点，在实际中，很多人往往把GraphQL作为一个中间层来使用，数据的获取通过Resolver来封装，内部数据获取的实现可能基于RPC、REST、WS、SQL等多种不同的方式。

### 总结

#### 想要进一步了解GraphQL本身

看[官方文档](https://www.howtographql.com/)

#### 偏向服务端

除了需要进一步了解GraphQL在某个语言的具体生态外，还需要了解一些关于缓存、上传文件等特定方向的东西。

如果是做系统开发，里推荐了解一个叫做[prisma](https://www.prisma.io/docs/)的框架，它本身是在GraphQL的基础上构建的，并且与一些GraphQL的生态框架兼容性也较好，在各大编程语言也均有适配，它本身可以当做一个ORM来使用，也可以当做一个与数据库交互的中间层来使用。

#### 偏向客户端

我这段时间了解的是apollo，一个开源的grapql-client框架，同时，还需要了解一些额外的查询概念，比如分页查询中涉及的Connection、Edge等。





