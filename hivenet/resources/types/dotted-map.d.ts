declare module 'dotted-map' {
  export default class DottedMap {
    constructor(options?: any);
    addPin(options: any): void;
    getSVG(options?: any): string;
  }
}
