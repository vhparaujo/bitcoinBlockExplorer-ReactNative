import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import Home from "../screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import SettingsScreen from "../screens/Settings";
import EachBlock from "../screens/EachBlock";

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
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
