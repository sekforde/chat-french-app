import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { _messages } from './data/messages';
import { HomeScreen } from "./pages/Home";
import { ChatScreen } from "./pages/Chat";

const Stack = createStackNavigator();

export default function App() {
  console.log("------------------------------------");
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="Chat" component={ChatScreen}
          options={({ route }) => ({ title: route?.params?.persona || "Chat"})}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
