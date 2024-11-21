import {
  Button,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useCallback, useState, useEffect } from "react";
import { useFetchData } from "../../../hooks/hooks";
import LoadingView from "../../components/Loading";
import {
  getTransactionsBlockData,
  Transactions,
} from "../../../services/TransactionsBlockRequest";
import { RouteTypes } from "../../routes/stack";

const EachBlock = () => {

  const route = useRoute<RouteTypes>();

  if (route.name !== "EachBlock") {
    return null;
  }
  
  const { hashBlock } = route.params;

  const { data, loading, error, refetch } = useFetchData<Transactions, string>(
    getTransactionsBlockData,
    false
  );

  useEffect(() => {
    if (hashBlock) {
      refetch(hashBlock);
    }
  }, [hashBlock]);

  if (loading) {
    return <LoadingView />;
  }

  if (error) {
    console.error(error);
    return <Text style={{ color: "red" }}>Error fetching data</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {data.map((transactionsBlock) => (
          <View>
            <Text>Size: {transactionsBlock.txid}</Text>
            <Text>fee: {transactionsBlock.fee}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default EachBlock;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
