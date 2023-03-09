export interface IMessage {
  date: Date;
  sequence: number;
  role: string;
  content: string;
}

declare module '@env' {
  export const GOOGLE_API_KEY: string;
  export const BASE_URL: string;
}