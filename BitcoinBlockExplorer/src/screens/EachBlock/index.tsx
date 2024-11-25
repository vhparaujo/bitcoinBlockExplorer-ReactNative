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
import { randomNumber } from "../../components/Generals";

const EachBlock = () => {
  const route = useRoute<RouteTypes>();

  if (route.name !== "EachBlock") {
    return null;
  }

  const {
    hashBlock,
    height,
    date,
    size,
    medianFee,
    miner,
    numberTransactions,
  } = route.params;

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
        <Text>Block: {height}</Text>
        <Text>Hash: {hashBlock}</Text>
        <Text>Date: {date}</Text>
        <Text>Size: {size}</Text>
        <Text>Median Fee: {medianFee}</Text>
        <Text>Miner: {miner}</Text>

        <Text>{numberTransactions} transactions</Text>

        {data.map((transactionsBlock) => (
          <View key={randomNumber()}>
            <Text numberOfLines={1} style={{ width: 300 }}>
              {transactionsBlock.txid}
            </Text>
            <Text>Date: {transactionsBlock.status.block_time}</Text>

            {/* transacoes de entrada, lado esquerdo antes da seta no app oficial */}
            {transactionsBlock.vin.map((vin) => (
              <View key={randomNumber()}>
                <Text style={{ color: "blue" }}>
                  {vin.prevout?.scriptpubkey_address}
                </Text>
                <Text style={{ color: "red" }}>
                  {(vin.prevout?.value ?? 0) / 100000000}
                </Text>
              </View>
            ))}

            {/* transacoes de saida, lado direito depois da seta no app oficial */}
            {transactionsBlock.vout.map((vout) => (
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

export default EachBlock;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
