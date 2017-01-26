// @flow

import Express from 'express';
import path from 'path';
import serveFavicon from 'serve-favicon';
import serveStatic from 'serve-static';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import React from 'react';
import ReactDOM from 'react-dom/server';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {ReduxAsyncConnect, loadOnServer} from 'redux-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import {match} from 'react-router';
import {Provider} from 'react-redux';
import {IntlProvider, initLocaleData} from 'er-common-components/lib/translations';
import {languageMiddleware, aliveMiddleware} from 'er-common-components/lib/middleware';
import * as logger from 'er-common-components/lib/helpers/logger';
import getAllTranslations from 'er-common-components/lib/translations/getAllTranslations';

import {createStore} from 'helpers/createStore';
import {getRoutes} from 'routes';
import ServerHtml from 'universal/ServerHtml';
import ApiClient from 'helpers/ApiClient';
import metadata from '../package.json';

injectTapEventPlugin();
initLocaleData();

export const app = new Express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(serveFavicon(path.join(__dirname, 'static', 'favicon.png')));
app.use(serveStatic(path.join(__dirname, 'static')));
app.use(languageMiddleware({defaultLanguage: 'en-US', allTranslations: getAllTranslations()}));

app.use((req, res, next) => {
  if (req.url.indexOf('/assets/') === 0) {
    return next();
  }

  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh();
  }

  const requestLanguage = req.getLanguage();
  const client = new ApiClient(req);
  const history = createHistory(req.originalUrl);
  const store = createStore({history, client});

  function hydrateOnClient() {
    const componentHtml = ReactDOM.renderToString(<ServerHtml assets={webpackIsomorphicTools.assets()} store={store} language={requestLanguage} />);
    return res.send(`<!doctype html>\n${componentHtml}`);
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return null;
  }

  return match({ history, routes: getRoutes(), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      logger.error('ROUTER ERROR:', error);
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      loadOnServer({...renderProps, store, helpers: {client}}).then(() => {
        req.setLanguage({language: renderProps.params.language});
        const language = req.getLanguage();
        const languageMessages = req.getTranslation({language});

        const component = (
          <Provider store={store} key="provider">
            <IntlProvider locale={language} messages={languageMessages}>
              <ReduxAsyncConnect {...renderProps} />
            </IntlProvider>
          </Provider>
        );
        const html = (
          <ServerHtml
            assets={webpackIsomorphicTools.assets()}
            component={component}
            store={store}
            language={language}
          />
        );
        const componentHtml = ReactDOM.renderToString(html);

        res.status(200);
        res.set('Content-Language', language);
        res.send(`<!doctype html>\n${componentHtml}`);
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});

app.get('/api/alive', aliveMiddleware({metadata}));
app.get('/assets/translations/locale/:language/index.js', (req, res) => {
  const { language } = req.params;
  const messages = req.getTranslation({language});
  const locale = {language, messages};
  const script = `window.__locale = ${JSON.stringify(locale)}`;
  res.send(script);
});
