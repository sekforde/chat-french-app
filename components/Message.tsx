import { StyleSheet, Text, TouchableOpacity, TextInput, View } from 'react-native';
import { IMessage } from '../index.d';
import {useSpeech} from '../hooks/useSpeech';

interface IMessageProps {
  message: IMessage;
}

export function Message({ message }: IMessageProps) {
  
  const { speak } = useSpeech();

  const onPress = () => {
    speak(message.text.replace('-', ' '));
  };

  const panelStyle = (message.user.toLowerCase() === "ai") ? styles.localMessage : styles.remoteMessage;
  const textStyle = (message.user.toLowerCase() === "ai") ? styles.blackText : styles.whiteText;
  
  return (
    <TouchableOpacity style={[styles.message, panelStyle]} onPress={onPress}>
      <Text style={textStyle}>{message.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  message: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding:15,
  },
  remoteMessage: {
    backgroundColor: '#6D5AE4',
    margin:5,
    marginLeft:"20%",
    color:"white"
  },
  whiteText: {
    color:"white",
    fontSize: 18,
  },
  blackText: {
    color:"black",
    fontSize: 18,
  },
  localMessage: {
    backgroundColor: '#e5e5e7',
    margin:5,
    marginRight:"20%",
    color:"black"
  },
});
