# Reduxeed

Jump to the end for [recipes](#recipes).

The `reduxeed.js` exports a series of functions that make creating redux reducers for api responses a breeze. The idea is to reduce the boilerplate of commonly required logic for asynchronous API requests.
That being said there are some assumption being made.

The following guide will explain those assumptions and how they came to be.

Three different actions get defined for each api reducer:
  - `REQUEST_<EXAMPLE>` gets called as soon as the request start, and will be used to signal the state that the request has started.
  - `RECEIVE_<EXAMPLE>` is called when the api request finishes. It will be called with an error if anything went wrong with the api.
  - `INVALIDATE_<EXAMPLE>` action is used to reset the state to its original state.

With each of these actions comes an action creator:
```js
  function invalidateExample () {
    return { type: INVALIDATE_EXAMPLE };
  }

  function requestExample () {
    return { type: REQUEST_EXAMPLE };
  }

  function receiveExample (data, error = null) {
    return {
      type: RECEIVE_EXAMPLE,
      data,
      error,
      receivedAt: Date.now()
    };
  }
```

To avoid always creating those functions we have a helper function `makeActions` which takes the action name as a parameter and whether we want "key actions" or not. The concept of "key actions" is expanded on later.

The above would be recreated as:
```js
  const exampleActions = makeActions('EXAMPLE');
  // Actions available as:
  // exampleActions.invalidate()
  // exampleActions.request()
  // exampleActions.receive()
```
After having the actions ready you need a reducer to intercept the actions.  
If you were to create one from scratch for our example, it would look something like:

```js
  const initialState = {
    fetching: false,
    fetched: false,
    error: null,
    data: {}
  };

  function (state = initialState, action) {
    switch (action.type) {
      case 'INVALIDATE_EXAMPLE':
        return initialState;
      case 'REQUEST_EXAMPLE': {
        return {
          fetching: true,
          fetched: false,
          error: null,
          data: {}
        };
      }
      case 'RECEIVE_EXAMPLE': {
        return {
          fetching: false,
          fetched: true,
          receivedAt: action.receivedAt,
          data: action.data,
          error: action.error
        };
      }
    }
    return state;
  };
```

Each and every API state will have the following 5 properties:
  - `fetching` Tracks whether a request is in inflight
  - `fetched` Tracks whether a request was completed successfully or not.
  - `error` Tracks whether a request errored.
  - `data` Holds the data send by the request if it was successful.
  - `receivedAt` Timestamp of when the request finished.

To simplify the reducer creation we have a helper function `makeAPIReducer` which takes the action name as a parameter and whether we want "key actions" or not.

The above would be recreated as:

```js
  const reducer = makeAPIReducer('EXAMPLE');
```

Once we have the reducer, we can create the thunk that will make the api request.  
The flow of the thunk is something like:
  - Indicate request is started
  - Make the request
  - Dispatch result.

Following our example, a thunk made from scratch would be:

```js
  function fetchExample () {
    return async function (dispatch) {
      dispatch(exampleActions.request());
      try {
        const response = await fetch('http://example.com');
        const result = await response.json();
        return dispatch(exampleActions.receive(result));
      } catch (error) {
        return dispatch(exampleActions.receive(null, error));
      }
    };
  }
```

**NOTE:** This thunk assumes that the api response is in JSON format (note the `await response.json()`). Any non JSON data will cause this to fail and trigger the error response. The helper function `makeFetchThunk`, operates under the same assumption and it is to be used with a JSON api.

The above is achieved with:
```js
  function fetchExample () {
    return makeFetchThunk({
      url: 'http://example.com',
      requestFn: exampleActions.request,
      receiveFn: exampleActions.receive
    });
  }
```

However the `makeFetchThunk` helper provides many more functionalities.  

You want to use a different method (POST for instance) with a body?  
You can just provide an `options` object, and it will be used by the `fetch` function.
```js
  function fetchExample () {
    return makeFetchThunk({
      url: 'http://example.com',
      options: {
        headers: {
          'Authorization': 'Bearer the-bearer-token'
        },
        method: 'POST',
        body: JSON.stringify(query)
      },
      requestFn: exampleActions.request,
      receiveFn: exampleActions.receive
    });
  }
```

Feeling power user?  
If the response from the api does not suit your needs immediately you can also change the response before it is dispatched.
```js
  function fetchExample () {
    return makeFetchThunk({
      url: 'http://example.com',
      mutator: (body, headers) => {
        // In this case we're discarding the body completely and just returning
        // the headers. Unlikely use case, but hey, whatever float your goat.
        return headers;
      },
      requestFn: exampleActions.request,
      receiveFn: exampleActions.receive
    });
  }
```

This `makeFetchThunk` helper function also allows you to check if the data was already fetched so that following requests do not hit the network.  
This cache-like mechanism works by checking a given path of the store for data. If the data is present, the thunk returns it immediately.  
To enable this you need to set `cache: true` and provide the path to the app state where the data you're requesting would be stored.  

Imagine the following store state:
```js
{
  general: {},
  posts: {}
  config: {
    global: {}
  }
}
```

The path to the global config would be `['config', 'global']` and the thunk would be setup like:
```js
  function fetchGlobalConfig () {
    return makeFetchThunk({
      url: 'http://example.com',
      cache: true,
      // The statePath is where in the store the thunk will check for data.
      // If data is available it is returned otherwise is fetched.
      statePath: ['config', 'global'],
      requestFn: globalConfig.request,
      receiveFn: globalConfig.receive
    });
  }
```

Note the thunk will not store the data on the state path. That's the reducer job, and you'll have to setup your state slices accordingly.  
To know more about state slices check redux's [Splitting Up Reducer Logic](https://redux.js.org/recipes/structuring-reducers/splitting-reducer-logic) and [Using combineReducers](https://redux.js.org/recipes/structuring-reducers/using-combinereducers)

For example:

@/redux/config.js
```js
  const globalConfigActions = makeActions('GLOBAL_CONFIG');

  export function fetchGlobalConfig () {
    return makeFetchThunk({
      url: 'http://example.com',
      cache: true,
      statePath: ['config', 'global'],
      requestFn: globalConfigActions.request,
      receiveFn: globalConfigActions.receive
    });
  }

  export default combineReducers({
    global: makeAPIReducer('GLOBAL_CONFIG')
  });
```

@/redux/store.js
```js
  import configReducer from './config.js';

  export default combineReducers({
    config: configReducer
  });
```

### Key Actions
Key actions provide a way of fetching and storing different entries for the same data type.

Imagine we have a blog and we want to fetch individual blog posts.  
The most common approach is to have a reducer and handle a single post at a time.
```
{
  post: // The post content
}
```
Every time we fetch a new post the previous one is gone. If the user goes back to it, a new request has to be made.  
A better way of storing this would be to index the posts by their `id`. Something like:
```
{
  posts: {
    id1: // The post 1
    id2: // The post 2
  }
}
```

This is what "key actions" do. They store whatever piece of data they receive under a key. (in this case the id).  
When creating the actions and the reducer they have to be made aware that a key is coming.
```js
  // The true flag indicates that these will be key actions.
  const postActions = makeActions('POST', true);

  // The true flag tells the reducer to expect key actions.
  const reducer = makeAPIReducer('POST', true)

  export function fetchPost (key) {
    return makeFetchThunk({
      url: 'http://example.com',
      // The true power of key action comes when you cache the data.
      // In the blog post example, caching the data means that if the user goes
      // back to the same post the data is already available.
      cache: true,
      // Now instead of having a fixed state path, it will depend on the key
      // we decide to use.
      statePath: ['posts', key],
      // Once actions are defined as key actions, they will accept the key as
      // the first parameter, so we have to bind it to them before passing them
      // to our thunk.
      requestFn: postActions.request.bind(null, key),
      receiveFn: postActions.receive.bind(null, key)
    });
  }
```

### Using the api response
All these examples help us understand how the reducers are setup and how the api data is stored in each state slice, but not how to use it.  
We also have some helpers to work with the data produced by our `makeApiReducer` which, in its initial state, is:
```js
  {
    fetched: false,
    fetching: false,
    receivedAt: 0,
    data: {},
    error: null
  }
```

When getting this data from the state (in redux's connect function) we wrap it with `wrapApiResult`.
```js
function mapStateToProps (state) {
  return {
    globalConfig: wrapApiResult(state.config.global),
  };
}

export default connect(mapStateToProps, {})(Component);
```

This will gives us some helper functions like (See next section for all methods):
- isReady()
- hasError()
- getData()


For example, to check whether the request has finished you can use:
```js
  globalConfig.isReady();
```
instead of doing
```js
  globalConfig.fetched && !globalConfig.fetching
```

A more complete example:
```js
const AppTitleComponent = ({ globalConfig }) => {
  const { isReady, hasError, getData } = globalConfig;
  if (isReady()) {
    return 'Loading';
  }
  if (hasError()) {
    return 'Ups';
  }

  return <h1>{getData().title}</h1>;
};
```

#### Functions of wrapApiResult

**raw()**  
Returns the whole data.
```js
  {
    fetched: false,
    fetching: false,
    receivedAt: 0,
    data: {},
    error: null
  }
```

**isReady()**  
Return whether or not the fetching finished and was fetched.

**hasError()**  
Return whether the request finished with an error.

**getData()**  
Returns the value of the `data` key.

**getMeta()**  
If there's a meta object in the response it will be returned.  
It is common practice in certain APIs we develop (paginated responses would be an example) to have a meta object with information about the data.
```js
{
  meta: {
    total: 100,
    offset: 10,
    limit: 10
  },
  results: [
    { id: 1, title: 'The egg' },
    { id: 2, title: 'The Martian' }
    // more entries
  ]
}
```
The `getMeta()` function allows us to access the `meta` key directly, the same way that `getData()` will return the values of the `results` key if it exists.
With the API response above, calling `getMeta()` would return:
```js
{
  total: 100,
  offset: 10,
  limit: 10
}
```
and `getData()`:
```js
[
  { id: 1, title: 'The egg' },
  { id: 2, title: 'The Martian' }
  // more entries
]
```

**To summarize:** `getMeta()` and `getData()` have special behaviors when the API response is structured in a specific way.

## Recipes

#### Simple reducer:
```js
  const exampleActions = makeActions('EXAMPLE');

  export function fetchExample () {
    return makeFetchThunk({
      url: 'http://example.com',
      requestFn: exampleActions.request,
      receiveFn: exampleActions.receive
    });
  }

  export default makeAPIReducer('EXAMPLE');
```

#### List and Single cached
```js
  const listActions = makeActions('LIST');

  export function fetchList () {
    return makeFetchThunk({
      url: 'http://example.com',
      cache: true,
      statePath: ['slice', 'list'],
      requestFn: listActions.request,
      receiveFn: listActions.receive
    });
  }

  const singleActions = makeActions('SINGLE', true);

  export function fetchSingle (key) {
    return makeFetchThunk({
      url: 'http://example.com',
      cache: true,
      statePath: ['slice', 'single', key],
      requestFn: singleActions.request.bind(null, key),
      receiveFn: singleActions.receive.bind(null, key)
    });
  }

  export default combineReducers({
    list: makeAPIReducer('LIST'),
    single: makeAPIReducer('SINGLE', true)
  });
```
