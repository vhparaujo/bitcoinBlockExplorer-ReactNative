import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import SettingsScreen from "../screens/Settings";

const Tab = createBottomTabNavigator();

type TabNavigation = {
  Home: undefined;
};

export type TabType = BottomTabNavigationProp<TabNavigation>;

export default function TabComponent() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
