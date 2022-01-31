import React from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import {
  Container,
  ContainerHeadline,
  DescriptionHeadline,
  Header,
  HeaderBoxLeft,
  HeaderBoxRight,
  HeaderTitle,
  TitleContainer,
  LocationLabel,
  ContainerOfTitle,
  HeadlineTitleBox,
} from './styles';
import TrackAllSpots from '../../components/home/content/trackAllSpots';
import { useTheme } from 'styled-components/native';

const Explore = () => {
  const { COLORS } = useTheme();

  return (
    <>
      <Container>
        <Header>
          <HeaderTitle>Explorar</HeaderTitle>
          <HeaderBoxRight>
            <TouchableOpacity>
              <MaterialIcons name={'local-fire-department'} size={24} />
            </TouchableOpacity>
          </HeaderBoxRight>
        </Header>

        <ScrollView showsVerticalScrollIndicator={false}>
          <ContainerHeadline>
            <View
              style={{
                flex: 2,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.PRIMARY_900,
              }}
            >
              <MaterialIcons
                name={'local-fire-department'}
                size={36}
                color={COLORS.SECONDARY_BUTTON}
              />

              <HeadlineTitleBox>
                <LocationLabel>Flup</LocationLabel>
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
              <LocationLabel>Spots</LocationLabel>
            </TitleContainer>
          </ContainerOfTitle>
          <TrackAllSpots />

          <ContainerOfTitle>
            <TitleContainer>
              <LocationLabel>Flupers</LocationLabel>
            </TitleContainer>
          </ContainerOfTitle>
        </ScrollView>
      </Container>
    </>
  );
};

export default Explore;
