import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { TabType } from "../../routes/tab";

const SettingsScreen = () => {
  const tabNavigation = useNavigation<TabType>();

  return (
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
