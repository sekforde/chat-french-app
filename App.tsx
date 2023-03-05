import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet,Text, View } from 'react-native';
import { ChatStatusBar } from './components/ChatStatusBar';
import { MessagePanel } from './components/MessagePanel';
import { TextInputPanel } from './components/TextInputPanel';
import { IMessage } from '.';
import { _messages } from './data/messages';
import axios from 'axios';

export default function App() {

  const [messages, setMessages] = useState<IMessage[]>([]);

  const loadMessages = async () => {
    const response = await axios.post("https://chat-french.herokuapp.com/thread", {}).catch(console.log);;
    if (!response?.data) return;
    setMessages([...response.data.thread.messages]);
  }

  const sendMessageToApi = async (humanMessage:IMessage) => {
    const response = await axios.post("https://chat-french.herokuapp.com/send", {message:humanMessage.text}).catch(console.log);
    if (!response?.data) return;
    setMessages([...messages,humanMessage, response.data.message]);
  }

  useEffect(() => {
    // initial load of messages
    loadMessages().catch(console.log);
  }, []);

  const sendMessage = (text: string) => {
    const humanMessage = {
      date: new Date(),
      sequence: messages.length,
      user: "Human",
      text
    };
    console.log('sendMessage', humanMessage);
    setMessages([...messages, humanMessage]);
    sendMessageToApi(humanMessage)
  }

  return (
    <KeyboardAvoidingView style={styles.outer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ChatStatusBar name="French Waiter"/>
      <MessagePanel messages={messages}/>
      <TextInputPanel sendMessage={sendMessage}/>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:0,
    borderColor:"red"
  },
});