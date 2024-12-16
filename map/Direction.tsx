import { TouchableOpacity } from "react-native";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import React, { FC, useState } from "react";

type GetLocationProps = {
  originCoords: { latitude: number; longitude: number };
  destinationCoords: { latitude: number; longitude: number };
  distance: string | null;
  duration: string | null;
  calorie: number;
  fetchRouteData: (mode: string, originCoords, destinationCoords) => void;
};

const Direction: FC<GetLocationProps> = ({
  originCoords,
  destinationCoords,
  distance,
  duration,
  calorie,
  fetchRouteData,
}) => {
  const [selectedMode, setSelectedMode] = useState("driving");

  const modes = [
    { key: "driving", label: "車" },
    { key: "walking", label: "徒歩" },
    { key: "bicycling", label: "自転車" },
    { key: "transit", label: "公共交通機関" },
  ];

  return (
    <View>
      {distance && duration ? (
        <View style={styles.container}>
          <View style={styles.tabContainer}>
            {modes.map((mode) => (
              <TouchableOpacity
                key={mode.key}
                style={[
                  styles.tab,
                  selectedMode === mode.key && styles.activeTab, // 選択中のタブを強調
                ]}
                onPress={() => {
                  setSelectedMode(mode.key);
                  fetchRouteData(mode.key, originCoords, destinationCoords);
                }}
              >
                <Text
                  style={[
                    styles.tabText,
                    selectedMode === mode.key && styles.activeTabText,
                  ]}
                >
                  {mode.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* 選択されたモードを表示 */}
          <View style={styles.content}>
            <Text style={styles.text}>距離: {distance}</Text>
            <Text style={styles.text}>所要時間: {duration}</Text>
            <Text style={styles.text}>
              消費カロリー: {calorie && calorie > 0 ? `${calorie}kcal` : 0}
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tab: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: "#007BFF",
  },
  tabText: {
    color: "#333",
  },
  activeTabText: {
    color: "#fff",
  },
  content: {
    marginTop: 5,
  },
  text: {
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
  },
  coords: {
    fontSize: 14,
    marginBottom: 16,
    color: "gray",
  },
});

export default Direction;
