import { useState } from 'react';
import { TouchableHighlight, StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { _messages } from '../data/messages';

interface ITextInputPanelProps {
  sendMessage: (message: any) => void;
}

export function TextInputPanel({ sendMessage }: ITextInputPanelProps) {
  const [messageText, setMessageText] = useState<string>("");
  const onPress = () => {
    sendMessage(messageText.trim());
    setMessageText("");
  };

  return (
    <View style={styles.textPanel}>
      <View style={styles.inputPanel}>
        <TextInput style={styles.textPanelInput} multiline onChangeText={setMessageText} value={messageText}></TextInput>
      </View>
      <View style={styles.buttonPanel}>
        <TouchableHighlight style={styles.sendButton} onPress={onPress}>
          <Icon name="send" size={25} color="white" style={{borderWidth:0, borderColor:"black"}}/>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textPanel: {
    backgroundColor: '#e5e5e7',
    width: "100%",
    height: 100,
    padding:10,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#aaaaaa",
    flexDirection: "row",
  },
  inputPanel: {
    marginRight: 10,
    flex: 6,
  },
  buttonPanel: {
    flex: 1,
  },
  textPanelInput: {
    backgroundColor: 'white',
    borderWidth:1,
    borderColor:"#aaaaaa",
    width: "100%",
    height: "100%",
    padding: 5,
    fontSize: 18,
    flex: 1,
  },
  sendButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#6D5AE4',
    borderRadius: 10,
    flex: 1,
    width: "100%",
  }
});
