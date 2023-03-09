import axios from 'axios';
import { BASE_URL } from "@env"

console.log(BASE_URL);

export class Api {
  baseUrl: string = BASE_URL;

  async send(method: string = 'GET', path: string, data: any = null): Promise<any> {
    try {
      console.log('send', method, `${this.baseUrl}${path}`)
      const config: any = {
        method,
        url: `${this.baseUrl}${path}`
      };
      if (method === 'POST') {
        config.data = data;
      }
      const response = await axios(config);
      return response.data;
    } catch (err) {
      console.error(err);
      return {};
    }
  }

  async get(path: string) {
    return this.send('GET', path);
  }

  async post(path: string, data: any = {}) {
    return this.send('POST', path, data);
  }

  async loadMessages(persona: string): Promise<any[]> {
    const response = await this.post(`/thread/${persona}`)
    return response.thread.messages.filter((m: any) => m.role === 'user' || m.role == 'assistant');
  }

  async getPersonas(): Promise<any> {
    return this.get('/personas');
  }

  async sendMessage(message: string): Promise<any> {
    return this.post('/send', { message })
  }

  async sendSystemMessage(message: string): Promise<any> {
    return this.post('/system', { message })
  }

  async getTranslation(text: string): Promise<any> {
    const message = `please translate this into english "${text}"`
    console.log('message', message);
    const response = await this.sendSystemMessage(message);
    console.log('response', response.message);
    return response.message
  }

  async getAnalysis(text: string): Promise<any> {
    const message = `please check this french sentance for spelling and grammer "${text}"`
    console.log('message', message);
    const response = await this.sendSystemMessage(message);
    console.log('response', response.message);
    return response.message
  }

  async getTranscription(file: string): Promise<any> {
    return this.post("/transcribe", { file })
  }

}
