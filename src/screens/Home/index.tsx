import React, { useEffect, useState } from 'react';
import { Container } from './styles';
import { Alert, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { Modalize } from 'react-native-modalize';
import { useTheme } from 'styled-components';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import firestore from '@react-native-firebase/firestore';
import Content from '../../components/home/content';
import MapContentMarker from '../../components/MapMarker';
import ModalSpotDetails from '../../components/home/content/modalSpotDetails';
import { useDispatch, useSelector } from 'react-redux';
import Geocoder from 'react-native-geocoding';
import SetCityModal from '../../components/Modals/SetCityModal';
import { AppStore } from '../../store/types';
import { SetSpots } from '../../store/ducks/spots/actions';
import theme from '../../theme';
import SetModalNewSpot from '../../components/Modals/SetNewSpot';

const customMap = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dadada',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#c9c9c9',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
];

type IGeopoint = {
  _latitude: number;
  _longitude: number;
};

export type ISpotDetailsPage = {
  id: string;
  name: string;
  description: string;
  location: IGeopoint;
  spotPhotos: string[];
};

const Home = () => {
  const {
    user: { formatted_city },
  } = useSelector((state: AppStore) => state);

  const dispatch = useDispatch();
  const modal = React.createRef();

  const [loadingCity, setLoadingCity] = useState(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalUserCityVisible, setModalUserCityVisible] = useState<boolean>(
    formatted_city ? false : true
  );
  const [openModalNewSpot, setOpenModalNewSpot] = useState<boolean>(false);

  const [selectedSpot, setSelectedSpot] = useState<string>('');
  const { COLORS } = useTheme();
  const [origin, setOrigin] = useState<any>();
  const [spots, setSpots] = useState<ISpotDetailsPage[]>([]);
  const [cityUser, setCityUser] = useState('');

  function fetchSpots() {
    firestore()
      .collection('SPOTS')
      .get()
      .then((response) => {
        const data = response.docs.map((doc, index) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ISpotDetailsPage[];
        dispatch(SetSpots(data));
        setSpots(data);
      })
      .catch((e) =>
        console.log('Consulta', 'Não foi possível realizar a consulta.', e)
      );
  }

  useEffect(() => {
    fetchSpots();
  }, []);

  useEffect(() => {
    (async function () {
      setLoadingCity(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync();

        const response = await Geocoder.from({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });

        const cityObject = response.results[0].address_components.find((i) => {
          return i.types.includes('administrative_area_level_2');
        });

        setCityUser(`${cityObject?.short_name}`);

        setOrigin({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        });
        setLoadingCity(false);
      } else {
        throw new Error('Location permission not granted');
      }
    })();
  }, []);

  function handleModalOpenSpotDetails(id: string) {
    setModalVisible(true);
    setSelectedSpot(id);
  }

  return (
    <>
      <Container>
        <MapView
          style={{ flex: 1 }}
          initialRegion={origin}
          showsBuildings
          showsMyLocationButton
          showsUserLocation
          showsCompass
          minZoomLevel={12}
          maxZoomLevel={12}
          mapType="standard"
          customMapStyle={customMap}
        >
          {spots &&
            spots.map((data: ISpotDetailsPage, index: number) => (
              <Marker
                onPress={() => handleModalOpenSpotDetails(data.id)}
                key={index}
                coordinate={{
                  latitude: data.location._latitude,
                  longitude: data.location._longitude,
                }}
                title={data.name}
              >
                <MapContentMarker key={index} dataImage={data.spotPhotos[0]} />
              </Marker>
            ))}
        </MapView>

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ModalSpotDetails
            id={selectedSpot}
            onPress={() => setModalVisible(!modalVisible)}
          />
        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalUserCityVisible}
          onRequestClose={() => {
            setModalVisible(!modalUserCityVisible);
          }}
        >
          <SetCityModal setModalUserCityVisible={setModalUserCityVisible} />
        </Modal>

        <Modal
          animationType="fade"
          transparent={false}
          visible={true}
          onRequestClose={() => {
            setOpenModalNewSpot(!openModalNewSpot);
          }}
        >
          <SetModalNewSpot setOpenModalNewSpot={setOpenModalNewSpot}/>
        </Modal>

        <TouchableOpacity style={styles.buttonActionsBox}>
          <MaterialIcons name="camera-alt" size={24} color="#FFF" />
        </TouchableOpacity>

        <Modalize
          ref={() => modal}
          modalStyle={{
            flex: 1,
            zIndex: 9999,
            marginHorizontal: 1,
            borderRadius: 0,
          }}
          alwaysOpen={200}
          handlePosition="outside"
          handleStyle={{
            backgroundColor: COLORS.PRIMARY_BUTTON,
            borderRadius: 0,
          }}
        >
          <Content city={cityUser} loading={loadingCity} />
        </Modalize>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  buttonActionsBox: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 216,
    right: 16,
    zIndex: 999,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.COLORS.PRIMARY_900,
  },
});

export default Home;
