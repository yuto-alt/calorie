import React, { useState } from 'react';
import { StyleSheet, View, Text, Button} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles  from './styles';

const ShowMap = () => {
  return (
    <View style={styles.container}>›
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 35.6895, // 東京の緯度
          longitude: 139.6917, // 東京の経度
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 35.6895, longitude: 139.6917 }}
          title="東京"
          description="日本の首都"
        />
      </MapView>
    </View>
  );
};

export default ShowMap;







// 12/9 19:40
//クリスマス
