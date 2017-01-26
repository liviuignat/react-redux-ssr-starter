// @flow

import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-connect';
import {reducer as form} from 'redux-form';
import {reducer as home} from 'universal/home/reducer';

export default combineReducers({
  routing,
  form,
  reduxAsyncConnect,
  home,
});
