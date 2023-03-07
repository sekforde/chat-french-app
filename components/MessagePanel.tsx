import { FlatList, StyleSheet, ScrollView, Text, TextInput, View } from 'react-native';
import { Message } from './Message';
import { IMessage } from '../index.d';
import { useEffect, useRef } from 'react';

interface IMessagePanelProps {
  messages: IMessage[];
}

export function MessagePanel({ messages }: IMessagePanelProps) {

  let flatList:any = useRef(null);

  useEffect(() => {
    console.log("MessagePanel useEffect", messages.length);
    if (messages.length > 0 && flatList.current) flatList.current.scrollToEnd({animated: false})
  }, [messages])

  return (
    <FlatList
      ref={flatList}
      style={styles.messagePanel}
      data={messages}
      renderItem={({item}) => <Message message={item}/>}
      keyExtractor={(item, index) => index.toString()}
      extraData={true}
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  messagePanel: {
    backgroundColor: '#fff',
    padding:20,
    flex: 1,    
    width: "100%",
    borderWidth:0,
    borderColor:"blue"
  },
  panelPadding: {
    height: 50,
  }
});
