import Photo from '../../../../components/Photo';
import { AppStore } from '../../../../store/types';
import React from 'react';
import { useSelector } from 'react-redux';

import { Container, Description, MessageContainer, Title } from './styles';

const ModalEmptyFields = () => {
  const {
    user: { id, name, photoUrl, formatted_city, description },
  } = useSelector((state: AppStore) => state);

  return (
    <>
      <Container>
        <MessageContainer>
          <Photo
            loading={false}
            uri={
              photoUrl
                ? photoUrl
                : `https://ui-avatars.com/api/?size=128&length=1&background=FF2424&color=FFF&name=${name}`
            }
          />
          <Title>Complete seu perfil</Title>
          <Description>
            Falta só mais um pouquinho para você dar seus rolês por aí, complete
            seu perfil.
          </Description>
        </MessageContainer>
      </Container>
    </>
  );
};

export default ModalEmptyFields;
