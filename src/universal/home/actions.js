// @flow

import * as actionTypes from './actionTypes';

export function changeMessageAction(message: string) {
  return {
    types: [actionTypes.CHANGE_MESSAGE, actionTypes.CHANGE_MESSAGE_SUCCESS, actionTypes.CHANGE_MESSAGE_FAIL],
    promise: () => new Promise((resolve) => {
      setTimeout(() => resolve(message + Date.now()), 2000);
    }),
  };
}
