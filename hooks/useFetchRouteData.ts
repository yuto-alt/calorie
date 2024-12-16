// useFetchRouteData.ts
import { useState } from "react";
import { Alert } from "react-native";

const useFetchRouteData = () => {
  const [distance, setDistance] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [calorie, setCalorie] = useState<number | null>(null);

  const fetchRouteData = async (
    mode: string,
    originCoords: { latitude: number | null; longitude: number | null },
    destinationCoords: { latitude: number | null; longitude: number | null }
  ) => {
    if (
      !originCoords.latitude ||
      !originCoords.longitude ||
      !destinationCoords.latitude ||
      !destinationCoords.longitude
    ) {
      Alert.alert("出発地と目的地の座標が必要です。");
      return;
    }

    const origin = `${originCoords.latitude},${originCoords.longitude}`;
    console.log(origin);
    const destination = `${destinationCoords.latitude},${destinationCoords.longitude}`;
    const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

    // 1時間後の出発時刻　ダミー

    if (!apiKey) {
      Alert.alert("APIキーが設定されていません。");
      return;
    }
    console.log(mode);

    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=${mode}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      let mets = 0;

      switch (mode) {
        case "driving":
          mets = 1;
          break;
        case "walking":
          mets = 3;
          break;
        case "bicycling":
          mets = 4;
          break;
        case "transit":
          mets = 2;
          break;
        default:
      }

      if (data.routes.length > 0) {
        let calories = 0;
        const leg = data.routes[0].legs[0];
        const distance = leg.distance.text;
        const duration = leg.duration.text;
        console.log(leg.distance);
        console.log(leg.duration);
        setDistance(distance);
        setDuration(duration);
        leg.steps.forEach((step: { duration: { value: number } }) => {
          const time = step.duration.value / 3600;
          calories += Math.round(mets * 65 * time);
        });
        setCalorie(calories);
      } else {
        console.error("ルートが見つかりませんでした");
      }
    } catch (error) {
      console.error("エラー:", error);
    }
  };

  return { distance, duration, calorie, fetchRouteData };
};

export default useFetchRouteData;
