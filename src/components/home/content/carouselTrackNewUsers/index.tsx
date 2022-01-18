import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { Container, Name } from './styles';
import { IUser } from '../../../../services/firestore/types/user';
import { useDispatch } from 'react-redux';
import { SetNewUsersAtTheCity } from '../../../../store/ducks/newUsersAtCity/actions';

interface ICarouselTrackNewUsers {
  city: string;
}

const CarouselTrackNewUsers = ({ city }: ICarouselTrackNewUsers) => {
  const dispatch = useDispatch();

  const [newUsersAtTheCity, setNewUsersAtTheCity] = useState([]);
  const [cityHasMembers, setCityHasMembers] = useState(false);

  const trackNewUser = async () => {
    const userCollectionRef = firestore().collection('USER');
    const snapshots = await userCollectionRef
      .where('status', '==', 1)
      .where('formatted_city', '==', city)
      .get();

    if (snapshots.empty) {
      console.log('No matching documents.');
      setCityHasMembers(false);
      return;
    }
    setCityHasMembers(true);

    let response: any = [];

    dispatch(SetNewUsersAtTheCity(response));

    snapshots.forEach((doc) => {
      response.push(doc.data());
      return doc.data();
    });

    setNewUsersAtTheCity(response);
    return response;
  };

  useEffect(() => {
    trackNewUser();
  }, [city]);

  return (
    <>
      {cityHasMembers ? (
        <ScrollView
          style={{ flex: 1, paddingLeft: 8, marginBottom: 16 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {newUsersAtTheCity &&
            newUsersAtTheCity.map((data: any, index: number) => (
              <Container key={index}>
                <Image
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 78,
                    resizeMode: 'cover',
                    alignSelf: 'center',
                  }}
                  source={{
                    uri: data?.photoUrl
                      ? data?.photoUrl
                      : `https://ui-avatars.com/api/?size=128&length=1&background=FF2424&color=FFF&name=${data.name}`,
                  }}
                />
                <Name>{data.name}</Name>
              </Container>
            ))}
        </ScrollView>
      ) : (
        <Text style={{ textAlign: 'center', paddingHorizontal: 24 }}>
          Sentimos muito, mas não encontramos nenhum Fluper na cidade em que
          você se encontra, convide seus amigos.
        </Text>
      )}
    </>
  );
};

export default CarouselTrackNewUsers;
