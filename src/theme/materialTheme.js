// @flow

import * as Colors from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

export function getDefaultMuiTheme(userAgent: string = '') {
  return {
    spacing,
    fontFamily: 'Roboto, sans-serif',
    userAgent,
    palette: {
      primary1Color: Colors.blue800,
      primary2Color: Colors.blue600,
      primary3Color: Colors.grey400,
      accent1Color: Colors.pinkA200,
      accent2Color: Colors.grey100,
      accent3Color: Colors.grey500,
      textColor: Colors.darkBlack,
      alternateTextColor: Colors.white,
      canvasColor: Colors.white,
      borderColor: Colors.grey300,
      disabledColor: fade(Colors.darkBlack, 0.3),
      pickerHeaderColor: Colors.blue800,
      clockCircleColor: fade(Colors.darkBlack, 0.07),
      shadowColor: Colors.fullBlack,
    },
  };
}
