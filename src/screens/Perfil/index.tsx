import React, { useEffect, useState } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import firestore from '@react-native-firebase/firestore';

import storage from '@react-native-firebase/storage';

import {
  AllBlackContainer,
  ButtonsBox,
  ColumnBoxLeft,
  ColumnBoxMiddle,
  ColumnBoxRight,
  Container,
  DownLabel,
  DynamicButton,
  DynamicButtonLabel,
  FollowersBox,
  Header,
  HeaderBoxLeft,
  HeaderBoxRight,
  HeaderTitle,
  InfoBox,
  InstagramButotn,
  Label,
  LabelContainer,
  LabelWhite,
  PerfilInfoBox,
  UpLabel,
  UserDescription,
} from './styles';
import Photo from '../../components/Photo';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '../../store/types';
import { useAuth } from '../../hooks/auth';
import { GetCurrentUser } from '../../services/firestore/userMethods';
import { SetUser } from '../../store/ducks/user/actions';
import { useTheme } from 'styled-components/native';
import SetPerfilDetailsModal from '../../components/Modals/SetPerfilDetailsModal';

const Perfil = () => {
  const {
    user: { id, name, photoUrl, formatted_city, description, base_at_skate_type },
  } = useSelector((state: AppStore) => state);

  const { COLORS } = useTheme();
  const dispatch = useDispatch();

  const { signOut } = useAuth();

  const [userPhotoURL, setUserPhotoURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [emptyFiedsModal, setEmptyFiedsModal] = useState(
    !description || !base_at_skate_type ? true : false
  );

  async function handleImagePicker() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
      });

      if (!result.cancelled) {
        setUserPhotoURL(result.uri);
      }

      handleStorage();
    }
  }

  const handleStorage = async () => {
    setLoading(true);
    const reference = storage().ref(`/users_photos/${id}.png`);

    await reference.putFile(userPhotoURL);
    const photo_url = await reference.getDownloadURL();

    await firestore()
      .collection('USER')
      .doc(id)
      .update({ photoUrl: photo_url })
      .then(() => {
        console.log('USER PHOTO URL UPDATED SUCCESFULLY.');
      })
      .catch((e) => {
        console.log(e);
      });

    const reduxUser = await GetCurrentUser(id);

    dispatch(SetUser(reduxUser));
    console.log('REDUX USER UPDATED :', reduxUser);
    setLoading(false);
  };

  return (
    <>
      <Container>
        <Header>
          <HeaderBoxLeft>
            <TouchableOpacity>
              <MaterialIcons name={'notifications-none'} size={24} />
            </TouchableOpacity>
          </HeaderBoxLeft>
          <HeaderTitle>{name}</HeaderTitle>
          <HeaderBoxRight>
            <TouchableOpacity>
              <MaterialIcons onPress={signOut} name={'logout'} size={24} />
            </TouchableOpacity>
          </HeaderBoxRight>
        </Header>

        <PerfilInfoBox>
          <TouchableOpacity onPress={handleImagePicker}>
            <Photo
              loading={loading}
              uri={
                photoUrl
                  ? photoUrl
                  : `https://ui-avatars.com/api/?size=128&length=1&background=FF2424&color=FFF&name=${name}`
              }
            />
          </TouchableOpacity>
          <InfoBox>
            <FollowersBox>
              <ColumnBoxLeft>
                <UpLabel>00</UpLabel>
                <DownLabel>Amigos</DownLabel>
              </ColumnBoxLeft>
              <ColumnBoxMiddle>
                <UpLabel>00</UpLabel>
                <DownLabel>Rolês</DownLabel>
              </ColumnBoxMiddle>
              <ColumnBoxRight>
                <UpLabel>00</UpLabel>
                <DownLabel>Vitórias</DownLabel>
              </ColumnBoxRight>
            </FollowersBox>
            <ButtonsBox>
              <DynamicButton>
                <DynamicButtonLabel>Editar Perfil</DynamicButtonLabel>
              </DynamicButton>
              <InstagramButotn>
                <Ionicons name={'md-logo-instagram'} size={24} />
              </InstagramButotn>
            </ButtonsBox>
          </InfoBox>
        </PerfilInfoBox>

        <AllBlackContainer>
          <LabelContainer>
            <MaterialIcons
              name="location-on"
              size={24}
              color={COLORS.SECONDARY_BUTTON}
            />
            <LabelWhite> {formatted_city && formatted_city}</LabelWhite>
          </LabelContainer>
          <LabelContainer>
            <Label>Base</Label>
            <MaterialIcons
              name="circle"
              color={'#FFF'}
              size={4}
              style={{ marginRight: 8 }}
            />
            <LabelWhite>GOOFY</LabelWhite>
          </LabelContainer>
        </AllBlackContainer>

        <UserDescription>{description && description}</UserDescription>
      </Container>

      <Modal
        animationType="slide"
        transparent={false}
        visible={emptyFiedsModal}
        presentationStyle="pageSheet"
        onRequestClose={() => {
          setEmptyFiedsModal(!emptyFiedsModal);
        }}
      >
        <SetPerfilDetailsModal setEmptyFiedsModal={setEmptyFiedsModal} />
      </Modal>
    </>
  );
};

export default Perfil;
