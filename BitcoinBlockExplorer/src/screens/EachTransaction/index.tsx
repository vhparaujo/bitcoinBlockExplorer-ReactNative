import {
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
import Colors from "../../components/Colors";

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
    <ScrollView style={{backgroundColor: Colors.background}}>
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
                backgroundColor: Colors.backgroundBoxes,
                marginHorizontal: 12,
                marginTop: 20,
              }}
            >
              <Text style={{color: 'white'}}>Transaction: </Text>
              <Text numberOfLines={1} style={{ color: Colors.laranja, width: "50%" }}>
                {transaction.txid}
              </Text>
            </View>

            {/*  */}
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "column",
                borderRadius: 15,
                backgroundColor: Colors.backgroundBoxes,
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
                <Text style={{color: 'white'}}>Date/Hora:</Text>
                <Text style={{color: Colors.laranja}}>{(transaction.status.block_time == null) ? "Aguardando Confirmação": convertDate(transaction.status.block_time)}</Text>
              </View>
              <View style={{ height: "0.2%", backgroundColor: "gray" }}></View>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  padding: 15,
                }}
              >
                <Text style={{color: 'white'}}>Size:</Text>
                <Text style={{color: Colors.laranja}}>{transaction.size} B</Text>
              </View>
              <View style={{ height: "0.2%", backgroundColor: "gray" }}></View>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  padding: 15,
                }}
              >
                <Text style={{color: 'white'}}>Fee:</Text>
                <Text style={{color: Colors.laranja}}>{transaction.fee / 100000000} BTC</Text>
              </View>
            </View>

            <Text 
              style={{
                marginHorizontal: 14,
                marginTop: 25,
                color: 'white',
                fontSize: 18,
              }}
            >Entradas e saídas</Text>

            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                padding: 15,
                borderRadius: 15,
                backgroundColor: Colors.backgroundBoxes,
                marginHorizontal: 12,
                marginTop: 20,
              }}
            >
              <View>
              {/* entradas, lado esquerdo antes da seta no app oficial */}
              {transaction.vin.map((vin) => (
                <View style={{}} key={randomNumber()}>
                  <Text numberOfLines={1} style={{ width: 100, color: Colors.laranja }}>
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
                  <Text numberOfLines={1} style={{ color: Colors.laranja }}>
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
