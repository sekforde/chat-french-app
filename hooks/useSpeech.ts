import '../index.d';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import { randomString } from './randomString';
import { GOOGLE_API_KEY } from "@env"

export const useSpeech = () => {

  const createBody = (text: string) => ({
    input: {
      text
    },
    voice: {
      languageCode: 'fr-FR',
      name: 'fr-FR-Neural2-D',
    },
    audioConfig: {
      audioEncoding: 'MP3',
      speakingRate: 0.8
    }
  });

  const speak = async (text: string) => {
    const key = GOOGLE_API_KEY;
    const sound = new Audio.Sound();
    const address: string = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${key}`
    const body: any = createBody(text)
    console.log(`I am going to speak ${text}`);

    try {
      const response = await axios.post(address, body);
      const uri = `${FileSystem.documentDirectory}${randomString(8)}.mp3`;
      await FileSystem.writeAsStringAsync(uri, response.data.audioContent, { encoding: FileSystem.EncodingType.Base64 });
      await sound.loadAsync({ uri })
      await sound.playAsync();
      console.log('I am done speaking');
      await FileSystem.deleteAsync(uri, { idempotent: true });
      console.log('I am done deleting the file');

    } catch (err) {
      console.warn(err)
    }
  }

  return {
    speak
  };
};
