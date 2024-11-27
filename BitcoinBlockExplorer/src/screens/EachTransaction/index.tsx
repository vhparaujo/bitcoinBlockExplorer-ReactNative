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
import { randomNumber } from "../../components/Generals";

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
    return <Text style={{fontSize: 20}}>Nenhuma transação encontrada</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {data.map((transaction) => (
          <View key={transaction.txid}>
            <Text>Transaction: {transaction.txid}</Text>
            <Text>Date: {transaction.status.block_time}</Text>
            <Text>Size: {transaction.size}</Text>
            <Text>Fee: {transaction.fee}</Text>

            {/* entradas, lado esquerdo antes da seta no app oficial */}
            {transaction.vin.map((vin) => (
              <View key={randomNumber()}>
                <Text style={{ color: "blue" }}>
                  {vin.prevout?.scriptpubkey_address}
                </Text>
                <Text style={{ color: "red" }}>
                  {(vin.prevout?.value ?? 0) / 100000000}
                </Text>
              </View>
            ))}

            {/* saidas, lado direito depois da seta no app oficial */}
            {transaction.vout.map((vout) => (
              <View key={randomNumber()}>
                <Text style={{ color: "green" }}>
                  {vout.scriptpubkey_address}
                </Text>
                <Text style={{ color: "orange" }}>
                  {(vout.value ?? 0) / 100000000}
                </Text>
              </View>
            ))}
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
