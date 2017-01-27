// @flow

import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';
import {asyncConnect as connect} from 'redux-connect';
import {getAppMetadata} from 'appMetadata';
import {getDefaultMuiTheme} from 'theme/materialTheme';
import {Header, Footer, LinearProgress, MuiThemeProvider, getMuiTheme} from 'universal/common/components';

const asyncActions = [{
  promise: () => Promise.resolve(),
}];
const propTypes = {
  children: PropTypes.object.isRequired,
  reduxAsyncConnect: PropTypes.object.isRequired,
};
const contextTypes = {
  intl: PropTypes.object.isRequired,
};
const mapStateToProps = ({reduxAsyncConnect}: any) => ({reduxAsyncConnect});
const mapDispatchToProps = {};

const AppContainer = (props: any, context: any) => {
  const css = require('./AppContainer.scss');
  const {children, reduxAsyncConnect} = props;
  const {locale, messages} = context.intl;
  const isRouterLoadingActions = false && reduxAsyncConnect && !reduxAsyncConnect.loaded;
  const muiTheme = getMuiTheme(getDefaultMuiTheme());
  const appMetadata = getAppMetadata(locale, messages);

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <Helmet {...appMetadata} />

        <LinearProgress
          style={{
            visibility: isRouterLoadingActions ? 'visible' : 'hidden',
            position: 'absolute',
            top: '0',
            zIndex: '99999',
          }}
          mode="indeterminate"
        />

        <Header />

        <div className={css.MainChildrenContainer}>
          {children}
        </div>

        <Footer />
      </div>
    </MuiThemeProvider>
  );
};
AppContainer.propTypes = propTypes;
AppContainer.contextTypes = contextTypes;

export default connect(asyncActions, mapStateToProps, mapDispatchToProps)(AppContainer);
