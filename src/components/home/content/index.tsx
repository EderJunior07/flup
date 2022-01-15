import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import {
  Container,
  HeaderContainer,
  LocationContainer,
  LocationLabel,
  SaludationsContainer,
  SaludationsDescription,
  SaludationsTitle,
} from './styles';
import { useTheme } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import CarouselTrackMap from './carouselTrackMap';

interface IContent {
  city: string;
}

const Content = ({ city }: IContent) => {
  const { COLORS } = useTheme();

  return (
    <>
      <Container>
        <HeaderContainer>
          <LocationContainer>
            <LocationLabel>{city}</LocationLabel>
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
          <SaludationsDescription>
            Mamãe já dizia: se for dar um rolê "ollie" para os dois lados antes de atravessar a
            rua.
          </SaludationsDescription>
        </SaludationsContainer>

        <CarouselTrackMap />
      </Container>
    </>
  );
};

export default Content;
