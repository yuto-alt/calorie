import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import styles from "./styles";

const Direction = () => {
  const [distance, setDistance] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);

  const fetchRouteData = async () => {
    const origin = "35.6895,139.6917"; // 出発地点（東京）
    const destination = "35.6586,139.7454"; // 目的地点（東京タワー）
    const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes.length > 0) {
        const route = data.routes[0];
        const leg = route.legs[0]; // 最初のルートとレッグを取得
        console.log(leg.steps);

        setDistance(leg.distance.text); // 距離（例: "5.3 km"）
        setDuration(leg.duration.text); // 時間（例: "15 mins"）
      } else {
        console.error("ルートが見つかりませんでした");
      }
    } catch (error) {
      console.error("エラー:", error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 35.6895,
          longitude: 139.6917,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 35.6895, longitude: 139.6917 }}
          title="出発地点"
        />
        <Marker
          coordinate={{ latitude: 35.6586, longitude: 139.7454 }}
          title="目的地"
        />
      </MapView>
      <View style={styles.info}>
        <Button title="ルート検索" onPress={fetchRouteData} />
        {distance && <Text>距離: {distance}</Text>}
        {duration && <Text>所要時間: {duration}</Text>}
      </View>
    </View>
  );
};

export default Direction;
