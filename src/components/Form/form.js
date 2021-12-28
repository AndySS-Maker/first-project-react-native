import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  Pressable,
  Keyboard,
  FlatList,
} from "react-native";
import ResultImc from "../ResultImc/resultImc";
import styles from "./style";

export default function Form() {
  const [heigth, setHeigth] = useState(null);
  const [weigth, setWeigth] = useState(null);
  const [messageImc, setMessageImc] = useState("Preencha o peso e altura");
  const [imc, setImc] = useState(null);
  const [textButton, setTextButton] = useState("Calcular");
  const [errorMessage, setErrorMessage] = useState(null);
  const [imcList, setImcList] = useState([]);

  function imcCalculator() {
    let heightFormat = heigth.replace(",", ".");
    let totalImc = (weigth / (heightFormat * heightFormat)).toFixed(2);
    setImcList((arr) => [...arr, { id: new Date().getTime(), imc: totalImc }]);
    setImc(totalImc);
  }

  function verificationImc() {
    if (imc == null) {
      Vibration.vibrate();
      setErrorMessage("campo obrigatório*");
    }
  }

  function validationImc() {
    console.log(imcList);
    if (weigth != null && heigth != null) {
      imcCalculator();
      setHeigth(null);
      setWeigth(null);
      setMessageImc("Seu imc é igual:");
      setTextButton("Calcular novamente");
      setErrorMessage(null);
    } else {
      verificationImc();
      setImc(null);
      setTextButton("Calcular");
      setMessageImc("Preencha o peso e altura");
    }
  }

  return (
    <View style={styles.formContext}>
      {imc == null ? (
        <Pressable onPress={Keyboard.dismiss} style={styles.form}>
          <Text style={styles.formLabel}>Altura</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setHeigth}
            value={heigth}
            placeholder="Ex. 1.70"
            keyboardType="numeric"
          />
          <Text style={styles.formLabel}>Peso</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>

          <TextInput
            style={styles.input}
            onChangeText={setWeigth}
            value={weigth}
            placeholder="Ex 74.365"
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={styles.buttonCalculator}
            onPress={() => validationImc()}
          >
            <Text style={styles.textButtonCalculator}>{textButton}</Text>
          </TouchableOpacity>
        </Pressable>
      ) : (
        <View style={styles.exhibitionResultImc}>
          <ResultImc messageResultImc={messageImc} resultImc={imc} />
          <TouchableOpacity
            style={styles.buttonCalculator}
            onPress={() => validationImc()}
          >
            <Text style={styles.textButtonCalculator}>{textButton}</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.listImcs}
        data={imcList.reverse()}
        renderItem={({ item }) => {
          return (
            <Text style={styles.resultImcItem}>
              <Text style={styles.textResultItemList}>Resultado IMC =</Text>
              {item.imc}
            </Text>
          );
        }}
        keyExtractor={(item) => {
          item.id
        }}
      />
    </View>
  );
}
