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
import { getTransactions } from "../../../services/EachTransactionRequest";

const EachTransaction = () => {
  const route = useRoute<RouteTypes>();

  if (route.name !== "EachTransaction") {
    return null;
  }

  const { txId } = route.params;

  const { data, loading, error, refetch } = useFetchData<Transactions, string>(
    getTransactions,
    false
  );

  useEffect(() => {
    if (txId) {
      refetch(txId);
    }
  }, [txId]);

  // Executa a busca inicial ao montar o componente
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
        {data.map((transaction) => (
          <View>
            <Text>Size: {transaction.txid}</Text>
            <Text>fee: {transaction.fee}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default EachTransaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
