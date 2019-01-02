## Redux 中间件

redux 中设计最出彩的便是中间件，redux 中间件是一个普通函数。

> middleware:: next -> action -> retVal

我们先看一个 logger 的中间件函数，因为 redux 设计中间件的操作对象都是 action

```javascript
export default function createLogger({ getState, dispatch }) {
  return next => action => {
    const console = window.console;
    const prevState = getState();
    // next就是dispatch
    const returnValue = next(action);
    // 此处也是action而已
    const nextState = getState();
    const actionType = String(action.type);
    const message = `action ${actionType}`;
    console.log(`%c prev state`, `color: #9E9E9E`, prevState);
    console.log(`%c action`, `color: #03A9F4`, action);
    console.log(`%c next state`, `color: #4CAF50`, nextState);
    return returnValue;
  };
}
```

- 所有的中间函数全部接口两个参数 一个是 getState, 另外一个是 dispatch
- next 这个是什么东西 还不是很清楚

### applyMiddleware

所有的中间件通过 applyMiddleware 然后添加进去：

```javascript
export default function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args);
    let dispatch = () => {
      throw new Error(
        `Dispatching while constructing your middleware is not allowed. ` +
          `Other middleware would not be applied to this dispatch.`
      );
    };

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    };
    const chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    return {
      ...store,
      dispatch
    };
  };
}
```

`const chain = middlewares.map(middleware => middleware(middlewareAPI))` 所有的中间件函数首先会被注入 store.getState 函数。

接下来到了最精彩的部分

`dispatch = compose(...chain)(store.dispatch)` 将 chain 中所有的中间件连接到一起。顺序很重要 compose 和 Pipe 在函数式编程中不太一样，compose 会将函数从右到左一次连接到一起。

```javascript
middlewareI(middlewareJ(middlewareK(store.dispatch)))(action);
```
