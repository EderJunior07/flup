import React, { useEffect, useState } from 'react';
import { Image, Modal, ScrollView, Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { Container, Name } from './styles';
import { IUser } from '../../../../services/firestore/types/user';
import { useDispatch, useSelector } from 'react-redux';
import { SetNewUsersAtTheCity } from '../../../../store/ducks/newUsersAtCity/actions';
import ModalPerfilNewUsers from './modalPerfilNewUsers';
import { AppStore } from '@src/store/types';

interface ICarouselTrackNewUsers {
  city: string;
}

const CarouselTrackNewUsers = ({ city }: ICarouselTrackNewUsers) => {
  const dispatch = useDispatch();

  const {
    user: { id },
  } = useSelector((state: AppStore) => state);

  const [modalVisible, setModalVisible] = useState(false);
  const [userSelected, setSelectedUser] = useState('');

  const [newUsersAtTheCity, setNewUsersAtTheCity] = useState([]);
  const [cityHasMembers, setCityHasMembers] = useState(false);

  const trackNewUser = async () => {
    const userCollectionRef = firestore().collection('USER');
    const snapshots = await userCollectionRef
      .where('status', '==', 1)
      .where('formatted_city', '==', city)
      .get();

    if (snapshots.empty) {
      console.log('No matching documents for TRACK NEW USERS.');
      setCityHasMembers(false);
      return;
    }
    setCityHasMembers(true);

    let response: any = [];

    snapshots.forEach((doc) => {
      response.push(doc.data());
      return doc.data();
    });

    const responseFilted = response.filter((a: any) => a.id !== id);

    dispatch(SetNewUsersAtTheCity([responseFilted]));

    setNewUsersAtTheCity(responseFilted);
    return responseFilted;
  };

  useEffect(() => {
    trackNewUser();
  }, [city]);

  function handleModalUserSelected(id: string) {
    setModalVisible(true);
    setSelectedUser(id);
  }

  return (
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ModalPerfilNewUsers id={userSelected} />
      </Modal>
      {cityHasMembers ? (
        <ScrollView
          style={{ flex: 1, paddingLeft: 8, marginBottom: 16 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {newUsersAtTheCity &&
            newUsersAtTheCity.map((data: IUser[] | any, index: number) => (
              <Container
                activeOpacity={1}
                onPress={() =>
                  handleModalUserSelected(data.id !== id ? data.id : '')
                }
                key={index}
              >
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
