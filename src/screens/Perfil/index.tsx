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
  PerfilInfoBox,
  UpLabel,
} from './styles';
import { TouchableOpacity } from 'react-native';
import Photo from '../../components/Photo';

const Perfil = () => {
  return (
    <>
      <Container>
        <Header>
          <HeaderBoxLeft>
            <TouchableOpacity>
              <MaterialIcons name={'notifications-none'} size={24} />
            </TouchableOpacity>
          </HeaderBoxLeft>
          <HeaderTitle>Eder Rosa</HeaderTitle>
          <HeaderBoxRight>
            <TouchableOpacity>
              <MaterialIcons name={'settings'} size={24} />
            </TouchableOpacity>
          </HeaderBoxRight>
        </Header>

        <PerfilInfoBox>
          <Photo
            uri={
              'https://pbs.twimg.com/profile_images/754799272042921984/MPrSUunj_400x400.jpg'
            }
          />
          <InfoBox>
            <FollowersBox>
              <ColumnBoxLeft>
                <UpLabel>14</UpLabel>
                <DownLabel>Vitórias</DownLabel>
              </ColumnBoxLeft>
              <ColumnBoxMiddle>
                <UpLabel>14</UpLabel>
                <DownLabel>Rolês</DownLabel>
              </ColumnBoxMiddle>
              <ColumnBoxRight>
                <UpLabel>14</UpLabel>
                <DownLabel>Amigos</DownLabel>
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
          {/* <AllBlackContainerLabel>Barueri, SP</AllBlackContainerLabel> */}
        </AllBlackContainer>
      </Container>
    </>
  );
};

export default Perfil;
