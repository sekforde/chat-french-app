import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet,Text, View } from 'react-native';
import { MessagePanel } from '../components/MessagePanel';
import { TextInputPanel } from '../components/TextInputPanel';
import { IMessage } from '..';
import { Api } from '../hooks/Api';

const api = new Api();

interface IChatScreenParams {
  route: any;
  navigation: any;
}

export function ChatScreen({route, navigation }: IChatScreenParams) {
  const { persona } = route.params

  const [messages, setMessages] = useState<IMessage[]>([]);

  const loadMessages = async () => {
    const messages = await api.loadMessages(persona).catch(console.log);;
    if (!messages) return;
    const _messages = messages.filter(m => m.role === 'user' || m.role== 'assistant');
    setMessages([..._messages]);
  }

  const sendMessageToApi = async (userMessage:IMessage) => {
    const response = await api.sendMessage(userMessage.content).catch(console.log);;
    if (!response) return;
    setMessages([...messages,userMessage, response.message]);
  }

  useEffect(() => {
    loadMessages().catch(console.log);
  }, []);

  const sendMessage = (content: string) => {
    const userMessage = {
      date: new Date(),
      sequence: messages.length,
      role: "user",
      content
    };
    console.log('sendMessage', userMessage);
    setMessages([...messages, userMessage]);
    sendMessageToApi(userMessage)
  }

  return (
    <KeyboardAvoidingView style={styles.outer} behavior={'padding'} keyboardVerticalOffset={100}>
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
