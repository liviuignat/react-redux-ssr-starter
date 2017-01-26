// @flow
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {createHistory} from 'history';
import {useRouterHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import {initLocaleData} from 'er-common-components/lib/translations';
import {createStore} from 'helpers/createStore';
import ApiClient from 'helpers/ApiClient';
import ClientApp from 'universal/ClientApp';

injectTapEventPlugin();
initLocaleData();

const {language, messages} = window.__locale || {};
const initialStoreDate = window.__data || {};
const client = new ApiClient();
const browserHistory = useRouterHistory(createHistory)({basename: `/${language}`});
const store = createStore({client, history: browserHistory, data: initialStoreDate});
const synchedHistory = syncHistoryWithStore(browserHistory, store);
const history = useScroll(() => synchedHistory)();
const destinationElement = document.getElementById('content');
const props = {client, history, store, language, messages};

ReactDOM.render(<AppContainer><ClientApp {...props} /></AppContainer>, destinationElement);

// Enable react-hot-loader@3.x.x https://thesabbir.com/hot-reloading-react-stateless-components/
if (module.hot) {
  module.hot.accept('universal/ClientApp', () => {
    const ClientAppReloded: any = require('universal/ClientApp');
    ReactDOM.render(<AppContainer><ClientAppReloded {...props} /></AppContainer>, destinationElement);
  });
}

if (__DEVELOPMENT__) {
  window.React = React;
}

if (!__DEVELOPMENT__) {
  window.Raven.config('https://c2d9742150ff40b39662ad213ba97b86@sentry.io/119967').install();
}
