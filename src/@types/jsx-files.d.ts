declare module '*.jsx' {
  import { JSX } from 'solid-js';
  const Component: () => JSX.Element;
  export default Component;
}

declare module '*.js' {
  const content: any;
  export default content;
} 