import { useState, useEffect } from 'react';
import { Button, StyleSheet, View } from "react-native";
import axios from 'axios';

interface IHomeScreenParams {
  navigation: any;
}

interface IPersona {
  name: string;
  base: string;
  ai: string[];
}

export function HomeScreen({ navigation }: IHomeScreenParams) {

  const [personas, setPersonas] = useState<IPersona[]>([]);

  const loadPersonas = async () => {
    try {
      const response  = await axios.get("https://chat-french.herokuapp.com/personas")
      setPersonas(response.data.data);
    } catch (ex) {
      console.error(ex);
    }
  }

  useEffect(() => {
    loadPersonas();
  },[]);

  const onPress = (persona: string) => {
    navigation.navigate("Chat", {
      persona,
    });
  };

  return (
    <View style={styles.homeView}>
      {personas.map((p,i) => {
        return <Button key={i} title={p.name} onPress={() => onPress(p.name)}></Button>
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
