import React from 'react';
import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import AppContainer from './container/index';
import appReducer from './reducer/index';

const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);
const addListener = createReduxBoundAddListener('root');

const store = createStore(
  appReducer,
  applyMiddleware(navMiddleware),
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store} >
        <AppContainer
          addListener={addListener}
        />
      </Provider>
    );
  }
}
