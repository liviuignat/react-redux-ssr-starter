// @flow

import {createStore as _createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import {clientMiddleware} from 'er-common-components/lib/redux/clientMiddleware';
import reducer from 'reducer';

export function createStore({history, client, data}: any) {
  const middleware = [clientMiddleware(client), routerMiddleware(history)];

  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const {persistState} = require('redux-devtools');
    const DevTools = require('universal/common/components/DevTools/DevTools');
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : (DevTools: Object).instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const store = finalCreateStore(reducer, data);

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('reducer', () => {
      store.replaceReducer(require('reducer'));
    });
  }

  return store;
}
