import React, { useEffect, useState } from 'react';

import { ButtonBack, ImageContainer } from './styles';

import { MaterialIcons } from '@expo/vector-icons';
import { Alert, Image, ScrollView, TouchableOpacityProps } from 'react-native';
import { ISpotDetailsPage } from '../../../../screens/Home';

import firestore from '@react-native-firebase/firestore';

type Props = TouchableOpacityProps & {
  id: string;
};

const ModalSpotDetails = ({ id, ...rest }: Props) => {
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

  return (
    <>
      <ButtonBack {...rest}>
        <MaterialIcons name={'close'} size={18} />
      </ButtonBack>
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
    </>
  );
};

export default ModalSpotDetails;
