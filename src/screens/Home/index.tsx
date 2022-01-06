import { useAuth } from '../../hooks/auth';
import React, { useEffect, useState } from 'react';
import { Container, MapContainer } from './styles';
import { RectButton } from 'react-native-gesture-handler';
import { Image, Text, View} from 'react-native';

import { Modalize } from 'react-native-modalize';
import { useTheme } from 'styled-components';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


const customMap = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]

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
          liteMode={false}
          mapType='standard'
          customMapStyle={customMap}
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
