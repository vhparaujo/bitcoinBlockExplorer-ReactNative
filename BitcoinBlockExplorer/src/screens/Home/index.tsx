import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabType } from "../../routes/tab";
import { useFetchData } from "../../../hooks/hooks";
import { Fee, getFeeData } from "../../../services/feeData";
import LoadingView from "../../components/Loading";

const HomeScreen = () => {
  const tabNavigation = useNavigation<TabType>();

  const { data, loading, error } = useFetchData<Fee>(getFeeData);

  if (loading) {
    return <LoadingView />;
  }

  if (error) return <View>Error: {error}</View>;

  return (
    <View style={styles.container}>
      {data.map((fee) => (
        <View>
          <Text>Low Priority: {fee.hourFee}</Text>
          <Text>Medium Priority: {fee.halfHourFee}</Text>
          <Text>High Priority: {fee.fastestFee}</Text>
        </View>
      ))}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
