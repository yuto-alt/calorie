import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ScrollView
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import ShowMap from "./map/ShowMap";
import  Direction  from "./map/Direction";


const METS_DATA = {
  transportation: {
    lifestyle_activities: [
      { mets: 1.8, example: "立位" },
      { mets: 3.0, example: "徒歩(普通)" },
      { mets: 2.8, example: "徒歩(やや遅)" },
      { mets: 2.0, example: "徒歩(遅)" },
      { mets: 4.3, example: "徒歩(速)" },
      { mets: 3.5, example: "徒歩(やや速)" },
      { mets: 5.0, example: "徒歩(かなり速)" },
      { mets: 7.0, example: "ジョギング" },
      { mets: 8.3, example: "ランニング（普通）" },
      { mets: 9.0, example: "ランニング（やや速）" },
      { mets: 9.8, example: "ランニング（速）" },
      { mets: 11.0, example: "ランニング（かなり速）" },
      { mets: 8.0, example: "サイクリング" },
      { mets: 8.8, example: "階段を登る" },
    ]
  }
};

export default function App() {
  const [distance, setDistance] = useState("");
  const [speed, setSpeed] = useState("");
  const [weight, setWeight] = useState("");
  const [mets, setMets] = useState(""); // 初期値を空に設定
  const [calories, setCalories] = useState<number | null>(null);

  const calculateCalories = () => {
    const distanceNum = parseFloat(distance);
    const speedNum = parseFloat(speed);
    const weightNum = parseFloat(weight);
    const metsNum = parseFloat(mets);

    if (
      isNaN(distanceNum) ||
      isNaN(speedNum) ||
      isNaN(weightNum) ||
      isNaN(metsNum)
    ) {
      Alert.alert("エラー", "すべての項目を正しく入力してください。");
      return;
    }

    const time = distanceNum / speedNum;
    const result = metsNum * weightNum * time;
    setCalories(result);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
          <Direction />
          <ShowMap  />
      <Text style={styles.header}>消費カロリー計算アプリ</Text>
      <Button title="消費カロリーを計算" onPress={calculateCalories} />
      {calories !== null && (
        <Text style={styles.result}>
          予想消費カロリー: {calories.toFixed(2)} kcal
        </Text>
      )}
      
      <TextInput
        style={styles.input}
        placeholder="移動距離 (km)"
        keyboardType="decimal-pad"
        value={distance}
        onChangeText={(value) => {
          setDistance(value);
          setCalories(null);
        }}
        // onChangeText={setDistance}
      />
      <TextInput
        style={styles.input}
        placeholder="移動速度 (km/h)"
        keyboardType="numeric"
        value={speed}
        onChangeText={(value) => {
          setSpeed(value);
          setCalories(null);
        }}        
        // onChangeText={setSpeed}
      />
      <TextInput
        style={styles.input}
        placeholder="体重 (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={(value) => {
          setWeight(value);
          setCalories(null);
        }}        
        // onChangeText={setWeight}
      />
      
      <Picker
        selectedValue={mets}
        onValueChange={(itemValue) => setMets(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="移動手段を選択" value="" />
        {Object.entries(METS_DATA).map(([categoryKey, categoryValues]) => {
          // Render lifestyle_activities
          return categoryValues.lifestyle_activities.map((activity, index) => (
            <Picker.Item
              key={`${categoryKey}-lifestyle-${index}`}
              label={`${activity.example}`}
              value={activity.mets.toString()}
            />
          ));
        })}
      </Picker>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold"
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold"
  }
});
// 12/8 18:45
//テスト//