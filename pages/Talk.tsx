import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from "react-native";
import { Audio } from 'expo-av';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { Api } from '../hooks/Api';

const api = new Api();

interface ITalkScreenParams {
  navigation: any;
}

export function TalkScreen({ navigation }: ITalkScreenParams) {

  const [recording, setRecording] = useState<Audio.Recording>();
  const [text, setText]  = useState('');

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,

      });
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    if (!recording) return;
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri: string | null = recording.getURI(); 
    console.log('Recording stopped and stored at', uri);

    if (!uri) return;

    const fileData = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    const response = await api.getTranscription(fileData);

    setText(`${response?.text || ''}\n${text}`);
  }

  return (
    <View style={styles.container}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      <Text>{text}</Text>
    </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});