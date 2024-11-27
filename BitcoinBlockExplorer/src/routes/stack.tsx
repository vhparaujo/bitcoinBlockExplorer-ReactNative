import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import Home from "../screens/Home";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import EachBlock from "../screens/EachBlock";
import EachTransaction from "../screens/EachTransaction";
import Colors from "../components/Colors";

const Stack = createNativeStackNavigator();

type StackNavigation = {
  Home: undefined;
  EachBlock: {
    hashBlock: string;
    height: number;
    date: number;
    size: number;
    medianFee: number;
    miner: string;
    numberTransactions: number;
  };
  EachTransaction: { txId: string };
};

export type RouteTypes =
  | RouteProp<StackNavigation, "EachBlock">
  | RouteProp<StackNavigation, "EachTransaction">;

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

export default function StackComponent() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: Colors.background,
            },
          }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: Colors.background,
            },
             headerTitleStyle: {
              fontSize: 20,
              color: Colors.cinza,
             },
          }}
          name="EachBlock"
          component={EachBlock}
        />
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: Colors.background,
            },
            headerTitleStyle: {
              fontSize: 20,
              color: Colors.cinza,
             },
          }}
          name="EachTransaction"
          component={EachTransaction}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
