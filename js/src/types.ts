export type Scope = `$${string}`;
export type ObjectScope = Scope | object;
export type MimeType = `${string}/${string}`;

export interface Manager {
    name: string;
    versionName: string;
    versionCode: number;
  }
  

export {};

declare global {
  interface Window {
    [key: Scope]: object;
  }
}
