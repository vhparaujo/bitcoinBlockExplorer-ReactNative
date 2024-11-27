import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import {  useEffect } from "react";
import { useFetchData } from "../../../hooks/hooks";
import LoadingView from "../../components/Loading";
import {
  getTransactionsBlockData,
  Transactions,
} from "../../../services/TransactionsBlockRequest";
import { RouteTypes } from "../../routes/stack";
import { convertDate, randomNumber } from "../../components/Generals";

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
        <View>
          <Text
            style={{
              padding: 15,
              borderRadius: 12,
              backgroundColor: "lightgray",
              marginHorizontal: 12,
              marginTop: 20,
            }}
          >
            Block: {height}
          </Text>
        </View>

        <Text
          style={{
            padding: 15,
            borderRadius: 12,
            backgroundColor: "lightgray",
            marginHorizontal: 12,
            marginTop: 20,
          }}
          numberOfLines={1}
        >
          Hash: {hashBlock}
        </Text>

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
              width: "100%",
            }}
          >
            <Text>Date:</Text>
            <Text>{convertDate(date)}</Text>
          </View>

          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              padding: 15,
              width: "100%",
            }}
          >
            <Text>Size:</Text>
            <Text>{(size / 1000000).toFixed(2)} MB</Text>
          </View>

          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              padding: 15,
              width: "100%",
            }}
          >
            <Text>Median Fee:</Text>
            <Text>~{medianFee.toFixed(2)} sat/vB</Text>
          </View>

          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              padding: 15,
              width: "100%",
            }}
          >
            <Text>Miner:</Text>
            <Text>{miner}</Text>
          </View>
        </View>

        <Text
          style={{
            marginHorizontal: 12,
            marginTop: 20,
          }}
        >
          {numberTransactions} transactions
        </Text>

        <View
          style={{
            width: "100%",
            marginTop: 20,
          }}
        >
          {data.map((transactionsBlock) => (
            <View key={randomNumber()}>
              <View
                style={{
                  padding: 15,
                  borderRadius: 12,
                  backgroundColor: "lightgray",
                  marginHorizontal: 12,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: "blue",
                    width: "55%",
                  }}
                  numberOfLines={1}
                >
                  {transactionsBlock.txid}
                </Text>
                <Text>
                  {transactionsBlock.status.block_time == null
                    ? "Aguardando Confirmação"
                    : convertDate(transactionsBlock.status.block_time)}
                </Text>
              </View>

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
                  marginBottom: 10,
                }}
              >
                <View>
                  {/* transacoes de entrada, lado esquerdo antes da seta no app oficial */}
                  {transactionsBlock.vin.map((vin) => (
                    <View key={randomNumber()}>
                      <Text
                        numberOfLines={1}
                        style={{ width: 100, color: "white" }}
                      >
                        {vin.prevout?.scriptpubkey_address}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{ width: 100, color: "white" }}
                      >
                        {(vin.prevout?.value ?? 0) / 100000000}
                      </Text>
                    </View>
                  ))}
                </View>

                <Image source={require("../../../assets/arrow.png")} />

                <View>
                  {/* transacoes de saida, lado direito depois da seta no app oficial */}
                  {transactionsBlock.vout.map((vout) => (
                    <View key={randomNumber()}>
                      <Text
                        numberOfLines={1}
                        style={{ width: 100, color: "white" }}
                      >
                        {vout.scriptpubkey_address}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{ width: 100, color: "white" }}
                      >
                        {(vout.value ?? 0) / 100000000}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default EachBlock;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
