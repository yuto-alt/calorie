import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";

const useLocation = () => {
  const [origin, setOrigin] = useState("現在地取得中...");
  const [originCoords, setOriginCoords] = useState({
    latitude: 35.681236,
    longitude: 139.767125,
  });

  useEffect(() => {
    const getCurrentLocation = async () => {
      console.log(await Location.requestForegroundPermissionsAsync());
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("位置情報の許可が必要です。");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});

      setOrigin("現在地");
      setOriginCoords({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    getCurrentLocation();
  }, []);

  return { origin, originCoords, setOrigin, setOriginCoords };
};

export default useLocation;
