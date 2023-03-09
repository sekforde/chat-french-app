import { useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';

const key = '';


export const record = async () => {

}

const useWhisper = async () => {
  const formData: FormData = new FormData();
  formData.append("model", "whisper-1");
  // FileSystem.
  formData.append("file", FileSystem.createReadStream(filePath));
  // const response = await axios.post("https://api.openai.com/v1/audio/transcriptions", formData. {
  //   headers: {
  //     Authorization: `Bearer ${key}`,
  //     "Content-Type": `multipart/form-data; boundary=${formData._boundary}`
  //   }
  // });
}
