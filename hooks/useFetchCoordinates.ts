import { useState } from "react";
import { Alert } from "react-native";

const useFetchCoordinates = () => {
  const [destination, setDestination] = useState("");
  const [destinationCoords, setDestinationCoords] = useState({
    latitude: null,
    longitude: null,
  });

  const fetchCoordinatesByName = async (name: string) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
          name
        )}&inputtype=textquery&fields=geometry&key=${
          process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
        }`
      );
      const data = await response.json();
      if (data.candidates && data.candidates[0]) {
        const { lat, lng } = data.candidates[0].geometry.location;
        setDestinationCoords({ latitude: lat, longitude: lng });
      } else {
        // Alert.alert("場所が見つかりません。");
      }
    } catch (error) {
      Alert.alert("エラーが発生しました。");
    }
  };

  const handleDestinationChange = (text: string) => {
    setDestination(text);
    if (text) {
      fetchCoordinatesByName(text);
    }
  };

  return { destination, destinationCoords, handleDestinationChange };
};

export default useFetchCoordinates;
