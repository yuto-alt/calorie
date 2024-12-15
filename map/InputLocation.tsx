import React, { useState, useEffect, FC } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

type GetLocationProps = {
  origin: string;
  setOrigin: (text: string) => void;
  originCoords: { latitude: number; longitude: number };
  setOriginCoords: (coords: { latitude: number; longitude: number }) => void;
  destination: string;
  destinationCoords: { latitude: number; longitude: number };
  handleDestinationChange: (text: string) => void;
  fetchRouteData: (mode: string, originCoords, destinationCoords) => void;
};

const InputLocation: FC<GetLocationProps> = ({
  origin,
  setOrigin,
  originCoords,
  destination,
  destinationCoords,
  handleDestinationChange,
  fetchRouteData,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={origin}
        onChangeText={(text) => setOrigin(text)}
        placeholder="出発地を入力"
      />

      <TextInput
        style={styles.input}
        value={destination}
        onChangeText={handleDestinationChange}
        placeholder="目的地を入力"
      />

      <Button
        title="検索"
        onPress={() => {
          fetchRouteData("driving", originCoords, destinationCoords);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  coords: {
    fontSize: 14,
    marginBottom: 16,
    color: "gray",
  },
});

export default InputLocation;
