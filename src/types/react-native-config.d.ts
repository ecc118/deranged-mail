declare module 'react-native-config' {
  export interface NativeConfig {
    SERVER_KEY?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
