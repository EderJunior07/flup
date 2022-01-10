import React, { useEffect, useState } from 'react';

import firestore from '@react-native-firebase/firestore';
import { ISpotDetailsPage } from '@src/screens/Home';
import { Alert, Image, ScrollView } from 'react-native';
import { Container } from './styles';

const CarouselTrackMap = () => {
  const [index, setIndex] = useState<number>();
  const [spots, setSpots] = useState<ISpotDetailsPage[] | any>();

  function fetchSpots(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim();
    firestore()
      .collection('SPOTS')
      .orderBy('name_insensitive')
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then((response) => {
        const data = response.docs.map((doc, index) => {
          return {
            id: doc.id,
            ...doc.data(),
            key: index,
          };
        }) as ISpotDetailsPage[];

        setSpots(data);
      })
      .catch(() =>
        Alert.alert('Consulta', 'Não foi possível realizar a consulta.')
      );
  }

  useEffect(() => {
    fetchSpots('');
  }, []);

  return (
    <>
      <ScrollView
        style={{ flex: 1, paddingLeft: 8 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {spots &&
          spots.map((spots: ISpotDetailsPage, index: number) => (
            <Container key={index}>
              <Image
                style={{ flex: 1 }}
                source={{
                  uri: spots
                    ? spots.spotPhotos[0]
                    : 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
                }}
              />
            </Container>
          ))}
      </ScrollView>
    </>
  );
};

export default CarouselTrackMap;
