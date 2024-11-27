import {
  Button,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Image,
  TouchableOpacity,
  Animated,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabType } from "../../routes/tab";
import { useFetchData } from "../../../hooks/hooks";
import { Fee, getFeeData } from "../../../services/FeeRequest";
import LoadingView from "../../components/Loading";
import {
  BlockHeader,
  getBlockHeaderData,
} from "../../../services/BlockHeaderRequest";
import { useCallback, useEffect, useState } from "react";
import {
  getTransactionData,
  TransactionHeader,
} from "../../../services/TransactionsRequest";
import { StackTypes } from "../../routes/stack";
import {
  Coins,
  Coins2,
  getCoins,
  getCoins2,
} from "../../../services/CoinsRequest";
import {
  calculateValuePerSatvB,
  convertDateToHoursAndMinute,
  randomNumber,
} from "../../components/Generals";
import Colors from "../../components/Colors";
import { convertDate } from "../../components/Generals";

const Home = () => {
  const navigation = useNavigation<StackTypes>();

  const [refreshing, setRefreshing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const {
    data: feeData,
    loading: feeLoading,
    error: feeError,
    refetch: refetchFee,
  } = useFetchData<Fee>(getFeeData);

  const {
    data: blockHeaderData,
    loading: blockHeaderLoading,
    error: blockHeaderError,
    refetch: refetchBlockHeader,
  } = useFetchData<BlockHeader>(getBlockHeaderData);

  const {
    data: coins,
    loading: coinsLoading,
    error: coinsError,
    refetch: refetchCoins,
  } = useFetchData<Coins>(getCoins);

  const {
    data: transactionData,
    loading: transactionLoading,
    error: transactionError,
    refetch: refetchTransaction,
  } = useFetchData<TransactionHeader>(getTransactionData);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      refetchFee(),
      refetchBlockHeader(),
      refetchTransaction(),
      refetchCoins(),
    ]);
    setRefreshing(false);
  }, [refetchFee, refetchBlockHeader, refetchTransaction, refetchCoins]);

  const navigateToBlockDetails = (
    hashBlock: string,
    height: number,
    date: number,
    size: number,
    medianFee: number,
    miner: string,
    numberTransactions: number
  ) => {
    navigation.navigate("EachBlock", {
      hashBlock,
      height,
      date,
      size,
      medianFee,
      miner,
      numberTransactions,
    });
  };

  const navigateToTransactionDetails = (txId: string) => {
    navigation.navigate("EachTransaction", { txId });
    setInputValue("");
  };

  if (blockHeaderLoading || feeLoading || transactionLoading || coinsLoading) {
    return <LoadingView />;
  }

  if (feeError || blockHeaderError || transactionError || coinsError)
    return console.log(feeError, blockHeaderError, transactionError);

  return (
    <SafeAreaView style={[styles.container]}>
      {!isFocused ? (
        <View style={styles.horizontalContainer}>
          <Text style={styles.title}>Bitcoin Block Explorer</Text>
          <Image
            style={styles.image}
            source={require("../../../assets/bitcoin.png")}
          ></Image>
        </View>
      ) : null}
      <View style={styles.searchHorizontalContainer}>
        <View style={styles.searchBar}>
          <Image
            source={require("../../../assets/search.png")}
            style={styles.searchImage}
          ></Image>
          <TextInput
            style={{ marginLeft: 25 }}
            placeholder="Search for transactions"
            value={inputValue}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChangeText={setInputValue}
            onSubmitEditing={(event) =>
              navigateToTransactionDetails(event.nativeEvent.text)
            }
            placeholderTextColor={Colors.cinza}
            
          ></TextInput>
        </View>
        {isFocused ? (
          <TouchableOpacity>
            <Pressable
              onPress={() => {
                Keyboard.dismiss();
                setIsFocused(false);
              }}
            >
              <Text style={{ color: Colors.laranja, marginRight: 20 }}>Cancel</Text>
            </Pressable>
          </TouchableOpacity>
        ) : null}
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ width: "100%" }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text style={{ paddingBottom: 10, color: Colors.cinza, fontSize: 18 }}>Preço do Bitcoin</Text>

          {coins.map((coin) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                marginBottom: 20,
              }}
              key={coin.USD}
            >
              <Text style={{ fontSize: 24, fontWeight: "bold", color: Colors.laranja }}>
                $ {coin.USD}
              </Text>
              <Text style={{ transform: [
                {translateY: -5,},
                {rotate: '180deg',}
              ] ,marginLeft: 5, fontSize: 20, color: "green" }}>
                ^
              </Text>
            </View>
          ))}

          <Text style={{ paddingBottom: 10, color: Colors.cinza, fontSize: 18 }}>Taxa de Transação</Text>
          <View style={styles.horizontalPriorityContainer}>
            <Text style={{ paddingRight: 10, fontSize: 12, color: Colors.cinza }}>
              Baixa Prioridade
            </Text>
            <Text style={{ paddingRight: 10, fontSize: 12, color: Colors.cinza }}>
              Média Prioridade
            </Text>
            <Text style={{ fontSize: 12, color: Colors.cinza }}>Alta Prioridade</Text>
          </View>
          {feeData.map((fee) => (
            <View
              style={{
                marginTop: 20,
                width: "90%",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
              key={randomNumber()}
            >
              <View
                style={{
                  alignItems: "center",
                  padding: 10,
                  backgroundColor: Colors.backgroundBoxes,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: Colors.cinza }}>{fee.hourFee} sat/vB</Text>
                {coins.map((coins) => (
                  <Text key={randomNumber()}
                    style={{ color: Colors.laranja }}
                  >
                    $
                    {(calculateValuePerSatvB(fee.hourFee) * coins.USD).toFixed(
                      2
                    )}
                  </Text>
                ))}
              </View>
              <View
                style={{
                  alignItems: "center",
                  padding: 10,
                  backgroundColor: Colors.backgroundBoxes,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: Colors.cinza }}>{fee.halfHourFee} sat/vB</Text>
                {coins.map((coins) => (
                  <Text key={randomNumber()}
                    style={{ color: Colors.laranja }}
                  >
                    $
                    {(
                      calculateValuePerSatvB(fee.halfHourFee) * coins.USD
                    ).toFixed(2)}
                  </Text>
                ))}
              </View>
              <View
                style={{
                  alignItems: "center",
                  padding: 10,
                  backgroundColor: Colors.backgroundBoxes,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: Colors.cinza }}>{fee.fastestFee} sat/vB</Text>
                {coins.map((coins) => (
                  <Text key={randomNumber()}
                    style={{ color: Colors.laranja }}
                  >
                    $
                    {(
                      calculateValuePerSatvB(fee.fastestFee) * coins.USD
                    ).toFixed(2)}
                  </Text>
                ))}
              </View>
            </View>
          ))}
          <View
            style={{
              alignItems: "flex-start",
              justifyContent: "flex-start",
              width: `100%`,
            }}
          >
            <Text style={{ paddingLeft: 20, marginTop: 20, color: Colors.cinza, fontSize: 18 }}>Blocos</Text>

            <View style={styles.gridContainer}>
              {blockHeaderData.slice(0, 4).map((block) => (
                <TouchableOpacity
                  style={styles.gridItem}
                  onPress={() =>
                    navigateToBlockDetails(
                      block.id,
                      block.height,
                      block.timestamp,
                      block.size,
                      block.extras.medianFee,
                      block.extras.pool.name,
                      block.tx_count
                    )
                  }
                  key={randomNumber()}
                >
                  <Text style={{ fontSize: 17, color: Colors.laranja }}>{block.height}</Text>
                  <Text style={{ fontSize: 13, color: Colors.cinza }}>~{Math.floor(block.extras.medianFee)} sat/vB</Text>
                  <Text style={{ fontSize: 13, color: Colors.cinza }}>{(block.size / 1000000).toFixed(2)} MB</Text>
                  <Text style={{ fontSize: 13, color: Colors.cinza }}>{block.tx_count} transactions</Text>
                  <Text style={{ fontSize: 13, color: Colors.cinza }}>{convertDateToHoursAndMinute(block.timestamp)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "flex-start",
              width: `100%`,
            }}
          >
            <Text
              style={{ width: "100%", paddingLeft: 20, marginVertical: 20, color: Colors.cinza, fontSize: 18 }}
            >
              Transações
            </Text>

            {transactionData.map((transaction) => (
              <TouchableOpacity
                onPress={() => navigateToTransactionDetails("4a8044c85e1a9e1e91f691c9dce71ede81be91a4419e65559fbfa8a4990ee21e")}
                style={{
                  width: "90%",
                  padding: 20,
                  backgroundColor: Colors.backgroundBoxes,
                  borderRadius: 10,
                  marginBottom: 15,
                }}
                key={randomNumber()}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: Colors.cinza }}>ID transação</Text>
                  <Text style={{ color: Colors.cinza }}>Valor</Text>
                  <Text style={{ color: Colors.cinza }}>Taxa</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text numberOfLines={1} style={{ width: "33%", color: Colors.laranja }}>
                    {transaction.txid}
                  </Text>
                  <Text style={{ color: Colors.cinza }}>{transaction.value / 100000000} BTC</Text>
                  <Text style={{ color: Colors.cinza }}>{transaction.fee} sat</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  searchBar: {
    backgroundColor: Colors.backgroundBoxes,
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderRadius: 10,
    borderColor: "gray",
    flex: 1,
    margin: 20,
    padding: 10,
  },
  searchHorizontalContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  horizontalPriorityContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.backgroundBoxes,
    borderRadius: 10,
    width: "90%",
  },
  image: {
    position: "absolute",
    width: "7.5%",
    height: undefined,
    aspectRatio: 1,
    marginLeft: 18,
    borderRadius: '50%',
  },
  searchImage: {
    position: "absolute",
    width: "5%",
    height: undefined,
    aspectRatio: 1,
    marginLeft: 10,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.laranja,
  },
  gridContainer: {
    marginHorizontal: "auto",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  gridItem: {
    flex: 1,
    minWidth: "45%",
    maxWidth: "45%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors.backgroundBoxes,
    borderWidth: 1.5,
    borderColor: Colors.backgroundBoxes,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 7,
  },
});
