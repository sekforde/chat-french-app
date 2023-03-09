import {useState} from 'react';
import { StyleSheet, Text, TouchableHighlight, View, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { IMessage } from '../index.d';
import {useSpeech} from '../hooks/useSpeech';
import {Api} from '../hooks/Api'

const api = new Api();

interface IMessageProps {
  message: IMessage;
}

interface IExtraPanelProps {
  display: boolean;
  role: string;
  translation: string;
}
interface ILocalMessageProps {
  message: any;
}

interface IRemoteMessageProps {
  message: any;
}

function LocalMessage({message}: ILocalMessageProps) {
  const style = [styles.message, styles.localMessage]
  const [showPanel, setShowPanel] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const onPress = async () => {
    // play sound and show translation
    setShowPanel(!showPanel);
    if (analysis === '') {
      setShowSpinner(true);
      const analysis = await api.getAnalysis(message.content);
      setAnalysis(analysis.content);
      setShowSpinner(false);
    }
  };
  return (
    <TouchableHighlight style={style} onPress={onPress} activeOpacity={0.6} underlayColor="#DDDDDD">
      <View>
        <Text style={styles.whiteText}>{message.content}</Text>
        {showPanel && <View style={[styles.extraInfoPanel]} >
          {showSpinner && <ActivityIndicator size="large" />}
          <Text style={[styles.extraInfoPanelText, styles.whiteText]}>{analysis}</Text>
        </View>}
      </View>
    </TouchableHighlight>
  )
}

function RemoteMessage({message}: IRemoteMessageProps) {
  const { speak } = useSpeech();
  const [showPanel, setShowPanel] = useState(false);
  const [translation, setTranslation] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const style = [styles.message, styles.remoteMessage];

  const onPress = async () => {
    // play sound and show translation
    setShowPanel(!showPanel);
    if (translation === '') {
      setShowSpinner(true);
      console.log('fetching translation');
      const answer = await api.getTranslation(message.content);
      console.log(answer.content);
      setTranslation(answer.content);
      setShowSpinner(false);
    }
  };

  const onPlayPress = async () => {
    speak(message.content);
  }

  return (
    <TouchableHighlight style={style} onLongPress={onPlayPress} onPress={onPress} activeOpacity={0.6} underlayColor="#DDDDDD">
      <View>
        <Text style={styles.blackText}>{message.content}</Text>
        {showPanel && <View style={[styles.extraInfoPanel]} >
          {showSpinner && <ActivityIndicator size="large" />}
          <Text style={[styles.extraInfoPanelText, styles.blackText]}>{translation}</Text>
          {/* <TouchableHighlight onPress={onPlayPress} activeOpacity={0.6} underlayColor="#DDDDDD">
            <Icon name='play-circle' size={50} color="black" style={{marginTop:10}}></Icon>
          </TouchableHighlight> */}
        </View>}
      </View>
    </TouchableHighlight>
  );
}

export function Message({ message }: IMessageProps) {
  const isLocal = message.role.toLowerCase() === "user";
  if (isLocal) {
    return <LocalMessage message={message}></LocalMessage>
  }
  return <RemoteMessage message={message}></RemoteMessage>
}

const styles = StyleSheet.create({
  message: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding:15,
  },
  localMessage: {
    backgroundColor: '#6D5AE4',
    margin:5,
    marginLeft:"10%",
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
  remoteMessage: {
    backgroundColor: '#e5e5e7',
    margin:5,
    marginRight:"10%",
    color:"black"
  },
  extraInfoPanel: {
    paddingTop: 10,
    borderWidth:0 ,
    borderColor: "blue",
    marginTop:10
  },
  extraInfoPanelText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: 'black'
  }
});
