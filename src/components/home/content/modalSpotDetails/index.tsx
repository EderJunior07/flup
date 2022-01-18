import React, { useEffect, useState } from 'react';

import {
  ButtonBack,
  Description,
  ImageContainer,
  Name,
  HeaderContainer,
  NameContainer,
  AddressButton,
  AddressButtonLabel,
  Title,
  TitleBox,
} from './styles';

import { MaterialIcons } from '@expo/vector-icons';
import {
  Alert,
  Image,
  Linking,
  Platform,
  ScrollView,
  TouchableOpacityProps,
} from 'react-native';
import { ISpotDetailsPage } from '../../../../screens/Home';

import firestore from '@react-native-firebase/firestore';
import { useTheme } from 'styled-components/native';
import { LocationContainer, LocationLabel } from '../styles';

type Props = TouchableOpacityProps & {
  id: string;
};

const ModalSpotDetails = ({ id, ...rest }: Props) => {
  const { COLORS } = useTheme();
  const [spot, setSpot] = useState<ISpotDetailsPage | any>();

  async function fetchSpot() {
    const response = await firestore()
      .collection('SPOTS')
      .doc(id)
      .get()
      .then((response) => {
        return response.data();
      })
      .catch((error) => {
        Alert.alert('Consulta', 'Não foi possível realizar a consulta.');
      });

    setSpot(response);
  }

  useEffect(() => {
    fetchSpot();
  }, []);

  const handleGoogleMap = () => {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${spot?.location?.latitude},${spot?.location?.longitude}`;
    const label = 'Custom Label';
    const url: any = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  return (
    <>
      <ButtonBack {...rest}>
        <MaterialIcons
          name={'close'}
          size={18}
          color={COLORS.SECONDARY_BUTTON}
        />
      </ButtonBack>
      <ScrollView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1, paddingLeft: 1 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {spot &&
            spot.spotPhotos.map((data: string, index: number) => (
              <ImageContainer key={index}>
                <Image
                  style={{ flex: 1 }}
                  source={{
                    uri: data
                      ? data
                      : 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
                  }}
                />
              </ImageContainer>
            ))}
        </ScrollView>
        <NameContainer>
          <Name>{spot?.name}</Name>
        </NameContainer>
        <HeaderContainer>
          <Description>{spot?.description}</Description>
        </HeaderContainer>

        <LocationContainer>
          <MaterialIcons
            name="location-on"
            size={24}
            color={COLORS.SECONDARY_BUTTON}
          />
          <LocationLabel>{spot?.formatted_city}</LocationLabel>
        </LocationContainer>
        <TitleBox>
          <MaterialIcons name="supervised-user-circle" size={28} />
          <Title>Agora na pista</Title>
        </TitleBox>
      </ScrollView>
      <AddressButton onPress={handleGoogleMap}>
        <AddressButtonLabel>Como chegar?</AddressButtonLabel>
      </AddressButton>
    </>
  );
};

export default ModalSpotDetails;
