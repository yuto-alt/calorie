import { StyleSheet, View } from "react-native";
import ShowMap from "./map/ShowMap";
import Direction from "./map/Direction";
import useLocation from "hooks/useLoction";
import useFetchCoordinates from "hooks/useFetchCoordinates";
import useFetchRouteData from "hooks/useFetchRouteData";
import InputLocation from "./map/InputLocation";

export default function App() {
  console.log(1);
  const { origin, originCoords, setOrigin, setOriginCoords } = useLocation();
  console.log(origin, setOrigin, setOriginCoords);
  const { destination, destinationCoords, handleDestinationChange } =
    useFetchCoordinates();
  console.log(destination, destinationCoords, handleDestinationChange);
  const { distance, duration, calorie, fetchRouteData } = useFetchRouteData();
  console.log(distance, duration, calorie, fetchRouteData);

  const getLocationProps = {
    origin,
    setOrigin,
    originCoords,
    setOriginCoords,
    destination,
    destinationCoords,
    handleDestinationChange,
    fetchRouteData,
  };

  const directionProps = {
    originCoords,
    destinationCoords,
    distance,
    duration,
    calorie,
    fetchRouteData,
  };

  const showMapProps = {
    originCoords,
    destinationCoords,
    style: styles.map,
  };

  return (
    <View style={styles.container}>
      <ShowMap {...showMapProps} />
      <View style={styles.overlay}>
        <InputLocation {...getLocationProps} />
        <Direction {...directionProps} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // 全画面を占有
  },
  map: {
    ...StyleSheet.absoluteFillObject, // 画面全体を埋めるスタイル
  },
  overlay: {
    position: "absolute", // マップ上に配置
    top: 0, // 必要に応じて位置調整
    left: 0,
    right: 0,
    zIndex: 1, // マップより手前に表示
    padding: 20,
  },
});
