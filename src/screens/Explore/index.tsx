import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';

import {
  Container,
  ContainerHeadline,
  DescriptionHeadline,
  Header,
  HeaderBoxLeft,
  HeaderBoxRight,
  HeaderTitle,
  TitleContainer,
  HeadlineLabel,
  ContainerOfTitle,
  HeadlineTitleBox,
  LabelContainerOfTitle,
} from './styles';

import TrackAllSpots from '../../components/home/content/trackAllSpots';
import { useTheme } from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '@src/store/types';
import { IUser } from '@src/services/firestore/types/user';
import ModalPerfilNewUsers from '../../components/home/content/carouselTrackNewUsers/modalPerfilNewUsers';

const Explore = () => {
  const { COLORS } = useTheme();
  const {
    user: { id },
  } = useSelector((state: AppStore) => state);

  //MODALS
  const [profileModal, setProfileModal] = useState(false);

  const [userSelected, setSelectedUser] = useState('');

  const [allFlupers, setAllFlupers] = useState<IUser[]>([]);
  const [flupHasMembers, setFlupHasMembers] = useState(false);

  const trackMembers = async () => {
    const userCollectionRef = firestore().collection('USER');
    const snapshots = await userCollectionRef.where('status', '==', 1).get();

    if (snapshots.empty) {
      console.log('No matching documents for TRACK NEW USERS.');
      setFlupHasMembers(false);
      return;
    }
    setFlupHasMembers(true);

    let response: any = [];

    snapshots.forEach((doc) => {
      response.push(doc.data());
      return doc.data();
    });

    const responseFilted = response.filter((a: any) => a.id !== id);

    // dispatch(SetNewUsersAtTheCity([responseFilted]));

    setAllFlupers(responseFilted);
    return responseFilted;
  };

  useEffect(() => {
    trackMembers();
  }, []);

  function handleModalUserSelected(id: string) {
    setProfileModal(true);
    setSelectedUser(id);
  }

  return (
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={profileModal}
        onRequestClose={() => {
          setProfileModal(!profileModal);
        }}
      >
        <ModalPerfilNewUsers id={userSelected} />
      </Modal>
      <Container>
        <Header>
          <HeaderTitle>
            {' '}
            <MaterialIcons
              name={'public'}
              size={14}
              color={COLORS.PRIMARY_BUTTON}
            />{' '}
            Explorar
          </HeaderTitle>
        </Header>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <ContainerHeadline>
            <View
              style={{
                flex: 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                style={{ flex: 1, width: '100%', resizeMode: 'cover' }}
                source={{
                  uri: 'https://images.pexels.com/photos/6828662/pexels-photo-6828662.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                }}
              />
              <HeadlineTitleBox>
                <HeadlineLabel>Flup</HeadlineLabel>
              </HeadlineTitleBox>
            </View>

            <View
              style={{
                flex: 0.7,
                paddingHorizontal: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <DescriptionHeadline>
                Estamos no começo da nossa jornada e agrademos muito por você
                fazer parte disso! Nossa missão é levar o skate à todos que
                tenham paixão ou interesse por esse maravilhoso esporte!
              </DescriptionHeadline>
            </View>
          </ContainerHeadline>

          <ContainerOfTitle>
            <TitleContainer>
              <LabelContainerOfTitle>
                <MaterialIcons
                  name={'public'}
                  size={14}
                  color={COLORS.SECONDARY_BUTTON}
                />{' '}
                Spots
              </LabelContainerOfTitle>
            </TitleContainer>
          </ContainerOfTitle>

          <TrackAllSpots />

          <ContainerOfTitle>
            <TitleContainer>
              <LabelContainerOfTitle>
                <MaterialIcons
                  name={'public'}
                  size={14}
                  color={COLORS.SECONDARY_BUTTON}
                />{' '}
                Flupers
              </LabelContainerOfTitle>
            </TitleContainer>
          </ContainerOfTitle>

          <FlatList
            data={allFlupers}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => handleModalUserSelected(item.id)}
                  activeOpacity={0.9}
                  style={{
                    width: 132,
                    borderRadius: 132,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 16,
                    marginLeft: 8,
                  }}
                >
                  <Image
                    source={{ uri: item.photoUrl }}
                    style={{
                      width: 132,
                      height: 132,
                      borderRadius: 132,
                      resizeMode: 'cover',
                      marginBottom: 8,
                    }}
                  />
                  <Text
                    style={{ fontFamily: 'DMSans_Medium', textAlign: 'center' }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
      </Container>
    </>
  );
};

export default Explore;
