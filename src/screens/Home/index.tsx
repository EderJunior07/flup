import { useAuth } from '../../hooks/auth';
import React, { useEffect, useState } from 'react';
import { Container, MapContainer } from './styles';
import { RectButton } from 'react-native-gesture-handler';
import { Image, Text, View } from 'react-native';

import { Modalize } from 'react-native-modalize';
import { useTheme } from 'styled-components';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const Home = () => {
  const modal = React.createRef();
  const { COLORS } = useTheme();
  const [origin, setOrigin] = useState<any>();

  const renderContent = () => (
    <View style={{ flex: 1, backgroundColor: COLORS.BACKGROUND }}>
      <Text>{'Introduction'.toUpperCase()}</Text>
      <Text>Always open modal!</Text>
    </View>
  );

  useEffect(() => {
    (async function () {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync();
        setOrigin({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        });
      } else {
        throw new Error('Location permission not granted');
      }
    })();
  }, []);

  return (
    <>
      <Container>
        <MapView
          style={{ flex: 1 }}
          initialRegion={origin}
          showsUserLocation
          showsCompass
          maxZoomLevel={200}
          minZoomLevel={-50}
        >
          <Marker
            coordinate={{
              latitude: -23.497564320298803,
              longitude: -46.874742510170286,
            }}
          >
            <View
              style={{
                width: 96,
                height: 96,
                borderRadius: 65,
                overflow: 'hidden',
                backgroundColor: 'white',
              }}
            >
              <Image
                style={{flex: 1, resizeMode: 'cover' }}
                source={{
                  uri: 'https://lh5.googleusercontent.com/p/AF1QipOJa-bwqWYbSzivcBL-a4yh4h7c-azaEJk60lFK=w408-h306-k-no',
                }}
              />
            </View>
          </Marker>
        </MapView>

        <Modalize
          ref={() => modal}
          modalStyle={{ marginHorizontal: 8, borderRadius: 0 }}
          alwaysOpen={100}
          handlePosition="outside"
          handleStyle={{
            backgroundColor: COLORS.PRIMARY_BUTTON,
            borderRadius: 0,
          }}
        >
          {renderContent()}
        </Modalize>
      </Container>
    </>
  );
};

export default Home;
