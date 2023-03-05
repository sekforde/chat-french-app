import { StyleSheet, Text, TextInput, View } from 'react-native';
import { IMessage } from '../index.d';

interface IMessageProps {
  message: IMessage;
}

export function Message({ message }: IMessageProps) {
  
  const panelStyle = (message.user.toLowerCase() === "ai") ? styles.remoteMessage : styles.localMessage;
  const textStyle = (message.user.toLowerCase() === "ai") ? styles.whiteText : styles.blackText;
  
  return (
    <View style={[styles.message, panelStyle]}>
      <Text style={textStyle}>{message.text}</Text>
    </View>
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
