import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import {
  Container,
  HeaderContainer,
  LocationContainer,
  LocationLabel,
  SaludationsContainer,
  SaludationsTitle,
} from './styles';
import { useTheme } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import CarouselTrackMap from './carouselTrackMap';

const Content = () => {
  const { COLORS } = useTheme();

  return (
    <>
      <Container>
        <HeaderContainer>
          <LocationContainer>
            <LocationLabel>Barueri, SP</LocationLabel>
          </LocationContainer>
          <TouchableOpacity>
            <MaterialIcons
              name="notifications"
              size={24}
              color={COLORS.ICONS_PRIMARY_COLOR}
            />
          </TouchableOpacity>
        </HeaderContainer>
        <SaludationsContainer>
          <SaludationsTitle>Bora pro rolê?</SaludationsTitle>
        </SaludationsContainer>
        <CarouselTrackMap/>
      </Container>
    </>
  );
};

export default Content;
