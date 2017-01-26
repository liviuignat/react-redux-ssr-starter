// @flow

import React, {Component, PropTypes} from 'react';
import {ReduxAsyncConnect} from 'redux-connect';
import {Router} from 'react-router';
import {getRoutes} from 'routes';
import {IntlProvider} from 'er-common-components/lib/translations';
import {Provider} from 'react-redux';

export default class ClientApp extends Component {
  static propTypes = {
    client: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
  };

  render() {
    const {
      client,
      history,
      store,
      language,
      messages,
    } = this.props;

    let component = (
      <Router
        render={props => <ReduxAsyncConnect {...props} helpers={{client}} filter={item => !item.deferred} />}
        history={history}
      >
        {getRoutes()}
      </Router>
    );

    if (__DEVTOOLS__) {
      const DevTools: Object = require('universal/common/components/DevTools/DevTools');
      component = (
        <div>
          {component}
          <DevTools />
        </div>
      );
    }

    return (
      <Provider store={store} key="provider">
        <IntlProvider locale={language} messages={messages}>
          {component}
        </IntlProvider>
      </Provider>
    );
  }
}
