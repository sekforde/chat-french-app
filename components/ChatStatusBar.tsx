import { StyleSheet, ScrollView, TouchableOpacity, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSpeech} from '../hooks/useSpeech';
interface IChatStatusBarProps {
  name: string;
}

export function ChatStatusBar({ name }: IChatStatusBarProps) {

  const {speak} = useSpeech();

  const onPress = () => {
    speak('Bonjour Monsieur');
  };

  return (
      <View style={styles.statusBar}>
        <TouchableOpacity onPress={onPress} style={{marginLeft:10,flex:1}}>
          <Icon name="chevron-left" size={25} color="black"/>
        </TouchableOpacity>
        <Text style={styles.statusText}>{name}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    flexDirection: "row",
    backgroundColor: '#eeeeee',
    marginTop:50,
    padding:5,
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#aaaaaa",
  },
  statusText: {
    flex:5,
    textAlign: "center",
    fontSize: 25,
  }
});
