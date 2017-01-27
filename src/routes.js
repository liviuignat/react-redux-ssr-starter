// @flow

import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {AppContainer} from 'universal/common/components';
import {DashboardPage} from 'universal/home/pages';

export function getRoutes() {
  return (
    <Route path="/" component={AppContainer}>
      <IndexRoute component={DashboardPage} />
    </Route>
  );
}
