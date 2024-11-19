import {
  Button,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabType } from "../../routes/tab";
import { useFetchData } from "../../../hooks/hooks";
import { Fee, getFeeData } from "../../../services/FeeRequest";
import LoadingView from "../../components/Loading";
import {
  BlockHeader,
  getBlockHeaderData,
} from "../../../services/BlockHeaderRequest";
import { useCallback, useState } from "react";

const HomeScreen = () => {
  const tabNavigation = useNavigation<TabType>();

  const [refreshing, setRefreshing] = useState(false);

  const {
    data: feeData,
    loading: feeLoading,
    error: feeError,
    refetch: refetchFee,
  } = useFetchData<Fee>(getFeeData);

  const { data, loading, error } =
    useFetchData<BlockHeader>(getBlockHeaderData);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refetchFee()]); // Chame os métodos de atualização
    setRefreshing(false);
  }, [refetchFee]);

  if (loading) {
    return <LoadingView />;
  }

  if (error) return <View>Error: {error}</View>;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        {feeData.map((fee) => (
          <View>
            <Text>Low Priority: {fee.hourFee}</Text>
            <Text>Medium Priority: {fee.halfHourFee}</Text>
            <Text>High Priority: {fee.fastestFee}</Text>
          </View>
        ))}
        {data.map((block) => (
          <View>
            <Text>Height: {block.height}</Text>
            <Text>{Math.floor(block.extras.medianFee)} sat/vB</Text>
          </View>
        ))}
      </View>
    </ScrollView>
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
