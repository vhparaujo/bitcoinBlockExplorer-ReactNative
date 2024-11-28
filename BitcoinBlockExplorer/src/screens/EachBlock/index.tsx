import { ScrollView, StyleSheet, Text, Image, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { useFetchData } from "../../../hooks/hooks";
import LoadingView from "../../components/Loading";
import {
  getTransactionsBlockData,
  Transactions,
} from "../../../services/TransactionsBlockRequest";
import { RouteTypes } from "../../routes/stack";
import { convertDate, randomNumber } from "../../components/Generals";
import Colors from "../../components/Colors";

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
    <ScrollView style={{ backgroundColor: Colors.background }}>
      <View style={styles.container}>
        <View>
          <Text
            style={{
              padding: 15,
              borderRadius: 12,
              backgroundColor: Colors.backgroundBoxes,
              marginHorizontal: 12,
              marginTop: 20,
              color: "white",
            }}
          >
            Block: {height}
          </Text>
        </View>

        <View
          style={{
            padding: 15,
            borderRadius: 12,
            backgroundColor: Colors.backgroundBoxes,
            marginHorizontal: 12,
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            width: "94%",
          }}
        >
          <Text
            style={{
              color: "white",
            }}
            numberOfLines={1}
            
          >
            Hash: 
          </Text>
          <Text
            style={{
              color: Colors.laranja,
              width: "65%",
            }}
            numberOfLines={1}
          >{hashBlock}</Text>
        </View>

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
              width: "100%",
            }}
          >
            <Text style={{color: 'white'}}>Date:</Text>
            <Text style={{color: Colors.laranja}}>{convertDate(date)}</Text>
          </View>

          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              padding: 15,
              width: "100%",
            }}
          >
            <Text style={{color: 'white'}}>Size:</Text>
            <Text style={{color: Colors.laranja}}>{(size / 1000000).toFixed(2)} MB</Text>
          </View>

          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              padding: 15,
              width: "100%",
            }}
          >
            <Text style={{color: 'white'}}>Median Fee:</Text>
            <Text style={{color: Colors.laranja}}>~{medianFee.toFixed(2)} sat/vB</Text>
          </View>

          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              padding: 15,
              width: "100%",
            }}
          >
            <Text style={{color: 'white'}}>Miner:</Text>
            <Text style={{color: Colors.laranja}}>{miner}</Text>
          </View>
        </View>

        <Text
          style={{
            marginHorizontal: 14,
            marginTop: 25,
            color: "white",
            fontSize: 18,
          }}
        >
          {numberTransactions} transactions
        </Text>

        <View
          style={{
            width: "100%",
            marginTop: 25,
          }}
        >
          {data.map((transactionsBlock) => (
            <View key={randomNumber()}>
              <View
                style={{
                  padding: 15,
                  borderRadius: 12,
                  backgroundColor: Colors.backgroundBoxes,
                  marginHorizontal: 12,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: Colors.laranja,
                    width: "55%",
                  }}
                  numberOfLines={1}
                >
                  {transactionsBlock.txid}
                </Text>
                <Text style={{
                  color: 'gray',
                }}>
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
                  backgroundColor: Colors.backgroundBoxes,
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
                        style={{ width: 100, color: Colors.laranja }}
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
                        style={{ width: 100, color: Colors.laranja }}
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
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
