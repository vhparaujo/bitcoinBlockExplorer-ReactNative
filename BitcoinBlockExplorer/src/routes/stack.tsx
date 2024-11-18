import {
    createNativeStackNavigator,
    NativeStackNavigationProp,
  } from "@react-navigation/native-stack";
  import Home from "../screens/Home";
  import { NavigationContainer } from "@react-navigation/native";
  
  const Stack = createNativeStackNavigator();
  
  type StackNavigation = {
    Home: undefined;
  };
  
  export type StackTypes = NativeStackNavigationProp<StackNavigation>;
  
  export default function StackComponent() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  