import 'styled-components/native';
import {TextStyle} from 'react-native';

export interface Colors {
  main: string;
  accent: string;
  black: string;
  gray: string;
  ebony: string;
  onyx: string;
  white: string;
}

export interface Typography {
  headingL: TextStyle;
  heading: TextStyle;
  headingS: TextStyle;
  body: TextStyle;
}

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: Colors;
    typography: Typography;
  }
}
