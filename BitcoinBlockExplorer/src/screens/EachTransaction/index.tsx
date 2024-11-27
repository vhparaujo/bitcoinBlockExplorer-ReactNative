import {
  Button,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
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
import { convertDate } from "../../components/Generals";

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
          <View style={{ width: "100%" }} key={transaction.txid}>
            {/* Id da transação */}
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                padding: 15,
                borderRadius: 15,
                backgroundColor: "lightgray",
                marginHorizontal: 12,
                marginTop: 20,
              }}
            >
              <Text>Transaction: </Text>
              <Text numberOfLines={1} style={{ width: "50%" }}>
                {transaction.txid}
              </Text>
            </View>

            {/*  */}
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "column",
                borderRadius: 15,
                backgroundColor: "lightgray",
                marginHorizontal: 12,
                marginTop: 20,
              }}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  padding: 15,
                }}
              >
                <Text>Date/Hora:</Text>
                <Text>{(transaction.status.block_time == null) ? "Aguardando Confirmação": convertDate(transaction.status.block_time)}</Text>
              </View>
              <View style={{ height: "0.2%", backgroundColor: "gray" }}></View>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  padding: 15,
                }}
              >
                <Text>Size:</Text>
                <Text>{transaction.size} B</Text>
              </View>
              <View style={{ height: "0.2%", backgroundColor: "gray" }}></View>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  padding: 15,
                }}
              >
                <Text>Fee:</Text>
                <Text>{transaction.fee / 100000000} BTC</Text>
              </View>
            </View>

            <Text 
              style={{
                marginHorizontal: 12,
                marginTop: 20,
              }}
            >Entradas e saídas</Text>

            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                padding: 15,
                borderRadius: 15,
                backgroundColor: "purple",
                marginHorizontal: 12,
                marginTop: 10,
              }}
            >
              <View>
              {/* entradas, lado esquerdo antes da seta no app oficial */}
              {transaction.vin.map((vin) => (
                <View style={{}} key={randomNumber()}>
                  <Text numberOfLines={1} style={{ width: 100, color: "white" }}>
                    {vin.prevout?.scriptpubkey_address}
                  </Text>
                  <Text style={{ width: 100 ,color: "white" }}>
                    {(vin.prevout?.value ?? 0) / 100000000}
                  </Text>
                </View>
              ))}
              </View>

              <Image source={require("../../../assets/arrow.png")} />

              {/* saidas, lado direito depois da seta no app oficial */}
              <View style={{width: '33%'}}>
              {transaction.vout.map((vout) => (
                <View key={randomNumber()}>
                  <Text numberOfLines={1} style={{ color: "white" }}>
                    {vout.scriptpubkey_address}
                  </Text>
                  <Text style={{ color: "white" }}>
                    {(vout.value ?? 0) / 100000000}
                  </Text>
                </View>
              ))}
              </View>
            </View>
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
    alignItems: "center",
    justifyContent: "center",
  },
});
