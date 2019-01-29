# Redux Saga

## 两个高级 Saga Helpers 函数

- takeEvery
  takeEvery 允许多个 Action 并发启动
- takeLatest
  takeLatest 只允许一个 task 运行，如果之前有 task 在运行，则新 task 启动的时候，之前的任务会自动取消。

## 何为 Effects

Effect 是一个对象包含一些信息，能够被中间件执行的。（eg: 执行一个异步操作，dispatch 一个动作 etc）。

```js
function* fetchProducts() {
  const products = yield call(Api.fetch('./product'));
  console.log(products);
}
```

`call` 与其执行一个异步函数，我们产出一个描述：

```js
{
    CALL:{
        fn: Api.fetch,
        args: ['./product']
    }
}
```

## Dispatching actions

redux-saga 提供了 `put`, 专门用来通知 store 发送 action 的

## Error handle

```js
import Api from './path/to/api';
import { call, put } from 'redux-saga/effects';

function fetchProductsApi() {
  return Api.fetch('/products')
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function* fetchProducts() {
  const { response, error } = yield call(fetchProductsApi);
  if (response) yield put({ type: 'PRODUCTS_RECEIVED', products: response });
  else yield put({ type: 'PRODUCTS_REQUEST_FAILED', error });
}
```

总结何为 Effect
通过 yield 一些声明的 effect 来触发 Side Effects, 通过使用 call put 和结合 takeEvery takeLatest 来实现工作流控制。

## 高级用法

1.  Pulling future actions
    `take` 其实 takeEvery 是一个高级 API
    ```js
    import {select, takeEvery} from 'redux-saga/effects'
    function* watchAndLog() {
    yield takeEvery('*', function\* logger(action) {
    const state = yield select()

        console.log('action', action)
        console.log('state after', state)

    })
    }

        ```

2.  并发执行
    yield 对于异步控制流按照线性来处理非常合适，但是我们通常也需要并发执行
    ```js
     const users = yield call(fetch, '/users')
     const repos = yield call(fetch, '/repos')
    ```
    all 操作符可以满足 类似与 promise.all 操作
3.  多个 Effetcs 竞争

    `race` 有时候我们需要并发多个任务，但是只需要第一个 resolve（or rejects）的数据。

    ```js
        import {race, call, put, delay} from 'redux-saga/effects'

        function* fetchPostWithTimeout(){
            const {posts, timeout} = yield race({
                posts: call(fetchApi, '/posts')
                timeout: delay(1000)
            })

            if(posts){
                yield put({type: 'POSTS_RECEIVED', posts})
            }else{
                yield put({type: 'TIMEOUT_ERROR'})
            }
        }
    ```
4. Task cancellaton
   calcel 操作符可以用来操作 一旦一个task被fork后，你可以终止它的执行通过yield calcel(task)
   ```js
    function* main() {
    while ( yield take(START_BACKGROUND_SYNC) ) {
    // starts the task in the background
        const bgSyncTask = yield fork(bgSync)

    // wait for the user stop action
        yield take(STOP_BACKGROUND_SYNC)
    // user clicked stop. cancel the background task
    // this will cause the forked bgSync task to jump into its finallyblock
        yield cancel(bgSyncTask)
        }
    }
   ```
同时还有自动cancellation
   1. `race` 所有的race 只有resovle或者reject，其他都会自动取消
   2. `all` 在parallel执行中，类似与Promise.all


### fork model
   In redux-saga 我们可以动态fork tasks 让它执行在后台
   - fork 可以用来创建 attached forks
   - spawn 可以用来创建detached forks
### attached forks （fork）
attached forks 保持在他们父直到：
1. 父指令全部都停止
2. 所有attached forks 全部都终止

```js
import { fork, call, put, delay } from 'redux-saga/effects'
import api from './somewhere/api' // app specific
import { receiveData } from './somewhere/actions' // app specific

function* fetchAll() {
  const task1 = yield fork(fetchResource, 'users')
  const task2 = yield fork(fetchResource, 'comments')
  yield delay(1000)
}

function* fetchResource(resource) {
  const {data} = yield call(api.fetch, resource)
  yield put(receiveData(data))
}

function* main() {
  yield call(fetchAll)
}
```

`call(fetchAll)` 会终止
- the fetchAll 会终止， 这意味 3 effetcs会执行，因为fork effects没有阻塞， task会阻塞在delay(1000)
- 两个forked task会终止，在获取想要的资源并将数据传给action后

### Channels
#### actionChannel Effect
我们先看一个例子
``````js
import {take, fork} from 'redux-saga/effects'

function* watchRequest(){
    while(true){
        const {payload} = yield take('REQUEST');
        yield fork(handleReqeust, payload);
    }
}

function* handleRequest(payload){...}
``````

上面的例子展示了一个典型的 watch-and-fork 模式， `watchRequests` saga通过fork来避免阻塞，然后不会丢失 store 的action, 但是这样存在一个问题，如果突然有很多action发送过来会导致有多很 `handleRequest` 并发执行。
如果我们想要处理串行处理action，举例 如果同时有四个actions，我们想要先处理完第一个action，然后等第一个结束然后处理第二个actions。
然后我们需要使用到 `actionChannel`

```js
import {take, actionChannel, call ...} from 'redux-saga/effects'

function* watchRequests(){
    const requestChan = yield actionChannel('REQUEST');
    while(true){
        const {payload} = yield take(requestChan)
        yield call(handleRequest, payload)
    }
}

function* handleRequest(payload){...}
```
与前面不同的是actionChannel 可以缓存incoming message。
当我们用 take 来阻塞的时候，如果 store dispatch将会存在actionChannel中