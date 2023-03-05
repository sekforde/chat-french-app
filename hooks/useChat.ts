import { useEffect, useState } from 'react';
import { IMessage } from '..';
import { _messages } from '../data/messages';

export const useChat = () => {

  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setMessages([..._messages]);
  }, []);

  useEffect(() => {
    console.log('useChat messages', messages.length);
    console.log(messages);
  }, [messages]);

  const sendMessage = (message: IMessage) => {
    // if (!messages) return;
    message.sequence = messages.length + 1;
    setMessages([...messages, message]);
  }

  return {
    messages,
    sendMessage
  };
};

