import Photo from '../../../components/Photo';
import { AppStore } from '../../../store/types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import firestore from '@react-native-firebase/firestore';

import {
  ButtonLabel,
  Container,
  Description,
  Form,
  InputGroup,
  InputGroupHeader,
  Label,
  MaxCharacters,
  MessageContainer,
  Title,
  ToggleBox,
} from './styles';

import Input from '../../../components/input';

import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { GetCurrentUser } from '../../../services/firestore/userMethods';
import { SetUser } from '../../../store/ducks/user/actions';
import { useTheme } from 'styled-components/native';
import { IBaseType } from '@src/services/firestore/types/user';

const bases = ['Goofy', 'Regular'];

interface ISetPerfilDetailsModal {
  setEmptyFiedsModal: any;
  type: 'edit' | 'complete';
}

const SetPerfilDetailsModal = ({
  setEmptyFiedsModal,
  type,
}: ISetPerfilDetailsModal) => {
  const {
    user: {
      id,
      name,
      photoUrl,
      formatted_city,
      description,
      base_at_skate_type,
    },
  } = useSelector((state: AppStore) => state);

  const { COLORS } = useTheme();
  const dispatch = useDispatch();

  const [biography, setBiography] = useState(
    type === 'edit' ? description : ''
  );

  const [actives, setActives] = useState<IBaseType[]>(
    type === 'edit' ? base_at_skate_type : []
  );

  const [loading, setLoading] = useState(false);

  const handleActives = (item: any) => {
    const isSelected = actives.find((a: any) => a == item);

    if (isSelected) {
      setActives(actives.filter((a: any) => a != item));
      console.log(actives);
    } else {
      setActives([...actives, item]);
    }
  };

  useEffect(() => {
    console.log('The real: ', actives);
  },[actives])

  const handleSaveDetails = async () => {
    if (biography.length < 1) {
      Alert.alert('Biografia', 'Preencha sua biografia!');
      return;
    }

    if (actives.length < 1) {
      Alert.alert('Base', 'Preencha sua base para continuar!');
      return;
    }

    setLoading(true);
    console.log(actives)
    await firestore()
      .collection('USER')
      .doc(id)
      .update({ description: biography, base_at_skate_type: actives })
      .then(() => {
        console.log('USER UPDATED');
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });

    const reduxUser = await GetCurrentUser(id);

    dispatch(SetUser(reduxUser));
    console.log('REDUX USER UPDATEDxxxx :', reduxUser);
    setEmptyFiedsModal(false);
  };

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
          <Title>
            {type === 'complete' ? 'Complete seu perfil' : 'Editar Perfil'}
          </Title>
          <Description>
            {type === 'complete'
              ? 'Falta só mais um pouquinho para você dar seus rolês por aí, complete seu perfil.'
              : 'Vai dar aquela ajeitada, né?'}
          </Description>
        </MessageContainer>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingBottom: 100 }}
        >
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

            <InputGroup>
              <Label>Base</Label>

              <ToggleBox>
                {bases.map((i, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={1}
                      key={index}
                      style={[
                        styles.boxBase,
                        {
                          backgroundColor: `${
                            actives &&
                            actives.find((item: any) => item && item === i)
                              ? '#000'
                              : '#FFF'
                          }`,
                        },
                      ]}
                      onPress={() => handleActives(i)}
                    >
                      <Text
                        style={[
                          styles.textBase,
                          {
                            color: `${
                              actives &&
                              actives.find((item: any) => item && item === i)
                                ? '#FFF'
                                : '#000'
                            }`,
                          },
                        ]}
                      >
                        {i}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ToggleBox>
            </InputGroup>
          </Form>
        </ScrollView>
        <TouchableOpacity
          onPress={handleSaveDetails}
          style={[
            styles.buttonConfirm,
            {
              backgroundColor: '#000',
            },
          ]}
        >
          {loading ? (
            <ActivityIndicator size={'small'} color={COLORS.SUCCESS_900} />
          ) : (
            <ButtonLabel>Salvar</ButtonLabel>
          )}
        </TouchableOpacity>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  boxBase: {
    width: 164,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#000',
  },
  textBase: {
    fontSize: 12,
    fontFamily: 'DMSans_Bold',
    textTransform: 'uppercase',
  },
  buttonConfirm: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 8,
    height: 56,
    width: '92%',
    paddingLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SetPerfilDetailsModal;
