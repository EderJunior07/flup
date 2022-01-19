import Photo from '../../../../components/Photo';
import { AppStore } from '../../../../store/types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Container,
  Description,
  Form,
  InputGroup,
  InputGroupHeader,
  Label,
  MaxCharacters,
  MessageContainer,
  Title,
} from './styles';
import Input from '../../../../components/input';
import { ScrollView } from 'react-native';

const ModalEmptyFields = () => {
  const {
    user: { id, name, photoUrl, formatted_city, description },
  } = useSelector((state: AppStore) => state);

  const [biography, setBiography] = useState('');

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

        <ScrollView showsVerticalScrollIndicator={false} style={{paddingBottom: 100}}>
          <Form>
            <InputGroup>
              <InputGroupHeader>
                <Label>Biografia</Label>
                <MaxCharacters>
                  {biography.length} de 60 caracteres
                </MaxCharacters>
              </InputGroupHeader>
              <Input
                onChangeText={setBiography}
                value={biography}
                multiline
                maxLength={60}
                style={{ height: 80 }}
              />
            </InputGroup>
          </Form>
        </ScrollView>
      </Container>
    </>
  );
};

export default ModalEmptyFields;
