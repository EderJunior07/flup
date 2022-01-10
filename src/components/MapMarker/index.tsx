import React from 'react';
import { Image } from 'react-native';

import { Container } from './styles';

const MapContentMarker = (dataImage: any, index: number) => {
  return (
    <>
      <Container>
        <Image
          source={{
            uri: dataImage
              ? dataImage.dataImage
              : 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
          }}
          style={{ flex: 1, width: 124, height: 124, resizeMode: 'cover' }}
        />
      </Container>
    </>
  );
};

export default MapContentMarker;
