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
        mode = "walking";
        break;
      case "transit":
        mets = 2;
        break;
      default:
    }

    // 1時間後の出発時刻　ダミー

    if (!apiKey) {
      Alert.alert("APIキーが設定されていません。");
      return;
    }

    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=${mode}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes.length > 0) {
        let calories = 0;
        const leg = data.routes[0].legs[0];
        const distance = leg.distance.text;
        let duration = leg.duration.text;

        if (mets == 4) {
          const cyclingSpeedKmh = 15; // 自転車の速度 (km/h)
          const reductionSpeedKmh = 4; // 減速分の速度 (km/h)

          const effectiveSpeedKmh = cyclingSpeedKmh - reductionSpeedKmh; // 実効速度 (km/h)

          const bicyclingTimeHour =
            leg.distance.value / 1000 / effectiveSpeedKmh; // 距離 ÷ 速度

          const totalMinutes = Math.round(bicyclingTimeHour * 60); // 総分数に変換

          const hours = Math.floor(totalMinutes / 60); // 時間

          const minutes = totalMinutes % 60; // 残りの分

          duration = `${hours}時間${minutes}分`;

          calories = Math.round(bicyclingTimeHour * mets * 65);
        } else {
          leg.steps.forEach((step: { duration: { value: number } }) => {
            const time = step.duration.value / 3600;
            calories += Math.round(mets * 65 * time);
          });
        }
        setDistance(distance);
        setDuration(duration);
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
