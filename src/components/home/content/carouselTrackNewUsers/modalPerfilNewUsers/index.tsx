import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import firestore from '@react-native-firebase/firestore';

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
import Photo from '../../../../../components/Photo';
import { IUser } from '../../../../../services/firestore/types/user';
import { useTheme } from 'styled-components/native';

export interface IModalPerfilNewUsers {
  id: string;
}

const ModalPerfilNewUsers = ({ id }: IModalPerfilNewUsers) => {
  const { COLORS } = useTheme();

  const [loading, setLoading] = useState(false);
  const [userSelected, setUserSelected] = useState<IUser | any>();
  const handleUserSelected = async () => {
    console.log('\x1b[36mGET THE USER >>> ', id);
    setLoading(true);
    await firestore()
      .collection('USER')
      .doc(id)
      .get()
      .then((response) => {
        setUserSelected(response.data());
        console.log('\x1b[36mTHE USER IS ----> ', response.data());
        setLoading(false);
        return response.data();
      })
      .catch(() => {
        setLoading(true);
        console.log('Não foi possível recuperar o usuário', id);
      });
  };

  useEffect(() => {
    handleUserSelected();
  }, [id]);

  
  return (
    <>
      {loading ? (
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.BACKGROUND,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator
            size="large"
            color="#000"
            style={{ alignSelf: 'center' }}
          />
        </View>
      ) : (
        <Container>
          <Header>
            <HeaderBoxLeft>
              <TouchableOpacity>
                <MaterialIcons name={'arrow-back'} size={24} />
              </TouchableOpacity>
            </HeaderBoxLeft>
            <HeaderTitle>
              {userSelected ? userSelected?.name : 'undefined'}
            </HeaderTitle>
            <HeaderBoxRight>
              <TouchableOpacity>
                <MaterialIcons name={'chat-bubble-outline'} size={24} />
              </TouchableOpacity>
            </HeaderBoxRight>
          </Header>

          <PerfilInfoBox>
            <TouchableOpacity>
              <Photo
                loading={loading}
                uri={
                  userSelected
                    ? userSelected?.photoUrl
                    : `https://ui-avatars.com/api/?size=128&length=1&background=FF2424&color=FFF&name=${'Eder'}`
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
                  <DownLabel>Vitórias</DownLabel>
                </ColumnBoxMiddle>
                <ColumnBoxRight>
                  <UpLabel>15</UpLabel>
                  <DownLabel>Derrotas</DownLabel>
                </ColumnBoxRight>
              </FollowersBox>
              <ButtonsBox>
                <DynamicButton onPress={() => Alert.alert('dasd')}>
                  <MaterialIcons
                    name="emoji-people"
                    size={24}
                    color={COLORS.SECONDARY_BUTTON}
                  />
                  <DynamicButtonLabel>Adicionar</DynamicButtonLabel>
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
              <LabelWhite>
                {' '}
                {userSelected && userSelected?.formatted_city}
              </LabelWhite>
            </LabelContainer>
            <LabelContainer>
              <Label>Base</Label>
              <MaterialIcons
                name="circle"
                color={'#FFF'}
                size={4}
                style={{ marginRight: 8 }}
              />
              <LabelWhite>
                {userSelected && userSelected?.base_at_skate_type}
              </LabelWhite>
            </LabelContainer>
          </AllBlackContainer>

          <UserDescription>
            {userSelected && userSelected?.description}
          </UserDescription>
        </Container>
      )}
    </>
  );
};

export default ModalPerfilNewUsers;
