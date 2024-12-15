import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { FC } from "react";

type ShowMapProps = {
  originCoords: { latitude: number; longitude: number };
  destinationCoords: { latitude: number; longitude: number };
  style;
};

const ShowMap: FC<ShowMapProps> = ({
  originCoords,
  destinationCoords,
  style,
}) => {
  console.log("maps", originCoords, destinationCoords);
  const styles = StyleSheet.create({
    map: {
      flex: 1,
    },
    info: {
      padding: 10,
    },
    calorieText: {
      paddingRight: 10,
    },
    text: {},
  });

  return (
    <View style={style}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: originCoords.latitude,
          longitude: originCoords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: originCoords.latitude,
            longitude: originCoords.longitude,
          }}
          title="出発地点"
        />
        {destinationCoords.latitude && destinationCoords.longitude && (
          <Marker
            coordinate={{
              latitude: destinationCoords.latitude,
              longitude: destinationCoords.longitude,
            }}
            title="目的地"
          />
        )}
      </MapView>
    </View>
  );
};

export default ShowMap;
