import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Image, ImgContainer, Placeholder, PlaceholderTitle } from './styles';

type Props = {
  uri: string | null;
  loading: boolean;
};

const Photo = ({ uri, loading }: Props) => {
  const { COLORS } = useTheme();

  if (uri) {
    return (
      <>
        <ImgContainer>
          {!loading ? (
            <Image source={{ uri }} />
          ) : (
            <ActivityIndicator size={'large'} color={COLORS.SUCCESS_900} />
          )}
        </ImgContainer>
      </>
    );
  }

  return (
    <>
      <Placeholder>
        <PlaceholderTitle>Nenhuma foto {`\n`} carregada</PlaceholderTitle>
      </Placeholder>
    </>
  );
};

export default Photo;
