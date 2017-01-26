// @flow

import * as actionTypes from './actionTypes';

const initialState = {
  message: 'Initial data!',
  isChangingMessage: false,
};

export function reducer(state: any = initialState, action: any = {}) {
  switch (action.type) {
    case actionTypes.CHANGE_MESSAGE:
      return {
        ...state,
        isChangingMessage: true,
      };
    case actionTypes.CHANGE_MESSAGE_SUCCESS:
      return {
        ...state,
        message: action.result,
        isChangingMessage: false,
      };

    default:
      return state;
  }
}
