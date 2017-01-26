// @flow

import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';

export default class ServerHtml extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    assets: PropTypes.object.isRequired,
    component: PropTypes.node.isRequired,
    store: PropTypes.object.isRequired,
  };

  render() {
    const {assets, component, store, language} = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();
    const data = `window.__data=${serialize(store.getState())};`;
    const init = `${data}`;
    const css = require('universal/common/components/AppContainer/AppContainer.scss');

    return (
      <html lang={language}>
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <link rel="shortcut icon" href="/favicon.png" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Helvetica+Neue:400,300,300italic,400italic,700,700italic,500,500italic" rel="stylesheet" type="text/css" />
          <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css" rel="stylesheet" type="text/css" />

          {Object.keys(assets.styles).map((style, key) =>
            <link
              charSet="UTF-8"
              href={assets.styles[style]}
              key={key}
              media="screen, projection"
              rel="stylesheet"
              type="text/css"
            />,
          )}
          { Object.keys(assets.styles).length === 0 ? <style dangerouslySetInnerHTML={{__html: css._style}} /> : null }

          <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.fr,Intl.~locale.de" />
          <script src="https://cdn.ravenjs.com/3.8.1/raven.min.js" crossOrigin="anonymous" />
        </head>
        <body>
          <div className={css.MainContentWrapper} id="content" dangerouslySetInnerHTML={{__html: content}} />

          <script src={`/assets/translations/locale/${language}/index.js?t=${Date.now()}`} charSet="UTF-8" />
          <script dangerouslySetInnerHTML={{__html: init}} charSet="UTF-8" />
          <script src={assets.javascript.main} charSet="UTF-8" />
        </body>
      </html>
    );
  }
}
