import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends MyTheme {
    colors: {
      white: string;
      primary: string;
      secondary: string;
      title: string;
      text: string;
      shadow: string;
    };
  }
}
