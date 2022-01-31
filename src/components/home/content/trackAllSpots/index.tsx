import React, { useEffect, useState } from 'react';

import firestore from '@react-native-firebase/firestore';
import { ISpotDetailsPage } from '@src/screens/Home';
import { Alert, Image, ScrollView, Text } from 'react-native';
import { Container } from './styles';

const TrackAllSpots = () => {
  const [index, setIndex] = useState<number>();
  const [spots, setSpots] = useState<ISpotDetailsPage[] | any>();
  const [hasSpots, setHasSpots] = useState(false);

  const trackSpot = async () => {
    const spotsCollectionRef = firestore().collection('SPOTS');
    const snapshots = await spotsCollectionRef.where('status', '==', 1).get();

    if (snapshots.empty) {
      console.log('No matching documents for Spots At City.');
      setHasSpots(false);
      return;
    }
    setHasSpots(true);

    let response: any = [];

    // dispatch(SetNewUsersAtTheCity(response));

    snapshots.forEach((doc) => {
      response.push(doc.data());
      return doc.data();
    });

    setSpots(response);
    return response;
  };

  useEffect(() => {
    trackSpot();
  }, []);

  return (
    <>
      {hasSpots ? (
        <ScrollView
          style={{ flex: 1, paddingLeft: 8, marginBottom: 16 }}
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
      ) : (
        <>
          <Text style={{ margin: 16 }}>
            Nos perdoe, mas ainda não temos nenhuma pista.
          </Text>
        </>
      )}
    </>
  );
};

export default TrackAllSpots;
