import React from 'react';
import { View } from 'react-native';

import { Image, Placeholder, PlaceholderTitle } from './styles';

type Props = {
  uri: string | null;
};

const Photo = ({ uri }: Props) => {
  if (uri) {
    return <Image source={{ uri }} />;
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
