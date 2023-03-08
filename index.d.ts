export interface IMessage {
  date: Date;
  sequence: number;
  user: string;
  text: string;
}

declare module '@env' {
  export const GOOGLE_API_KEY: string;
}