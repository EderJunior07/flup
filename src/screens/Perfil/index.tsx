import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

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
import { TouchableOpacity } from 'react-native';
import Photo from '../../components/Photo';
import { useSelector } from 'react-redux';
import { AppStore } from '../../store/types';
import { useAuth } from '../../hooks/auth';

const Perfil = () => {
  const {
    user: { name, photoUrl },
  } = useSelector((state: AppStore) => state);

  const { signOut } = useAuth();

  

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
          <Photo
            uri={
              photoUrl
                ? photoUrl
                : `https://ui-avatars.com/api/?size=128&length=1&background=FF2424&color=FFF&name=${name}`
            }
          />
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
