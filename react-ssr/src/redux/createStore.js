import createSagaMiddleware from "redux-saga";
import { applyMiddleware, compose, createStore } from "redux";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootSaga from "./rootSaga"
import films from "./films/reducer";

const reducers = combineReducers({
films
});

export default function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware();

  // Combine all middlewares into single enhancer
  const middlewares = [sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  // Compose all enhancer into single function
  const enhancers = [middlewareEnhancer];
  const composeFunction = process.env.NODE_ENV !== "production" ? composeWithDevTools : compose;
  const composedEnhancers = composeFunction(...enhancers);

  // Create store with preloaded state and enhancers
  const store = createStore(reducers, preloadedState, composedEnhancers);

  // Run all sagas
  sagaMiddleware.run(rootSaga);

  return store;
}
