import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const windowHeight = Dimensions.get("window").height;
  const [status, setStatus] = useState("");
  const popAnim = useRef(new Animated.Value(windowHeight * -1)).current;

  const successColor = "#6dcf81";
  const successHeader = "Sucesso!";
  const successMessage = "Tarefa concluida com sucesso!";

  const failColor = "#bf6060";
  const failHeader = "Algo deu errado!";
  const failMessage = "Erro cod: 404";

  const popIn = () => {
    Animated.timing(popAnim, {
      toValue: windowHeight * 0.35 * -1,
      duration: 300,
      useNativeDriver: true,
    }).start(popOut());
  };

  const popOut: any = () => {
    setTimeout(() => {
      Animated.timing(popAnim, {
        toValue: windowHeight * -1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 10000);
  };

  const instantPopOut = () => {
    Animated.timing(popAnim, {
      toValue: windowHeight * -1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View>
        <Animated.View
          style={[
            styles.toastContainer,
            {
              transform: [{ translateY: popAnim }],
            },
          ]}
        >
          <TouchableOpacity onPress={instantPopOut}>
            <View style={styles.toastRow}>
              <AntDesign
                name={status === "success" ? "checkcircleo" : "closecircleo"}
                size={24}
                color={status === "success" ? successColor : failColor}
              />
              <View style={styles.toastText}>
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  {status === "success" ? successHeader : failHeader}
                </Text>
                <Text style={{ fontSize: 12 }}>
                  {status === "success" ? successMessage : failMessage}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity
          onPress={() => {
            setStatus("success");
            popIn();
          }}
          style={{ marginTop: 30, borderWidth: 1, borderColor: "green" }}
        >
          <Text>sucess toast</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setStatus("fail");
            popIn();
          }}
          style={{ marginTop: 30, borderWidth: 1, borderColor: "red" }}
        >
          <Text>error toast</Text>
        </TouchableOpacity>
      </View>
      <StatusBar hidden />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    height: 60,
    width: 350,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toastRow: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  toastText: {
    width: "70%",
    padding: 2,
  },
});
