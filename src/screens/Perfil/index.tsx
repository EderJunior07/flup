import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
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
} from './styles';
import Photo from '../../components/Photo';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '../../store/types';
import { useAuth } from '../../hooks/auth';
import { GetCurrentUser } from '../../services/firestore/userMethods';
import { SetUser } from '../../store/ducks/user/actions';

const Perfil = () => {
  const {
    user: { id, name, photoUrl },
  } = useSelector((state: AppStore) => state);

  const dispatch = useDispatch();

  const { signOut } = useAuth();

  const [userPhotoURL, setUserPhotoURL] = useState('');

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
    }
  }

  const handleStorage = async () => {
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
  };

  useEffect(() => {
    handleStorage();
  }, [userPhotoURL]);

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
              uri={
                userPhotoURL
                  ? userPhotoURL
                  : `https://ui-avatars.com/api/?size=128&length=1&background=FF2424&color=FFF&name=${name}`
              }
            />
          </TouchableOpacity>
          <InfoBox>
            <FollowersBox>
              <ColumnBoxLeft>
                <UpLabel>23</UpLabel>
                <DownLabel>Amigos</DownLabel>
              </ColumnBoxLeft>
              <ColumnBoxMiddle>
                <UpLabel>09</UpLabel>
                <DownLabel>Rolês</DownLabel>
              </ColumnBoxMiddle>
              <ColumnBoxRight>
                <UpLabel>15</UpLabel>
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
            <Label>Base</Label>
            <MaterialIcons
              name="circle"
              color={'#FFF'}
              size={4}
              style={{ marginRight: 8 }}
            />
            <LabelWhite>GOOFY</LabelWhite>
          </LabelContainer>
          <LabelContainer>
            <Label>Idade</Label>
            <MaterialIcons
              name="circle"
              color={'#FFF'}
              size={4}
              style={{ marginRight: 8 }}
            />
            <LabelWhite>24 ANOS</LabelWhite>
          </LabelContainer>
        </AllBlackContainer>
      </Container>
    </>
  );
};

export default Perfil;
