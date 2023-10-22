import {DefaultTheme} from 'styled-components/native';

export const FONT_FAMILY = 'VT323-Regular';

const theme: DefaultTheme = {
  colors: {
    main: '#FFFF00',
    accent: '#9E5E44',
    black: '#29282A',
    gray: '#9AAFA4',
    ebony: '#555D55',
    onyx: '#373942',
    white: '#FFFFFF',
  },
  typography: {
    headingL: {
      fontFamily: FONT_FAMILY,
      fontStyle: 'normal',
      fontSize: 40,
      lineHeight: 40,
    },
    heading: {
      fontFamily: FONT_FAMILY,
      fontStyle: 'normal',
      fontSize: 32,
      lineHeight: 32,
    },
    headingS: {
      fontFamily: FONT_FAMILY,
      fontStyle: 'normal',
      fontSize: 20,
      lineHeight: 20,
    },
    body: {
      fontFamily: FONT_FAMILY,
      fontStyle: 'normal',
      fontSize: 16,
      lineHeight: 16,
    },
  },
};

export type Color = keyof DefaultTheme['colors'];

export type Typography = keyof DefaultTheme['typography'];

export default theme;
