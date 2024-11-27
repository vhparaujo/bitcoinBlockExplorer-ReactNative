import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import Home from "../screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import SettingsScreen from "../screens/Settings";
import Stack from "./stack";

const Tab = createBottomTabNavigator();

type TabNavigation = {
  Home: undefined;
  Settings: undefined
};

export type TabType = BottomTabNavigationProp<TabNavigation>;

export default function TabComponent() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
        options={{ headerShown: false }}
        name="Home" component={Stack} />
        <Tab.Screen
         name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
