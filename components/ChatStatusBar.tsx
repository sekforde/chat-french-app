import { StyleSheet, ScrollView, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface IChatStatusBarProps {
  name: string;
}

export function ChatStatusBar({ name }: IChatStatusBarProps) {
  return (
      <View style={styles.statusBar}>
        <Icon name="chevron-left" size={25} color="black" style={{marginLeft:10,flex:1}}/>
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
